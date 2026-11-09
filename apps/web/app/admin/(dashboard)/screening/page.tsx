import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "@sahihfolio/ui";

export default function AdminScreeningQueuePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#0B1F3A",
            marginBottom: "4px",
          }}
        >
          Shariah Screening Review Queue
        </h1>
        <p style={{ color: "#667085", fontSize: "0.875rem" }}>
          Verify business activity breakdown, financial ratio calculations,
          SEC/annual filing sources, and review notes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Screening Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                border: "1px solid #E4E7EC",
                borderRadius: "8px",
              }}
            >
              <div>
                <strong>Apple Inc. (AAPL)</strong> — NASDAQ
                <div style={{ fontSize: "0.8125rem", color: "#667085" }}>
                  AAOIFI Methodology • Impermissible revenue: 1.5% •
                  Debt/MarketCap: 3.8%
                </div>
              </div>
              <Badge variant="compliant">Published</Badge>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                border: "1px solid #E4E7EC",
                borderRadius: "8px",
              }}
            >
              <div>
                <strong>Microsoft Corp. (MSFT)</strong> — NASDAQ
                <div style={{ fontSize: "0.8125rem", color: "#667085" }}>
                  AAOIFI Methodology • Quarterly 10-Q update verification
                  pending
                </div>
              </div>
              <Badge variant="under_review">In Review</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
