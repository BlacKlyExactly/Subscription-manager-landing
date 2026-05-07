"use server";

import { db } from "@/lib/drizzle/db";
import { subscriptionsTable } from "@/lib/drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { getCurrentUserQuery } from "./getCurrentUser";

export const getSubscriptionsQuery = async () => {
  const user = await getCurrentUserQuery();
  if (!user) return null;

  return db.query.subscriptionsTable.findMany({
    where: eq(subscriptionsTable.userId, user.id),
    orderBy: [asc(subscriptionsTable.nextRenewalDate)],
  });
};

export type Subscription = Awaited<
  ReturnType<typeof getSubscriptionsQuery>
> extends (infer T)[] | null
  ? T
  : never;
