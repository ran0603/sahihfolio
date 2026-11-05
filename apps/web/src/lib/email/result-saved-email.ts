export type ResultSavedEmailInput = {
  resultUrl: string;
  unsubscribeUrl: string;
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
};

const FONT =
  "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const CHECKLIST: [string, string][] = [
  [
    "Residency eligibility",
    "Confirm the provider accepts residents of your country.",
  ],
  [
    "Account type and markets",
    "Check which account types and markets are available to you.",
  ],
  [
    "Fees",
    "Compare trading, currency-conversion, custody and withdrawal fees.",
  ],
  [
    "Shariah-screening information",
    "Confirm the provider’s methodology is still current.",
  ],
];

export function resultSavedEmail({
  resultUrl,
  unsubscribeUrl,
}: ResultSavedEmailInput) {
  const subject = "Your Sahihfolio investing options";
  const preheader =
    "Your saved comparison is ready, plus four checks to do before you open an account.";

  const checklistRows = CHECKLIST.map(
    ([title, body]) => `
      <tr>
        <td valign="top" width="28" style="padding:10px 0;">
          <div style="width:20px;height:20px;border:1.5px solid ${C.slate};border-radius:6px;font-size:0;line-height:0;">&nbsp;</div>
        </td>
        <td style="padding:10px 0;border-top:1px solid ${C.border};font-family:${FONT};">
          <div style="font-size:15px;line-height:22px;font-weight:600;color:${C.text};">${title}</div>
          <div style="font-size:14px;line-height:21px;color:${C.muted};">${body}</div>
        </td>
      </tr>`,
  ).join("");

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
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;">

        <!-- Header -->
        <tr><td style="background:${C.navy};border-radius:16px 16px 0 0;padding:20px 28px;font-family:${FONT};">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="background:${C.emerald};border-radius:8px;width:32px;height:32px;text-align:center;font-family:${FONT};font-size:14px;font-weight:800;color:${C.navy};">Sf</td>
            <td style="padding-left:10px;font-family:${FONT};font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#FFFFFF;">Sahihfolio</td>
          </tr></table>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:${C.surface};border:1px solid ${C.border};border-top:0;border-radius:0 0 16px 16px;padding:32px 28px;font-family:${FONT};">

          <h1 style="margin:0 0 8px;font-size:24px;line-height:32px;font-weight:700;letter-spacing:-0.01em;color:${C.text};">Your saved comparison is ready</h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:${C.muted};">Here is the result you saved. It will stay available at this link.</p>

          <!-- Button -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px;"><tr>
            <td style="background:${C.emerald};border-radius:10px;">
              <a href="${resultUrl}" style="display:inline-block;padding:14px 24px;font-family:${FONT};font-size:16px;line-height:20px;font-weight:600;color:${C.navy};text-decoration:none;">View my saved results</a>
            </td>
          </tr></table>

          <!-- Checklist -->
          <h2 style="margin:0 0 4px;font-size:18px;line-height:26px;font-weight:600;color:${C.text};">Before you open an account, verify</h2>
          <p style="margin:0 0 12px;font-size:14px;line-height:21px;color:${C.muted};">Information changes. These checks take a few minutes.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">${checklistRows}
          </table>

          <!-- Disclaimer -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.border};">
            <tr><td style="padding-top:20px;font-family:${FONT};font-size:13px;line-height:20px;color:${C.muted};">
              Sahihfolio provides general educational information. It does not provide personalized investment, tax, legal, accounting, or Shariah advice. Availability, fees, and product details can change; verify directly with the provider before making a decision.
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 12px 8px;text-align:center;font-family:${FONT};font-size:12px;line-height:18px;color:${C.muted};">
          You’re receiving this because you saved a result on Sahihfolio.<br>
          <a href="${unsubscribeUrl}" style="color:${C.slate};text-decoration:underline;">Unsubscribe from these emails</a>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "Your saved comparison is ready",
    `View your saved results: ${resultUrl}`,
    "",
    "Before opening an account, verify residency eligibility, account type, fees, withdrawal process, and the provider’s latest Shariah-screening information.",
    "",
    "Sahihfolio provides general educational information, not personalized investment, tax, legal, accounting, or Shariah advice. Availability, fees, and product details can change; verify directly with the provider.",
    "",
    `Unsubscribe: ${unsubscribeUrl}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return { subject, html, text };
}
