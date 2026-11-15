import { z } from "zod";
import {
  SCREENING_RESULTS,
  METHODOLOGIES,
  REPORT_STATUSES,
} from "../constants/screening";
import { sourceSchema } from "./source";

export const screeningQuerySchema = z.object({
  q: z.string().min(1).max(50),
  methodology: z.enum(METHODOLOGIES).optional(),
});

export type ScreeningQueryInput = z.infer<typeof screeningQuerySchema>;

export const createScreeningReportSchema = z.object({
  ticker: z.string().min(1).max(10).toUpperCase(),
  companyName: z.string().min(1).max(150),
  exchange: z.string().min(1).max(20),
  assetType: z.enum(["stock", "etf"]),
  country: z.string().min(2).max(50),
  sector: z.string().min(2).max(100),
  screeningResult: z.enum(SCREENING_RESULTS),
  methodology: z.enum(METHODOLOGIES),
  status: z.enum(REPORT_STATUSES).default("draft"),
  summaryExplanation: z.string().min(10),
  businessActivity: z.object({
    status: z.enum(["pass", "fail", "requires_purification", "under_review"]),
    impermissibleRevenueRatio: z.number().min(0).max(1),
    thresholdRatio: z.number().min(0).max(1),
    details: z.string(),
  }),
  financialRatios: z.object({
    status: z.enum(["pass", "fail", "under_review"]),
    debtToMarketCapRatio: z.number().optional(),
    liquidAssetsRatio: z.number().optional(),
    interestIncomeRatio: z.number().optional(),
    thresholds: z.record(z.number()),
    details: z.string(),
  }),
  sources: z.array(sourceSchema),
  reviewedBy: z.string().optional(),
});

export type CreateScreeningReportInput = z.infer<
  typeof createScreeningReportSchema
>;
