import { describe, it, expect } from "vitest";
import { finderIntakeSchema } from "../finder";

describe("finderIntakeSchema", () => {
  it("parses a minimal valid intake with defaults applied", () => {
    const result = finderIntakeSchema.safeParse({ countryCode: "MY" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.countryCode).toBe("MY");
      expect(result.data.investorType).toBe("beginner");
      expect(result.data.productInterest).toBe("all");
      expect(result.data.preferences.halalScreeningRequired).toBe(false);
      expect(result.data.preferences.islamicAccountPreferred).toBe(false);
      expect(result.data.preferences.localCurrencyPreferred).toBe(false);
      expect(result.data.preferences.shariahMethodology).toBeUndefined();
    }
  });

  it("uppercases countryCode", () => {
    const result = finderIntakeSchema.safeParse({ countryCode: "us" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.countryCode).toBe("US");
  });

  it("parses all optional fields when provided", () => {
    const result = finderIntakeSchema.safeParse({
      countryCode: "AE",
      investorType: "self_directed",
      productInterest: "etfs",
      startingAmount: 5000,
      recurringContribution: 200,
      preferences: {
        islamicAccountRequired: true,
        localCurrencyPreferred: true,
        screeningToolIntegrated: true,
      },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.investorType).toBe("self_directed");
      expect(result.data.productInterest).toBe("etfs");
      expect(result.data.startingAmount).toBe(5000);
      expect(result.data.recurringContribution).toBe(200);
    }
  });

  it("accepts productInterest 'all' and 'unsure'", () => {
    for (const v of ["all", "unsure"]) {
      const result = finderIntakeSchema.safeParse({
        countryCode: "GB",
        productInterest: v,
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects a countryCode that is not exactly 2 characters", () => {
    const tooShort = finderIntakeSchema.safeParse({ countryCode: "U" });
    const tooLong = finderIntakeSchema.safeParse({ countryCode: "USA" });
    expect(tooShort.success).toBe(false);
    expect(tooLong.success).toBe(false);
  });

  it("rejects missing countryCode", () => {
    const result = finderIntakeSchema.safeParse({ investorType: "beginner" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid investorType", () => {
    const result = finderIntakeSchema.safeParse({
      countryCode: "SG",
      investorType: "expert",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid productInterest", () => {
    const result = finderIntakeSchema.safeParse({
      countryCode: "SG",
      productInterest: "managed_funds",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative startingAmount", () => {
    const result = finderIntakeSchema.safeParse({
      countryCode: "SG",
      startingAmount: -100,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative recurringContribution", () => {
    const result = finderIntakeSchema.safeParse({
      countryCode: "SG",
      recurringContribution: -50,
    });
    expect(result.success).toBe(false);
  });
});
