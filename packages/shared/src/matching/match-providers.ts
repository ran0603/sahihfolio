import type { CountryProfile, Provider } from "../types";

import type {
  MatchExclusion,
  MatchInput,
  MatchOutput,
  MatchResult,
  ProductInterest,
} from "./types";

const PRODUCT_TYPE_BY_INTEREST: Record<
  Exclude<ProductInterest, "unsure">,
  Provider["type"]
> = {
  stocks: "broker",
  etfs: "broker",
  managed: "managed_portfolio",
};

const SCORE_WEIGHTS = {
  halalScreening: 30,
  feeTransparency: 20,
  marketCoverage: 20,
  localCurrency: 15,
  beginnerSuitability: 15,
} as const;

function isPublishedAndAvailable(
  provider: Provider,
  countryCode: string,
): boolean {
  return (
    provider.status === "published" && provider.countries.includes(countryCode)
  );
}

function supportsProductInterest(
  provider: Provider,
  productInterest: ProductInterest,
): boolean {
  if (productInterest === "unsure") {
    return true;
  }

  if (productInterest === "stocks") {
    return provider.assetTypes.includes("stocks");
  }

  if (productInterest === "etfs") {
    return provider.assetTypes.includes("etfs");
  }

  return provider.type === PRODUCT_TYPE_BY_INTEREST.managed;
}

function hasFeeTransparency(provider: Provider): boolean {
  return (provider.fees ?? []).length > 0;
}

function hasBeginnerSuitability(provider: Provider): boolean {
  return provider.pros.some((pro) => pro.toLowerCase().includes("beginner"));
}

function supportsIslamicAccount(provider: Provider): boolean {
  return provider.accountRequirements.some((accountRequirement) =>
    accountRequirement.requirement.toLowerCase().includes("islamic"),
  );
}

function buildReasons(
  provider: Provider,
  input: MatchInput,
  country: CountryProfile,
): string[] {
  const reasons: string[] = [`Available to ${country.name}-based investors`];

  switch (input.productInterest) {
    case "stocks":
      reasons.push("Supports stock investing");
      break;
    case "etfs":
      reasons.push("Supports ETF investing");
      break;
    case "managed":
      reasons.push("Offers a managed portfolio route");
      break;
    case "unsure":
      reasons.push("Supports at least one relevant investing route");
      break;
  }

  if (provider.halalScreening.supported) {
    reasons.push("Provides Shariah-screening information");
  }

  if (
    input.preferences.localCurrencyPreferred &&
    provider.countries.includes(input.countryCode)
  ) {
    reasons.push(
      `Supports investors in ${country.name}, where the local currency is ${country.currency}`,
    );
  }

  if (hasFeeTransparency(provider)) {
    reasons.push("Publishes fee information");
  }

  if (hasBeginnerSuitability(provider)) {
    reasons.push("Includes beginner-suitable features or guidance");
  }

  return reasons;
}

export function matchProviders(
  input: MatchInput,
  providers: Provider[],
  country: CountryProfile,
): MatchOutput {
  const matches: MatchResult[] = [];
  const exclusions: MatchExclusion[] = [];

  for (const provider of providers) {
    if (!isPublishedAndAvailable(provider, input.countryCode)) {
      exclusions.push({
        providerId: provider.id,
        reason: `Not available to investors in ${input.countryCode}`,
      });
      continue;
    }

    if (!supportsProductInterest(provider, input.productInterest)) {
      exclusions.push({
        providerId: provider.id,
        reason: `Does not support the selected product interest: ${input.productInterest}`,
      });
      continue;
    }

    if (
      input.preferences.halalScreeningRequired &&
      !provider.halalScreening.supported
    ) {
      exclusions.push({
        providerId: provider.id,
        reason: "Does not provide Shariah-screening information",
      });
      continue;
    }

    if (
      input.preferences.islamicAccountPreferred &&
      !supportsIslamicAccount(provider)
    ) {
      exclusions.push({
        providerId: provider.id,
        reason: "Does not explicitly offer an Islamic account option",
      });
      continue;
    }

    let score = 0;

    if (provider.halalScreening.supported) {
      score += SCORE_WEIGHTS.halalScreening;
    }

    if (hasFeeTransparency(provider)) {
      score += SCORE_WEIGHTS.feeTransparency;
    }

    if (provider.markets.length > 0) {
      score += SCORE_WEIGHTS.marketCoverage;
    }

    if (
      input.preferences.localCurrencyPreferred &&
      provider.countries.includes(input.countryCode)
    ) {
      score += SCORE_WEIGHTS.localCurrency;
    }

    if (hasBeginnerSuitability(provider)) {
      score += SCORE_WEIGHTS.beginnerSuitability;
    }

    matches.push({
      provider,
      score,
      reasons: buildReasons(provider, input, country),
    });
  }

  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return a.provider.name.localeCompare(b.provider.name);
  });

  return { matches, exclusions };
}
