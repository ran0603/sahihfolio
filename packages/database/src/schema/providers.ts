import {
  marketSchema,
  assetTypeSchema,
  feeSchema,
  accountRequirementSchema,
  sourceSchema,
} from "@sahihfolio/shared/provider-data";
import {
  pgTable,
  text,
  timestamp,
  jsonb,
  integer,
  index,
  uuid,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "./users";
import { ProviderType } from "@sahihfolio/shared";

export const reviewStatusEnum = pgEnum("review_status", [
  "draft",
  "needs_review",
  "reviewed",
]);

export const providers = pgTable(
  "providers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    type: text("type").$type<ProviderType>().notNull(),

    countries: jsonb("countries").$type<string[]>().notNull().default([]),

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
    pros: jsonb("pros").$type<string[]>().notNull().default([]),
    cons: jsonb("cons").$type<string[]>().notNull().default([]),

    websiteUrl: text("website_url"),
    disclosureUrl: text("disclosure_url").notNull(),
    isAffiliated: boolean("is_affiliated").notNull().default(false),

    status: text("status").notNull().default("draft"),
    lastReviewedAt: timestamp("last_reviewed_at", {
      withTimezone: true,
    }).notNull(),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("draft"),
    reviewedBy: uuid("reviewed_by").references(() => user.id),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    reviewWindowDays: integer("review_window_days").notNull().default(180),
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
