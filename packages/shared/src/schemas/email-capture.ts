import { z } from "zod";
import { ASSET_TYPES } from "../constants";

const sourceEnum = z.enum(["screening_report", "footer", "other", "finder"]);

export const resultEmailCaptureSchema = z.object({
  email: z.string().email("Invalid email address"),
  resultSnapshotId: z.string().uuid("A valid result snapshot is required"),
  countryCode: z.string().length(2).optional(),
  productInterest: z
    .enum([...ASSET_TYPES, "all", "unsure", "unset"])
    .default("unset"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  source: sourceEnum.default("finder"),
});

export const generalEmailCaptureSchema = z.object({
  email: z.string().email("Invalid email address"),
  countryCode: z.string().length(2).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  source: z.enum(["screening_report", "footer", "other"]).default("other"),
});

export type ResultEmailCaptureInput = z.infer<typeof resultEmailCaptureSchema>;
export type GeneralEmailCaptureInput = z.infer<
  typeof generalEmailCaptureSchema
>;
