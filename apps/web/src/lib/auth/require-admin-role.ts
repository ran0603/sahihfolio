import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "./get-current-admin-user.js";

export type AdminRole = "admin" | "editor" | "viewer";

export type AdminUser = {
  id: string;
  email: string;
  role: AdminRole;
};

const roleRank: Record<AdminRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
};

export async function requireAdminRole(
  allowedRoles: AdminRole[],
): Promise<AdminUser> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!allowedRoles.includes(user.role)) {
    throw new Error("You do not have permission to perform this action.");
  }

  return user;
}
