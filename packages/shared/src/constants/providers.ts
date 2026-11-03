export const PROVIDER_TYPES = [
  "broker",
  "robo_advisor",
  "managed_portfolio",
  "etf_provider",
] as const;

export type ProviderType = (typeof PROVIDER_TYPES)[number];

export const ASSET_TYPES = [
  "stocks",
  "etfs",
  "sukuk",
  "real_estate",
  "gold",
  "mutual_funds",
  "crypto",
] as const;

export type AssetType = (typeof ASSET_TYPES)[number];

export const INVESTOR_TYPES = [
  "beginner",
  "self_directed",
  "long_term_saver",
] as const;

export type InvestorType = (typeof INVESTOR_TYPES)[number];
