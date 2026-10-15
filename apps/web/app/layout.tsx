import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahihfolio — Global Halal Investing Research & Options Finder",
  description:
    "Evidence-led research, Shariah screening methodologies, and sourced comparison of global halal investing routes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <header
          style={{
            backgroundColor: "#0B1F3A",
            color: "#FFFFFF",
            padding: "16px 24px",
            borderBottom: "1px solid #1E3A5F",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <Link
                href="/"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  letterSpacing: "-0.5px",
                }}
              >
                Sahih<span style={{ color: "#10B981" }}>folio</span>
              </Link>
              <nav
                style={{ display: "flex", gap: "16px", fontSize: "0.875rem" }}
              >
                <Link
                  href="/finder"
                  style={
                    { color: "#E4E7EC", hover: { color: "#FFFFFF" } } as any
                  }
                >
                  Options Finder
                </Link>
                <Link href="/screening-report" style={{ color: "#E4E7EC" }}>
                  Screening Reports
                </Link>
              </nav>
            </div>
            <div>
              <Link
                href="/admin"
                style={{
                  fontSize: "0.8125rem",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  backgroundColor: "#162B47",
                  border: "1px solid #2D4B73",
                  color: "#E4E7EC",
                }}
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 24px",
            width: "100%",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid #E4E7EC",
            backgroundColor: "#FFFFFF",
            padding: "24px",
            fontSize: "0.8125rem",
            color: "#667085",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p>
              <strong>Disclaimer:</strong> Sahihfolio provides research and
              educational tools. We do not provide individual financial advice
              or formal religious rulings. Verify all terms with providers and
              qualified advisors.
            </p>
            <p style={{ marginTop: "8px" }}>
              © {new Date().getFullYear()} Sahihfolio. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
