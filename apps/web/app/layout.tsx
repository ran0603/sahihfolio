// app/layout.tsx
import { Metadata } from "node_modules/next";
import "./globals.css";
import { siteConfig } from "src/lib/site";
import { ThemeProvider } from "./theme-provider";

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
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
