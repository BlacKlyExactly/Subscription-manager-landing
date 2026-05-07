"use server";

import {
  RegisterFormProps,
  registerFormSchema,
} from "@/validation-schemas/register";
import { Result } from ".";
import { activationTokensTable, usersTable } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/db";
import argon2 from "argon2";
import { baseUrl, generateToken, getExpiryHours, hashToken } from "@/lib/utils";
import { resend } from "@/lib/resend";
import ConfirmEmail from "@/emails/activation";
import { redirect } from "next/navigation";

export const registerAction = async (data: RegisterFormProps) => {
  const parsed = registerFormSchema.safeParse(data);
  if (!parsed.success) return Result.error("Błąd przy weryfikowaniu danych");

  const { name, email, password, repeatPassword } = parsed.data;

  if (password !== repeatPassword) return Result.error("Hasła się różnią");

  try {
    const passwordHash = await argon2.hash(password);

    const activationToken = generateToken();
    const hashedActivationToken = hashToken(activationToken);

    const [createdUser] = await db
      .insert(usersTable)
      .values({
        passwordHash,
        name,
        email,
      })
      .returning();

    await db.insert(activationTokensTable).values({
      tokenHash: hashedActivationToken,
      userId: createdUser.id,
      createdAt: new Date(),
      expiresAt: getExpiryHours(24),
    });

    resend.emails.send({
      to: email,
      subject: "Aktywacja konta",
      from: "SubTracker <konto@answermouse.com>",
      react: (
        <ConfirmEmail
          companyName="Subscription manager"
          url={`${baseUrl}/verify/${activationToken}`}
        />
      ),
    });
  } catch (err: any) {
    console.log(err);

    if (err.code === "23505") {
      return Result.error("Email już istnieje");
    }

    return Result.error("Wystąpił błąd spróbuj ponownie później");
  }

  redirect("/register-success");
};
