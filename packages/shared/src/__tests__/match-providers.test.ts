import { describe, expect, it } from "vitest";

import { matchProviders } from "../matching/match-providers";
import type { MatchInput } from "../matching/types";
import type { CountryProfile, Provider } from "../types";

const malaysia: CountryProfile = {
  countryCode: "MY",
  name: "Malaysia",
  currency: "MYR",
  regulatoryNotes: [],
  supportedProviders: [],
  restrictions: [],
  lastReviewedAt: new Date("2026-10-01T00:00:00Z"),
  sourceUrls: ["https://example.com/my"],
};

function makeProvider(overrides: Partial<Provider> = {}): Provider {
  return {
    id: "provider_1",
    name: "Example Broker",
    slug: "example-broker",
    type: "broker",
    countries: ["MY"],
    markets: [
      {
        code: "US",
        name: "United States",
        notes:
          "NYSE-listed Shariah-compliant ETFs, including SPUS, SPSK, SPRE, SPTE, and SPWO.",
        access: "direct",
      },
    ],
    assetTypes: ["stocks", "etfs"],
    halalScreening: {
      supported: true,
      methodology: "AAOIFI-aligned",
      sourceUrl: "https://example.com/screening",
    },
    fees: [
      {
        kind: "management",
        label: "ETF expense ratio",
        value: "0.45% to 0.55% per year, depending on the ETF",
        source: {
          id: "source_1",
          sourceType: "official",
          retrievedAt: new Date(),
          confidence: "high",
          label: "source_1",
          url: "https://example.com/source_1",
        },
        currency: "USD",
        frequency: "per_year",
        conditions:
          "Verify the current expense ratio for each fund. Brokerage commissions, FX conversion, bid-ask spreads, and other trading costs also apply.",
      },
    ],
    accountRequirements: [],
    pros: [],
    cons: [],
    websiteUrl: "https://example.com",
    disclosureUrl: "https://example.com/disclosure",
    isAffiliated: false,
    lastReviewedAt: new Date("2026-10-01T00:00:00Z"),
    status: "published",
    ...overrides,
  };
}

const baseInput: MatchInput = {
  countryCode: "MY",
  productInterest: "etfs",
  preferences: {
    halalScreeningRequired: false,
    localCurrencyPreferred: false,
    islamicAccountPreferred: false,
  },
};

describe("matchProviders", () => {
  it("excludes providers unavailable in the selected country", () => {
    const output = matchProviders(
      baseInput,
      [makeProvider({ countries: ["SG"] })],
      malaysia,
    );

    expect(output.matches).toHaveLength(0);
    expect(output.exclusions[0]?.reason).toContain("Not available");
  });

  it("excludes draft and archived providers", () => {
    const output = matchProviders(
      baseInput,
      [
        makeProvider({ id: "draft", status: "draft" }),
        makeProvider({ id: "archived", status: "archived" }),
      ],
      malaysia,
    );

    expect(output.matches).toHaveLength(0);
  });

  it("filters by ETF interest", () => {
    const output = matchProviders(
      baseInput,
      [
        makeProvider({ id: "etf", assetTypes: ["etfs"] }),
        makeProvider({ id: "stock_only", assetTypes: ["stocks"] }),
      ],
      malaysia,
    );

    expect(output.matches.map((match) => match.provider.id)).toEqual(["etf"]);
  });

  it("includes all published providers for unsure product interest", () => {
    const output = matchProviders(
      { ...baseInput, productInterest: "unsure" },
      [
        makeProvider({ id: "broker" }),
        makeProvider({ id: "managed", type: "managed_portfolio" }),
      ],
      malaysia,
    );

    expect(output.matches).toHaveLength(2);
  });

  it("excludes providers without screening when required", () => {
    const output = matchProviders(
      {
        ...baseInput,
        preferences: {
          ...baseInput.preferences,
          halalScreeningRequired: true,
        },
      },
      [
        makeProvider({ id: "screened" }),
        makeProvider({
          id: "unscreened",
          halalScreening: { supported: false },
        }),
      ],
      malaysia,
    );

    expect(output.matches.map((match) => match.provider.id)).toEqual([
      "screened",
    ]);
  });

  it("excludes providers without Islamic accounts when required", () => {
    const output = matchProviders(
      {
        ...baseInput,
        preferences: {
          ...baseInput.preferences,
          islamicAccountPreferred: true,
        },
      },
      [
        makeProvider({
          id: "islamic",
          accountRequirements: [
            {
              requirement: "Islamic account available",
              category: "brokerage",
              mandatory: true,
              notes: "islamic account available",
              source: {
                id: "source_1",
                label: "source_1",
                url: "https://example.com/source_1",
                sourceType: "official",
                retrievedAt: new Date("2026-10-01T00:00:00Z"),
                confidence: "high",
              },
            },
          ],
        }),
        makeProvider({
          id: "standard",
          accountRequirements: [
            {
              requirement: "Standard brokerage account",
              category: "brokerage",
              mandatory: true,
              notes: "standard account",
              source: {
                id: "source_2",
                label: "source_2",
                url: "https://example.com/source_2",
                sourceType: "official",
                retrievedAt: new Date("2026-10-01T00:00:00Z"),
                confidence: "high",
              },
            },
          ],
        }),
      ],
      malaysia,
    );

    expect(output.matches.map((match) => match.provider.id)).toEqual([
      "islamic",
    ]);
  });

  it("ranks screening-supported and fee-transparent providers higher", () => {
    const output = matchProviders(
      baseInput,
      [
        makeProvider({
          id: "lower",
          halalScreening: { supported: false },
          fees: [],
        }),
        makeProvider({ id: "higher" }),
      ],
      malaysia,
    );

    expect(output.matches[0]?.provider.id).toBe("higher");
    expect(output.matches[0]?.score).toBeGreaterThan(
      output.matches[1]?.score ?? 0,
    );
  });

  it("returns deterministic results for identical inputs", () => {
    const providers = [
      makeProvider({ id: "a", name: "Alpha" }),
      makeProvider({ id: "b", name: "Beta" }),
    ];

    const first = matchProviders(baseInput, providers, malaysia);
    const second = matchProviders(baseInput, providers, malaysia);

    expect(first).toEqual(second);
  });

  it("returns human-readable inclusion reasons", () => {
    const output = matchProviders(baseInput, [makeProvider()], malaysia);

    expect(output.matches[0]?.reasons).toEqual(
      expect.arrayContaining([
        "Available to Malaysia-based investors",
        "Supports ETF investing",
        "Provides Shariah-screening information",
      ]),
    );
  });
});
