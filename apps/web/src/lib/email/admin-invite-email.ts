export type AdminSignInEmailInput = {
  signInUrl: string;
  expiresInMinutes?: number;
};

const C = {
  navy: "#0B1F3A",
  slate: "#2D4B73",
  emerald: "#10B981",
  bg: "#F7F9FC",
  surface: "#FFFFFF",
  border: "#E4E7EC",
  text: "#101828",
  muted: "#667085",
  warn: "#DC6803",
};

const FONT =
  "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function adminSignInEmail({
  signInUrl,
  expiresInMinutes = 5,
}: AdminSignInEmailInput) {
  const subject = "Your Sahihfolio Admin sign-in link";
  const mins = `${expiresInMinutes} ${expiresInMinutes === 1 ? "minute" : "minutes"}`;
  const preheader = `Use this one-time link to sign in. It expires in ${mins}.`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:100%;max-width:480px;">

        <!-- Header -->
        <tr><td style="background:${C.navy};border-radius:16px 16px 0 0;padding:20px 28px;font-family:${FONT};">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="background:${C.emerald};border-radius:8px;width:32px;height:32px;text-align:center;font-family:${FONT};font-size:14px;font-weight:800;color:${C.navy};">Sf</td>
                <td style="padding-left:10px;font-family:${FONT};font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FFFFFF;">Sahihfolio</td>
              </tr></table>
            </td>
            <td align="right" style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.08em;color:#FFFFFF;">
              <span style="display:inline-block;border:1px solid rgba(255,255,255,0.35);border-radius:6px;padding:4px 8px;">ADMIN</span>
            </td>
          </tr></table>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:${C.surface};border:1px solid ${C.border};border-top:0;border-radius:0 0 16px 16px;padding:32px 28px;font-family:${FONT};">

          <h1 style="margin:0 0 8px;font-size:24px;line-height:32px;font-weight:700;letter-spacing:-0.01em;color:${C.text};">Sign in to Admin</h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:${C.muted};">Use the button below to sign in. The link works once and expires in <strong style="color:${C.text};">${mins}</strong>.</p>

          <!-- Button -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr>
            <td style="background:${C.emerald};border-radius:10px;">
              <a href="${signInUrl}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:16px;line-height:20px;font-weight:600;color:${C.navy};text-decoration:none;">Sign in to Admin</a>
            </td>
          </tr></table>

          <!-- Fallback link -->
          <p style="margin:0 0 4px;font-size:13px;line-height:20px;color:${C.muted};">Button not working? Copy this address into your browser:</p>
          <p style="margin:0 0 28px;font-size:13px;line-height:20px;word-break:break-all;"><a href="${signInUrl}" style="color:${C.slate};text-decoration:underline;">${signInUrl}</a></p>

          <!-- Safety note -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};border:1px solid ${C.border};border-left:4px solid ${C.warn};border-radius:12px;">
            <tr><td style="padding:14px 16px;font-family:${FONT};font-size:14px;line-height:21px;color:${C.text};">
              <strong>Didn’t request this?</strong> You can ignore this email. Nothing happens unless the link is opened. Don’t forward it: anyone with the link can sign in as you.
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 12px 8px;text-align:center;font-family:${FONT};font-size:12px;line-height:18px;color:${C.muted};">
          Sahihfolio internal tool. Sign-ins are logged.<br>
          This is a security email, so there is no unsubscribe link.
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "Sign in to Sahihfolio Admin",
    "",
    "Use this one-time link to sign in:",
    signInUrl,
    "",
    `This link works once and expires in ${mins}.`,
    "",
    "Didn't request this? You can ignore this email. Nothing happens unless the link is opened.",
    "Don't forward it: anyone with the link can sign in as you.",
    "",
    "Sahihfolio internal tool. Sign-ins are logged.",
  ].join("\n");

  return { subject, html, text };
}
