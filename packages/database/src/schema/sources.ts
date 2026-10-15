import { pgEnum, pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

export const sourceTypeEnum = pgEnum("source_type", [
  "official",
  "regulator",
  "provider_document",
  "news",
  "research",
  "other",
]);

export const confidenceEnum = pgEnum("confidence", [
  "high",
  "medium",
  "low",
]);

export const sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  sourceType: sourceTypeEnum("source_type").notNull().default("official"),
  retrievedAt: timestamp("retrieved_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

