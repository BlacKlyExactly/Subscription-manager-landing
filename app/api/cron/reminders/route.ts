import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle/db";
import { subscriptionsTable, usersTable } from "@/lib/drizzle/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { resend } from "@/lib/resend";
import {
  RenewalReminder,
  type ReminderSubscription,
} from "@/emails/renewal-reminder";
import { render } from "@react-email/render";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

function formatPLN(grosze: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(grosze / 100);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function daysUntil(date: Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const rows = await db
    .select({
      userId: usersTable.id,
      userName: usersTable.name,
      userEmail: usersTable.email,
      subId: subscriptionsTable.id,
      subName: subscriptionsTable.name,
      subEmoji: subscriptionsTable.emoji,
      subPrice: subscriptionsTable.price,
      subNextRenewalDate: subscriptionsTable.nextRenewalDate,
    })
    .from(subscriptionsTable)
    .innerJoin(usersTable, eq(subscriptionsTable.userId, usersTable.id))
    .where(
      and(
        eq(subscriptionsTable.isActive, true),
        gte(subscriptionsTable.nextRenewalDate, now),
        lte(subscriptionsTable.nextRenewalDate, in3Days),
      ),
    );

  const byUser = new Map<
    number,
    { name: string; email: string; subs: ReminderSubscription[] }
  >();

  for (const row of rows) {
    if (!byUser.has(row.userId)) {
      byUser.set(row.userId, {
        name: row.userName,
        email: row.userEmail,
        subs: [],
      });
    }
    const renewalDate = new Date(row.subNextRenewalDate);
    byUser.get(row.userId)!.subs.push({
      name: row.subName,
      emoji: row.subEmoji,
      priceFormatted: formatPLN(row.subPrice),
      renewalDateFormatted: formatDate(renewalDate),
      daysUntil: daysUntil(renewalDate),
    });
  }

  const results: { email: string; status: string }[] = [];

  for (const [, user] of byUser) {
    const html = await render(
      RenewalReminder({
        userName: user.name,
        subscriptions: user.subs,
        dashboardUrl: `${baseUrl}/dashboard`,
      }),
    );

    const { error } = await resend.emails.send({
      from: "SubTracker <przypomnienia@answermouse.com>",
      to: user.email,
      subject:
        user.subs.length === 1
          ? `${user.subs[0].name} odnowi się wkrótce`
          : `${user.subs.length} subskrypcje odnowią się wkrótce`,
      html,
    });

    results.push({
      email: user.email,
      status: error ? `error: ${error.message}` : "sent",
    });
  }

  return NextResponse.json({ sent: results.length, results });
}
