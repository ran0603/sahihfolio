import type { ProviderType, AssetType } from "../constants/providers";

export interface ProviderFees {
  trading?: string;
  management?: string;
  fx?: string;
  custody?: string;
  withdrawal?: string;
  other?: string;
}

export interface HalalScreeningInfo {
  supported: boolean;
  methodology?: string;
  notes?: string;
  sourceUrl?: string;
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  type: ProviderType;
  countries: string[];
  markets: string[];
  assetTypes: AssetType[];
  halalScreening: HalalScreeningInfo;
  fees: ProviderFees;
  minimumInvestment?: string;
  accountRequirements: string[];
  pros: string[];
  cons: string[];
  websiteUrl: string;
  disclosureUrl: string;
  affiliateUrl?: string;
  lastReviewedAt: string | Date;
  status: "published" | "draft" | "archived";
}
