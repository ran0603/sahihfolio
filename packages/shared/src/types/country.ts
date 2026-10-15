export interface CountryProfile {
  countryCode: string;
  name: string;
  currency: string;
  regulatoryNotes: string[];
  supportedProviders: string[];
  restrictions: string[];
  lastReviewedAt: string | Date;
  sourceUrls: string[];
}
