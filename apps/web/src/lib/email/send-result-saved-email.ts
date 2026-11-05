import { Resend } from "resend";
import { resultSavedEmail } from "./result-saved-email";

const resend = new Resend(process.env.RESEND_API_KEY);

type ResultSavedEmailInput = {
  to: string;
  resultPublicId: string;
  unsubscribeToken: string;
};

export async function sendResultSavedEmail({
  to,
  resultPublicId,
  unsubscribeToken,
}: ResultSavedEmailInput) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const resultUrl = `${appUrl}/results/${resultPublicId}`;
  const unsubscribeUrl = `${appUrl}/api/unsubscribe/${unsubscribeToken}`;

  const { subject, html, text } = resultSavedEmail({
    resultUrl,
    unsubscribeUrl,
  });

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
    text,
  });

  if (error) throw error;

  return { success: true };
}
