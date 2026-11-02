import {
  regulatoryNoteSchema,
  restrictionSchema,
} from "@sahihfolio/shared/provider-data";

export interface CountryProfile {
  countryCode: string;
  name: string;
  currency: string;
  regulatoryNotes: (typeof regulatoryNoteSchema._output)[];
  supportedProviders: string[];
  restrictions: (typeof restrictionSchema._output)[];
  lastReviewedAt: string | Date;
  sourceUrls: string[];
}
