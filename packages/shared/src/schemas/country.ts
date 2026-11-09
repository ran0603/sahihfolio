import { z } from "zod";
import { sourceSchema } from "./source";

export const regulatoryNoteSchema = z.object({
  category: z.enum([
    "licensing",
    "investor_protection",
    "tax",
    "reporting",
    "cross_border",
    "other",
  ]),
  summary: z.string().trim().min(1, "Enter a regulatory note summary"),
  appliesTo: z.array(z.string().trim().min(1)).default([]),
  source: sourceSchema,
  detail: z.string().trim().optional(),
});

export type RegulatoryNote = z.infer<typeof regulatoryNoteSchema>;

export const restrictionSchema = z.object({
  type: z.enum([
    "residency",
    "citizenship",
    "age",
    "sanctions",
    "product",
    "market",
    "currency",
    "tax",
    "brokerage",
    "other",
  ]),
  summary: z.string().min(1),
  severity: z.enum(["blocking", "conditional", "informational"]),
  appliesTo: z.array(z.string()).default([]),
  source: sourceSchema,
});

export type Restriction = z.infer<typeof restrictionSchema>;

export const countryInputSchema = z.object({
  code: z
    .string()
    .trim()
    .length(2, "Use a two-letter ISO 3166-1 alpha-2 country code")
    .transform((value) => value.toUpperCase()),

  name: z
    .string()
    .trim()
    .min(2, "Country name is required")
    .max(120, "Country name is too long"),

  currency: z
    .string()
    .trim()
    .length(3, "Use a three-letter currency code")
    .transform((value) => value.toUpperCase()),

  regulatoryNotes: z.array(regulatoryNoteSchema).max(30).default([]),

  restrictions: z.array(restrictionSchema).max(30).default([]),

  sourceUrls: z
    .array(z.string().trim().url("Enter a valid source URL"))
    .min(1, "Add at least one source URL"),

  lastReviewedAt: z.coerce.date({
    message: "Enter the date this country profile was reviewed",
  }),

  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type CountryInput = z.infer<typeof countryInputSchema>;

export const archiveCountrySchema = z.object({
  id: z.string().uuid(),
  reason: z.string().trim().max(500).optional(),
});

export type ArchiveCountryInput = z.infer<typeof archiveCountrySchema>;
