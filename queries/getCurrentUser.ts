"use server";

import { cookies } from "next/headers";
import { db } from "@/lib/drizzle/db";
import { sessionsTable, usersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { hashToken } from "@/lib/utils";

export const getCurrentUserQuery = async () => {
  const jar = await cookies();
  const sessionToken = jar.get("session")?.value;

  if (!sessionToken) return null;

  const sessionHash = hashToken(sessionToken);

  const session = await db.query.sessionsTable.findFirst({
    where: eq(sessionsTable.tokenHash, sessionHash),
  });

  if (!session) return null;

  if (session.expireAt < new Date()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
    jar.delete("session");
    return null;
  }

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, session.userId),
  });

  if (!user) return null;
  const { passwordHash, ...userWithoutPasswordHash } = user;

  return userWithoutPasswordHash ?? null;
};
