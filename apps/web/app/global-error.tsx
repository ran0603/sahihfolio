"use client";

import { useEffect, useState } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("Critical root application error:", error);
  }, [error]);

  const handleReset = () => {
    setIsRetrying(true);
    try {
      reset();
    } finally {
      setTimeout(() => setIsRetrying(false), 500);
    }
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#F7F9FC",
          color: "#101828",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: "90%",
            margin: "40px auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E7EC",
            borderRadius: "16px",
            padding: "36px 28px",
            textAlign: "center",
            boxShadow:
              "0 20px 25px -5px rgba(11, 31, 58, 0.08), 0 8px 10px -6px rgba(11, 31, 58, 0.04)",
          }}
        >
          {/* Logo Brand Header */}
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "#0B1F3A",
              marginBottom: "24px",
            }}
          >
            Sahih<span style={{ color: "#10B981" }}>folio</span>
          </div>

          {/* Alert Emblem */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#FEF3F2",
              border: "1px solid #FECDCA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "#D92D20",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#0B1F3A",
              margin: "0 0 8px",
            }}
          >
            Critical System Interrupt
          </h1>

          <p
            style={{
              fontSize: "0.9375rem",
              color: "#667085",
              lineHeight: 1.6,
              margin: "0 0 24px",
            }}
          >
            A core framework component could not be loaded. Please reload the
            application or return to the main entry point.
          </p>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            <button
              onClick={handleReset}
              disabled={isRetrying}
              style={{
                backgroundColor: "#10B981",
                color: "#FFFFFF",
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "none",
                cursor: isRetrying ? "wait" : "pointer",
                boxShadow: "0 2px 4px rgba(16, 185, 129, 0.25)",
              }}
            >
              {isRetrying ? "Reloading..." : "Reload Application"}
            </button>

            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/";
                }
              }}
              style={{
                backgroundColor: "#0B1F3A",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Go to Homepage
            </button>
          </div>

          {error.digest && (
            <div
              style={{
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid #EAECF0",
                fontSize: "0.75rem",
                color: "#98A2B3",
                fontFamily: "monospace",
              }}
            >
              Incident Digest: {error.digest}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
