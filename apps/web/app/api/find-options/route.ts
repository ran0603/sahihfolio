import { NextRequest, NextResponse } from "next/server";
import { finderIntakeSchema } from "@sahihfolio/shared";
import { createResultSnapshot } from "@/lib/finder/result-snapshot";
import { getTemporaryMatches } from "@/lib/finder/temporary-matches";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const rate = await checkRateLimit({
    key: "find-options",
    identifier:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "anonymous",
    limit: 10,
    windowSeconds: 60,
  });

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = finderIntakeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const intake = parsed.data;
  const matches = await getTemporaryMatches(intake);
  const snapshot = await createResultSnapshot({
    input: intake,
    output: matches,
  });

  return NextResponse.json({
    resultId: snapshot.publicId,
    country: snapshot.country,
    matches,
    disclaimer:
      "Informational only. Not investment, tax, legal, accounting, or Shariah advice.",
  });
}
