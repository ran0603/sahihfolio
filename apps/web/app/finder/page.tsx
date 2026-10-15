"use client";

import { useState } from "react";
import { SUPPORTED_COUNTRIES } from "@sahihfolio/shared";
import { Button, Card, CardHeader, CardTitle, CardContent, DisclaimerBanner } from "@sahihfolio/ui";

export default function FinderPage() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedAsset, setSelectedAsset] = useState("all");

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#0B1F3A", marginBottom: "8px" }}>
          Global Halal Investing Options Finder
        </h1>
        <p style={{ color: "#667085" }}>
          Select your country and preferences to see vetted platforms, brokers, and halal routes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Select Your Country & Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "6px" }}>
                Country of Residence
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #E4E7EC",
                  backgroundColor: "#FFFFFF",
                }}
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.currency})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "6px" }}>
                Product Interest
              </label>
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #E4E7EC",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <option value="all">All Products (Stocks, ETFs, Sukuk, Robo)</option>
                <option value="stocks">Direct Stocks</option>
                <option value="etfs">Shariah ETFs</option>
                <option value="robo_advisor">Automated Robo-Advisor</option>
              </select>
            </div>
          </div>

          <Button variant="primary">Search Available Routes</Button>
        </CardContent>
      </Card>

      <DisclaimerBanner />
    </div>
  );
}
