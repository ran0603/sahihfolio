import {
  regulatoryNoteSchema,
  restrictionSchema,
} from "@sahihfolio/shared/provider-data";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  jsonb,
  index,
  uuid,
} from "drizzle-orm/pg-core";

export const countries = pgTable(
  "countries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull().unique(),
    name: text("name").notNull(),
    currency: text("currency").notNull(),

    regulatoryNotes: jsonb("regulatory_notes")
      .$type<(typeof regulatoryNoteSchema._output)[]>()
      .notNull()
      .default([]),

    restrictions: jsonb("restrictions")
      .$type<(typeof restrictionSchema._output)[]>()
      .notNull()
      .default([]),

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
  (table) => [index("countries_code_idx").on(table.code)],
);

export type CountryRow = typeof countries.$inferSelect;
export type NewCountryRow = typeof countries.$inferInsert;
