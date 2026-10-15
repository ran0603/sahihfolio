import { z } from "zod";

export const sourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  sourceType: z.enum([
    "official",
    "regulator",
    "provider_document",
    "news",
    "research",
    "other",
  ]),
  retrievedAt: z.coerce.date(),
});

export const providerReviewSchema = z.object({
  reviewedBy: z.string().uuid(),
  reviewedAt: z.coerce.date(),
  confidence: z.enum(["high", "medium", "low"]),
});