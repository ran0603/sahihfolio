import { randomUUID } from "crypto";
import { db } from "@sahihfolio/database";
import { emailCaptures } from "@sahihfolio/database/schema";
import { ResultEmailCaptureInput } from "@sahihfolio/shared";
import { sendResultSavedEmail } from "../email/send-result-saved-email";

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
    .returning({
      email: emailCaptures.email,
      resultSnapshotId: emailCaptures.resultSnapshotId,
      unsubscribeToken: emailCaptures.unsubscribeToken,
    });

  await sendResultSavedEmail({
    to: capture.email,
    resultPublicId: input.resultSnapshotId,
    unsubscribeToken: capture.unsubscribeToken,
  });

  return capture;
}
