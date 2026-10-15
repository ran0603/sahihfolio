import { pgTable, varchar, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const screeningReports = pgTable("screening_reports", {
  id: varchar("id", { length: 50 }).primaryKey(),
  ticker: varchar("ticker", { length: 15 }).notNull(),
  companyName: varchar("company_name", { length: 200 }).notNull(),
  exchange: varchar("exchange", { length: 50 }).notNull(),
  assetType: varchar("asset_type", { length: 20 }).default("stock").notNull(),
  country: varchar("country", { length: 50 }).notNull(),
  sector: varchar("sector", { length: 100 }).notNull(),
  screeningResult: varchar("screening_result", { length: 50 }).notNull(), // screened_compliant, etc.
  methodology: varchar("methodology", { length: 50 }).notNull(), // AAOIFI, etc.
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  summaryExplanation: text("summary_explanation").notNull(),
  businessActivity: jsonb("business_activity")
    .$type<{
      status: "pass" | "fail" | "requires_purification" | "under_review";
      impermissibleRevenueRatio: number;
      thresholdRatio: number;
      details: string;
    }>()
    .notNull(),
  financialRatios: jsonb("financial_ratios")
    .$type<{
      status: "pass" | "fail" | "under_review";
      debtToMarketCapRatio?: number;
      liquidAssetsRatio?: number;
      interestIncomeRatio?: number;
      thresholds: Record<string, number>;
      details: string;
    }>()
    .notNull(),
  sources: jsonb("sources")
    .$type<
      Array<{
        label: string;
        url: string;
        sourceType: string;
        retrievedAt: string;
      }>
    >()
    .default([])
    .notNull(),
  reviewedBy: varchar("reviewed_by", { length: 100 }),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  disclaimer: text("disclaimer").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ScreeningReportRow = typeof screeningReports.$inferSelect;
export type NewScreeningReportRow = typeof screeningReports.$inferInsert;
