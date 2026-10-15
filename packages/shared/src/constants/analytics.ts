export const ANALYTICS_EVENTS = {
  FINDER_STARTED: "finder_started",
  FINDER_COMPLETED: "finder_completed",
  PROVIDER_CARD_VIEWED: "provider_card_viewed",
  PROVIDER_DISCLOSURE_CLICKED: "provider_disclosure_clicked",
  PROVIDER_VISIT_CLICKED: "provider_visit_clicked",
  SCREENING_SEARCH: "screening_search",
  SCREENING_REPORT_VIEWED: "screening_report_viewed",
  SCREENING_METHODOLOGY_EXPANDED: "screening_methodology_expanded",
  EMAIL_CAPTURED: "email_captured",
  REPORT_SHARED: "report_shared",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
