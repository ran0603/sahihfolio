import type { Provider } from "../types";

export type ProductInterest = "stocks" | "etfs" | "managed" | "unsure";

export type MatchInput = {
  countryCode: string;
  productInterest: ProductInterest;
  preferences: {
    halalScreeningRequired: boolean;
    localCurrencyPreferred: boolean;
    islamicAccountPreferred: boolean;
  };
};

export type MatchResult = {
  provider: Provider;
  score: number;
  reasons: string[];
};

export type MatchExclusion = {
  providerId: string;
  reason: string;
};

export type MatchOutput = {
  matches: MatchResult[];
  exclusions: MatchExclusion[];
};