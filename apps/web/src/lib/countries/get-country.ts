import { eq } from "drizzle-orm";
import { db } from "@sahihfolio/database";
import {
  auditLogs,
  countries,
  providers,
  user,
} from "@sahihfolio/database/schema";
import type {
  AuditLog,
  CountryProfile,
  Provider,
  User,
} from "@sahihfolio/shared";

export async function getCountry(countryCode: string): Promise<CountryProfile> {
  const [country] = await db
    .select()
    .from(countries)
    .where(eq(countries.code, countryCode))
    .limit(1);

  if (!country) {
    throw new Error("Country not found.");
  }

  const supportedProviders = await db
    .select()
    .from(providers)
    .where(eq(providers.countries, [countryCode]));

  const auditHistory = await db
    .select()
    .from(auditLogs)
    .where(eq(auditLogs.entityId, country.id))
    .innerJoin(user, eq(user.id, auditLogs.actorId));

  return {
    ...country,
    providers: supportedProviders as unknown as Provider[],
    history: auditHistory as unknown as (AuditLog & User)[],
  };
}
