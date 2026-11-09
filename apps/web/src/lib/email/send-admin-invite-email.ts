import { Resend } from "resend";
import { adminSignInEmail } from "./admin-invite-email";

type SendAdminInviteEmailInput = {
  to: string;
  signInUrl: string;
};

export async function sendAdminInviteEmail({
  to,
  signInUrl,
}: SendAdminInviteEmailInput): Promise<void> {
  const from = process.env.ADMIN_EMAIL_FROM;

  if (!from) {
    throw new Error("ADMIN_EMAIL_FROM is not configured.");
  }

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "test") {
      return;
    }
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { subject, html, text } = adminSignInEmail({
    signInUrl,
    expiresInMinutes: 5,
  });
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error("Failed to send admin sign-in email.", {
      cause: error,
    });
  }
}
