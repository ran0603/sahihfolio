import z from "zod";

export const adminUserSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
  status: z.enum(["invited", "active"]).default("invited"),
  invitedBy: z.string().uuid().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type CreateAdminUser = z.infer<typeof adminUserSchema>;
