import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const resultSnapshots = pgTable("result_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicId: text("public_id").notNull().unique(),
  input: jsonb("input").notNull(),
  output: jsonb("output").notNull(),
  dataVersion: text("data_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
