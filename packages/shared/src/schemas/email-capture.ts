import { z } from "zod";
import { ASSET_TYPES } from "../constants";

export const emailCaptureSchema = z.object({
  email: z.string().email("Invalid email address"),
  resultSnapshotId: z.string().uuid().optional(),
  countryCode: z.string().length(2).optional(),
  productInterest: z
    .enum([...ASSET_TYPES, "all", "unsure", "unset"])
    .default("unset"),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: "Consent is required" }),
  source: z
    .enum(["finder", "screening_report", "footer", "other"])
    .default("finder"),
});

export type EmailCaptureInput = z.infer<typeof emailCaptureSchema>;
