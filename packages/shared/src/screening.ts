// packages/shared/src/screening.ts
export const SCREENING_RESULTS = [
  "screened_compliant",
  "screened_non_compliant",
  "methodology_dependent",
  "insufficient_data",
  "under_review",
  "archived",
] as const;

export type ScreeningResult = (typeof SCREENING_RESULTS)[number];