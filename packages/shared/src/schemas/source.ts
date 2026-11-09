import { z } from "zod";
import { SOURCE_TYPES } from "../constants";

export const sourceTypeSchema = z.enum(SOURCE_TYPES);

export const confidenceLevelSchema = z.enum(["high", "medium", "low"]);

export const sourceSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(1),
  url: z.string().url(),
  sourceType: sourceTypeSchema,
  retrievedAt: z.coerce.date(),
  confidence: confidenceLevelSchema.optional(),
});

export const providerReviewSchema = z.object({
  reviewedBy: z.string().uuid(),
  reviewedAt: z.coerce.date(),
  confidence: z.enum(["high", "medium", "low"]),
});

export type SourceInput = z.infer<typeof sourceSchema>;
