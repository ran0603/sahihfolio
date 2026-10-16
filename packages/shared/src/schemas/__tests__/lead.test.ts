import { describe, it, expect } from "vitest";
import { emailCaptureSchema } from "../lead";

describe("emailCaptureSchema", () => {
  it("parses a valid payload with all fields", () => {
    const result = emailCaptureSchema.safeParse({
      email: "user@example.com",
      countryCode: "MY",
      source: "landing_page",
      metadata: { campaign: "ramadan2024" },
    });
    expect(result.success).toBe(true);
  });

  it("defaults source to 'finder' when not provided", () => {
    const result = emailCaptureSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.source).toBe("finder");
  });

  it("accepts an email without optional fields", () => {
    const result = emailCaptureSchema.safeParse({ email: "minimal@test.org" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.countryCode).toBeUndefined();
      expect(result.data.metadata).toBeUndefined();
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

  it("accepts arbitrary metadata record", () => {
    const result = emailCaptureSchema.safeParse({
      email: "user@example.com",
      metadata: { nested: { value: 42 }, flag: true, label: "test" },
    });
    expect(result.success).toBe(true);
  });
});
