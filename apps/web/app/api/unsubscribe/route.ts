import { NextRequest, NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@sahihfolio/database";
import { emailCaptures } from "@sahihfolio/database";
import { unsubscribeSchema } from "@sahihfolio/shared";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = unsubscribeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid unsubscribe request.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const [updated] = await db
    .update(emailCaptures)
    .set({ unsubscribedAt: new Date() })
    .where(
      and(
        eq(emailCaptures.unsubscribeToken, parsed.data.token),
        isNull(emailCaptures.unsubscribedAt),
      ),
    )
    .returning({ id: emailCaptures.id });

  if (!updated) {
    return NextResponse.json(
      { error: "This unsubscribe link is invalid or has already been used." },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true });
}
