import type { FinderIntakeInput } from "@sahihfolio/shared";

export type TemporaryMatch = {
  providerId: string;
  name: string;
  type: string;
  score: number;
  reasons: string[];
  fees: Record<string, string>;
  sources: string[];
  lastReviewedAt: string;
};

export async function getTemporaryMatches(
  intake: FinderIntakeInput,
): Promise<TemporaryMatch[]> {
  // Placeholder until Issue #11 implements matchProviders().
  // This keeps /find and /results/[publicId] independently testable.
  return [
    {
      providerId: "placeholder-provider",
      name: "Example Provider",
      type: "broker",
      score: 50,
      reasons: [
        `Available to investors based in ${intake.countryCode}`,
        `Supports ${intake.productInterest} investing`,
      ],
      fees: {},
      sources: [],
      lastReviewedAt: new Date().toISOString(),
    },
  ];
}
