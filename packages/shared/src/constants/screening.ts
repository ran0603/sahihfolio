export const SCREENING_RESULTS = [
  "screened_compliant",
  "screened_non_compliant",
  "methodology_dependent",
  "insufficient_data",
  "under_review",
  "archived",
] as const;

export type ScreeningResult = (typeof SCREENING_RESULTS)[number];

export const METHODOLOGIES = [
  "AAOIFI",
  "MSCI_ISLAMIC",
  "S_AND_P_SHARIAH",
  "DJIM",
  "FTSE_SHARIAH",
  "CUSTOM_SCHOLARLY",
] as const;

export type Methodology = (typeof METHODOLOGIES)[number];

export const REPORT_STATUSES = [
  "draft",
  "in_review",
  "published",
  "stale",
  "archived",
] as const;

export type ReportStatus = (typeof REPORT_STATUSES)[number];
