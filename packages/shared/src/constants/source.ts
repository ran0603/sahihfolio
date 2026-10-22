export const SOURCE_TYPES = [
  "official",
  "regulator",
  "provider_document",
  "annual_report",
  "exchange_filing",
  "news",
  "research",
  "other",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

export const CONFIDENCE_LEVELS = ["high", "medium", "low"] as const;

export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];

export type Source = {
  id: string;
  label: string;
  url: string;
  sourceType: SourceType;
  retrievedAt: Date;
  confidence?: ConfidenceLevel;
};
