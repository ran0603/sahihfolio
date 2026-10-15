import { marketSchema, assetTypeSchema, feeSchema, accountRequirementSchema, sourceSchema } from "@sahihfolio/shared/provider-data";
import { pgTable, varchar, text, timestamp, jsonb, boolean, index, uuid } from "drizzle-orm/pg-core";

export const providers = pgTable(
  "providers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    type: text("type").notNull(),

    countries: jsonb("countries")
      .$type<string[]>()
      .notNull()
      .default([]),

    markets: jsonb("markets")
      .$type<(typeof marketSchema._output)[]>()
      .notNull()
      .default([]),

    assetTypes: jsonb("asset_types")
      .$type<(typeof assetTypeSchema._output)[]>()
      .notNull()
      .default([]),

    fees: jsonb("fees")
      .$type<(typeof feeSchema._output)[]>()
      .notNull()
      .default([]),

    accountRequirements: jsonb("account_requirements")
      .$type<(typeof accountRequirementSchema._output)[]>()
      .notNull()
      .default([]),

    halalScreening: jsonb("halal_screening")
      .$type<{
        supported: boolean;
        methodology?: string;
        notes?: string;
        source?: (typeof sourceSchema)["_output"];
        sourceUrl?: string;
      }>()
      .notNull(),

    minimumInvestment: text("minimum_investment"),
    pros: jsonb("pros")
      .$type<string[]>()
      .notNull()
      .default([]),
    cons: jsonb("cons")
      .$type<string[]>()
      .notNull()
      .default([]),

    disclosureUrl: text("disclosure_url").notNull(),

    status: text("status").notNull().default("draft"),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("providers_countries_idx").on(table.countries),
    index("providers_type_idx").on(table.type),
    index("providers_status_idx").on(table.status),
  ],
);

export type ProviderRow = typeof providers.$inferSelect;
export type NewProviderRow = typeof providers.$inferInsert;
