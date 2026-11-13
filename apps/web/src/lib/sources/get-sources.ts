import { db, sources } from "@sahihfolio/database";
import { Source } from "@sahihfolio/shared";

export async function getSources(): Promise<Source[]> {
  const source = await db.select().from(sources);

  return source as unknown as Source[];
}
