import { AssetType } from "../constants";
import type { Provider } from "../types";

export type ProductInterest = AssetType | "unsure" | "all";

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
