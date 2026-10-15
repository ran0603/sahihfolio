// packages/shared/src/review/get-review-state.test.ts
import { describe, expect, it } from "vitest";
import { getReviewState } from "./get-review-state";

describe("getReviewState", () => {
  const now = new Date("2026-10-16T00:00:00Z");

  it("returns unreviewed when there is no review date", () => {
    expect(getReviewState(null, 90, now)).toBe("unreviewed");
  });

  it("returns current within the review window", () => {
    expect(
      getReviewState(new Date("2026-09-01T00:00:00Z"), 90, now),
    ).toBe("current");
  });

  it("returns needs_review after the review window", () => {
    expect(
      getReviewState(new Date("2026-06-01T00:00:00Z"), 90, now),
    ).toBe("needs_review");
  });
});