"use server";

import { subscriptionFormSchema } from "@/validation-schemas/subscription";
import { z } from "zod";
import { Result } from ".";
import { db } from "@/lib/drizzle/db";
import { subscriptionsTable } from "@/lib/drizzle/schema";
import { and, eq, count } from "drizzle-orm";
import { getCurrentUserQuery } from "@/queries";
import { revalidatePath } from "next/cache";

const STARTER_LIMIT = 5;

export const createSubscriptionAction = async (
  data: z.input<typeof subscriptionFormSchema>,
) => {
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  const parsed = subscriptionFormSchema.safeParse(data);
  if (!parsed.success) return Result.error("Błąd przy weryfikowaniu danych");

  const { name, price, billingCycle, nextRenewalDate, category, emoji, notes } =
    parsed.data;

  try {
    if (user.plan === "starter") {
      const [{ total }] = await db
        .select({ total: count() })
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.userId, user.id));

      if (total >= STARTER_LIMIT) {
        return Result.error(
          `Plan Starter pozwala na maksymalnie ${STARTER_LIMIT} subskrypcji. Przejdź na Pro, aby dodać więcej.`,
        );
      }
    }

    const [subscription] = await db
      .insert(subscriptionsTable)
      .values({
        userId: user.id,
        name,
        price: Math.round(price * 100),
        billingCycle,
        nextRenewalDate: new Date(nextRenewalDate),
        category: category ?? null,
        emoji: emoji ?? null,
        notes: notes ?? null,
      })
      .returning();

    revalidatePath("/dashboard");
    return Result.ok(subscription);
  } catch (err) {
    console.error(err);
    return Result.error("Wystąpił błąd, spróbuj ponownie później");
  }
};

export const deleteSubscriptionAction = async (id: number) => {
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  try {
    await db
      .delete(subscriptionsTable)
      .where(
        and(
          eq(subscriptionsTable.id, id),
          eq(subscriptionsTable.userId, user.id),
        ),
      );

    revalidatePath("/dashboard");
    return Result.ok(null);
  } catch (err) {
    console.error(err);
    return Result.error("Wystąpił błąd, spróbuj ponownie później");
  }
};

export const updateSubscriptionAction = async (
  id: number,
  data: z.input<typeof subscriptionFormSchema>,
) => {
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  const parsed = subscriptionFormSchema.safeParse(data);
  if (!parsed.success) return Result.error("Błąd przy weryfikowaniu danych");

  const { name, price, billingCycle, nextRenewalDate, category, emoji, notes } =
    parsed.data;

  try {
    await db
      .update(subscriptionsTable)
      .set({
        name,
        price: Math.round(price * 100),
        billingCycle,
        nextRenewalDate: new Date(nextRenewalDate),
        category: category ?? null,
        emoji: emoji ?? null,
        notes: notes ?? null,
      })
      .where(
        and(
          eq(subscriptionsTable.id, id),
          eq(subscriptionsTable.userId, user.id),
        ),
      );

    revalidatePath("/dashboard");
    return Result.ok(null);
  } catch (err) {
    console.error(err);
    return Result.error("Wystąpił błąd, spróbuj ponownie później");
  }
};

export const toggleSubscriptionAction = async (id: number, isActive: boolean) => {
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  try {
    await db
      .update(subscriptionsTable)
      .set({ isActive })
      .where(
        and(
          eq(subscriptionsTable.id, id),
          eq(subscriptionsTable.userId, user.id),
        ),
      );

    revalidatePath("/dashboard");
    return Result.ok(null);
  } catch (err) {
    console.error(err);
    return Result.error("Wystąpił błąd, spróbuj ponownie później");
  }
};
