import { z } from "zod";
import { sourceSchema } from "./schemas/source";

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
    "trustee",
    "administration",
    "sales",
    "performance",
    "switching",
    "transfer",
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
    "managed_portfolio",
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
