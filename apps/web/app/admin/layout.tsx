import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: "24px",
        minHeight: "600px",
      }}
    >
      <aside
        style={{
          borderRight: "1px solid #E4E7EC",
          paddingRight: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            paddingBottom: "12px",
            borderBottom: "1px solid #E4E7EC",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#667085",
              textTransform: "uppercase",
            }}
          >
            Admin Console
          </span>
        </div>
        <Link
          href="/admin"
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#0B1F3A",
            backgroundColor: "#F2F4F7",
          }}
        >
          Dashboard Overview
        </Link>
        <Link
          href="/admin/providers"
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.875rem",
            color: "#344054",
          }}
        >
          Provider Catalog
        </Link>
        <Link
          href="/admin/screening"
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "0.875rem",
            color: "#344054",
          }}
        >
          Screening Queue
        </Link>
        <div
          style={{
            marginTop: "auto",
            padding: "12px",
            backgroundColor: "#FEF3F2",
            borderRadius: "8px",
          }}
        >
          <span
            style={{ fontSize: "0.75rem", color: "#B42318", fontWeight: "600" }}
          >
            Protected Internal Area
          </span>
        </div>
      </aside>

      <section>{children}</section>
    </div>
  );
}
