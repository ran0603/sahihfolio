import { NextResponse } from "next/server";
import { db } from "@sahihfolio/database";
import { countries } from "@sahihfolio/database/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select({
      code: countries.code,
      name: countries.name,
      currency: countries.currency,
      lastReviewedAt: countries.lastReviewedAt,
    })
    .from(countries)
    .where(eq(countries.status, "published"))
    .orderBy(asc(countries.name));

  return NextResponse.json(
    { countries: rows },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    },
  );
}
