import { z } from "zod";

export const temporaryMatchSchema = z
  .object({
    providerId: z.string(),
    name: z.string(),
    type: z.string(),
    score: z.number(),
    reasons: z.array(z.string()),
    fees: z.record(z.string(), z.string()).optional().default({}),
    sources: z.array(z.string()).optional().default([]),
    lastReviewedAt: z.string().optional(),
  })
  .passthrough();

export const resultSnapshotOutputSchema = z
  .object({
    matches: z.array(z.record(z.string(), z.unknown())).default([]),
    exclusions: z.array(z.record(z.string(), z.unknown())).default([]),
  })
  .passthrough();

export type ResultSnapshotOutput = z.infer<typeof resultSnapshotOutputSchema>;
