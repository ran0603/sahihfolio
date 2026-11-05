import { describe, it, expect } from "vitest";
import {
  resultEmailCaptureSchema,
  generalEmailCaptureSchema,
} from "../email-capture";

describe("resultEmailCaptureSchema", () => {
  it("parses a valid payload with all fields", () => {
    const result = resultEmailCaptureSchema.safeParse({
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
    const result = resultEmailCaptureSchema.safeParse({
      email: "user@example.com",
      consent: true,
      resultSnapshotId: "123e4567-e89b-42d3-a456-426614174000",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.source).toBe("finder");
      expect(result.data.resultSnapshotId).toBe(
        "123e4567-e89b-42d3-a456-426614174000",
      );
    }
  });

  it("requires a result snapshot for finder email captures", () => {
    const result = resultEmailCaptureSchema.safeParse({
      email: "user@example.com",
      consent: true,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes("resultSnapshotId") &&
            issue.message === "A valid result snapshot is required",
        ),
      );
    }
  });

  it("rejects an invalid email address", () => {
    const result = resultEmailCaptureSchema.safeParse({
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = resultEmailCaptureSchema.safeParse({ source: "finder" });
    expect(result.success).toBe(false);
  });

  it("rejects countryCode shorter than 2 characters", () => {
    const result = resultEmailCaptureSchema.safeParse({
      email: "user@example.com",
      countryCode: "U",
    });
    expect(result.success).toBe(false);
  });

  it("rejects countryCode longer than 2 characters", () => {
    const result = resultEmailCaptureSchema.safeParse({
      email: "user@example.com",
      countryCode: "USA",
    });
    expect(result.success).toBe(false);
  });
});

describe("generalEmailCaptureSchema", () => {
  it("parses a valid payload with all fields", () => {
    const result = generalEmailCaptureSchema.safeParse({
      email: "user@example.com",
      consent: true,
      source: "screening_report",
    });
    expect(result.success).toBe(true);
  });

  it("defaults source to 'other' when not provided", () => {
    const result = generalEmailCaptureSchema.safeParse({
      email: "user@example.com",
      consent: true,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.source).toBe("other");
    }
  });

  it("accepts an email without optional fields for a non-finder source", () => {
    const result = generalEmailCaptureSchema.safeParse({
      email: "minimal@test.org",
      consent: true,
      source: "footer",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.source).toBe("footer");
    }
  });

  it("rejects an invalid email address", () => {
    const result = generalEmailCaptureSchema.safeParse({
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = generalEmailCaptureSchema.safeParse({ source: "finder" });
    expect(result.success).toBe(false);
  });

  it("rejects countryCode shorter than 2 characters", () => {
    const result = generalEmailCaptureSchema.safeParse({
      email: "user@example.com",
      countryCode: "U",
    });
    expect(result.success).toBe(false);
  });

  it("rejects countryCode longer than 2 characters", () => {
    const result = generalEmailCaptureSchema.safeParse({
      email: "user@example.com",
      countryCode: "USA",
    });
    expect(result.success).toBe(false);
  });
});
