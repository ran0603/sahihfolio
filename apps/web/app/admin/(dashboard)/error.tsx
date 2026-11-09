"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@sahihfolio/ui";

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  const [copied, setCopied] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("Admin portal error encountered:", error);
  }, [error]);

  const handleReset = () => {
    setIsRetrying(true);
    try {
      reset();
    } finally {
      setTimeout(() => setIsRetrying(false), 500);
    }
  };

  const copyDiagnostic = async () => {
    const text = `Admin Error: ${error.message}\nDigest: ${error.digest || "none"}\nStack: ${error.stack || "none"}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "9999px",
            backgroundColor: "#FEF3F2",
            border: "1px solid #FECDCA",
            color: "#D92D20",
            fontSize: "0.75rem",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#D92D20",
            }}
          />
          ADMIN CONSOLE EXCEPTION
        </div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#0B1F3A",
            margin: "0 0 6px",
          }}
        >
          Admin Operation Failed
        </h1>
        <p style={{ color: "#667085", fontSize: "0.875rem", margin: 0 }}>
          An error occurred while managing catalog records or Shariah queue
          entries.
        </p>
      </div>

      <Card elevated>
        <CardHeader>
          <CardTitle
            style={{
              color: "#D92D20",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Error: {error.name || "Runtime Exception"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            style={{
              color: "#344054",
              fontSize: "0.875rem",
              marginBottom: "16px",
            }}
          >
            {error.message ||
              "An unexpected error interrupted this administrative operation."}
          </p>

          <div
            style={{
              backgroundColor: "#0F172A",
              color: "#F8FAFC",
              borderRadius: "8px",
              padding: "14px",
              marginBottom: "20px",
              fontFamily: "monospace",
              fontSize: "0.8125rem",
              maxHeight: "180px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {error.stack || "No additional stack trace available."}
            {error.digest && `\n[Digest: ${error.digest}]`}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleReset}
              disabled={isRetrying}
              style={{
                backgroundColor: "#10B981",
                color: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: isRetrying ? "wait" : "pointer",
              }}
            >
              {isRetrying ? "Retrying..." : "Retry Action"}
            </button>

            <button
              onClick={copyDiagnostic}
              style={{
                backgroundColor: copied ? "#059669" : "#F2F4F7",
                color: copied ? "#FFFFFF" : "#344054",
                border: "1px solid #D0D5DD",
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {copied ? "Copied Trace" : "Copy Diagnostic"}
            </button>

            <Link
              href="/admin"
              style={{
                backgroundColor: "#0B1F3A",
                color: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              Admin Overview
            </Link>

            <Link
              href="/admin/providers"
              style={{
                backgroundColor: "transparent",
                color: "#2D4B73",
                border: "1px solid #D0D5DD",
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              Provider Catalog
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
