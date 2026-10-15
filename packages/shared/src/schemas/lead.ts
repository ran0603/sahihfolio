import { z } from "zod";

export const emailCaptureSchema = z.object({
  email: z.string().email(),
  countryCode: z.string().min(2).max(2).optional(),
  source: z.string().default("finder"),
  metadata: z.record(z.unknown()).optional(),
});

export type EmailCaptureInput = z.infer<typeof emailCaptureSchema>;
