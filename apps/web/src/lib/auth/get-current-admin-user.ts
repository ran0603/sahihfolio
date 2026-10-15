import { cookies } from "next/headers";
import type { AdminUser } from "./require-admin-role";

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!session) {
    return null;
  }

  // Temporary development-only stub.
  // Replace with real session verification in Issue 15.
  return {
    id: "00000000-0000-0000-0000-000000000001",
    email: "admin@sahihfolio.test",
    role: "admin",
  };
}
