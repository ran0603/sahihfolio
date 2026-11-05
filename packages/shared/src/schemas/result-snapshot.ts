import { z } from "zod";

export const resultSnapshotOutputSchema = z
  .object({
    matches: z.array(z.record(z.string(), z.unknown())).default([]),
    exclusions: z.array(z.record(z.string(), z.unknown())).default([]),
  })
  .passthrough();

export type ResultSnapshotOutput = z.infer<typeof resultSnapshotOutputSchema>;
