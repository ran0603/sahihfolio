import { redirect } from "next/navigation";
import {
  AdminUser,
  getCurrentAdminUser,
  type AdminRole,
} from "./get-current-admin-user";

const ROLE_RANK: Record<AdminRole, number> = {
  viewer: 1,
  editor: 2,
  admin: 3,
};

export async function requireAdminRole(
  minimumRole: AdminRole = "viewer",
): Promise<AdminUser> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  if (ROLE_RANK[user.role] < ROLE_RANK[minimumRole]) {
    redirect("/admin/sign-in?error=unauthorized");
  }

  return user;
}

export async function requireAdmin(): Promise<AdminUser> {
  return requireAdminRole("admin");
}

export async function requireEditor(): Promise<AdminUser> {
  return requireAdminRole("editor");
}
