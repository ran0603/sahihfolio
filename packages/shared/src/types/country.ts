import {
  regulatoryNoteSchema,
  restrictionSchema,
} from "@sahihfolio/shared/provider-data";
import { Provider } from "./provider";

export interface CountryProfile {
  countryCode: string;
  name: string;
  currency: string;
  regulatoryNotes: (typeof regulatoryNoteSchema._output)[];
  supportedProviders: Provider[];
  restrictions: (typeof restrictionSchema._output)[];
  lastReviewedAt: string | Date;
  sourceUrls: string[];
}
