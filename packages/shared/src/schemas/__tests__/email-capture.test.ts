import { describe, it, expect } from "vitest";
import { emailCaptureSchema } from "../email-capture";

describe("emailCaptureSchema", () => {
  it("parses a valid payload with all fields", () => {
    const result = emailCaptureSchema.safeParse({
      email: "user@example.com",
      resultSnapshotId: "123e4567-e89b-12d3-a456-426614174000",
      consent: true,
      productInterest: "all",
      countryCode: "MY",
      source: "finder",
      unsubscribeToken: "123e4567-e89b-12d3-a456-426614174789",
    });
    expect(result.success).toBe(true);
  });

  it("defaults source to 'finder' when not provided", () => {
    const result = emailCaptureSchema.safeParse({
      email: "user@example.com",
      consent: true,
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.source).toBe("finder");
  });

  it("accepts an email without optional fields", () => {
    const result = emailCaptureSchema.safeParse({
      email: "minimal@test.org",
      consent: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.resultSnapshotId).toBeUndefined();
    }
  });

  it("rejects an invalid email address", () => {
    const result = emailCaptureSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = emailCaptureSchema.safeParse({ source: "finder" });
    expect(result.success).toBe(false);
  });

  it("rejects countryCode shorter than 2 characters", () => {
    const result = emailCaptureSchema.safeParse({
      email: "user@example.com",
      countryCode: "U",
    });
    expect(result.success).toBe(false);
  });

  it("rejects countryCode longer than 2 characters", () => {
    const result = emailCaptureSchema.safeParse({
      email: "user@example.com",
      countryCode: "USA",
    });
    expect(result.success).toBe(false);
  });
});
