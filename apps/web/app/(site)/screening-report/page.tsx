"use client";

import { useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DisclaimerBanner,
} from "@sahihfolio/ui";

export default function ScreeningReportPage() {
  const [ticker, setTicker] = useState("AAPL");

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#0B1F3A",
            marginBottom: "8px",
          }}
        >
          Shariah Screening Report
        </h1>
        <p style={{ color: "#667085" }}>
          Evidence-led breakdown of stock & ETF compliance, financial ratios,
          and methodology criteria.
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter ticker (e.g. AAPL, MSFT)"
          style={{
            flex: 1,
            height: "42px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #E4E7EC",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        />
        <button
          style={{
            padding: "0 20px",
            backgroundColor: "#0B1F3A",
            color: "#FFFFFF",
            borderRadius: "8px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Inspect
        </button>
      </div>

      <Card>
        <CardHeader
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <CardTitle>Apple Inc. (AAPL)</CardTitle>
            <span style={{ fontSize: "0.8125rem", color: "#667085" }}>
              NASDAQ • Information Technology • United States
            </span>
          </div>
          <Badge variant="compliant">Screened Compliant</Badge>
        </CardHeader>
        <CardContent>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <h4
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#0B1F3A",
                  marginBottom: "4px",
                }}
              >
                Methodology & Assessment
              </h4>
              <p style={{ fontSize: "0.875rem", color: "#344054" }}>
                Evaluated under AAOIFI Standard No. 21 guidelines.
                Non-permissible revenue ratio (Apple Card interest) is ~1.5%,
                well within the 5% threshold. Debt to market-cap ratio is 3.8%
                (threshold: &lt;30%).
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#F8F9FA",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "0.8125rem",
                color: "#667085",
              }}
            >
              <strong>Data Source:</strong> SEC Form 10-K filing •{" "}
              <strong>Reviewed:</strong> October 2026 •{" "}
              <strong>Reviewer:</strong> Sahihfolio Research Desk
            </div>
          </div>
        </CardContent>
      </Card>

      <DisclaimerBanner />
    </div>
  );
}
