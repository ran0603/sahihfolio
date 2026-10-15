import { Card, CardHeader, CardTitle, CardContent } from "@sahihfolio/ui";

export default function AdminProvidersPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0B1F3A", marginBottom: "4px" }}>
          Provider Catalog Management
        </h1>
        <p style={{ color: "#667085", fontSize: "0.875rem" }}>
          Maintain verified data on international brokers, local platforms, robo-advisors, and Shariah oversight.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalog Entries (2 Active)</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                <strong>Interactive Brokers</strong>
                <div style={{ fontSize: "0.8125rem", color: "#667085" }}>
                  Broker • US, GB, CA, SG, AU • Self-directed, no built-in screening
                </div>
              </div>
              <span style={{ fontSize: "0.8125rem", color: "#039855", fontWeight: "600" }}>Published</span>
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
                <strong>Wahed Invest</strong>
                <div style={{ fontSize: "0.8125rem", color: "#667085" }}>
                  Robo-advisor • US, GB, MY, AE • AAOIFI Shariah Review Bureau oversight
                </div>
              </div>
              <span style={{ fontSize: "0.8125rem", color: "#039855", fontWeight: "600" }}>Published</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
