import { eq } from "drizzle-orm";
import { db } from "@sahihfolio/database";
import { providers } from "@sahihfolio/database/schema";
import type { Provider } from "@sahihfolio/shared";

export async function getProvidersByCountry(
  country: string,
): Promise<Provider[]> {
  const providerRows = await db
    .select()
    .from(providers)
    .where(eq(providers.countries, [country]));

  return providerRows as unknown as Provider[];
}
