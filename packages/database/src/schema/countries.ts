import { pgTable, varchar, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  code: varchar("code", { length: 2 }).primaryKey(), // ISO 3166-1 alpha-2, e.g. "US"
  name: varchar("name", { length: 100 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(), // ISO 4217, e.g. "USD"
  region: varchar("region", { length: 50 }).notNull(),
  regulatoryNotes: jsonb("regulatory_notes").$type<string[]>().default([]).notNull(),
  supportedProviders: jsonb("supported_providers").$type<string[]>().default([]).notNull(),
  restrictions: jsonb("restrictions").$type<string[]>().default([]).notNull(),
  sourceUrls: jsonb("source_urls").$type<string[]>().default([]).notNull(),
  lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CountryRow = typeof countries.$inferSelect;
export type NewCountryRow = typeof countries.$inferInsert;
