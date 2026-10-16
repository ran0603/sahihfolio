import { describe, it, expect } from "vitest";
import {
  screeningQuerySchema,
  createScreeningReportSchema,
} from "../screening";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const validReport = {
  ticker: "aapl",
  companyName: "Apple Inc.",
  exchange: "NASDAQ",
  assetType: "stock" as const,
  country: "United States",
  sector: "Technology",
  screeningResult: "screened_compliant" as const,
  methodology: "AAOIFI" as const,
  summaryExplanation: "This company passes all Islamic screening criteria.",
  businessActivity: {
    status: "pass" as const,
    impermissibleRevenueRatio: 0.01,
    thresholdRatio: 0.05,
    details: "Core business is halal.",
  },
  financialRatios: {
    status: "pass" as const,
    debtToMarketCapRatio: 0.1,
    thresholds: { debt: 0.33 },
    details: "Financial ratios are within permissible limits.",
  },
  sources: [
    {
      label: "Apple Annual Report 2023",
      url: "https://investor.apple.com/annual-reports",
      sourceType: "annual_report" as const,
      retrievedAt: "2024-01-01",
    },
  ],
};

// ---------------------------------------------------------------------------
// screeningQuerySchema
// ---------------------------------------------------------------------------

describe("screeningQuerySchema", () => {
  it("parses a valid query with methodology", () => {
    const result = screeningQuerySchema.safeParse({
      q: "AAPL",
      methodology: "AAOIFI",
    });
    expect(result.success).toBe(true);
  });

  it("parses a query without optional methodology", () => {
    const result = screeningQuerySchema.safeParse({ q: "TSLA" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.methodology).toBeUndefined();
  });

  it("rejects an empty q string", () => {
    const result = screeningQuerySchema.safeParse({ q: "" });
    expect(result.success).toBe(false);
  });

  it("rejects q that exceeds 50 characters", () => {
    const result = screeningQuerySchema.safeParse({ q: "A".repeat(51) });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid methodology value", () => {
    const result = screeningQuerySchema.safeParse({
      q: "AAPL",
      methodology: "FAKE_METHOD",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when q is missing", () => {
    const result = screeningQuerySchema.safeParse({ methodology: "AAOIFI" });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// createScreeningReportSchema
// ---------------------------------------------------------------------------

describe("createScreeningReportSchema", () => {
  it("parses a valid report and uppercases ticker", () => {
    const result = createScreeningReportSchema.safeParse(validReport);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.ticker).toBe("AAPL");
  });

  it("defaults status to 'draft' when not provided", () => {
    const result = createScreeningReportSchema.safeParse(validReport);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.status).toBe("draft");
  });

  it("accepts an explicit status value", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      status: "published",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.status).toBe("published");
  });

  it("accepts an optional reviewedBy field", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      reviewedBy: "scholar@example.com",
    });
    expect(result.success).toBe(true);
    if (result.success)
      expect(result.data.reviewedBy).toBe("scholar@example.com");
  });

  it("rejects ticker longer than 10 characters", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      ticker: "TOOLONGTICKERCODE",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty companyName", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      companyName: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid assetType", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      assetType: "crypto",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid screeningResult", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      screeningResult: "approved",
    });
    expect(result.success).toBe(false);
  });

  it("rejects summaryExplanation shorter than 10 characters", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      summaryExplanation: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects impermissibleRevenueRatio outside [0, 1]", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      businessActivity: {
        ...validReport.businessActivity,
        impermissibleRevenueRatio: 1.5,
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects a source with an invalid URL", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      sources: [{ ...validReport.sources[0], url: "not-a-url" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a source with an invalid sourceType", () => {
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      sources: [{ ...validReport.sources[0], sourceType: "wikipedia" }],
    });
    expect(result.success).toBe(false);
  });

  it("accepts multiple sources", () => {
    const extraSource = {
      label: "AAOIFI Standard",
      url: "https://aaoifi.com/standard",
      sourceType: "scholarly_fatwa" as const,
      retrievedAt: "2024-02-01",
    };
    const result = createScreeningReportSchema.safeParse({
      ...validReport,
      sources: [...validReport.sources, extraSource],
    });
    expect(result.success).toBe(true);
  });
});
