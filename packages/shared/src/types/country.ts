import { RegulatoryNote, Restriction } from "../schemas";
import { Provider } from "./provider";

export interface CountryProfile {
  countryCode: string;
  name: string;
  currency: string;
  regulatoryNotes: RegulatoryNote[];
  supportedProviders: Provider[];
  restrictions: Restriction[];
  lastReviewedAt: string | Date;
  sourceUrls: string[];
}
