import { eq, sql } from "drizzle-orm";
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

export async function getCountry(idOrCode: string): Promise<CountryProfile> {
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      idOrCode,
    );

  const [country] = await db
    .select()
    .from(countries)
    .where(isUuid ? eq(countries.id, idOrCode) : eq(countries.code, idOrCode.toUpperCase()))
    .limit(1);

  if (!country) {
    throw new Error("Country not found.");
  }

  const supportedProviders = await db
    .select()
    .from(providers)
    .where(sql`${providers.countries} @> to_jsonb(${country.code}::text)`);

  const auditHistory = await db
    .select({
      id: auditLogs.id,
      actorId: auditLogs.actorId,
      action: auditLogs.action,
      entityType: auditLogs.entityType,
      entityId: auditLogs.entityId,
      changedFields: auditLogs.changedFields,
      createdAt: auditLogs.createdAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
    .from(auditLogs)
    .where(eq(auditLogs.entityId, country.id))
    .leftJoin(user, eq(user.id, auditLogs.actorId));

  return {
    ...country,
    providers: supportedProviders as unknown as Provider[],
    history: auditHistory as unknown as (AuditLog & User)[],
  };
}

export async function findCountry(idOrCode: string): Promise<CountryProfile | null> {
  try {
    return await getCountry(idOrCode);
  } catch {
    return null;
  }
}
