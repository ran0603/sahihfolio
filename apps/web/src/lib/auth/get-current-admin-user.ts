import { headers } from "next/headers";
import { auth } from "./index";

export type AdminRole = "admin" | "editor" | "viewer";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: AdminRole;
};

const ROLE_VALUES: AdminRole[] = ["admin", "editor", "viewer"];

function parseRole(value: unknown): AdminRole | null {
  return typeof value === "string" && ROLE_VALUES.includes(value as AdminRole)
    ? (value as AdminRole)
    : null;
}

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  const role = parseRole(session.user.role);

  if (!role) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image ?? undefined,
    role,
  };
}
