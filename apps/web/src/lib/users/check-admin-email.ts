import { db } from "@sahihfolio/database";
import { user } from "@sahihfolio/database/schema";
import { and, eq, sql } from "drizzle-orm";

export async function isAdminEmailAllowed(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) return false;

  const [existingUser] = await db
    .select({ id: user.id })
    .from(user)
    .where(
      and(
        eq(sql`lower(${user.email})`, normalizedEmail),
        eq(user.emailVerified, true),
      ),
    )
    .limit(1);

  return Boolean(existingUser);
}
