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

export const resultSnapshotOutputSchema = z.union([
  // Array of matches (as created in find-options route: output: matches)
  z.array(z.record(z.string(), z.unknown())),
  // Object structure (e.g. { matches: [...], ... })
  z
    .object({
      matches: z.array(z.record(z.string(), z.unknown())).optional(),
    })
    .passthrough(),
]);

export type ResultSnapshotOutput = z.infer<typeof resultSnapshotOutputSchema>;
