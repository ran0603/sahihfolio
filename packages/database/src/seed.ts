import { db } from "./index";
import { countries, providers, screeningReports, users } from "./schema";

export async function seed() {
  console.log("🌱 Seeding Sahihfolio database...");

  // Seed Users
  await db.insert(users).values([
    {
      id: "usr_admin_1",
      email: "admin@sahihfolio.com",
      name: "Sahihfolio Review Team",
      role: "admin",
    },
  ]).onConflictDoNothing();

  // Seed Countries
  await db.insert(countries).values([
    {
      code: "US",
      name: "United States",
      currency: "USD",
      region: "North America",
      regulatoryNotes: ["SEC regulated", "FINRA member brokers covered by SIPC insurance"],
      supportedProviders: ["Interactive Brokers", "Wahed Invest US"],
      restrictions: ["Strict accredited investor rules on private sukuk"],
      sourceUrls: ["https://www.sec.gov"],
    },
    {
      code: "GB",
      name: "United Kingdom",
      currency: "GBP",
      region: "Europe",
      regulatoryNotes: ["FCA regulated", "FSCS deposit and investment protection applies up to £85k"],
      supportedProviders: ["Wahed Invest UK", "Interactive Brokers UK", "AJ Bell"],
      restrictions: ["PRIIPs regulations restrict direct purchase of non-UCITS US ETFs"],
      sourceUrls: ["https://www.fca.org.uk"],
    },
    {
      code: "CA",
      name: "Canada",
      currency: "CAD",
      region: "North America",
      regulatoryNotes: ["CIRO regulated", "CIPF coverage applies"],
      supportedProviders: ["Interactive Brokers Canada", "Wealthsimple (halal portfolio)"],
      restrictions: ["Withholding tax on US dividends inside TFSA accounts"],
      sourceUrls: ["https://www.ciro.ca"],
    },
    {
      code: "MY",
      name: "Malaysia",
      currency: "MYR",
      region: "Southeast Asia",
      regulatoryNotes: ["Securities Commission Malaysia (SC) Shariah Advisory Council (SAC) publishes biannual lists"],
      supportedProviders: ["Bursa Marketplace brokers", "Wahed Invest Malaysia"],
      restrictions: ["Exchange control rules on foreign currency transfers"],
      sourceUrls: ["https://www.sc.com.my"],
    },
    {
      code: "SG",
      name: "Singapore",
      currency: "SGD",
      region: "Southeast Asia",
      regulatoryNotes: ["Monetary Authority of Singapore (MAS) regulated"],
      supportedProviders: ["Interactive Brokers SG", "Syfe"],
      restrictions: [],
      sourceUrls: ["https://www.mas.gov.sg"],
    },
  ]).onConflictDoNothing();

  // Seed Providers
  await db.insert(providers).values([
    {
      id: "prov_ibkr",
      name: "Interactive Brokers",
      slug: "interactive-brokers",
      type: "broker",
      countries: ["US", "GB", "CA", "SG", "AU"],
      markets: ["US", "UK", "EU", "HK", "SG", "JP", "CA"],
      assetTypes: ["stocks", "etfs"],
      halalScreening: {
        supported: false,
        notes: "Self-directed broker with broad global market access; user must verify stock compliance independently.",
        sourceUrl: "https://www.interactivebrokers.com",
      },
      fees: {
        trading: "From $0.005/share (US) or tiered commission",
        custody: "No inactivity fee",
        fx: "Spot rates + 0.03% to 0.20%",
      },
      minimumInvestment: "$0",
      accountRequirements: ["Valid government ID", "Proof of address", "Tax identification number"],
      pros: ["Extremely low FX fees", "Access to 150+ global exchanges", "Comprehensive UCITS & US ETF coverage"],
      cons: ["Interface has a steep learning curve for beginners", "No built-in Shariah screening filters"],
      websiteUrl: "https://www.interactivebrokers.com",
      disclosureUrl: "https://www.interactivebrokers.com/en/general/legal-documents.php",
      status: "published",
    },
    {
      id: "prov_wahed",
      name: "Wahed Invest",
      slug: "wahed-invest",
      type: "robo_advisor",
      countries: ["US", "GB", "MY", "AE"],
      markets: ["Global Shariah-compliant equity and Sukuk"],
      assetTypes: ["stocks", "etfs", "sukuk", "gold"],
      halalScreening: {
        supported: true,
        methodology: "AAOIFI-aligned Shariah Review Bureau oversight",
        notes: "Automated robo-advisor with certified Shariah board and automatic purification calculation.",
        sourceUrl: "https://www.wahed.com",
      },
      fees: {
        management: "0.49% to 0.99% annual AUM fee",
        other: "Underlying ETF expense ratios (~0.3% to 0.5%)",
      },
      minimumInvestment: "$100 (varies by country)",
      accountRequirements: ["Residency in operating country", "Bank account verification"],
      pros: ["100% Shariah-certified portfolios", "Automated rebalancing and purification reports", "Beginner-friendly app"],
      cons: ["Higher fee than self-directed indexing", "Limited portfolio customization"],
      websiteUrl: "https://www.wahed.com",
      disclosureUrl: "https://www.wahed.com/regulatory",
      status: "published",
    },
  ]).onConflictDoNothing();

  // Seed Screening Report
  await db.insert(screeningReports).values([
    {
      id: "rep_aapl_aaoifi",
      ticker: "AAPL",
      companyName: "Apple Inc.",
      exchange: "NASDAQ",
      assetType: "stock",
      country: "United States",
      sector: "Information Technology",
      screeningResult: "screened_compliant",
      methodology: "AAOIFI",
      status: "published",
      summaryExplanation:
        "Apple Inc. meets standard AAOIFI business-activity criteria. Core revenue derives from consumer hardware and software services. Minor non-permissible interest income is under 5% threshold; leverage and interest-bearing debt to market capitalization ratios remain within acceptable thresholds.",
      businessActivity: {
        status: "pass",
        impermissibleRevenueRatio: 0.015,
        thresholdRatio: 0.05,
        details: "Revenue from financial services (Apple Card interest) estimated at <1.5% of total revenue, below the 5% maximum impermissible revenue threshold.",
      },
      financialRatios: {
        status: "pass",
        debtToMarketCapRatio: 0.038,
        liquidAssetsRatio: 0.045,
        thresholds: {
          debtToMarketCapMax: 0.30,
          liquidAssetsMax: 0.30,
        },
        details: "Total interest-bearing debt divided by 24-month average market capitalization is 3.8%, well under the 30% limit under AAOIFI standard 21.",
      },
      sources: [
        {
          label: "Apple Inc. Form 10-K SEC Filing",
          url: "https://www.sec.gov/edgar/browse/?CIK=320193",
          sourceType: "regulatory_filing",
          retrievedAt: new Date().toISOString(),
        },
      ],
      reviewedBy: "Sahihfolio Research Desk",
      reviewedAt: new Date(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days validity
      disclaimer: "Informational research only. Methodology criteria reflect AAOIFI standard 21 guidelines. Not an individual Shariah verdict.",
    },
  ]).onConflictDoNothing();

  console.log("✅ Sahihfolio database seeded successfully!");
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seed failed:", err);
      process.exit(1);
    });
}
