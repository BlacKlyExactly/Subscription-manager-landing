"use server";

import { db } from "@/lib/drizzle/db";
import { activationTokensTable, usersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { hashToken } from "@/lib/utils";
import { Result } from ".";

export const verifyActivationTokenAction = async (token: string) => {
  if (!token) return Result.error("Brak tokenu");

  try {
    const tokenHash = hashToken(token);

    const record = await db.query.activationTokensTable.findFirst({
      where: eq(activationTokensTable.tokenHash, tokenHash),
    });

    if (!record) return Result.error("Nieprawidłowy token");
    if (record.expiresAt < new Date()) return Result.error("Token wygasł");

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, record.userId),
    });

    if (!user) return Result.error("Użytkownik nie istnieje");
    if (user.activated) return Result.ok(undefined);

    await db.transaction(async (tx) => {
      await tx
        .update(usersTable)
        .set({ activated: true })
        .where(eq(usersTable.id, record.userId));

      await tx
        .delete(activationTokensTable)
        .where(eq(activationTokensTable.id, record.id));
    });

    return Result.ok(undefined);
  } catch (err) {
    return Result.error("Wystąpił błąd spróbuj ponownie później");
  }
};
