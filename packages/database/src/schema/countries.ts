import { RegulatoryNote, Restriction } from "@sahihfolio/shared";
import {
  pgTable,
  text,
  timestamp,
  jsonb,
  index,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const countries = pgTable(
  "countries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull().unique(),
    name: text("name").notNull(),
    currency: text("currency").notNull(),

    regulatoryNotes: jsonb("regulatory_notes")
      .$type<RegulatoryNote[]>()
      .notNull()
      .default([]),

    restrictions: jsonb("restrictions")
      .$type<Restriction[]>()
      .notNull()
      .default([]),

    sourceUrls: jsonb("source_urls").$type<string[]>().notNull().default([]),

    status: text("status").notNull().default("draft"),
    lastReviewedAt: timestamp("last_reviewed_at", {
      withTimezone: true,
    }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("countries_code_unique").on(table.code),
    index("countries_status_idx").on(table.status),
    index("countries_name_idx").on(table.name),
  ],
);

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;
