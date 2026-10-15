import { eq } from "drizzle-orm";
import { db } from "@sahihfolio/database";
import { providers } from "@sahihfolio/database/schema";
import type { ProviderWithSources } from "./types";

export class ProviderPublishError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProviderPublishError";
  }
}

export function assertPublishable(provider: ProviderWithSources): void {
  if (provider.sources.length === 0) {
    throw new ProviderPublishError(
      "A provider cannot be published without at least one source.",
    );
  }

  if (!provider.reviewedAt || !provider.reviewedBy) {
    throw new ProviderPublishError(
      "A provider cannot be published without reviewer and review date.",
    );
  }
}

export async function publishProvider(providerId: string): Promise<void> {
  await db
    .update(providers)
    .set({
      status: "published",
    })
    .where(eq(providers.id, providerId));
}