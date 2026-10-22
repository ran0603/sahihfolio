export const siteConfig = {
  name: "Sahihfolio",
  shortName: "Sahihfolio",
  description:
    "Find and compare halal-investing options available in your country, with clear fees, coverage, sourcing, and review dates.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahihfolio.com",
  ogImage: "/og/default.png",
  locale: "en_US",
} as const;