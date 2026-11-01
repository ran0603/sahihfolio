import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Header } from "components/header";
import { Footer } from "components/footer";
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="banners" hidden>
            <div className="banner b-warn" role="status" data-sb="stale" hidden>
              <div className="wrap banner-in">
                <svg
                  className="ic "
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <p>
                  <strong>Some data may be out of date.</strong> A few provider
                  records were last reviewed more than 90 days ago. Each result
                  shows its own review date.
                </p>
                <button
                  type="button"
                  className="icon-btn sm"
                  aria-label="Dismiss"
                  data-act="banner-close"
                >
                  <svg
                    className="ic "
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="banner b-off"
              role="status"
              data-sb="offline"
              hidden
            >
              <div className="wrap banner-in">
                <svg
                  className="ic "
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 20h.01"></path>
                  <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
                  <path d="M5 12.859a10 10 0 0 1 5.17-2.69"></path>
                  <path d="M19 12.859a10 10 0 0 0-2.007-1.523"></path>
                  <path d="M2 8.82a15 15 0 0 1 4.177-2.643"></path>
                  <path d="M22 8.82a15 15 0 0 0-11.288-3.764"></path>
                  <path d="m2 2 20 20"></path>
                </svg>
                <p>
                  <strong>You’re offline.</strong> Your answers are saved on
                  this device. Reconnect to see your options.
                </p>
                <button type="button" className="link-btn" data-act="reconnect">
                  Retry
                </button>
                <button
                  type="button"
                  className="icon-btn sm"
                  aria-label="Dismiss"
                  data-act="banner-close"
                >
                  <svg
                    className="ic "
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="scroll">
            <main>{children}</main>
          </div>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
