export type ReviewState = "unreviewed" | "needs_review" | "current";

export function getReviewState(
  reviewedAt: Date | string | null,
  reviewWindowDays: number,
  now: Date = new Date(),
): ReviewState {
  if (!reviewedAt) {
    return "unreviewed";
  }

  const reviewedDate =
    typeof reviewedAt === "string" ? new Date(reviewedAt) : reviewedAt;

  if (Number.isNaN(reviewedDate.getTime())) {
    return "unreviewed";
  }

  const staleCutoff = new Date(now);
  staleCutoff.setDate(staleCutoff.getDate() - reviewWindowDays);

  return reviewedDate < staleCutoff ? "needs_review" : "current";
}