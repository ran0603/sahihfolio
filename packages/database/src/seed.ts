import { db } from "./index";
import { countries, screeningReports, user } from "./schema";

type CountryInsert = typeof countries.$inferInsert;

const REVIEWED_AT = new Date("2026-10-15T00:00:00.000Z");
const RETRIEVED_AT = "2026-10-15T00:00:00.000Z";

type Source = {
  label: string;
  url: string;
  sourceType:
    "official" | "regulator" | "provider" | "news" | "research" | "other";
  retrievedAt: string;
  confidence: "high" | "medium" | "low";
};

function source(
  label: string,
  url: string,
  sourceType: Source["sourceType"] = "official",
): Source {
  return {
    label,
    url,
    sourceType,
    retrievedAt: RETRIEVED_AT,
    confidence: "high",
  };
}

export async function seed() {
  console.log("🌱 Seeding Sahihfolio database...");

  const countrySeed: CountryInsert[] = [
    {
      code: "US",
      name: "United States",
      currency: "USD" as const,
      regulatoryNotes: [
        {
          category: "licensing",
          summary: "Broker-dealers are regulated by the SEC and FINRA.",
          detail:
            "SIPC coverage may apply to eligible securities held through member brokers, subject to program limits and conditions.",
          appliesTo: ["retail"],
          source: source(
            "U.S. Securities and Exchange Commission",
            "https://www.sec.gov",
            "regulator",
          ),
        },
      ],
      restrictions: [
        {
          type: "product",
          summary:
            "Private sukuk and certain private placements may be restricted to accredited or qualified investors.",
          severity: "conditional",
          appliesTo: ["retail"],
          source: source(
            "U.S. Securities and Exchange Commission",
            "https://www.sec.gov",
            "regulator",
          ),
        },
      ],
      status: "published",
      lastReviewedAt: REVIEWED_AT,
    },
    {
      code: "GB",
      name: "United Kingdom",
      currency: "GBP",
      regulatoryNotes: [
        {
          category: "licensing",
          summary:
            "UK financial-services firms may be authorised and regulated by the Financial Conduct Authority.",
          detail:
            "FSCS protection can apply to eligible deposits and investments, subject to eligibility and limits.",
          appliesTo: ["retail"],
          source: source(
            "Financial Conduct Authority",
            "https://www.fca.org.uk",
            "regulator",
          ),
        },
      ],
      restrictions: [
        {
          type: "product",
          summary:
            "PRIIPs rules can restrict UK retail access to certain non-UCITS US ETFs.",
          severity: "conditional",
          appliesTo: ["retail"],
          source: source(
            "Financial Conduct Authority",
            "https://www.fca.org.uk",
            "regulator",
          ),
        },
      ],
      status: "published",
      lastReviewedAt: REVIEWED_AT,
    },
    {
      code: "CA",
      name: "Canada",
      currency: "CAD",
      regulatoryNotes: [
        {
          category: "licensing",
          summary: "Canadian investment dealers may be regulated by CIRO.",
          detail:
            "CIPF coverage may apply to eligible client assets held through member firms, subject to program limits.",
          appliesTo: ["retail"],
          source: source(
            "Canadian Investment Regulatory Organization",
            "https://www.ciro.ca",
            "regulator",
          ),
        },
      ],
      restrictions: [
        {
          type: "tax",
          summary:
            "US dividend withholding tax may apply to US-listed securities held in a TFSA.",
          severity: "informational",
          appliesTo: ["retail"],
          source: source(
            "Canada Revenue Agency",
            "https://www.canada.ca/en/revenue-agency.html",
            "regulator",
          ),
        },
      ],
      status: "published",
      lastReviewedAt: REVIEWED_AT,
    },
    {
      code: "MY",
      name: "Malaysia",
      currency: "MYR",
      regulatoryNotes: [
        {
          category: "licensing",
          summary:
            "The Securities Commission Malaysia regulates capital-market participants.",
          detail:
            "The SC Shariah Advisory Council publishes Shariah-compliant securities lists on a periodic basis.",
          appliesTo: ["retail"],
          source: source(
            "Securities Commission Malaysia",
            "https://www.sc.com.my",
            "regulator",
          ),
        },
      ],
      restrictions: [
        {
          type: "currency",
          summary:
            "Foreign-exchange controls may apply to certain cross-border transfers and investment transactions.",
          severity: "conditional",
          appliesTo: ["retail"],
          source: source(
            "Bank Negara Malaysia",
            "https://www.bnm.gov.my",
            "regulator",
          ),
        },
      ],
      status: "published",
      lastReviewedAt: REVIEWED_AT,
    },
    {
      code: "SG",
      name: "Singapore",
      currency: "SGD",
      regulatoryNotes: [
        {
          category: "licensing",
          summary:
            "Financial institutions may be regulated by the Monetary Authority of Singapore.",
          appliesTo: ["retail"],
          source: source(
            "Monetary Authority of Singapore",
            "https://www.mas.gov.sg",
            "regulator",
          ),
        },
      ],
      restrictions: [],
      status: "published",
      lastReviewedAt: REVIEWED_AT,
    },
  ];

  await db
    .insert(user)
    .values([
      {
        email: "admin@sahihfolio.com",
        name: "Sahihfolio Review Team",
        role: "admin",
      },
    ])
    .onConflictDoNothing();

  await db.insert(countries).values(countrySeed).onConflictDoNothing();

  await db
    .insert(screeningReports)
    .values([
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
          "Apple Inc. meets standard AAOIFI business-activity criteria. Core revenue derives from consumer hardware and software services. Minor non-permissible interest income is under the 5% threshold; leverage and interest-bearing debt to market capitalisation ratios remain within acceptable thresholds.",
        businessActivity: {
          status: "pass",
          impermissibleRevenueRatio: 0.015,
          thresholdRatio: 0.05,
          details:
            "Revenue from financial services, including Apple Card interest, is estimated below 1.5% of total revenue, under the 5% maximum impermissible-revenue threshold.",
        },
        financialRatios: {
          status: "pass",
          debtToMarketCapRatio: 0.038,
          liquidAssetsRatio: 0.045,
          thresholds: {
            debtToMarketCapMax: 0.3,
            liquidAssetsMax: 0.3,
          },
          details:
            "Total interest-bearing debt divided by 24-month average market capitalisation is 3.8%, below the 30% limit under AAOIFI Standard 21.",
        },
        sources: [
          {
            label: "Apple Inc. Form 10-K SEC filing",
            url: "https://www.sec.gov/edgar/browse/?CIK=320193",
            sourceType: "regulatory_filing",
            retrievedAt: RETRIEVED_AT,
          },
        ],
        reviewedBy: "Sahihfolio Research Desk",
        reviewedAt: REVIEWED_AT,
        expiresAt: new Date(REVIEWED_AT.getTime() + 90 * 24 * 60 * 60 * 1000),
        disclaimer:
          "Informational research only. Methodology criteria reflect AAOIFI Standard 21 guidelines. This is not an individual Shariah verdict.",
      },
    ])
    .onConflictDoNothing();

  console.log("✅ Sahihfolio database seeded successfully!");
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error: unknown) => {
      console.error("❌ Seed failed:", error);

      const cause = (error as { cause?: unknown })?.cause;
      if (cause) {
        console.error("Underlying database error:", cause);
      }

      process.exit(1);
    });
}
