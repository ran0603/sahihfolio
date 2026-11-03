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
        notes:
          "US and international ETFs, subject to local product restrictions.",
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
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
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
        notes:
          "Shariah-screened managed portfolios for Malaysia-based investors.",
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
        notes:
          "Available to eligible UK residents; U.S. citizens are not accepted. Minimum investment is GBP 50.",
        source: source("Wahed UK FAQs", "https://www.wahed.com/uk/faqs"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
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
      {
        requirement: "Islamic account",
        category: "other",
        mandatory: true,
        notes:
          "Wahed’s managed portfolios are Shariah-screened and overseen by its Shariah Supervisory Board; account availability and product features vary by country.",
        source: source(
          "Wahed Shariah governance framework",
          "https://www.wahed.com/shariah",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Shariah-supervised portfolios; verify the applicable Shariah board and portfolio composition.",
      source: source("Wahed", "https://wahed.com"),
    },
    minimumInvestment:
      "Country-specific: RM50 for Wahed Malaysia’s Everyday Shariah Account; USD 100 for U.S. managed portfolios; GBP 50 for UK accounts",
    pros: [
      "Purpose-built Islamic investing platform",
      "Hands-off managed portfolios",
      "Beginner-friendly",
    ],
    cons: ["Limited control over individual holdings", "Management fees apply"],
    disclosureUrl: "https://wahed.com/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
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
      {
        code: "HK",
        name: "Hong Kong",
        access: "direct" as const,
        notes: "HKEX-listed stocks and ETFs, subject to account eligibility.",
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
        notes:
          "Bursa Malaysia Shariah ETFs are available; US-listed Shariah ETF access depends on account eligibility and current product availability.",
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
      supported: false,
      methodology:
        "No platform-level Shariah screening. Shariah eligibility depends on the individual instrument selected.",
      notes:
        "May provide access to Bursa Malaysia Shariah ETFs and, subject to account and market eligibility, selected US-listed Shariah ETFs. Users must verify each instrument, Shariah methodology, and purification arrangement.",
      source: source(
        "Shariah ETFs in Malaysia",
        "https://www.wahed.com/my/learn/robo/all-you-need-to-know-about-investing-in-shariah-etfs/",
        "research",
      ),
    },
    minimumInvestment: "1 Bursa Malaysia board lot",
    pros: [
      "Bursa Malaysia, US, and Hong Kong market access",
      "Potential access to Bursa Malaysia Shariah ETFs",
      "Low stated brokerage starting point",
    ],
    cons: [
      "Self-directed investing requires user research",
      "No confirmed platform-level Shariah screening or Islamic account",
      "Shariah eligibility depends on selected instruments",
    ],
    disclosureUrl: "https://www.rakutentrade.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
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
      {
        code: "SG",
        name: "Singapore",
        access: "direct" as const,
        notes: "SGX-listed stocks and ETFs, subject to account eligibility.",
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
      {
        code: "HK",
        name: "Hong Kong",
        access: "direct" as const,
        notes: "HKEX-listed stocks and ETFs, subject to account eligibility.",
        source: source("Moomoo Malaysia", "https://www.moomoo.com/my"),
      },
      {
        code: "CN",
        name: "China",
        access: "direct" as const,
        notes:
          "China A-share stocks, subject to account eligibility and applicable restrictions.",
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
        label: "Stock and ETF commission",
        value:
          "0 commission promotion for MY, US, SG, HK, and China A-share stocks and ETFs; standard and other fees may apply",
        currency: "MYR" as const,
        frequency: "per_trade" as const,
        conditions:
          "Promotional pricing, platform fees, regulatory charges, FX conversion, and product-specific charges may apply. Verify the current fee schedule before publishing.",
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
        "Provides a built-in filter to search Shariah-compliant stocks. Shariah eligibility for individual securities and ETFs is determined by the applicable index, Shariah board, and fund documentation—not by Moomoo.",
      notes:
        "Third-party research indicates access to Bursa Malaysia Shariah ETFs and selected US-listed Shariah ETFs. Users should verify each instrument’s Shariah methodology, purification arrangements, and current availability.",
      source: source(
        "Moomoo Malaysia — Shariah-compliant stocks",
        "https://www.moomoo.com/my",
      ),
    },
    minimumInvestment: "No stated minimum; instrument-level minimums apply",
    pros: [
      "Mobile-first experience",
      "Beginner-friendly interface",
      "Shariah filter and ETF access",
    ],
    cons: ["Self-directed platform", "Promotional pricing can change"],
    disclosureUrl: "https://www.moomoo.com/my",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
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
        notes:
          "Shariah Global Portfolio available to Malaysia-based investors.",
        source: source(
          "StashAway Malaysia",
          "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
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
        notes:
          "Shariah Global Portfolios may include halal ETFs across equities, sukuk, and gold; investors do not directly select individual ETFs.",
        source: source(
          "StashAway — Exploring Islamic Investment in Malaysia",
          "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Portfolio management fee",
        value:
          "Tiered management fee; verify the fee applicable to the selected Shariah Global Portfolio",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Fees may vary by portfolio, assets under management, and product. Underlying ETF expenses and other product charges may also apply.",
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
      {
        requirement: "Islamic account",
        category: "other",
        mandatory: true,
        notes:
          "StashAway offers Shariah-compliant Global Portfolios, certified by Masryef Advisory. Investors must select the Shariah portfolio; it is not automatically applied to every StashAway account or product.",
        source: source(
          "StashAway — Exploring Islamic Investment in Malaysia",
          "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Shariah-compliant Global Portfolios provide diversified exposure to halal ETFs across equities, sukuk, and gold. Portfolios are certified by Masryef Advisory, an SC-registered Shariah advisory firm, and include purification where required.",
      notes:
        "Islamic treatment applies to the selected Shariah Global Portfolio, not automatically to all StashAway accounts or products. Verify the current portfolio composition, underlying ETFs, certification status, and purification disclosures before investing.",
      source: source(
        "StashAway — Exploring Islamic Investment in Malaysia",
        "https://www.stashaway.my/r/exploring-islamic-investment-malaysia",
      ),
    },
    minimumInvestment:
      "No platform minimum for managed portfolios; instrument-level and product-specific minimums may apply",
    pros: [
      "Hands-off managed investing",
      "Diversified Shariah-focused portfolio",
      "Malaysia availability",
    ],
    cons: ["Limited control over individual holdings", "Management fees apply"],
    disclosureUrl: "https://www.stashaway.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
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
        notes:
          "Bursa Malaysia-listed Shariah ETFs with Malaysian, US, and Southeast Asian exposure.",
        source: source("Eq8 Capital", "https://www.eq8.com.my/"),
      },
    ],
    assetTypes: [
      {
        type: "etfs" as const,
        supported: true,
        notes:
          "Bursa Malaysia-listed Shariah ETFs, including Malaysian, US, Southeast Asian, and waqf-featured exposure.",
        source: source("Eq8 Capital", "https://www.eq8.com.my/"),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "ETF management fee",
        value: "Fund-specific: 0.40% to 0.65% per year",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Management fees vary by ETF. Total annual fund charges also include trustee and index-license fees; investors may incur brokerage and other trading charges.",
        source: source(
          "Eq8 fund fee and charges",
          "https://www.eq8.com.my/eq8-dow-jones-islamic-market-malaysia-titans-25-etf",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Brokerage account with Bursa Malaysia access",
        category: "brokerage",
        mandatory: true,
        notes:
          "Eq8 ETFs trade on Bursa Malaysia like shares. Some ETFs have a 100-unit board lot; verify the applicable lot size and currency before trading.",
        source: source(
          "Eq8 — How to invest",
          "https://www.eq8.com.my/how-to-invest",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Eq8’s Islamic ETFs track Shariah-screened indices, including Dow Jones Islamic Market and MSCI Islamic indices. Fund-level Shariah requirements and oversight are set out in each fund’s deed and prospectus.",
      notes:
        "Islamic status applies to the individual Shariah ETF, not automatically to every Eq8 product or to the brokerage account used to trade it. Verify the current fund documentation, index methodology, and purification arrangements.",
      source: source(
        "Eq8 Dow Jones Islamic Market Malaysia Titans 25 ETF",
        "https://www.eq8.com.my/eq8-dow-jones-islamic-market-malaysia-titans-25-etf",
      ),
    },
    minimumInvestment:
      "One applicable Bursa Malaysia board lot; several Eq8 ETFs use a 100-unit board lot",
    pros: [
      "Listed Shariah ETF options on Bursa Malaysia",
      "Malaysian, US, and Southeast Asian exposure",
      "Fund-level fees and holdings are publicly disclosed",
    ],
    cons: [
      "Requires a brokerage account with Bursa Malaysia access",
      "ETF prices can fluctuate and liquidity varies by fund",
      "Islamic status must be checked fund by fund",
    ],
    disclosureUrl: "https://www.eq8.com.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "public-mutual",
    name: "Public Mutual",
    type: "managed_portfolio" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes:
          "Islamic unit trusts available to eligible Malaysia-based and non-resident investors.",
        source: source(
          "Public Mutual investor guide",
          "https://www.publicmutual.com.my/pmb/investor-guide-investment",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Islamic equity, mixed-asset/balanced, sukuk, and money-market unit trust funds.",
        source: source(
          "Public Mutual Shariah-compliant unit trusts",
          "https://www.publicmutual.com.my/pmb/shariah-compliant",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Fund management fee",
        value: "Fund-specific; commonly up to 1.50% per year for equity funds",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Sales charges, trustee fees, switching or transfer charges, and other fund-level costs may apply. Verify the Product Highlights Sheet and prospectus for the selected fund.",
        source: source(
          "PB Islamic Equity Fund fees and charges",
          "https://www.publicmutual.com.my/Product-Highlight?sc=63&langcode=E",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source(
          "Public Mutual investor guide",
          "https://www.publicmutual.com.my/pmb/investor-guide-investment",
        ),
      },
      {
        requirement: "Eligibility to invest with Public Mutual",
        category: "residency",
        mandatory: true,
        notes:
          "Individuals aged 18 and above, including Malaysians and non-residents, may invest. Online registration is limited to Malaysian residents aged 18 or above with a local bank account; non-residents should register through a consultant, branch, or customer-service centre.",
        source: source(
          "Public Mutual investor guide",
          "https://www.publicmutual.com.my/pmb/investor-guide-investment",
        ),
      },
      {
        requirement: "Islamic fund selection",
        category: "other",
        mandatory: true,
        notes:
          "Public Mutual offers more than 60 Shariah-compliant unit trust funds across Islamic equity, mixed-asset/balanced, sukuk, and money-market categories. Investors must select an Islamic fund; not all Public Mutual funds are Shariah-compliant.",
        source: source(
          "Public Mutual Shariah-compliant unit trusts",
          "https://www.publicmutual.com.my/pmb/shariah-compliant",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic unit trusts are advised by ZICO Shariah Advisory Services Sdn Bhd, an SC-registered Shariah adviser. Funds invest in accordance with the applicable Shariah mandate, including reclassification and purification processes.",
      notes:
        "Islamic status is fund-specific. Verify the selected fund’s prospectus, Product Highlights Sheet, Shariah adviser, investment mandate, and purification disclosures before investing.",
      source: source(
        "Public Mutual Shariah adviser",
        "https://www.publicmutual.com.my/pmb/shariah-adviser",
      ),
    },
    minimumInvestment:
      "Fund-specific: commonly RM1,000 initial investment for unit trusts; selected Islamic funds may allow RM100 via Public Mutual Online; PRS Islamic funds may have lower contribution minimums",
    pros: [
      "Established Malaysian fund manager",
      "More than 60 Shariah-compliant fund options",
      "Islamic equity, sukuk, balanced, and money-market choices",
      "Locally accessible through consultants, branches, and online channels",
    ],
    cons: [
      "Investors must select an Islamic fund; conventional funds are also offered",
      "Sales charges and ongoing fees can be material",
      "Fees, mandates, minimums, and performance vary by fund",
    ],
    disclosureUrl: "https://www.publicmutual.com.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "bimb-investment",
    name: "BIMB Investment",
    type: "managed_portfolio" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes:
          "Islamic unit trusts, wholesale funds, private mandates, and the BEST digital investment service for Malaysia-based investors.",
        source: source(
          "BIMB Investment funds",
          "https://bimbinvestment.com.my/funds",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Islamic equity, mixed-asset, fixed-income, money-market, SRI, and waqf-featured funds.",
        source: source(
          "BIMB Investment funds",
          "https://bimbinvestment.com.my/funds",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Fund management fee",
        value:
          "Fund-specific; BEST portfolio management fee is 0.5% per year for money-market funds and 1.5% per year for other portfolios",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Fund prospectuses may permit annual management fees up to 1.80% or 2.00% of NAV, plus trustee and other charges. Verify the selected fund’s Product Highlights Sheet and prospectus.",
        source: source(
          "BIMB Investment prospectus",
          "https://www.bimbinvestment.com.my/public/files/254476511f425013e64f824e953d3b01d9a9c64f1369633080584dbd105d59fd.pdf",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("BIMB Investment", "https://bimbinvestment.com.my/"),
      },
      {
        requirement: "Eligibility to invest through the selected channel",
        category: "residency",
        mandatory: true,
        notes:
          "Availability, documentation, and onboarding requirements differ between Bank Islam branch/relationship-manager channels and the BEST digital service. Verify eligibility directly before applying.",
        source: source(
          "BIMB Investment BEST",
          "https://bimbinvestment.com.my/best",
        ),
      },
      {
        requirement: "Islamic investment",
        category: "other",
        mandatory: true,
        notes:
          "BIMB Investment’s funds and BEST-listed investments are Shariah-compliant. BIMB Securities Sdn Bhd is the appointed Shariah Adviser and reviews fund investments monthly.",
        source: source(
          "BIMB Investment Shariah adviser",
          "https://bimbinvestment.com.my/shariah-adviser",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "BIMB Securities Sdn Bhd is appointed Shariah Adviser for BIMB Investment’s funds and private mandates. It reviews investments monthly to support Shariah compliance, while the fund manager retains ultimate responsibility for compliance.",
      notes:
        "Islamic status applies to BIMB Investment’s Shariah-compliant funds and BEST-listed investments. Verify the selected fund’s prospectus, Shariah mandate, purification arrangements, and current fund documentation.",
      source: source(
        "BIMB Investment Shariah adviser",
        "https://bimbinvestment.com.my/shariah-adviser",
      ),
    },
    minimumInvestment:
      "Fund- and channel-specific: BIMB Opportunities Fund starts from RM500 initial and RM200 additional; BEST starts from RM10; Makmur myWakaf Fund has used RM200 initial investment",
    pros: [
      "Bank Islam subsidiary focused on Shariah-compliant investing",
      "Multiple Islamic fund categories, including SRI and waqf-featured funds",
      "BEST digital option starts from RM10 with zero sales charge",
      "Named Shariah adviser with monthly investment review",
    ],
    cons: [
      "Fund-level due diligence is still required",
      "Management fees, trustee fees, liquidity, and minimums vary by fund",
      "Some channels require branch or relationship-manager onboarding",
    ],
    disclosureUrl: "https://bimbinvestment.com.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "maybank-asset-management",
    name: "Maybank Asset Management",
    type: "managed_portfolio" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes:
          "Islamic unit trusts, wholesale funds, and discretionary portfolio mandates available in Malaysia.",
        source: source(
          "Maybank Asset Management list of funds",
          "https://www.maybank-am.com.my/list-of-funds",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Islamic equity, balanced, fixed-income/sukuk, money-market, and discretionary portfolio offerings.",
        source: source(
          "Maybank Asset Management Islamic funds",
          "https://www.maybank-am.com/web/islamic/list-of-funds",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Fund management fee",
        value:
          "Fund-specific: 0.25% to 1.50% per year across selected Islamic funds",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Sales charges, trustee fees, switching fees, transfer fees, and other fund-level costs may apply. Verify the selected fund’s Product Highlights Sheet and prospectus.",
        source: source(
          "Maybank Income Flow-I Fund",
          "https://www.maybank-am.com.my/list-of-funds/-/fund/view_entry/493",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source(
          "Maybank Asset Management list of funds",
          "https://www.maybank-am.com.my/list-of-funds",
        ),
      },
      {
        requirement: "Eligibility to invest through the selected channel",
        category: "residency",
        mandatory: true,
        notes:
          "Maybank AM’s Malaysian unit trust and wholesale fund offerings are available in Malaysia. Applications must be submitted through the applicable Maybank AM process; discretionary mandates may have separate eligibility requirements.",
        source: source(
          "Maybank Asset Management list of funds",
          "https://www.maybank-am.com.my/list-of-funds",
        ),
      },
      {
        requirement: "Islamic fund selection",
        category: "other",
        mandatory: true,
        notes:
          "Maybank AM offers Shariah-compliant unit trusts and other Islamic investment solutions. Investors must select an Islamic fund or mandate; not all Maybank AM products are Shariah-compliant.",
        source: source(
          "Maybank Asset Management Islamic",
          "https://www.maybank-am.com/web/islamic/",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Islamic funds are certified as Shariah-compliant by the appointed Shariah Adviser. Maybank Islamic Berhad advises several Islamic funds, while Amanie Advisors Sdn Bhd advises other Maybank AM Shariah funds.",
      notes:
        "Islamic status is fund-specific. Verify the selected fund’s prospectus, Product Highlights Sheet, Shariah adviser, investment mandate, and purification disclosures before investing.",
      source: source(
        "Maybank Asset Management Shariah advisers",
        "https://www.maybank-am.com.my/our-people",
      ),
    },
    minimumInvestment:
      "Fund-specific; verify the selected fund’s Product Highlights Sheet. Maybank Shariah Enhanced Cash Fund has no stated minimum on its fund page",
    pros: [
      "Established Malaysian asset manager with Islamic fund range",
      "Islamic equity, balanced, sukuk, and money-market options",
      "Named Shariah advisers, including Maybank Islamic and Amanie Advisors",
      "Discretionary Shariah portfolio mandate available through Maybank channels",
    ],
    cons: [
      "Investors must select an Islamic fund; conventional products are also offered",
      "Fees, sales charges, minimums, and liquidity vary by fund",
      "Fund pages do not consistently disclose minimum investment amounts",
    ],
    disclosureUrl: "https://www.maybank-am.com.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "principal-malaysia",
    name: "Principal Malaysia",
    type: "managed_portfolio" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes:
          "Islamic unit trusts, PRS funds, EPF i-Invest options, and wholesale funds available in Malaysia.",
        source: source(
          "Principal Malaysia Islamic Solutions",
          "https://www.principal.com.my/en/islamic-solutions",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Islamic money-market, sukuk, balanced, global multi-asset, responsible-equity, and wholesale fund-of-funds offerings.",
        source: source(
          "Principal Malaysia Islamic Solutions",
          "https://www.principal.com.my/en/islamic-solutions",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Fund management fee",
        value:
          "Fund-specific: 0.40% to 3.00% per year maximum, depending on the fund and share class",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Application fees, trustee fees, switching fees, transfer fees, and other charges may apply. Verify the selected fund’s Product Highlights Sheet and prospectus.",
        source: source(
          "Principal Islamic Money Market Fund annual report",
          "https://www.principal.com.my/sites/default/files/fund-documents/Malaysia%20Site/en_Principal_Islamic_Money_Market_Fund_IR.pdf",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("Principal Malaysia", "https://www.principal.com.my"),
      },
      {
        requirement: "Eligibility to invest through the selected channel",
        category: "residency",
        mandatory: true,
        notes:
          "Eligibility, documentation, and minimums differ by fund, share class, and channel. EPF i-Invest funds require EPF eligibility and may have a higher minimum investment.",
        source: source(
          "Principal Islamic Global Multi-Asset Fund",
          "https://www.principal.com.my/en/igma-myr",
        ),
      },
      {
        requirement: "Islamic fund selection",
        category: "other",
        mandatory: true,
        notes:
          "Principal Malaysia offers Shariah-compliant Islamic Solutions across money-market, sukuk, balanced, global multi-asset, and responsible-equity funds. Investors must select an Islamic fund; not all Principal products are Shariah-compliant.",
        source: source(
          "Principal Malaysia Islamic Solutions",
          "https://www.principal.com.my/en/islamic-solutions",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Principal’s Islamic funds are managed under Shariah principles and advised by Amanie Advisors Sdn Bhd, an SC-registered Shariah advisory company. The adviser reviews compliance reports and transaction reports and certifies Shariah compliance in fund reports.",
      notes:
        "Islamic status is fund-specific. Verify the selected fund’s prospectus, Product Highlights Sheet, Shariah adviser, investment mandate, and purification disclosures before investing.",
      source: source(
        "Principal Islamic — Shariah adviser",
        "https://www.principalislamic.com/en/about-us/expertise-experience-islamic",
      ),
    },
    minimumInvestment:
      "Fund-specific: RM100 initial and additional investment for selected retail Islamic funds; RM500 for Principal Islamic Lifetime Balanced Fund; RM5,000 for selected wholesale Islamic funds",
    pros: [
      "Established Malaysian fund manager with a dedicated Islamic Solutions range",
      "Islamic money-market, sukuk, balanced, global multi-asset, and responsible-equity options",
      "Selected retail Islamic funds accept RM100 initial investment",
      "Named SC-registered Shariah adviser, Amanie Advisors",
    ],
    cons: [
      "Investors must select an Islamic fund; conventional products are also offered",
      "Application fees can be up to 5% or 6.5% depending on the fund",
      "Management fees, minimums, liquidity, and eligibility vary by fund and share class",
    ],
    disclosureUrl: "https://www.principal.com.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "kenanga-investors",
    name: "Kenanga Investors",
    type: "managed_portfolio" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes:
          "Islamic unit trusts, PRS funds, EPF i-Invest options, alternative funds, and portfolio-management services for Malaysia-based investors.",
        source: source(
          "Kenanga Investors",
          "https://www.kenangainvestors.com.my",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Islamic equity, balanced, fixed-income/sukuk, money-market, global Islamic, Asia-Pacific Islamic, absolute-return, and waqf-featured funds.",
        source: source(
          "Kenanga Investors Shariah adviser",
          "https://www.kenangainvestors.com.my/shariah-adviser",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Fund management fee",
        value:
          "Fund-specific: commonly 1.20% to 1.90% per year; selected alternative Islamic funds may charge up to 1.80% per year",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Entry fees may reach 5.50% for cash investments or 3.00% for EPF investments, depending on the fund. Trustee, switching, transfer, and other charges may also apply.",
        source: source(
          "Kenanga Syariah Growth Fund",
          "https://www.kenangainvestors.com.my/kenanga-syariah-growth-fund",
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
      {
        requirement: "Eligibility to invest through the selected channel",
        category: "residency",
        mandatory: true,
        notes:
          "Eligibility and documentation differ by product and channel. Unit trusts, PRS funds, EPF i-Invest, private wealth, and alternative funds may have separate requirements; verify directly before applying.",
        source: source(
          "Kenanga Investors",
          "https://www.kenangainvestors.com.my",
        ),
      },
      {
        requirement: "Islamic fund selection",
        category: "other",
        mandatory: true,
        notes:
          "Kenanga Investors offers Shariah-compliant unit trusts and PRS funds across equity, balanced, fixed-income, money-market, global, Asia-Pacific, absolute-return, and waqf categories. Investors must select an Islamic fund; not all Kenanga products are Shariah-compliant.",
        source: source(
          "Kenanga Investors Shariah adviser",
          "https://www.kenangainvestors.com.my/shariah-adviser",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Kenanga Investment Bank Berhad is the appointed Shariah Adviser for Kenanga’s Islamic unit trust and PRS funds. It reviews fund investments monthly, reviews compliance and transaction reports, and certifies Shariah compliance in periodic fund reports.",
      notes:
        "Islamic status is fund-specific. Verify the selected fund’s prospectus, Product Highlights Sheet, Shariah adviser, investment mandate, and purification disclosures before investing.",
      source: source(
        "Kenanga Investors Shariah adviser",
        "https://www.kenangainvestors.com.my/shariah-adviser",
      ),
    },
    minimumInvestment:
      "Fund-specific: commonly RM1,000 initial and RM100 additional for retail Islamic unit trusts; RM5,000 initial for selected alternative Islamic funds",
    pros: [
      "Established Malaysian fund manager with a broad Islamic fund range",
      "Named SC-registered Shariah adviser with monthly investment review",
      "Islamic equity, balanced, sukuk, money-market, global, and waqf options",
      "RM100 additional-investment minimum supports recurring investing",
    ],
    cons: [
      "Investors must select an Islamic fund; conventional products are also offered",
      "Entry fees can reach 5.50% for cash investments, depending on the fund",
      "Management fees, minimums, liquidity, and performance vary by fund",
    ],
    disclosureUrl: "https://www.kenangainvestors.com.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "aham-capital",
    name: "AHAM Capital",
    type: "managed_portfolio" as const,
    countries: ["MY"],
    markets: [
      {
        code: "MY",
        name: "Malaysia",
        access: "direct" as const,
        notes:
          "Islamic unit trusts, PRS funds, EPF i-Invest options, wholesale funds, and private wealth solutions available in Malaysia.",
        source: source(
          "AHAM Capital list of funds",
          "https://aham.com.my/invest-with-us/list-of-funds",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Islamic equity, money-market, sukuk/fixed-income, gold, global multi-thematic, and fund-of-funds offerings through AIIMAN Asset Management.",
        source: source("AIIMAN Asset Management", "https://aiiman.com/"),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Fund management fee",
        value:
          "Fund-specific: commonly 0.50% to 1.50% per year for retail Islamic funds",
        currency: "MYR" as const,
        frequency: "per_year" as const,
        conditions:
          "Sales charges vary by channel: up to 6.50% through IUTA platforms, up to 5.50% through AHAM/internal channels, and capped at 3% for EPF MIS purchases in eligible funds. Trustee, switching, and other charges may apply.",
        source: source(
          "AHAM Aiiman Quantum Fund",
          "https://aiiman.com/invest-with-us/list-of-funds/aeqfhif/",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source("AHAM Capital", "https://aham.com.my/"),
      },
      {
        requirement: "Eligibility to invest through the selected channel",
        category: "residency",
        mandatory: true,
        notes:
          "Eligibility, documentation, and minimums differ by fund, share class, and channel. EPF i-Invest purchases require EPF eligibility and may have different sales-charge limits.",
        source: source(
          "AHAM Aiiman Quantum Fund",
          "https://aiiman.com/invest-with-us/list-of-funds/aeqfhif/",
        ),
      },
      {
        requirement: "Islamic fund selection",
        category: "other",
        mandatory: true,
        notes:
          "AHAM Capital offers Shariah-compliant funds through AIIMAN Asset Management, including equity, money-market, gold, global multi-thematic, and fund-of-funds products. Investors must select an Islamic fund; not all AHAM products are Shariah-compliant.",
        source: source("AIIMAN Asset Management", "https://aiiman.com/"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "AIIMAN’s Shariah-compliant funds are advised by Amanie Advisors Sdn Bhd, an SC-registered Shariah advisory firm. Amanie reviews Shariah compliance and fund investments; AHAM states that portfolio holdings are screened against the SC Shariah Advisory Council compliant list.",
      notes:
        "Islamic status is fund-specific. Verify the selected fund’s prospectus, Product Highlights Sheet, Shariah adviser, investment mandate, and purification disclosures before investing.",
      source: source(
        "AHAM Aiiman Quantum Fund — Shariah adviser",
        "https://aiiman.com/invest-with-us/list-of-funds/aeqfhif/",
      ),
    },
    minimumInvestment:
      "Fund-specific: commonly RM1,000 initial and RM100 additional for retail Islamic funds; selected global Islamic funds may use USD 100 minimums",
    pros: [
      "Dedicated Islamic investment arm, AIIMAN Asset Management",
      "Islamic equity, money-market, gold, global thematic, and fund-of-funds options",
      "Named SC-registered Shariah adviser, Amanie Advisors",
      "Bank Islam distribution expands access to Shariah-compliant funds",
    ],
    cons: [
      "Investors must select an Islamic fund; conventional products are also offered",
      "Sales charges vary materially by channel and can reach 6.50%",
      "Management fees, minimums, liquidity, and performance vary by fund",
    ],
    disclosureUrl: "https://aham.com.my/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "sp-funds",
    name: "SP Funds",
    type: "etf_provider" as const,
    countries: ["US", "MY"],
    markets: [
      {
        code: "US",
        name: "United States",
        access: "direct" as const,
        notes:
          "NYSE-listed Shariah-compliant ETFs, including SPUS, SPSK, SPRE, SPTE, and SPWO.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
      {
        code: "MY",
        name: "Malaysia",
        access: "indirect" as const,
        notes:
          "Access depends on whether the investor’s brokerage supports trading the relevant NYSE-listed ETF and applicable cross-border restrictions.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
    ],
    assetTypes: [
      {
        type: "etfs" as const,
        supported: true,
        notes:
          "Shariah-compliant ETFs covering US large-cap equities, global sukuk, global REITs, global technology, and international developed/emerging-market equities.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "ETF expense ratio",
        value: "0.45% to 0.55% per year, depending on the ETF",
        currency: "USD" as const,
        frequency: "per_year" as const,
        conditions:
          "Verify the current expense ratio for each fund. Brokerage commissions, FX conversion, bid-ask spreads, and other trading costs also apply.",
        source: source(
          "SP Funds S&P 500 Sharia Industry Exclusions ETF (SPUS)",
          "https://www.sp-funds.com/spus/",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement:
          "Brokerage account with access to the relevant ETF listing",
        category: "brokerage",
        mandatory: true,
        notes:
          "SP Funds ETFs trade on NYSE. Malaysian investors need a brokerage account that supports US-listed securities; availability, trading hours, currency conversion, and fees depend on the broker.",
        source: source("SP Funds", "https://www.sp-funds.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "SP Funds offers Shariah-compliant ETFs screened under AAOIFI-aligned principles. SPUS tracks the S&P 500 Sharia Industry Exclusions Index, comprising approximately 200 S&P 500 companies that meet Shariah business-activity and financial-ratio criteria.",
      notes:
        "Islamic status applies to the individual ETF, not automatically to every brokerage account or SP Funds product. Verify each fund’s prospectus, index methodology, Shariah oversight, holdings, and published purification factor before investing.",
      source: source(
        "SP Funds S&P 500 Sharia Industry Exclusions ETF (SPUS)",
        "https://www.sp-funds.com/spus/",
      ),
    },
    minimumInvestment:
      "One ETF share or the investor’s brokerage minimum; fractional-share availability depends on the broker",
    pros: [
      "Purpose-built Shariah-compliant ETF family",
      "US, sukuk, REIT, technology, and international equity exposure",
      "SPUS has a published 0.45% expense ratio",
      "Suitable for self-directed ETF investors",
    ],
    cons: [
      "Malaysian access depends on broker support for US-listed ETFs",
      "Currency conversion and trading costs may apply",
      "ETF prices can fluctuate and holdings are rebalanced periodically",
    ],
    disclosureUrl: "https://www.sp-funds.com/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
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
        notes:
          "Islamic UCITS ETFs with global Shariah-screened equity exposure.",
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
      supported: false,
      methodology: undefined,
      notes:
        "No Amundi Islamic or Shariah-compliant ETF could be verified in the available sources. Do not treat Amundi’s general ETF range as Shariah-compliant.",
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
    isAffiliated: false,
    lastReviewedAt,
    status: "draft",
  },

  {
    slug: "ishares-islamic-etfs",
    name: "iShares Islamic ETFs",
    type: "etf_provider" as const,
    countries: ["US", "GB", "MY"],
    markets: [
      {
        code: "GB",
        name: "United Kingdom",
        access: "indirect" as const,
        notes:
          "UCITS Islamic ETFs, including iShares MSCI World Islamic UCITS ETF (ISWD), may be accessible through eligible UK brokers.",
        source: source(
          "iShares MSCI World Islamic UCITS ETF",
          "https://www.ishares.com/uk/individual/en/products/251394/ishares-msci-world-islamic-ucits-etf",
        ),
      },
      {
        code: "US",
        name: "United States",
        access: "indirect" as const,
        notes:
          "Islamic ETF access depends on the investor’s broker and the relevant fund’s US listing or cross-listing availability.",
        source: source("iShares", "https://www.ishares.com"),
      },
      {
        code: "MY",
        name: "Malaysia",
        access: "indirect" as const,
        notes:
          "Access depends on whether the investor’s brokerage supports the relevant UCITS or US listing and applicable cross-border restrictions.",
        source: source("iShares", "https://www.ishares.com"),
      },
    ],
    assetTypes: [
      {
        type: "etfs" as const,
        supported: true,
        notes:
          "Islamic UCITS ETFs tracking MSCI Islamic indexes, including developed-market and emerging-market equity exposure.",
        source: source(
          "iShares MSCI World Islamic UCITS ETF",
          "https://www.ishares.com/uk/individual/en/products/251394/ishares-msci-world-islamic-ucits-etf",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "ETF expense ratio",
        value:
          "ETF-specific: 0.30% to 0.35% per year for the verified MSCI Islamic UCITS ETFs",
        currency: "USD" as const,
        frequency: "per_year" as const,
        conditions:
          "Verify the expense ratio, listing venue, currency class, and brokerage charges for each specific fund.",
        source: source(
          "iShares MSCI World Islamic UCITS ETF",
          "https://www.ishares.com/uk/individual/en/products/251394/ishares-msci-world-islamic-ucits-etf",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement:
          "Brokerage account with access to the relevant ETF listing",
        category: "brokerage",
        mandatory: true,
        notes:
          "iShares Islamic ETFs trade on exchanges such as LSE and SIX. Malaysian investors need a broker that supports the relevant overseas listing; availability, currency conversion, and fees depend on the broker.",
        source: source(
          "iShares MSCI World Islamic UCITS ETF",
          "https://www.ishares.com/uk/individual/en/products/251394/ishares-msci-world-islamic-ucits-etf",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "iShares Islamic ETFs track MSCI Islamic indexes, which apply Shariah-based business-activity and financial-ratio screens and are overseen by MSCI’s Shariah advisers’ committee.",
      notes:
        "Islamic status applies to the individual ETF, not automatically to every iShares product or brokerage account. Verify the fund’s prospectus, index methodology, Shariah oversight, holdings, and purification disclosures before investing.",
      source: source(
        "MSCI Islamic Index Series methodology",
        "https://www.msci.com/documents/10199/8a59e89f-5134-de21-6a03-082ecfaa9e42",
      ),
    },
    minimumInvestment:
      "One ETF share or the investor’s brokerage minimum; fractional-share availability depends on the broker",
    pros: [
      "Established global ETF issuer",
      "UCITS Islamic ETFs with developed-market and emerging-market exposure",
      "Transparent index-based methodology",
      "ISWD has a published 0.30% expense ratio",
    ],
    cons: [
      "Islamic ETF availability varies by market and broker",
      "Currency conversion and trading costs may apply",
      "ETF prices can fluctuate and holdings are rebalanced periodically",
    ],
    disclosureUrl: "https://www.ishares.com/",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "wealthsimple-halal",
    name: "Wealthsimple Halal",
    type: "robo_advisor" as const,
    countries: ["CA"],
    markets: [
      {
        code: "CA",
        name: "Canada",
        access: "direct" as const,
        notes:
          "Managed Halal portfolio available to eligible Canadian investors; compatible with eligible personal and registered accounts.",
        source: source(
          "Wealthsimple Halal investing",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Fully managed Halal portfolio using Wealthsimple Shariah World Equity Index ETF (WSHR), physical-gold ETF exposure, and non-interest-bearing cash depending on risk level.",
        source: source(
          "Wealthsimple — Understanding halal investing",
          "https://help.wealthsimple.com/hc/en-ca/articles/360058456273-Understanding-halal-investing",
        ),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes:
          "The managed Halal portfolio includes Wealthsimple’s Shariah-compliant WSHR ETF and may include a physical-gold ETF.",
        source: source(
          "Wealthsimple — Understanding halal investing",
          "https://help.wealthsimple.com/hc/en-ca/articles/360058456273-Understanding-halal-investing",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Managed Halal portfolio fee",
        value:
          "0.25% to 0.50% management expense ratio per year, depending on account tier and assets",
        currency: "CAD" as const,
        frequency: "per_year" as const,
        conditions:
          "The Halal portfolio includes WSHR, for which Wealthsimple receives part of the ETF MER. Verify the current all-in cost, underlying ETF fees, taxes, and any account-specific charges.",
        source: source(
          "Wealthsimple managed investing MER fees",
          "https://help.wealthsimple.com/hc/en-ca/articles/360056584334-Management-expense-ratio-MER-fees-for-managed-investing-portfolios",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Canadian residency and account eligibility",
        category: "residency",
        mandatory: true,
        source: source(
          "Wealthsimple Halal investing",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        source: source(
          "Wealthsimple Halal investing",
          "https://www.wealthsimple.com/en-ca/halal",
        ),
      },
      {
        requirement: "Islamic account",
        category: "other",
        mandatory: true,
        notes:
          "Wealthsimple offers a dedicated Halal managed portfolio. Investors must select the Halal portfolio; Wealthsimple’s other managed portfolios are not automatically Shariah-compliant.",
        source: source(
          "Wealthsimple — Understanding halal investing",
          "https://help.wealthsimple.com/hc/en-ca/articles/360058456273-Understanding-halal-investing",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "The Halal portfolio uses WSHR, which tracks the Dow Jones Islamic Market Developed Markets Quality and Low Volatility Index. Holdings are screened by Ratings Intelligence Partners, exclude prohibited industries and excessive leverage, and include quarterly dividend-purification information.",
      notes:
        "The portfolio may also include physical-gold ETF exposure certified under AAOIFI’s Shariah Standard on Gold and non-interest-bearing cash, depending on risk level. Verify the current portfolio composition, certification, and purification disclosures before investing.",
      source: source(
        "Wealthsimple — Understanding halal investing",
        "https://help.wealthsimple.com/hc/en-ca/articles/360058456273-Understanding-halal-investing",
      ),
    },
    minimumInvestment: "No account minimum",
    pros: [
      "Purpose-built managed Halal portfolio",
      "No account minimum",
      "Shariah-screened equity ETF with quarterly purification disclosures",
      "May include AAOIFI-certified physical-gold exposure",
    ],
    cons: [
      "Limited control over individual holdings",
      "Managed-portfolio fee applies in addition to underlying ETF costs",
      "Equity-heavy structure means higher risk than diversified conventional portfolios",
    ],
    disclosureUrl: "https://www.wealthsimple.com/en-ca/halal",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "manzil",
    name: "Manzil",
    type: "robo_advisor" as const,
    countries: ["CA"],
    markets: [
      {
        code: "CA",
        name: "Canada",
        access: "direct" as const,
        notes:
          "Manzil Invest/Corex offers Shariah-compliant managed portfolios to eligible Canadian investors, with registered and non-registered account options.",
        source: source("Manzil — Halal finance hub", "https://www.manzil.ca"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Diversified Shariah-compliant managed portfolios across geographies and asset classes, using AAOIFI-aligned compliance standards.",
        source: source(
          "Manzil Corex Halal Portfolio asset-class holdings",
          "https://help.manzil.ca/hc/en-us/articles/10297598108955-Corex-Halal-Portfolio-Asset-Class-Holdings",
        ),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Discretionary portfolio management fee",
        value: "0.60% per year of assets under management",
        currency: "CAD" as const,
        frequency: "per_year" as const,
        conditions:
          "The OneVest discretionary management fee includes custody and trade execution. Underlying third-party investment products also carry MERs, which may range from 0.60% to 1.28% per year depending on the model portfolio. Management fees are subject to provincial sales taxes.",
        source: source(
          "Manzil Invest fee schedule",
          "https://help.manzil.ca/hc/en-us/articles/9879308592795-Fee-Schedule-for-Manzil-Invest",
        ),
      },
    ],
    accountRequirements: [
      {
        requirement: "Canadian residency and account eligibility",
        category: "residency",
        mandatory: true,
        source: source("Manzil — Halal finance hub", "https://www.manzil.ca"),
      },
      {
        requirement: "Identity and KYC verification",
        category: "identity",
        mandatory: true,
        notes:
          "Corex requires personal and financial information during sign-up; politically exposed persons and close associates must provide additional disclosures.",
        source: source(
          "Manzil — What information do I need to sign up?",
          "https://help.manzil.ca/hc/en-us/articles/9872219110043-What-information-do-I-need-to-sign-up",
        ),
      },
      {
        requirement: "Islamic account",
        category: "other",
        mandatory: true,
        notes:
          "Manzil Invest/Corex provides Shariah-compliant managed portfolios. Investors must select the Halal portfolio; Manzil’s other products, such as home financing and wills, are separate services.",
        source: source(
          "Manzil Corex Halal Portfolio asset-class holdings",
          "https://help.manzil.ca/hc/en-us/articles/10297598108955-Corex-Halal-Portfolio-Asset-Class-Holdings",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Corex Halal Portfolios use diversified investment products that meet Shariah compliance standards set by AAOIFI. Manzil states that its products are reviewed by its Shariah Supervisory Board and an external independent Shariah supervisory board.",
      notes:
        "The portfolios exclude interest-bearing instruments such as bonds and GICs, and managers estimate purification amounts under AAOIFI standards; clients remain responsible for donating any purification amount. Verify the current portfolio holdings, certificates, and purification disclosures before investing.",
      source: source(
        "Manzil Corex Halal Portfolio asset-class holdings",
        "https://help.manzil.ca/hc/en-us/articles/10297598108955-Corex-Halal-Portfolio-Asset-Class-Holdings",
      ),
    },
    minimumInvestment:
      "No minimum is stated in Manzil’s available Canadian fee and sign-up documentation; verify the current minimum during onboarding",
    pros: [
      "Purpose-built Canadian Shariah-compliant managed portfolios",
      "AAOIFI-aligned compliance framework and Shariah Supervisory Board oversight",
      "Supports Canadian registered and non-registered account routes",
      "Assets are held with CI Investment Services, a CIRO member and CIPF member",
    ],
    cons: [
      "Limited control over individual holdings",
      "0.60% management fee plus underlying product MERs can be material",
      "Purification amounts must be calculated and donated by the client",
      "Canadian minimum investment and exact portfolio availability should be confirmed at onboarding",
    ],
    disclosureUrl: "https://www.manzil.ca",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "questrade",
    name: "Questrade",
    type: "broker" as const,
    countries: ["CA"],
    markets: [
      {
        code: "CA",
        name: "Canada",
        access: "direct" as const,
        notes:
          "Canadian-listed securities and registered accounts, subject to account eligibility.",
        source: source("Questrade", "https://www.questrade.com"),
      },
      {
        code: "US",
        name: "United States",
        access: "direct" as const,
        notes:
          "US-listed stocks and ETFs, including Shariah-screened ETFs where available through the account.",
        source: source("Questrade", "https://www.questrade.com"),
      },
    ],
    assetTypes: [
      {
        type: "stocks" as const,
        supported: true,
        notes:
          "Self-directed equity trading; users must independently verify the Shariah eligibility of individual securities.",
        source: source("Questrade", "https://www.questrade.com"),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes:
          "Access to US-listed Shariah-screened ETFs such as SPUS and HLAL, subject to account and listing availability.",
        source: source(
          "Best halal investing apps in Canada",
          "https://lifemoney.ca/blog/best-halal-investing-apps-canada-2026",
          "research",
        ),
      },
    ],
    fees: [
      {
        kind: "trading" as const,
        label: "Stock and ETF commission",
        value: "CAD 0 commission on stocks and ETFs",
        currency: "CAD" as const,
        frequency: "per_trade" as const,
        conditions:
          "Regulatory fees, exchange fees, account-specific charges, and other product charges may apply. Verify the current fee schedule before publishing.",
        source: source("Questrade", "https://www.questrade.com"),
      },
      {
        kind: "fx" as const,
        label: "Currency conversion",
        value: "Variable FX conversion cost",
        frequency: "variable",
        conditions:
          "US-listed Shariah ETFs are USD-denominated. Confirm Questrade’s current currency-conversion spread and whether USD balances can be held to reduce conversion frequency.",
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
      methodology: undefined,
      notes:
        "Self-directed broker with no built-in Shariah screening or managed Halal portfolio. Users may access Shariah-screened ETFs such as SPUS and HLAL, but must independently verify each security, ETF, and purification disclosure.",
      source: source(
        "Best halal investing apps in Canada",
        "https://lifemoney.ca/blog/best-halal-investing-apps-canada-2026",
        "research",
      ),
    },
    minimumInvestment:
      "No stated platform minimum; instrument-level minimums and brokerage requirements apply",
    pros: [
      "Self-directed Canadian brokerage with Canadian and US market access",
      "Zero-commission stock and ETF trading",
      "Can hold Shariah-screened ETFs",
      "Supports registered accounts including RRSP, TFSA, and FHSA",
    ],
    cons: [
      "No built-in managed Halal portfolio or Shariah screening",
      "Users must independently verify individual securities and ETFs",
      "FX conversion can be a material cost for USD-listed ETFs",
    ],
    disclosureUrl: "https://www.questrade.com",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "amal-invest",
    name: "Amal Invest",
    type: "robo_advisor" as const,
    countries: ["GB"],
    markets: [
      {
        code: "GB",
        name: "United Kingdom",
        access: "indirect" as const,
        notes:
          "Shariah-screened fund guidance for eligible UK investors; investments are held in the user’s own Trading 212 or Alpaca brokerage account.",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
    ],
    assetTypes: [
      {
        type: "managed_portfolio" as const,
        supported: true,
        notes:
          "Provides guided Grow and Save portfolio allocations using Shariah-screened and purified mutual-fund holdings; Amal does not custody assets or execute trades.",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
    ],
    fees: [
      {
        kind: "platform" as const,
        label: "Platform access fee",
        value: "USD 249 one-time for Standard; USD 999 one-time for Pro",
        currency: "USD" as const,
        frequency: "one_time",
        conditions:
          "No Amal subscription or percentage-of-assets fee. Brokerage fees, fund expenses, FX conversion, and other broker or fund charges may still apply.",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
    ],
    accountRequirements: [
      {
        requirement: "Brokerage account with Trading 212 or Alpaca",
        category: "brokerage",
        mandatory: true,
        notes:
          "Amal does not hold client assets. Users must open and fund their own brokerage account; Amal provides screening, portfolio guidance, and rebalancing instructions.",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
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
        notes: "KYC is completed by the connected brokerage, not by Amal.",
        source: source("Amal Invest", "https://amalinvest.com"),
      },
      {
        requirement: "Islamic screening",
        category: "other",
        mandatory: true,
        notes:
          "Amal’s platform, Shariah screening methodology, and operational flow were reviewed by Amanah Advisors, which issued a Shariah compliance certificate. Holdings are screened bi-monthly, with annual audit.",
        source: source(
          "Amal Invest Shariah compliance certificate",
          "https://amalinvest.com/Amal-Invest-shariah-certificate-2026.pdf",
        ),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Amal applies continuous Shariah screening to holdings, re-screens every stock bi-monthly, and automatically sells and reinvests when a holding becomes non-compliant. Amanah Advisors reviewed the platform and issued a Shariah compliance certificate.",
      notes:
        "Amal also offers an optional BDS-based ‘genocide-free’ exclusion filter. This is an additional ethical exclusion layer, not a substitute for Shariah screening. Verify the current certificate, methodology, holdings, and purification arrangements before relying on the service.",
      source: source(
        "Amal Invest Shariah compliance certificate",
        "https://amalinvest.com/Amal-Invest-shariah-certificate-2026.pdf",
      ),
    },
    minimumInvestment:
      "No Amal minimum; the connected brokerage and selected funds may impose their own minimums",
    pros: [
      "Independent Shariah compliance certificate from Amanah Advisors",
      "Continuous bi-monthly holding re-screening",
      "Automatic sale and reinvestment when a holding becomes non-compliant",
      "One-time platform fee rather than an ongoing percentage fee",
      "User assets remain in their own brokerage account",
    ],
    cons: [
      "Requires a separate Trading 212 or Alpaca brokerage account",
      "Amal does not custody assets or execute trades itself",
      "Underlying fund expenses and brokerage costs still apply",
      "The optional genocide-free filter is an ethical overlay and may exclude holdings that pass a conventional Shariah screen",
    ],
    disclosureUrl: "https://amalinvest.com",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "cur8-capital",
    name: "Cur8 Capital",
    type: "managed_portfolio" as const,
    countries: ["GB", "US"],
    markets: [
      {
        code: "GB",
        name: "United Kingdom",
        access: "direct" as const,
        notes:
          "UK investors can access Shariah-screened private-market funds, including IF-ISA-eligible opportunities where available.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
      {
        code: "US",
        name: "United States",
        access: "direct" as const,
        notes:
          "Cur8 says investors can participate from outside the UK, including the US, subject to additional onboarding and local regulatory checks.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
    ],
    assetTypes: [
      {
        type: "other" as const,
        supported: true,
        notes:
          "Shariah-screened private-equity and venture-capital opportunities; long lock-up periods and high risk apply.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
      {
        type: "other" as const,
        supported: true,
        notes:
          "Property-backed fixed-income and private-credit opportunities with varying liquidity windows.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
      {
        type: "other" as const,
        supported: true,
        notes:
          "Shariah-screened real-estate and property-backed investment opportunities.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
      {
        type: "sukuk" as const,
        supported: true,
        notes:
          "Sukuk opportunities may be available through Cur8’s private-market offerings.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
    ],
    fees: [
      {
        kind: "management" as const,
        label: "Fund management and performance fees",
        value: "Fund-specific",
        currency: "GBP" as const,
        frequency: "variable",
        conditions:
          "Fees, performance fees, liquidity terms, minimums, and eligibility vary by investment. Review the individual fund campaign and offering documents before investing.",
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
        notes:
          "Cur8 is a high-risk private-markets platform. Investors must complete onboarding and suitability checks; non-UK residents may face additional regulatory checks.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
      {
        requirement: "Islamic investment",
        category: "other",
        mandatory: true,
        notes:
          "Cur8 screens every investment for Shariah compliance, ethics, and impact. Islamic treatment is investment-specific; investors should review each fund’s Shariah governance and offering documents.",
        source: source("Cur8 Capital", "https://cur8.capital"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Cur8 applies Shariah, ethical, and impact screening to investments on its platform. It offers private equity, venture capital, private credit/fixed income, real estate, and sukuk opportunities.",
      notes:
        "Islamic status and Shariah governance are fund-specific. Verify each opportunity’s offering documents, Shariah screening process, liquidity terms, fees, and risk disclosures before investing.",
      source: source("Cur8 Capital", "https://cur8.capital"),
    },
    minimumInvestment:
      "From GBP 5,000 for eligible funds; individual opportunities may have higher minimums",
    pros: [
      "Access to Shariah-screened private-market investments",
      "Private equity, venture capital, real estate, private credit, and sukuk exposure",
      "Low stated entry point of GBP 5,000 for eligible funds",
      "Some opportunities may be IF-ISA eligible",
      "Available to investors outside the UK, subject to onboarding and local rules",
    ],
    cons: [
      "High-risk, illiquid private-market investments",
      "Private-equity and venture-capital lock-ups can run 5–10 years",
      "Fund-specific fees, minimums, eligibility, and liquidity terms apply",
      "Capital is at risk and returns are not guaranteed",
    ],
    disclosureUrl: "https://cur8.capital",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "sarwa",
    name: "Sarwa",
    type: "broker" as const,
    countries: ["AE"],
    markets: [
      {
        code: "AE",
        name: "United Arab Emirates",
        access: "direct" as const,
        notes:
          "UAE-based investors can trade US stocks and ETFs through Sarwa Trade; managed investing and savings products are also offered.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
    ],
    assetTypes: [
      {
        type: "stocks" as const,
        supported: true,
        notes:
          "Thousands of US-listed stocks through Sarwa Trade; users must independently verify Shariah eligibility of individual securities.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes:
          "US-listed ETFs through Sarwa Trade; Shariah eligibility depends on the selected ETF.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
      {
        type: "crypto" as const,
        supported: true,
        notes:
          "Crypto trading is offered through Sarwa; crypto is generally not Shariah-compliant for Islamic investing purposes.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
    ],
    fees: [
      {
        kind: "trading" as const,
        label: "US stock and ETF commission",
        value: "AED 0 commission",
        currency: "AED" as const,
        frequency: "per_trade" as const,
        conditions:
          "No withdrawal fees and no transfer costs for AED accounts are advertised. Verify regulatory, exchange, FX, and other account charges before publishing.",
        source: source("Sarwa", "https://www.sarwa.co"),
      },
      {
        kind: "fx" as const,
        label: "Currency conversion",
        value: "Verify current FX pricing",
        frequency: "variable",
        conditions:
          "US-listed securities are USD-denominated; confirm the applicable AED-to-USD conversion cost and whether USD balances can be held.",
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
      supported: false,
      methodology: undefined,
      notes:
        "Sarwa states that it does not hold an Islamic Window endorsement from the ADGM Financial Services Regulatory Authority. Its platform includes conventional equities, ETFs, crypto, and savings products; users must independently verify whether any specific investment meets their Shariah requirements.",
      source: source("Sarwa", "https://www.sarwa.co"),
    },
    minimumInvestment:
      "No stated platform minimum; instrument-level and product-specific minimums may apply",
    pros: [
      "UAE-regulated platform for US stock and ETF trading",
      "Zero-commission US stock and ETF trading",
      "No withdrawal fees or transfer costs for AED accounts",
      "Combines trading, managed investing, and savings in one app",
    ],
    cons: [
      "No Islamic Window endorsement or confirmed Shariah-compliant portfolio",
      "Users must independently verify Shariah eligibility of securities and ETFs",
      "Crypto and conventional savings products may not meet Islamic investing requirements",
    ],
    disclosureUrl: "https://www.sarwa.co",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
  },

  {
    slug: "baraka",
    name: "Baraka",
    type: "broker" as const,
    countries: ["AE"],
    markets: [
      {
        code: "AE",
        name: "United Arab Emirates",
        access: "direct" as const,
        notes:
          "UAE and GCC investors can access US stocks and ETFs, local stocks, options, and physical gold through Baraka.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
    ],
    assetTypes: [
      {
        type: "stocks" as const,
        supported: true,
        notes:
          "Self-directed US and local stock investing, with a Sharia Filter for eligible equities.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
      {
        type: "etfs" as const,
        supported: true,
        notes:
          "US-listed ETF investing; Shariah screening applies to individual equities and ETFs only.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
      {
        type: "other" as const,
        supported: true,
        notes:
          "Options trading is available, but Shariah screening does not extend to options.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
      {
        type: "other" as const,
        supported: true,
        notes: "Physical-gold investing is available through the platform.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
    ],
    fees: [
      {
        kind: "trading" as const,
        label: "Trading commission",
        value: "Verify current commission and account pricing",
        currency: "AED" as const,
        frequency: "per_trade",
        conditions:
          "Verify commissions, FX conversion, regulatory charges, and any account-specific fees before publishing.",
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
      {
        requirement: "Islamic Window account",
        category: "other",
        mandatory: false,
        notes:
          "Baraka holds a DFSA Islamic Window endorsement and offers Shariah-compliant services to eligible clients through its Islamic Window, overseen by its Shariah Supervisory Board. Investors should confirm how to enable or access the Islamic Window before trading.",
        source: source("Baraka", "https://www.getbaraka.com"),
      },
    ],
    halalScreening: {
      supported: true,
      methodology:
        "Baraka provides a Sharia Filter for halal stock selection. Its Islamic Window is overseen by a Shariah Supervisory Board, while Shariah screening data is supplied by a third-party data provider.",
      notes:
        "Shariah screening applies to individual equities and ETFs only; it does not extend to bonds or options. Screening data is for reference, may not reflect the latest financial position, and is not a fatwa or personal religious advice. Clients remain responsible for ensuring investments match their religious obligations.",
      source: source("Baraka", "https://www.getbaraka.com"),
    },
    minimumInvestment:
      "No minimum stated on Baraka’s public site; verify current account and instrument-level minimums",
    pros: [
      "DFSA Islamic Window endorsement",
      "Built-in Sharia Filter for stocks and ETFs",
      "Shariah Supervisory Board oversight",
      "Access to US stocks and ETFs, local stocks, options, and physical gold",
    ],
    cons: [
      "Shariah screening does not cover options or bonds",
      "Screening data is third-party and may not reflect the latest financial position",
      "Users remain responsible for personal Shariah compliance",
      "Commission and FX costs should be verified before trading",
    ],
    disclosureUrl: "https://www.getbaraka.com",
    isAffiliated: false,
    lastReviewedAt,
    status: "published" as const,
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
