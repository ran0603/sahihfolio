import Link from "next/link";
import { DisclaimerBanner } from "@sahihfolio/ui";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <section style={{ textAlign: "center", padding: "40px 0 20px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#0B1F3A",
            letterSpacing: "-1px",
            marginBottom: "16px",
          }}
        >
          Make Informed Halal-Investing Decisions with Clarity
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#667085",
            maxWidth: "680px",
            margin: "0 auto 32px",
            lineHeight: "1.6",
          }}
        >
          Transparent, evidence-based research for Muslim investors. Compare country-specific investing routes,
          understand Shariah screening methodologies, and verify before you commit.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Link
            href="/finder"
            style={{
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.2)",
            }}
          >
            Find My Options →
          </Link>
          <Link
            href="/screening-report"
            style={{
              backgroundColor: "#0B1F3A",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Search Screening Reports
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E7EC",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(16, 24, 40, 0.05)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "9999px",
              backgroundColor: "#EFF8FF",
              color: "#175CD3",
              fontSize: "0.75rem",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            FREE TOOL #1
          </span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0B1F3A", marginBottom: "8px" }}>
            Global Halal Options Finder
          </h2>
          <p style={{ color: "#667085", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "20px" }}>
            Given your country and preferences, find what halal-investing routes are actually available to you:
            international brokers, local platforms, robo-advisors, and UCITS/US ETFs.
          </p>
          <Link
            href="/finder"
            style={{ color: "#10B981", fontWeight: "600", fontSize: "0.875rem" }}
          >
            Explore available routes →
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E7EC",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(16, 24, 40, 0.05)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "9999px",
              backgroundColor: "#ECFDF3",
              color: "#039855",
              fontSize: "0.75rem",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            FREE TOOL #2
          </span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0B1F3A", marginBottom: "8px" }}>
            Shariah Screening Reports
          </h2>
          <p style={{ color: "#667085", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "20px" }}>
            Detailed, evidence-led breakdown of stock & ETF compliance. See business-activity ratios, financial
            metrics, verified SEC/annual report sources, and review dates.
          </p>
          <Link
            href="/screening-report"
            style={{ color: "#10B981", fontWeight: "600", fontSize: "0.875rem" }}
          >
            View sample report (AAPL) →
          </Link>
        </div>
      </section>

      <DisclaimerBanner />
    </div>
  );
}
