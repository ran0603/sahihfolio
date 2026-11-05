import { randomUUID } from "crypto";
import { db } from "@sahihfolio/database";
import { emailCaptures } from "@sahihfolio/database/schema";
import { ResultEmailCaptureInput } from "@sahihfolio/shared";

export async function createEmailCapture(input: ResultEmailCaptureInput) {
  const [capture] = await db
    .insert(emailCaptures)
    .values({
      email: input.email,
      resultSnapshotId: input.resultSnapshotId,
      countryCode: input.countryCode,
      productInterest: input.productInterest,
      consent: input.consent,
      source: input.source,
      unsubscribeToken: randomUUID(),
    })
    .returning();

  return capture;
}
