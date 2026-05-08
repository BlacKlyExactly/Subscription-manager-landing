"use server";

import { db } from "@/lib/drizzle/db";
import { usersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserQuery } from "@/queries";
import { revalidatePath } from "next/cache";
import { Result } from ".";

export const switchPlanAction = async (plan: "starter" | "pro") => {
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  if (user.plan === plan) return Result.error("Już masz ten plan");

  await db
    .update(usersTable)
    .set({ plan })
    .where(eq(usersTable.id, user.id));

  revalidatePath("/dashboard/billing");

  return Result.ok({ plan });
};
