import { eq } from "drizzle-orm";
import { db } from "@sahihfolio/database";
import { countries } from "@sahihfolio/database/schema";
import type { CountryProfile } from "@sahihfolio/shared";

export async function getCountry(countryCode: string): Promise<CountryProfile> {
  const [country] = await db
    .select()
    .from(countries)
    .where(eq(countries.code, countryCode))
    .limit(1);

  if (!country) {
    throw new Error("Country not found.");
  }

  return {
    countryCode: country.code,
    name: country.name,
    currency: country.currency,
    regulatoryNotes: country.regulatoryNotes,
    restrictions: country.restrictions,
    supportedProviders: [], // Or query providers table if needed
    sourceUrls: country.regulatoryNotes.map((n) => n.source.url),
    lastReviewedAt: country.lastReviewedAt,
  };
}
