import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey(),
  email: text("email").unique().notNull(),
  role: text("role", {
    enum: ["admin", "editor", "viewer"],
  })
    .notNull()
    .default("viewer"),
  status: text("status", {
    enum: ["invited", "active"],
  })
    .notNull()
    .default("invited"),
  invitedBy: uuid("invited_by").references((): AnyPgColumn => adminUsers.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const adminUsersRelations = relations(adminUsers, ({ one, many }) => ({
  invitedByUser: one(adminUsers, {
    fields: [adminUsers.invitedBy],
    references: [adminUsers.id],
    relationName: "admin_invitations",
  }),
  invitedUsers: many(adminUsers, {
    relationName: "admin_invitations",
  }),
}));

export type AdminUserRow = InferSelectModel<typeof adminUsers>;
export type NewAdminUser = InferInsertModel<typeof adminUsers>;
