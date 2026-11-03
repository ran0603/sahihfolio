import { Source } from "../constants";
import type { ProviderType, AssetType } from "../constants/providers";

export interface ProviderFees {
  kind:
    | "trading"
    | "management"
    | "platform"
    | "fx"
    | "custody"
    | "withdrawal"
    | "deposit"
    | "inactivity"
    | "other";
  label: string;
  value: string;
  currency?: string;
  frequency: "per_trade" | "per_year" | "per_month" | "one_time" | "variable";
  conditions?: string;
  source: Source;
}

export interface Market {
  code: string;
  name: string;
  access: "direct" | "indirect" | "unavailable";
  notes?: string;
  source?: Source;
}

export interface HalalScreeningInfo {
  supported: boolean;
  methodology?: string;
  notes?: string;
  source?: Source;
  sourceUrl?: string;
}

export interface AccountRequirements {
  requirement: string;
  category:
    | "identity"
    | "residency"
    | "tax"
    | "banking"
    | "brokerage"
    | "minimum_deposit"
    | "documentation"
    | "other";
  mandatory: boolean;
  notes?: string;
  source: Source;
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  type: ProviderType;
  countries: string[];
  markets: Market[];
  assetTypes: AssetType[];
  halalScreening: HalalScreeningInfo;
  fees: ProviderFees[];
  minimumInvestment?: string;
  accountRequirements: AccountRequirements[];
  pros: string[];
  cons: string[];
  websiteUrl?: string;
  disclosureUrl: string;
  isAffiliate?: boolean;
  lastReviewedAt: string | Date;
  status: "published" | "draft" | "archived";
}
