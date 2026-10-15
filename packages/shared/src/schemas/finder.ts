import { z } from "zod";
import { INVESTOR_TYPES, ASSET_TYPES } from "../constants/providers";

export const finderIntakeSchema = z.object({
  countryCode: z.string().min(2).max(2).toUpperCase(),
  investorType: z.enum(INVESTOR_TYPES).default("beginner"),
  productInterest: z.enum([...ASSET_TYPES, "all", "unsure"]).default("all"),
  startingAmount: z.number().nonnegative().optional(),
  recurringContribution: z.number().nonnegative().optional(),
  preferences: z
    .object({
      islamicAccountRequired: z.boolean().default(false),
      localCurrencyPreferred: z.boolean().default(false),
      screeningToolIntegrated: z.boolean().default(false),
    })
    .default({}),
});

export type FinderIntakeInput = z.infer<typeof finderIntakeSchema>;
