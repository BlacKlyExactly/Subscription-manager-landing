"use server";

import { db } from "@/lib/drizzle/db";
import { usersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserQuery } from "@/queries";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import argon2 from "argon2";
import { Result } from ".";
import {
  updateNameSchema,
  updatePasswordSchema,
  type UpdateNameInput,
  type UpdatePasswordInput,
} from "@/validation-schemas/account";

export const updateNameAction = async (data: UpdateNameInput) => {
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  const parsed = updateNameSchema.safeParse(data);
  if (!parsed.success) return Result.error("Nieprawidłowe dane");

  await db
    .update(usersTable)
    .set({ name: parsed.data.name })
    .where(eq(usersTable.id, user.id));

  revalidatePath("/dashboard/account");
  return Result.ok({ name: parsed.data.name });
};

export const updatePasswordAction = async (data: UpdatePasswordInput) => {
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  const parsed = updatePasswordSchema.safeParse(data);
  if (!parsed.success) return Result.error("Nieprawidłowe dane");

  const fullUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, user.id),
  });
  if (!fullUser) return Result.error("Nie znaleziono użytkownika");

  const valid = await argon2.verify(
    fullUser.passwordHash,
    parsed.data.currentPassword,
  );
  if (!valid) return Result.error("Aktualne hasło jest nieprawidłowe");

  const newHash = await argon2.hash(parsed.data.newPassword);

  await db
    .update(usersTable)
    .set({ passwordHash: newHash })
    .where(eq(usersTable.id, user.id));

  return Result.ok(null);
};

export const deleteAccountAction = async () => {
  const jar = await cookies();
  const user = await getCurrentUserQuery();
  if (!user) return Result.error("Nie jesteś zalogowany");

  await db.delete(usersTable).where(eq(usersTable.id, user.id));

  jar.delete("session");
  revalidatePath("/");
  return Result.ok(null);
};
