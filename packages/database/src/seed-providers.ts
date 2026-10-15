import "dotenv/config";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { providers } from "./schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

const lastReviewedAt = new Date("2026-10-16T00:00:00Z");

function source(
  label: string,
  url: string,
  sourceType:
    | "official"
    | "regulator"
    | "provider"
    | "news"
    | "research"
    | "other" = "provider",
  confidence: "high" | "medium" | "low" = "medium",
) {
  return {
    label,
    url,
    sourceType,
    retrievedAt: "2026-10-16",
    confidence,
  };
}
type NewProvider = typeof providers.$inferInsert;

const providerSeed: NewProvider[] = [
  {
    slug: "interactive-brokers",
    name: "Interactive Brokers",
    type: "broker" as const,
    countries: ["MY", "US", "GB", "CA", "SG"],
    markets: [
      {
        code: "US",
        name: "United States",
        access: "direct" as const,
        notes: "US-listed stocks and ETFs.",
        source: source(
          "Interactive Brokers products",
          "https://www.interactivebrokers.com",
        ),
      },
      {
        code: "GB",
        name: "United Kingdom",
        access: "direct" as const,
        notes: "UK-listed securities and eligible international markets.",
        source: source(
          "Interactive Brokers products",
          "https://www.interactivebrokers.com",
        ),
      },
      {
        code: "CA",
        name: "Canada",
        access: "direct" as const,
        source: source(
          "Interactive Brokers Canada",
          "https://www.interactivebrokers.ca",
        ),
      },
      {
        code: "SG",
        name: "Singapore",
        access: "direct" as const,
        source: source(
          "Interactive Brokers Singapore",
          "https://www.interactivebrokers.com.sg",
        ),
      },
    ],
    assetTypes: [
      {
        type: "stocks" as const,
        supported: true,
        notes: "Global equities, subject to market and account eligibility.",
        source: source(
          "Interactive Brokers products",
          "https://www.interactivebrokers.com",
        ),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes: "US and international ETFs, subject to local product restrictions.",
        source: source(
          "Interactive Brokers products",
          "https://www.interactivebrokers.com",
        ),
      },
      {
        type: "crypto" as const,
        supported: false,
      },
    ],
    fees: [
      {
        kind: "trading" as const,
        label: "US stock and ETF commission",
        value: "From USD 0.005 per share or tiered commission",
        currency: "USD" as const,
        frequency: "per_trade" as const,
        conditions: "Pricing varies by exchange, product, and account tier.",
        source: source(
          "Interactive Brokers pricing",
          "https://www.interactivebrokers.com/en/pricing/commissions-home.php",
        ),
      },
      {
        kind: "fx" as const,
        label: "Currency conversion",
        value: "Spot rate plus 0.03% to 0.20%",
        frequency: "variable",
        source: source(
          "Interactive Brokers pricing",
          "https://www.interactivebrokers.com/en/pricing/commissions-home.php",
        ),
      },
      {
        kind: "custody" as const,
        label: "Inactivity fee",
        value: "None",
        frequency: "per_year",
        source: source(
          "Interactive Brokers pricing",
          "https://www.interactivebrokers.com/en/pricing/commissions-home.php",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Valid government-issued identification",
        category: "identity",
        mandatory: true,
        source: source(
          "Interactive Brokers account opening",
          "https://www.interactivebrokers.com",
        ),
      },
      {
        requirement: "Proof of residential address",
        category: "residency",
        mandatory: true,
        source: source(
          "Interactive Brokers account opening",
          "https://www.interactivebrokers.com",
        ),
      },
      {
        requirement: "Tax identification information",
        category: "tax",
        mandatory: true,
        source: source(
          "Interactive Brokers account opening",
          "https://www.interactivebrokers.com",
        ),
      },
    ],
    halalScreening: {
      supported: false,
      notes:
        "Self-directed broker with broad global market access. Users must independently verify the Shariah status of individual securities.",
      source: source(
        "Interactive Brokers",
        "https://www.interactivebrokers.com",
      ),
    },
    minimumInvestment: "No platform minimum; instrument-level minimums apply",
    pros: [
      "Broad international market access",
      "Wide ETF selection",
      "Suitable for self-directed investors",
    ],
    cons: [
      "Not exclusively Shariah-focused",
      "Users must verify individual securities",
    ],
    disclosureUrl: "https://www.interactivebrokers.com/",
    lastReviewedAt,
    status: "draft" as const,
  },

  {
    slug: "wahed-invest",
    name: "Wahed Invest",
    type: "robo_advisor" as const,
    countries: ["MY", "US", "GB"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes: "Shariah-screened managed portfolios for Malaysia-based investors.",
        source: source("Wahed Malaysia", "https://wahed.com/my"),
      },
      {
        code: "US",
        name: "United States",
        access: "direct" as const,
        source: source("Wahed US", "https://wahed.com/us"),
      },
      {
        code: "GB",
        name: "United Kingdom",
        access: "direct" as const,
        source: source("Wahed UK", "https://wahed.com/uk"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios" as const,
        supported: true,
        notes: "Shariah-screened managed portfolios.",
        source: source("Wahed", "https://wahed.com"),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes: "Portfolios may include Shariah-screened ETFs.",
        source: source("Wahed", "https://wahed.com"),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Portfolio management fee",
        value: "Tiered management fee",
        frequency: "per_year" as const,
        conditions: "Verify the current fee schedule for the user’s country.",
        source: source("Wahed pricing", "https://wahed.com"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Valid government-issued identification",
        category: "identity",
        mandatory: true,
        source: source("Wahed account opening", "https://wahed.com"),
      },
      {
        requirement: "Country-specific residency eligibility",
        category: "residency",
        mandatory: true,
        source: source("Wahed account opening", "https://wahed.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Shariah-supervised portfolios; verify the applicable Shariah board and portfolio composition.",
      source: source("Wahed", "https://wahed.com"),
    },
    minimumInvestment: "Country-specific; verify current minimum",
    pros: [
      "Purpose-built Islamic investing platform",
      "Hands-off managed portfolios",
      "Beginner-friendly",
    ],
    cons: [
      "Limited control over individual holdings",
      "Management fees apply",
    ],
    disclosureUrl: "https://wahed.com/",
    lastReviewedAt,
    status: "draft" as const,
  },

  {
    slug: "rakuten-trade",
    name: "Rakuten Trade",
    type: "broker" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes: "Bursa Malaysia equities and Shariah ETFs.",
        source: source("Rakuten Trade", "https://www.rakutentrade.my"),
      },
      {
        code: "US",
        name: "United States",
        access: "direct" as const,
        notes: "US-listed stocks and ETFs.",
        source: source("Rakuten Trade", "https://www.rakutentrade.my"),
      },
    ],
    assetTypes: [
      {
        type: "stocks" as const,
        supported: true,
        notes: "Bursa Malaysia and US equities.",
        source: source("Rakuten Trade", "https://www.rakutentrade.my"),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes: "Includes Bursa Malaysia Shariah ETFs and eligible US Shariah ETFs.",
        source: source(
          "Shariah ETFs in Malaysia",
          "https://www.wahed.com/my/learn/robo/all-you-need-to-know-about-investing-in-shariah-etfs/",
          "research",
        ),
      },
    ],
    fees: [
      {
        kind: "trading" as const,
        label: "Brokerage commission",
        value: "Tiered brokerage commission",
        frequency: "per_trade" as const,
        conditions: "Verify current rates, minimums, and promotional pricing.",
        source: source("Rakuten Trade pricing", "https://www.rakutentrade.my"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Malaysian residency or eligible account status",
        category: "residency",
        mandatory: true,
        source: source("Rakuten Trade", "https://www.rakutentrade.my"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Rakuten Trade", "https://www.rakutentrade.my"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Provides access to Bursa Malaysia Shariah ETFs and US Shariah ETFs; Islamic account option available.",
      notes:
        "Instrument-level eligibility must still be verified before relying on the platform.",
      source: source(
        "Shariah ETFs in Malaysia",
        "https://www.wahed.com/my/learn/robo/all-you-need-to-know-about-investing-in-shariah-etfs/",
        "research",
      ),
    },
    minimumInvestment: "1 Bursa Malaysia board lot",
    pros: [
      "Bursa Malaysia and US market access",
      "Shariah ETF access",
      "Islamic account option available",
    ],
    cons: [
      "Self-directed investing requires user research",
      "Shariah eligibility depends on selected instruments",
    ],
    disclosureUrl: "https://www.rakutentrade.my/",
    lastReviewedAt,
    status: "draft" as const,
  },

  {
    slug: "moomoo-malaysia",
    name: "Moomoo Malaysia",
    type: "broker" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes: "Bursa Malaysia equities and Shariah ETFs.",
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
      {
        code: "US",
        name: "United States",
        access: "direct" as const,
        notes: "US-listed stocks and ETFs.",
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
    ],
    assetTypes: [
      {
        type: "stocks" as const,
        supported: true,
        notes: "Bursa Malaysia and US equities.",
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes: "Includes Shariah ETF access and a Shariah filter.",
        source: source(
          "Shariah ETFs in Malaysia",
          "https://www.wahed.com/my/learn/robo/all-you-need-to-know-about-investing-in-shariah-etfs/",
          "research",
        ),
      },
    ],
    fees: [
      {
        kind: "trading" as const,
        label: "Trading commission",
        value: "Promotional and standard commission rates may apply",
        frequency: "per_trade" as const,
        conditions: "Verify current pricing before publishing.",
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Malaysian residency or eligible account status",
        category: "residency",
        mandatory: true,
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Provides access to Bursa Malaysia and US Shariah ETFs, with a built-in Shariah filter.",
      source: source(
        "Shariah ETFs in Malaysia",
        "https://www.wahed.com/my/learn/robo/all-you-need-to-know-about-investing-in-shariah-etfs/",
        "research",
      ),
    },
    minimumInvestment: "No stated minimum; instrument-level minimums apply",
    pros: [
      "Mobile-first experience",
      "Beginner-friendly interface",
      "Shariah filter and ETF access",
    ],
    cons: [
      "Self-directed platform",
      "Promotional pricing can change",
    ],
    disclosureUrl: "https://www.moomoo.com/my",
    lastReviewedAt,
    status: "draft" as const,
  },

  {
    slug: "stashaway-malaysia",
    name: "StashAway Malaysia",
    type: "robo_advisor" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes: "Shariah Global Portfolio available to Malaysia-based investors.",
        source: source(
          "StashAway Malaysia",
          "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios" as const,
        supported: true,
        notes: "Shariah Global Portfolio.",
        source: source(
          "StashAway Malaysia",
          "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
        ),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes: "Portfolio may include ETFs.",
        source: source(
          "StashAway Malaysia",
          "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Management fee",
        value: "Tiered management fee",
        frequency: "per_year" as const,
        conditions: "Verify current pricing.",
        source: source("StashAway Malaysia", "https://www.stashaway.my"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Malaysian residency or eligible account status",
        category: "residency",
        mandatory: true,
        source: source("StashAway Malaysia", "https://www.stashaway.my"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("StashAway Malaysia", "https://www.stashaway.my"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Shariah Global Portfolio with Shariah oversight; verify current portfolio composition and advisory arrangements.",
      source: source(
        "StashAway Malaysia",
        "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
      ),
    },
    minimumInvestment: "No minimum stated in available comparison data",
    pros: [
      "Hands-off managed investing",
      "Diversified Shariah-focused portfolio",
      "Malaysia availability",
    ],
    cons: [
      "Limited control over individual holdings",
      "Management fees apply",
    ],
    disclosureUrl: "https://www.stashaway.my/",
    lastReviewedAt,
    status: "draft" as const,
  },

  {
    slug: "eq8-capital",
    name: "Eq8 Capital",
    type: "etf_provider" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes: "Bursa Malaysia-listed Shariah ETFs.",
        source: source("Eq8 Capital", "https://www.eq8capital.com"),
      },
    ],
    assetTypes: [
      {
        type: "etfs" as const,
        supported: true,
        notes: "Bursa-listed Shariah ETFs, including Malaysian and US exposure.",
        source: source("Eq8 Capital", "https://www.eq8capital.com"),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "ETF management fee",
        value: "Approximately 0.40% per year",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions: "Verify the expense ratio for each specific ETF.",
        source: source("Eq8 Capital", "https://www.eq8capital.com"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Brokerage account with Bursa Malaysia access",
        category: "brokerage",
        mandatory: true,
        source: source("Eq8 Capital", "https://www.eq8capital.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Bursa-listed Shariah ETFs; verify the methodology for each individual fund.",
      source: source("Eq8 Capital", "https://www.eq8capital.com"),
    },
    minimumInvestment: "One ETF unit or applicable board lot",
    pros: [
      "Listed Shariah ETF options",
      "Malaysian and US exposure",
      "Transparent fund-level expense ratios",
    ],
    cons: [
      "Requires a brokerage account",
      "ETF prices can fluctuate",
    ],
    disclosureUrl: "https://www.eq8capital.com/",
    lastReviewedAt,
    status: "draft" as const,
  },

  {
    slug: "public-mutual",
    name: "Public Mutual",
    type: "managed_portfolios",
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct",
        notes: "Islamic unit trusts available to Malaysia-based investors.",
        source: source("Public Mutual", "https://www.publicmutual.com.my"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Islamic unit trusts and managed funds.",
        source: source("Public Mutual", "https://www.publicmutual.com.my"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Fund management fee",
        value: "Fund-specific",
        frequency: "per_year",
        conditions: "Verify the fee schedule for each selected fund.",
        source: source("Public Mutual", "https://www.publicmutual.com.my"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Public Mutual", "https://www.publicmutual.com.my"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic unit trusts operated under an SC-registered Shariah adviser; verify each fund’s mandate.",
      source: source("Public Mutual", "https://www.publicmutual.com.my"),
    },
    minimumInvestment: "Fund-specific; verify current minimum",
    pros: [
      "Established Malaysian fund manager",
      "Multiple Islamic fund options",
      "Locally accessible",
    ],
    cons: [
      "Fund selection required",
      "Fees and performance vary by fund",
    ],
    disclosureUrl: "https://www.publicmutual.com.my/",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "bimb-investment",
    name: "BIMB Investment",
    type: "managed_portfolios",
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct",
        notes: "Islamic fund products available to Malaysia-based investors.",
        source: source("BIMB Investment", "https://www.bimbinvestment.com.my"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Islamic unit trusts and managed funds.",
        source: source("BIMB Investment", "https://www.bimbinvestment.com.my"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Fund management fee",
        value: "Fund-specific",
        frequency: "per_year",
        conditions: "Verify the fee schedule for each selected fund.",
        source: source("BIMB Investment", "https://www.bimbinvestment.com.my"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("BIMB Investment", "https://www.bimbinvestment.com.my"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic fund products; verify each fund’s Shariah mandate and adviser.",
      source: source("BIMB Investment", "https://www.bimbinvestment.com.my"),
    },
    minimumInvestment: "Fund-specific; verify current minimum",
    pros: [
      "Malaysian Islamic fund specialist",
      "Local accessibility",
      "Multiple fund options",
    ],
    cons: [
      "Requires fund-level due diligence",
      "Fees and liquidity vary by fund",
    ],
    disclosureUrl: "https://www.bimbinvestment.com.my/",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "maybank-asset-management",
    name: "Maybank Asset Management",
    type: "managed_portfolios",
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct",
        notes: "Islamic fund products available to Malaysia-based investors.",
        source: source(
          "Maybank Asset Management",
          "https://www.maybankassetmanagement.com",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Islamic unit trusts and managed funds.",
        source: source(
          "Maybank Asset Management",
          "https://www.maybankassetmanagement.com",
        ),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Fund management fee",
        value: "Fund-specific",
        frequency: "per_year",
        conditions: "Verify the fee schedule for each selected fund.",
        source: source(
          "Maybank Asset Management",
          "https://www.maybankassetmanagement.com",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source(
          "Maybank Asset Management",
          "https://www.maybankassetmanagement.com",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic fund products; verify each fund’s Shariah mandate and adviser.",
      source: source(
        "Maybank Asset Management",
        "https://www.maybankassetmanagement.com",
      ),
    },
    minimumInvestment: "Fund-specific; verify current minimum",
    pros: [
      "Established Malaysian institution",
      "Islamic fund options",
      "Local accessibility",
    ],
    cons: [
      "Fund selection required",
      "Product terms vary",
    ],
    disclosureUrl: "https://www.maybankassetmanagement.com/",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "principal-malaysia",
    name: "Principal Malaysia",
    type: "managed_portfolios",
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct",
        notes: "Islamic unit trusts available to Malaysia-based investors.",
        source: source("Principal Malaysia", "https://www.principal.com.my"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Islamic unit trusts and managed funds.",
        source: source("Principal Malaysia", "https://www.principal.com.my"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Fund management fee",
        value: "Fund-specific",
        frequency: "per_year",
        conditions: "Verify the fee schedule for each selected fund.",
        source: source("Principal Malaysia", "https://www.principal.com.my"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Principal Malaysia", "https://www.principal.com.my"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic unit trusts; verify each fund’s Shariah mandate and adviser.",
      source: source("Principal Malaysia", "https://www.principal.com.my"),
    },
    minimumInvestment: "Fund-specific; verify current minimum",
    pros: [
      "Established fund manager",
      "Islamic fund options",
      "Local accessibility",
    ],
    cons: [
      "Fund selection required",
      "Fees and performance vary",
    ],
    disclosureUrl: "https://www.principal.com.my/",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "kenanga-investors",
    name: "Kenanga Investors",
    type: "managed_portfolios",
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct",
        notes: "Islamic fund products available to Malaysia-based investors.",
        source: source(
          "Kenanga Investors",
          "https://www.kenangainvestors.com.my",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Islamic unit trusts and managed funds.",
        source: source(
          "Kenanga Investors",
          "https://www.kenangainvestors.com.my",
        ),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Fund management fee",
        value: "Fund-specific",
        frequency: "per_year",
        conditions: "Verify the fee schedule for each selected fund.",
        source: source(
          "Kenanga Investors",
          "https://www.kenangainvestors.com.my",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source(
          "Kenanga Investors",
          "https://www.kenangainvestors.com.my",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic fund products; verify each fund’s Shariah mandate and adviser.",
      source: source(
        "Kenanga Investors",
        "https://www.kenangainvestors.com.my",
      ),
    },
    minimumInvestment: "Fund-specific; verify current minimum",
    pros: [
      "Malaysian fund manager",
      "Islamic fund options",
      "Local accessibility",
    ],
    cons: [
      "Fund selection required",
      "Fees and performance vary",
    ],
    disclosureUrl: "https://www.kenangainvestors.com.my/",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "aham-capital",
    name: "AHAM Capital",
    type: "managed_portfolios",
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct",
        notes: "Islamic fund products available to Malaysia-based investors.",
        source: source("AHAM Capital", "https://www.aham.com.my"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Islamic unit trusts and managed funds.",
        source: source("AHAM Capital", "https://www.aham.com.my"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Fund management fee",
        value: "Fund-specific",
        frequency: "per_year",
        conditions: "Verify the fee schedule for each selected fund.",
        source: source("AHAM Capital", "https://www.aham.com.my"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("AHAM Capital", "https://www.aham.com.my"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic fund products; verify each fund’s Shariah mandate and adviser.",
      source: source("AHAM Capital", "https://www.aham.com.my"),
    },
    minimumInvestment: "Fund-specific; verify current minimum",
    pros: [
      "Malaysian fund manager",
      "Islamic fund options",
      "Local accessibility",
    ],
    cons: [
      "Fund selection required",
      "Fees and performance vary",
    ],
    disclosureUrl: "https://www.aham.com.my/",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "sp-funds",
    name: "SP Funds",
    type: "etf_provider",
    countries: ["US", "MY"],
    markets: [
      {
        code: "US",
        name: "United States",
        access: "direct",
        notes: "US-listed Shariah-screened ETFs, including SPUS.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
      {
        code: "MY",
        name: "Malaysia",
        access: "indirect",
        notes:
          "Access depends on whether the investor’s brokerage supports the relevant US listing.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
    ],
    assetTypes: [
      {
        type: "etfs",
        supported: true,
        notes: "Shariah-screened ETFs.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "ETF expense ratio",
        value: "ETF-specific",
        frequency: "per_year",
        conditions: "Verify the expense ratio for each fund.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
    ],
    accountRequirements: [
      {
        requirement:
          "Brokerage account with access to the relevant ETF listing",
        category: "brokerage",
        mandatory: true,
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Shariah-screened ETFs; verify the methodology and holdings for each individual fund.",
      source: source("SP Funds", "https://www.sp-funds.com"),
    },
    minimumInvestment: "One ETF share or applicable brokerage minimum",
    pros: [
      "Purpose-built Shariah-screened ETFs",
      "US-listed access",
      "Suitable for self-directed ETF investors",
    ],
    cons: [
      "Availability depends on broker and market",
      "Currency and trading costs may apply",
    ],
    disclosureUrl: "https://www.sp-funds.com/",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "amundi-islamic-etfs",
    name: "Amundi Islamic ETFs",
    type: "etf_provider",
    countries: ["MY", "GB", "SG"],
    markets: [
      {
        code: "GB",
        name: "United Kingdom",
        access: "indirect",
        notes:
          "UCITS-listed Islamic ETFs may be accessible through eligible UK brokers.",
        source: source("Amundi", "https://www.amundi.com"),
      },
      {
        code: "SG",
        name: "Singapore",
        access: "indirect",
        notes:
          "Access depends on whether the investor’s brokerage supports the relevant listing.",
        source: source("Amundi", "https://www.amundi.com"),
      },
      {
        code: "MY",
        name: "Malaysia",
        access: "indirect",
        notes:
          "Access depends on whether the investor’s brokerage supports the relevant listing.",
        source: source("Amundi", "https://www.amundi.com"),
      },
    ],
    assetTypes: [
      {
        type: "etfs",
        supported: true,
        notes: "Islamic UCITS ETFs with global Shariah-screened equity exposure.",
        source: source("Amundi", "https://www.amundi.com"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "ETF expense ratio",
        value: "ETF-specific",
        frequency: "per_year",
        conditions: "Verify the expense ratio for each fund.",
        source: source("Amundi", "https://www.amundi.com"),
      },
    ],
    accountRequirements: [
      {
        requirement:
          "Brokerage account with access to the relevant ETF listing",
        category: "brokerage",
        mandatory: true,
        source: source("Amundi", "https://www.amundi.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic UCITS ETFs; verify the fund-specific index methodology and Shariah oversight.",
      source: source("Amundi", "https://www.amundi.com"),
    },
    minimumInvestment: "One ETF share or applicable brokerage minimum",
    pros: [
      "UCITS-listed Islamic ETF options",
      "Global equity exposure",
      "Useful for non-US investors",
    ],
    cons: [
      "Availability depends on broker and market",
      "Currency and trading costs may apply",
    ],
    disclosureUrl: "https://www.amundi.com/",
    lastReviewedAt,
    status: "draft",
  },
  {
    slug: "ishares-islamic-etfs",
    name: "iShares Islamic ETFs",
    type: "etf_provider",
    countries: ["US", "GB", "MY"],
    markets: [
      {
        code: "US",
        name: "United States",
        access: "indirect",
        notes:
          "US-listed Islamic ETFs may be accessible through eligible brokers.",
        source: source("iShares", "https://www.ishares.com"),
      },
      {
        code: "GB",
        name: "United Kingdom",
        access: "indirect",
        notes:
          "Access depends on whether the investor’s brokerage supports the relevant listing.",
        source: source("iShares", "https://www.ishares.com"),
      },
      {
        code: "MY",
        name: "Malaysia",
        access: "indirect",
        notes:
          "Access depends on whether the investor’s brokerage supports the relevant listing.",
        source: source("iShares", "https://www.ishares.com"),
      },
    ],
    assetTypes: [
      {
        type: "etfs",
        supported: true,
        notes: "Islamic ETFs; verify the exact fund and listing availability.",
        source: source("iShares", "https://www.ishares.com"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "ETF expense ratio",
        value: "ETF-specific",
        frequency: "per_year",
        conditions: "Verify the expense ratio for each fund.",
        source: source("iShares", "https://www.ishares.com"),
      },
    ],
    accountRequirements: [
      {
        requirement:
          "Brokerage account with access to the relevant ETF listing",
        category: "brokerage",
        mandatory: true,
        source: source("iShares", "https://www.ishares.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Offers Islamic ETFs; verify the exact fund, index methodology, listing venue, and country availability.",
      source: source("iShares", "https://www.ishares.com"),
    },
    minimumInvestment: "One ETF share or applicable brokerage minimum",
    pros: [
      "Large ETF provider",
      "Potential global access",
      "ETF-level transparency",
    ],
    cons: [
      "Product availability varies by market",
      "Requires fund-level verification",
    ],
    disclosureUrl: "https://www.ishares.com/",
    lastReviewedAt,
    status: "published",
  },

  {
    slug: "wealthsimple-halal",
    name: "Wealthsimple Halal",
    type: "robo_advisor",
    countries: ["CA"],
    markets: [
      {
        code: "CA",
        name: "Canada",
        access: "direct",
        notes:
          "Managed Shariah-screened portfolio available to eligible Canadian investors.",
        source: source(
          "Wealthsimple Halal",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Fully managed Shariah-screened portfolio.",
        source: source(
          "Wealthsimple Halal",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
      {
        type: "etfs",
        supported: true,
        notes: "Portfolio may include Shariah-screened ETFs.",
        source: source(
          "Wealthsimple Halal",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Management fee",
        value: "Approximately 0.40% to 0.50% per year",
        currency: "CAD",
        frequency: "per_year",
        conditions:
          "Verify the current all-in cost, including underlying ETF fees.",
        source: source(
          "Wealthsimple Halal",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Canadian residency",
        category: "residency",
        mandatory: true,
        source: source(
          "Wealthsimple Halal",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source(
          "Wealthsimple Halal",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Managed Shariah-screened portfolio overseen by a Shariah supervisory board; verify the current methodology and holdings.",
      source: source(
        "Wealthsimple Halal",
        "https://www.wealthsimple.com/en-ca/halal",
      ),
    },
    minimumInvestment: "Verify current minimum",
    pros: [
      "Fully managed halal portfolio",
      "Canada-focused registered-account compatibility",
      "Beginner-friendly",
    ],
    cons: [
      "Limited control over individual holdings",
      "Management fees apply",
    ],
    disclosureUrl: "https://www.wealthsimple.com/en-ca/halal",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "manzil",
    name: "Manzil",
    type: "robo_advisor",
    countries: ["CA"],
    markets: [
      {
        code: "CA",
        name: "Canada",
        access: "direct",
        notes:
          "Halal investment accounts for eligible Canadian investors, including registered account options.",
        source: source("Manzil", "https://www.manzil.ca"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes: "Shariah-compliant managed portfolio.",
        source: source("Manzil", "https://www.manzil.ca"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Management fee",
        value: "Verify current pricing",
        frequency: "per_year",
        source: source("Manzil", "https://www.manzil.ca"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Canadian residency",
        category: "residency",
        mandatory: true,
        source: source("Manzil", "https://www.manzil.ca"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Manzil", "https://www.manzil.ca"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Shariah-compliant portfolio approach with oversight from a dedicated supervisory board; verify the current methodology.",
      source: source("Manzil", "https://www.manzil.ca"),
    },
    minimumInvestment: "Verify current minimum",
    pros: [
      "Canadian Islamic finance platform",
      "Supports registered account options",
      "Managed halal portfolios",
    ],
    cons: [
      "Limited control over individual holdings",
      "Availability and product terms may change",
    ],
    disclosureUrl: "https://www.manzil.ca",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "questrade",
    name: "Questrade",
    type: "broker",
    countries: ["CA"],
    markets: [
      {
        code: "CA",
        name: "Canada",
        access: "direct",
        notes: "Canadian and US-listed securities, subject to account eligibility.",
        source: source("Questrade", "https://www.questrade.com"),
      },
      {
        code: "US",
        name: "United States",
        access: "direct",
        notes: "US-listed stocks and ETFs.",
        source: source("Questrade", "https://www.questrade.com"),
      },
    ],
    assetTypes: [
      {
        type: "stocks",
        supported: true,
        notes:
          "Self-directed equity trading; users must verify Shariah eligibility of individual securities.",
        source: source("Questrade", "https://www.questrade.com"),
      },
      {
        type: "etfs",
        supported: true,
        notes:
          "Access to Shariah-screened ETFs such as SPUS and HLAL, subject to account and listing availability.",
        source: source(
          "Best halal investing apps in Canada",
          "https://lifemoney.ca/blog/best-halal-investing-apps-canada-2026",
          "research",
        ),
      },
    ],
    fees: [
      {
        kind: "trading",
        label: "ETF trading",
        value: "Verify current commission and account pricing",
        frequency: "per_trade",
        source: source("Questrade", "https://www.questrade.com"),
      },
      {
        kind: "fx",
        label: "Currency conversion",
        value: "Verify current FX pricing",
        frequency: "variable",
        source: source("Questrade", "https://www.questrade.com"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Canadian residency or eligible account status",
        category: "residency",
        mandatory: true,
        source: source("Questrade", "https://www.questrade.com"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Questrade", "https://www.questrade.com"),
      },
    ],
    halalScreening: {
      supported: false,
      notes:
        "Self-directed broker. Users can access Shariah-screened ETFs but must independently verify individual securities.",
      source: source("Questrade", "https://www.questrade.com"),
    },
    minimumInvestment: "No stated platform minimum; instrument-level minimums apply",
    pros: [
      "Self-directed Canadian brokerage",
      "Access to US and Canadian markets",
      "Can hold Shariah-screened ETFs",
    ],
    cons: [
      "No built-in managed halal portfolio",
      "Users must perform Shariah screening",
    ],
    disclosureUrl: "https://www.questrade.com",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "amal-invest",
    name: "Amal Invest",
    type: "robo_advisor",
    countries: ["GB"],
    markets: [
      {
        code: "GB",
        name: "United Kingdom",
        access: "direct",
        notes:
          "Shariah-screened fund-based investing for eligible UK investors.",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes:
          "Converts funds and ETFs into Shariah-screened baskets with ongoing screening.",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Platform or management fee",
        value: "Verify current pricing",
        frequency: "per_year",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
    ],
    accountRequirements: [
      {
        requirement: "UK residency or eligible account status",
        category: "residency",
        mandatory: true,
        source: source("Amal Invest", "https://amalinvest.com"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Amal Invest", "https://amalinvest.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Shariah-certified funds with continuous screening; verify the current certificate, methodology, and holdings.",
      source: source("Amal Invest", "https://amalinvest.com"),
    },
    minimumInvestment: "Verify current minimum",
    pros: [
      "Automated Shariah-screened investing",
      "Continuous holding re-screening",
      "Beginner-friendly",
    ],
    cons: [
      "Limited control over individual holdings",
      "Availability may be restricted by residency",
    ],
    disclosureUrl: "https://amalinvest.com",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "cur8-capital",
    name: "Cur8 Capital",
    type: "managed_portfolios",
    countries: ["GB", "US"],
    markets: [
      {
        code: "GB",
        name: "United Kingdom",
        access: "direct",
        notes:
          "Shariah-screened alternative investment funds; eligibility and minimums apply.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
      {
        code: "US",
        name: "United States",
        access: "direct",
        notes:
          "Some opportunities may be available to eligible US investors; verify current offering documents.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes:
          "Private funds across real estate, fixed income, and private equity.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Fund management and performance fees",
        value: "Fund-specific",
        frequency: "variable",
        conditions:
          "Verify fees, liquidity terms, and eligibility for each fund.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
      {
        requirement: "Investor suitability and eligibility checks",
        category: "other",
        mandatory: true,
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Investments are screened for Shariah compliance, ethics, and impact; verify each fund’s Shariah governance and documentation.",
      source: source("Cur8 Capital", "https://cur8.capital"),
    },
    minimumInvestment: "Approximately GBP 5,000; verify current fund minimum",
    pros: [
      "Access to alternative Shariah-conscious investments",
      "Private equity, real estate, and fixed-income exposure",
      "Shariah-screened investment approach",
    ],
    cons: [
      "Higher minimum investment",
      "Less liquid than listed ETFs",
      "Fund-specific eligibility and risk",
    ],
    disclosureUrl: "https://cur8.capital",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "sarwa",
    name: "Sarwa",
    type: "robo_advisor",
    countries: ["AE"],
    markets: [
      {
        code: "AE",
        name: "United Arab Emirates",
        access: "direct",
        notes:
          "Investing app available to eligible UAE-based investors; verify Shariah product availability.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolios",
        supported: true,
        notes:
          "Managed portfolios; verify whether the selected portfolio is Shariah-screened.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
      {
        type: "stocks",
        supported: true,
        notes:
          "Self-directed investing may be available; Shariah eligibility depends on the selected securities.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
      {
        type: "etfs",
        supported: true,
        notes:
          "ETF investing may be available; Shariah eligibility depends on the selected ETFs.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
    ],
    fees: [
      {
        kind: "management",
        label: "Management fee",
        value: "Verify current pricing",
        frequency: "per_year",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
    ],
    accountRequirements: [
      {
        requirement: "UAE residency or eligible account status",
        category: "residency",
        mandatory: true,
        source: source("Sarwa", "https://www.sarwa.co"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Sarwa", "https://www.sarwa.co"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "May provide access to Shariah-compliant products; verify the exact portfolio, screening methodology, and Shariah governance before publishing.",
      source: source("Sarwa", "https://www.sarwa.co"),
    },
    minimumInvestment: "Verify current minimum",
    pros: [
      "UAE-focused investing app",
      "Managed and self-directed options may be available",
      "Useful for Gulf-region coverage",
    ],
    cons: [
      "Shariah eligibility may depend on the selected product",
      "Requires verification of current availability",
    ],
    disclosureUrl: "https://www.sarwa.co",
    lastReviewedAt,
    status: "published",
  },
  {
    slug: "baraka",
    name: "Baraka",
    type: "broker",
    countries: ["AE"],
    markets: [
      {
        code: "AE",
        name: "United Arab Emirates",
        access: "direct",
        notes:
          "Investing app available to eligible UAE-based investors; verify Shariah product availability.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
    ],
    assetTypes: [
      {
        type: "stocks",
        supported: true,
        notes:
          "Self-directed stock investing; Shariah eligibility depends on the selected securities.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
      {
        type: "etfs",
        supported: true,
        notes:
          "ETF investing may be available; verify Shariah-screened ETF access.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
    ],
    fees: [
      {
        kind: "trading",
        label: "Trading commission",
        value: "Verify current pricing",
        frequency: "per_trade",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
    ],
    accountRequirements: [
      {
        requirement: "UAE residency or eligible account status",
        category: "residency",
        mandatory: true,
        source: source("Baraka", "https://www.getbaraka.com"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Baraka", "https://www.getbaraka.com"),
      },
    ],
    halalScreening: {
      supported: false,
      notes:
        "Self-directed broker. Users must independently verify the Shariah status of individual securities and ETFs.",
      source: source("Baraka", "https://www.getbaraka.com"),
    },
    minimumInvestment: "Verify current minimum",
    pros: [
      "UAE-focused mobile investing",
      "Self-directed market access",
      "Useful for Gulf-region coverage",
    ],
    cons: [
      "No built-in managed halal portfolio",
      "Users must perform Shariah screening",
    ],
    disclosureUrl: "https://www.getbaraka.com",
    lastReviewedAt,
    status: "published",
  },
];

async function seedProviders() {
  console.log(`Seeding ${providerSeed.length} providers...`);

  const inserted = await db
    .insert(providers)
    .values(providerSeed)
    .onConflictDoUpdate({
      target: providers.slug,
      set: {
        name: sql`excluded.name`,
        type: sql`excluded.type`,
        countries: sql`excluded.countries`,
        markets: sql`excluded.markets`,
        assetTypes: sql`excluded.asset_types`,
        fees: sql`excluded.fees`,
        accountRequirements: sql`excluded.account_requirements`,
        halalScreening: sql`excluded.halal_screening`,
        minimumInvestment: sql`excluded.minimum_investment`,
        pros: sql`excluded.pros`,
        cons: sql`excluded.cons`,
        disclosureUrl: sql`excluded.disclosure_url`,
        lastReviewedAt: sql`excluded.last_reviewed_at`,
        status: sql`excluded.status`,
      },
    })
    .returning({
      id: providers.id,
      slug: providers.slug,
      name: providers.name,
      status: providers.status,
    });

  console.log(`Seeded or updated ${inserted.length} providers.`);
  console.table(inserted);
}

seedProviders()
  .then(async () => {
    await client.end();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Provider seeding failed:", error);
    await client.end();
    process.exit(1);
  });