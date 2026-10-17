import { eq } from "drizzle-orm";
import { db } from "@sahihfolio/database";
import {
  providers,
  providerSources,
  sources,
} from "@sahihfolio/database/schema";
import type { ProviderWithSources } from "./types";

export async function getProviderWithSources(
  providerId: string,
): Promise<ProviderWithSources> {
  const [provider] = await db
    .select({
      id: providers.id,
      status: providers.status,
      reviewedBy: providers.reviewedBy,
      reviewedAt: providers.reviewedAt,
    })
    .from(providers)
    .where(eq(providers.id, providerId))
    .limit(1);

  if (!provider) {
    throw new Error("Provider not found.");
  }

  const providerSourceRows = await db
    .select({
      id: sources.id,
      label: sources.label,
      url: sources.url,
      sourceType: sources.sourceType,
      retrievedAt: sources.retrievedAt,
      confidence: providerSources.confidence,
    })
    .from(providerSources)
    .innerJoin(sources, eq(providerSources.sourceId, sources.id))
    .where(eq(providerSources.providerId, providerId));

  return {
    id: provider.id,
    status: provider.status as "draft" | "published" | "archived",
    reviewedBy: provider.reviewedBy,
    reviewedAt: provider.reviewedAt,
    sources: providerSourceRows,
  };
}
