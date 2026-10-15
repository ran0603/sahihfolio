"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log the error to browser console / telemetry service
    console.error("Sahihfolio runtime exception captured:", error);
  }, [error]);

  const handleReset = () => {
    setIsRetrying(true);
    try {
      reset();
    } finally {
      setTimeout(() => setIsRetrying(false), 600);
    }
  };

  const handleCopyDiagnostics = async () => {
    const diagnosticText = `Sahihfolio Error Report
Message: ${error.message || "Unknown error"}
Digest: ${error.digest || "N/A"}
Timestamp: ${new Date().toISOString()}
Location: ${typeof window !== "undefined" ? window.location.href : "Server"}
User-Agent: ${typeof navigator !== "undefined" ? navigator.userAgent : "N/A"}
Stack: ${error.stack || "N/A"}`;

    try {
      await navigator.clipboard.writeText(diagnosticText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px 64px",
        position: "relative",
      }}
    >
      {/* Ambient background glow (warm amber/ruby tone for alert state) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "440px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(220, 104, 3, 0.1) 0%, rgba(217, 45, 32, 0.05) 50%, transparent 70%)",
          filter: "blur(44px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "760px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Visual Badge & Warning Emblem */}
        <div
          className="float-animation"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "28px",
              background:
                "linear-gradient(135deg, #0B1F3A 0%, #1D2939 50%, #B54708 100%)",
              padding: "2px",
              boxShadow:
                "0 20px 30px -10px rgba(11, 31, 58, 0.25), 0 0 25px rgba(220, 104, 3, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#0B1F3A",
                borderRadius: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Alert / Shield SVG */}
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Shield boundary */}
                <path
                  d="M30 8L48 15V28C48 39.5 40.5 49.5 30 52C19.5 49.5 12 39.5 12 28V15L30 8Z"
                  stroke="#F79009"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  fill="rgba(247, 144, 9, 0.08)"
                />
                {/* Exclamation Symbol */}
                <path
                  d="M30 22V32"
                  stroke="#FDB022"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="30" cy="39" r="1.75" fill="#FDB022" />
                {/* Shariah Ledger Line */}
                <path
                  d="M22 44C24.5 45.2 27.2 45.8 30 45.8C32.8 45.8 35.5 45.2 38 44"
                  stroke="#DC6803"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 14px",
              borderRadius: "9999px",
              backgroundColor: "#FFFAEB",
              border: "1px solid #FEDF89",
              color: "#B54708",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            <span
              className="pulse-amber"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#DC6803",
                display: "inline-block",
              }}
            />
            <span>SYSTEM INTERRUPT • RESEARCH VIEW ERROR</span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div>
          <h1
            style={{
              fontSize: "2.35rem",
              fontWeight: 800,
              color: "#0B1F3A",
              letterSpacing: "-0.75px",
              lineHeight: 1.25,
              marginBottom: "12px",
            }}
          >
            Unable to Display Research View
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "#667085",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            An unexpected error occurred while processing Shariah screening
            metrics or provider data. Our telemetry monitors exceptions to keep
            research accurate and verified.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            marginTop: "8px",
          }}
        >
          <button
            onClick={handleReset}
            disabled={isRetrying}
            className="btn-hover-lift"
            style={{
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9375rem",
              border: "none",
              cursor: isRetrying ? "wait" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px -1px rgba(16, 185, 129, 0.35)",
              opacity: isRetrying ? 0.75 : 1,
            }}
          >
            {/* Retry Rotate Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: isRetrying
                  ? "rotateSlow 0.8s linear infinite"
                  : "none",
              }}
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
          </button>

          <Link
            href="/"
            className="btn-hover-lift"
            style={{
              backgroundColor: "#0B1F3A",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9375rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px -1px rgba(11, 31, 58, 0.2)",
            }}
          >
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/finder"
            className="btn-hover-lift"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#2D4B73",
              border: "1px solid #D0D5DD",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9375rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Open Options Finder</span>
          </Link>
        </div>

        {/* Collapsible Diagnostics Section */}
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            marginTop: "16px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E4E7EC",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(16, 24, 40, 0.05)",
            }}
          >
            <button
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              style={{
                width: "100%",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: showDiagnostics ? "#F9FAFB" : "#FFFFFF",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                borderBottom: showDiagnostics ? "1px solid #E4E7EC" : "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#667085"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#344054",
                  }}
                >
                  Technical Diagnostic Details
                </span>
                {error.digest && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      backgroundColor: "#F2F4F7",
                      color: "#475467",
                      fontFamily: "monospace",
                    }}
                  >
                    Digest: {error.digest.slice(0, 8)}...
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#667085",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {showDiagnostics ? "Hide" : "Show"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: showDiagnostics
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {showDiagnostics && (
              <div
                style={{
                  padding: "18px",
                  backgroundColor: "#0F172A",
                  color: "#F8FAFC",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Stack / Error Trace
                  </span>
                  <button
                    onClick={handleCopyDiagnostics}
                    style={{
                      backgroundColor: copied ? "#059669" : "#1E293B",
                      color: "#FFFFFF",
                      border: "1px solid #334155",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copied ? "Copied!" : "Copy Trace"}</span>
                  </button>
                </div>

                <div
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.8125rem",
                    lineHeight: 1.6,
                    color: "#FCA5A5",
                    backgroundColor: "#020617",
                    padding: "14px",
                    borderRadius: "8px",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    maxHeight: "220px",
                    overflowY: "auto",
                  }}
                >
                  {error.message ||
                    "An unspecified application error occurred."}
                  {error.digest && `\n\n[Digest Code: ${error.digest}]`}
                  {error.stack && `\n\n${error.stack}`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reassurance Note */}
        <p
          style={{
            fontSize: "0.8125rem",
            color: "#98A2B3",
            maxWidth: "560px",
            margin: "8px 0 0",
          }}
        >
          Need assistance? If this error recurs across multiple providers or
          Shariah methodologies, please check back in a few minutes while our
          data providers resynchronize.
        </p>
      </div>
    </div>
  );
}
