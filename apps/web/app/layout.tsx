import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Header } from "components/header";
import { siteConfig } from "src/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} — Halal-investing options, clearly compared`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "halal investing",
    "Shariah screening",
    "halal ETFs",
    "Islamic investing",
    "halal brokers",
    "Muslim investor tools",
  ],

  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,

  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} — Halal-investing options, clearly compared`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Sahihfolio — informed halal-investing decisions with clarity",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  }
};

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
          <Header />

          <main className="w-full">{children}</main>

          <footer className="bg-[#0B1F3A] dark:bg-[#161B26] text-white border border-b border-border dark:border-[#2A3243] w-full flex items-center justify-center pt-[56px] pb-[32px]">
            <div className="max-w-[1200px]">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="col-span-2">
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
                  <p className="text-muted mt-4 max-w-[34ch]">
                    Halal-investing research with sources, dates and limitations
                    in plain view.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h5 className="mb-2 font-bold">Tools</h5>
                  <a href="#">Options finder</a>
                  <a href="#">Screening report</a>
                </div>
                <div className="flex flex-col gap-2">
                  <h5 className="mb-2 font-bold">Trust</h5>
                  <a href="#">Methodology</a>
                  <a href="#">Disclosures</a>
                  <a href="#">Data review log</a>
                </div>
                <div className="flex flex-col gap-2">
                  <h5 className="mb-2 font-bold">Company</h5>
                  <a href="#">Privacy</a>
                  <a href="#">Contact</a>
                </div>
              </div>
              <div className="mt-[36px] pt-[24px] border-t border-muted">
                <span className="font-bold">Disclaimer.</span>{" "}
                <span className="text-muted">
                  Sahihfolio provides general educational information. It does
                  not provide personalised investment, tax, legal, accounting,
                  or Shariah advice. Verify details directly with each provider
                  before making a decision. Data last reviewed 1 October 2026.
                </span>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
