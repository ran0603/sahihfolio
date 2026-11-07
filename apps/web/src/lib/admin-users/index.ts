import { db } from "@sahihfolio/database";
import { adminUsers } from "@sahihfolio/database/schema";
import { and, eq, sql } from "drizzle-orm";

export async function isAdminEmailAllowed(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) return false;

  const [user] = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(
      and(
        eq(sql`lower(${adminUsers.email})`, normalizedEmail),
        eq(adminUsers.status, "active"),
      ),
    )
    .limit(1);

  return Boolean(user);
}
