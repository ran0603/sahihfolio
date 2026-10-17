import { z } from "zod";

export const sourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  sourceType: z.enum([
    "official",
    "regulator",
    "provider",
    "news",
    "research",
    "other",
  ]),
  retrievedAt: z.string().datetime(),
  confidence: z.enum(["high", "medium", "low"]).default("medium"),
});

export const regulatoryNoteSchema = z.object({
  category: z.enum([
    "licensing",
    "investor_protection",
    "tax",
    "reporting",
    "cross_border",
    "other",
  ]),
  summary: z.string().min(1),
  detail: z.string().optional(),
  appliesTo: z.array(z.string()).default([]), // e.g. ["retail", "non_resident"]
  source: sourceSchema,
});

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

export const feeSchema = z.object({
  kind: z.enum([
    "trading",
    "management",
    "platform",
    "fx",
    "custody",
    "withdrawal",
    "deposit",
    "inactivity",
    "other",
  ]),
  label: z.string().min(1),
  value: z.string().min(1), // Keep as string: "0.1%", "USD 1", "Free"
  currency: z.string().length(3).optional(),
  frequency: z.enum([
    "per_trade",
    "per_year",
    "per_month",
    "one_time",
    "variable",
  ]),
  conditions: z.string().optional(),
  source: sourceSchema,
});

export const marketSchema = z.object({
  code: z.string().min(1), // "US", "GB", "MY"
  name: z.string().min(1),
  access: z.enum(["direct", "indirect", "unavailable"]),
  notes: z.string().optional(),
  source: sourceSchema.optional(),
});

export const assetTypeSchema = z.object({
  type: z.enum([
    "stocks",
    "etfs",
    "mutual_funds",
    "sukuk",
    "managed_portfolios",
    "crypto",
    "reits",
    "other",
  ]),
  supported: z.boolean(),
  notes: z.string().optional(),
  source: sourceSchema.optional(),
});

export const accountRequirementSchema = z.object({
  requirement: z.string().min(1),
  category: z.enum([
    "identity",
    "residency",
    "tax",
    "banking",
    "brokerage",
    "minimum_deposit",
    "documentation",
    "other",
  ]),
  mandatory: z.boolean().default(true),
  notes: z.string().optional(),
  source: sourceSchema,
});
