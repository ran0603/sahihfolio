import React from "react";
import { requireAdminRole } from "src/lib/auth/require-admin-role";
import "./admin.css";
import AdminShell from "./admin-shell";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminRole("viewer");
  return <AdminShell user={user}>{children}</AdminShell>;
}
