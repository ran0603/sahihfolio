import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { createEmailCapture } from "@/lib/results/create-email-capture";
import { resultEmailCaptureSchema } from "@sahihfolio/shared";

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

  const parsed = resultEmailCaptureSchema.safeParse(body);

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

  const emailCapture = await createEmailCapture({
    source: "finder",
    email: intake.email,
    consent: true,
    productInterest: intake.productInterest,
    resultSnapshotId: intake.resultSnapshotId,
    countryCode: intake.countryCode,
  });

  return NextResponse.json({ emailCapture });
};
