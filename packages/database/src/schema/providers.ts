import { pgTable, varchar, text, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

export const providers = pgTable("providers", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 150 }).unique().notNull(),
  type: varchar("type", { length: 50 }).notNull(), // broker, robo_advisor, managed_portfolio, etf_provider
  countries: jsonb("countries").$type<string[]>().default([]).notNull(),
  markets: jsonb("markets").$type<string[]>().default([]).notNull(),
  assetTypes: jsonb("asset_types").$type<string[]>().default([]).notNull(),
  halalScreening: jsonb("halal_screening")
    .$type<{
      supported: boolean;
      methodology?: string;
      notes?: string;
      sourceUrl?: string;
    }>()
    .notNull(),
  fees: jsonb("fees")
    .$type<{
      trading?: string;
      management?: string;
      fx?: string;
      custody?: string;
      withdrawal?: string;
      other?: string;
    }>()
    .notNull(),
  minimumInvestment: varchar("minimum_investment", { length: 100 }),
  accountRequirements: jsonb("account_requirements").$type<string[]>().default([]).notNull(),
  pros: jsonb("pros").$type<string[]>().default([]).notNull(),
  cons: jsonb("cons").$type<string[]>().default([]).notNull(),
  websiteUrl: text("website_url").notNull(),
  disclosureUrl: text("disclosure_url").notNull(),
  affiliateUrl: text("affiliate_url"),
  status: varchar("status", { length: 20 }).default("published").notNull(),
  lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ProviderRow = typeof providers.$inferSelect;
export type NewProviderRow = typeof providers.$inferInsert;
