import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Moon } from "lucide-react";
import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "components/theme-toggle";

export const metadata: Metadata = {
  title: "Sahihfolio — Global Halal Investing Research & Options Finder",
  description:
    "Evidence-led research, Shariah screening methodologies, and sourced comparison of global halal investing routes.",
};

const navItems = [
  { label: "Options Finder", href: "/finder" },
  { label: "Screening Reports", href: "/screening-report" },
  { label: "Methodologies", href: "/methodologies" },
  { label: "Disclosures", href: "/disclosures" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground flex flex-col items-center min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="bg-[#0B1F3A] dark:bg-[#161B26] text-white border border-b border-[#1E3A5F] dark:border-[#2A3243] w-full flex items-center justify-center py-[16px] px-[24px]">
            <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
              <div
                style={{ display: "flex", alignItems: "center", gap: "24px" }}
              >
                <Link
                  href="/"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    letterSpacing: "-0.5px",
                    marginRight: "2rem",
                  }}
                >
                  Sahih<span style={{ color: "#10B981" }}>folio</span>
                </Link>
                <nav className="flex gap-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={"menu" + index}
                      href={item.href}
                      className="text-[#E4E7EC] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-end align-center gap-2">
                <ThemeToggle />
                <Link
                  href="/finder"
                  className="bg-[#10B981] rounded-lg px-4 py-2 font-semibold cursor-pointer"
                >
                  <span className="text-[#0B1F3A]">Find My Options</span>
                </Link>
              </div>
            </div>
          </header>

          <main className="w-full max-w-[1200px] py-[32px] px-[24px] mx-auto">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
