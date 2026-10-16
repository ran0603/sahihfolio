import type {
  ScreeningResult,
  Methodology,
  ReportStatus,
} from "../constants/screening";

export interface SourceReference {
  label: string;
  url: string;
  sourceType:
    "annual_report" | "regulatory_filing" | "scholarly_fatwa" | "data_vendor";
  retrievedAt: string;
}

export interface BusinessActivityAssessment {
  status: "pass" | "fail" | "requires_purification" | "under_review";
  impermissibleRevenueRatio: number; // e.g. 0.02 (2%)
  thresholdRatio: number; // usually 0.05 (5%)
  details: string;
}

export interface FinancialRatioAssessment {
  status: "pass" | "fail" | "under_review";
  debtToMarketCapRatio?: number;
  liquidAssetsRatio?: number;
  interestIncomeRatio?: number;
  thresholds: Record<string, number>;
  details: string;
}

export interface ScreeningReport {
  id: string;
  ticker: string;
  companyName: string;
  exchange: string;
  assetType: "stock" | "etf";
  country: string;
  sector: string;
  screeningResult: ScreeningResult;
  methodology: Methodology;
  status: ReportStatus;
  summaryExplanation: string;
  businessActivity: BusinessActivityAssessment;
  financialRatios: FinancialRatioAssessment;
  sources: SourceReference[];
  reviewedBy?: string;
  reviewedAt: string | Date;
  expiresAt: string | Date;
  disclaimer: string;
}
