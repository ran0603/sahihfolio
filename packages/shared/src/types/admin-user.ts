export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "invited" | "active";
  invitedBy?: string | null;
  createdAt: string;
}
