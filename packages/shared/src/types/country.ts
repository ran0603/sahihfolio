import { Source } from "../constants";
import { AuditLog } from "./audit";
import { Provider } from "./provider";
import { User } from "./user";

interface RegulatoryNote {
  category:
    | "licensing"
    | "investor_protection"
    | "tax"
    | "reporting"
    | "cross_border"
    | "other";
  summary: string;
  appliesTo: string[];
  source: {
    id: string;
    label: string;
    url: string;
    sourceType:
      "other" | "regulator" | "provider" | "news" | "research" | "official";
    retrievedAt: Date;
    confidence?: "high" | "medium" | "low" | undefined;
  };
  detail?: string | undefined;
}

interface Restriction {
  type:
    | "residency"
    | "citizenship"
    | "age"
    | "sanctions"
    | "product"
    | "market"
    | "currency"
    | "tax"
    | "brokerage"
    | "other";
  summary: string;
  severity: "blocking" | "conditional" | "informational";
  appliesTo: string[];
  source: Source;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  currency: string;
  regulatoryNotes: RegulatoryNote[];
  restrictions: Restriction[];
  sourceUrls: string[];
  status: string;
  lastReviewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CountryProfile extends Country {
  providers: Provider[];
  history: (AuditLog & { user: User })[];
}
