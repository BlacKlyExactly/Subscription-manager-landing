"use server";

import { cookies } from "next/headers";
import { db } from "@/lib/drizzle/db";
import { sessionsTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { hashToken } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { Result } from ".";

export const logoutAction = async () => {
  const jar = await cookies();

  try {
    const sessionToken = jar.get("session")?.value;

    if (sessionToken) {
      const sessionHash = hashToken(sessionToken);

      await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.tokenHash, sessionHash));
    }

    jar.delete("session");

    revalidatePath("/");

    return Result.ok(undefined);
  } catch (err) {
    return Result.error("Wystąpił błąd podczas wylogowania");
  }
};
