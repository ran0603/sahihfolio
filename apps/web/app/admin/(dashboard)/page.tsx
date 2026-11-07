import { Card, CardHeader, CardTitle, CardContent } from "@sahihfolio/ui";

export default function AdminDashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#0B1F3A",
            marginBottom: "4px",
          }}
        >
          Editorial & Compliance Dashboard
        </h1>
        <p style={{ color: "#667085", fontSize: "0.875rem" }}>
          Review provider fee structures, Shariah methodologies, and screening
          reports before publication.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        <Card>
          <CardHeader>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#667085",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Active Providers
            </span>
            <CardTitle style={{ fontSize: "1.75rem", marginTop: "4px" }}>
              12
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span style={{ fontSize: "0.8125rem", color: "#039855" }}>
              ● All verified within 90 days
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#667085",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Published Reports
            </span>
            <CardTitle style={{ fontSize: "1.75rem", marginTop: "4px" }}>
              48
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span style={{ fontSize: "0.8125rem", color: "#175CD3" }}>
              3 reports pending quarterly review
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#667085",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Coverage Regions
            </span>
            <CardTitle style={{ fontSize: "1.75rem", marginTop: "4px" }}>
              5
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span style={{ fontSize: "0.8125rem", color: "#667085" }}>
              US, UK, CA, MY, SG
            </span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #E4E7EC",
                  textAlign: "left",
                  color: "#667085",
                }}
              >
                <th style={{ padding: "8px 0" }}>Entity</th>
                <th style={{ padding: "8px 0" }}>Action</th>
                <th style={{ padding: "8px 0" }}>Reviewer</th>
                <th style={{ padding: "8px 0" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #F2F4F7" }}>
                <td style={{ padding: "10px 0", fontWeight: "600" }}>
                  Apple Inc. (AAPL)
                </td>
                <td style={{ padding: "10px 0" }}>
                  Report Published (AAOIFI Standard 21)
                </td>
                <td style={{ padding: "10px 0" }}>Research Desk</td>
                <td style={{ padding: "10px 0", color: "#667085" }}>
                  Oct 14, 2026
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #F2F4F7" }}>
                <td style={{ padding: "10px 0", fontWeight: "600" }}>
                  Interactive Brokers
                </td>
                <td style={{ padding: "10px 0" }}>Fee Schedule Updated</td>
                <td style={{ padding: "10px 0" }}>Compliance Officer</td>
                <td style={{ padding: "10px 0", color: "#667085" }}>
                  Oct 12, 2026
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
