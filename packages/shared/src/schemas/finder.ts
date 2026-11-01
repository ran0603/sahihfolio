import { z } from "zod";
import { INVESTOR_TYPES, ASSET_TYPES } from "../constants/providers";

export const finderIntakeSchema = z.object({
  countryCode: z
    .string()
    .length(2, "Select your country of residence.")
    .transform((value) => value.toUpperCase()),

  investorType: z
    .enum(INVESTOR_TYPES, {
      message: "Select your investor type.",
    })
    .default("beginner"),

  productInterest: z
    .enum([...ASSET_TYPES, "all", "unsure"], {
      message: "Select the type of investment you are interested in.",
    })
    .default("all"),

  startingAmount: z
    .number()
    .nonnegative("Starting amount cannot be negative.")
    .max(100_000_000)
    .optional(),

  recurringContribution: z
    .number()
    .nonnegative("Recurring contribution cannot be negative.")
    .max(1_000_000)
    .optional(),

  preferences: z
    .object({
      halalScreeningRequired: z.boolean().default(false),
      islamicAccountPreferred: z.boolean().default(false),
      localCurrencyPreferred: z.boolean().default(false),
      shariahMethodology: z.string().min(1).optional(),
    })
    .default({
      halalScreeningRequired: false,
      islamicAccountPreferred: false,
      localCurrencyPreferred: false,
    }),
});

export type FinderIntakeInput = z.infer<typeof finderIntakeSchema>;
