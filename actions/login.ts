"use server";

import { LoginFormProps, loginFormSchema } from "@/validation-schemas/login";
import { Result } from ".";
import { db } from "@/lib/drizzle/db";
import { usersTable, sessionsTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import { generateToken, getExpiryHours, hashToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const loginAction = async (data: LoginFormProps) => {
  const jar = await cookies();

  const parsed = loginFormSchema.safeParse(data);
  if (!parsed.success) {
    return Result.error("Błąd przy weryfikowaniu danych");
  }

  const { email, password } = parsed.data;

  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!user) return Result.error("Nieprawidłowy email lub hasło");

    const validPassword = await argon2.verify(user.passwordHash, password);

    if (!validPassword) return Result.error("Nieprawidłowy email lub hasło");
    if (!user.activated) return Result.error("Konto nie zostało aktywowane");

    const sessionToken = generateToken();
    const sessionHash = hashToken(sessionToken);

    await db.insert(sessionsTable).values({
      userId: user.id,
      tokenHash: sessionHash,
      expireAt: getExpiryHours(7 * 24),
    });

    jar.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const { passwordHash, ...userWithoutPasswordHash } = user;
    return Result.ok(userWithoutPasswordHash);
  } catch (err) {
    console.log(err);
    return Result.error("Wystąpił błąd spróbuj ponownie później");
  }
};
