import Link from "next/link";

export default function NotFound() {
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
      {/* Decorative ambient background blur */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "420px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(11, 31, 58, 0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "840px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Visual Badge & Illustration */}
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
              width: "128px",
              height: "128px",
              borderRadius: "28px",
              background:
                "linear-gradient(135deg, #0B1F3A 0%, #162B47 50%, #10B981 100%)",
              padding: "2px",
              boxShadow:
                "0 20px 30px -10px rgba(11, 31, 58, 0.25), 0 0 20px rgba(16, 185, 129, 0.2)",
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
              {/* Halal Finance Navigation Astrolabe / Compass SVG */}
              <svg
                width="68"
                height="68"
                viewBox="0 0 68 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer dashed Shariah perimeter ring */}
                <circle
                  cx="34"
                  cy="34"
                  r="28"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  strokeOpacity="0.6"
                />
                {/* Concentric inner coordinate ring */}
                <circle
                  cx="34"
                  cy="34"
                  r="20"
                  stroke="#2D4B73"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <circle cx="34" cy="34" r="3" fill="#10B981" />
                {/* Compass Star / Crosshair Needles */}
                <path
                  d="M34 11L37.5 30.5L34 34L30.5 30.5L34 11Z"
                  fill="#10B981"
                />
                <path
                  d="M34 57L30.5 37.5L34 34L37.5 37.5L34 57Z"
                  fill="#2D4B73"
                />
                <path
                  d="M11 34L30.5 30.5L34 34L30.5 37.5L11 34Z"
                  fill="#2D4B73"
                />
                <path
                  d="M57 34L37.5 37.5L34 34L37.5 30.5L57 34Z"
                  fill="#34D399"
                />
                {/* Orbital Verification Nodes */}
                <circle cx="48" cy="20" r="2" fill="#D4A017" />
                <circle cx="20" cy="48" r="2" fill="#10B981" />
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
              backgroundColor: "#EFF8FF",
              border: "1px solid #B2DDFF",
              color: "#175CD3",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            <span
              className="pulse-emerald"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
                display: "inline-block",
              }}
            />
            <span>ERROR 404 • UNCHARTED ROUTE</span>
          </div>
        </div>

        {/* Heading & Subheading */}
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "#0B1F3A",
              letterSpacing: "-1px",
              lineHeight: 1.2,
              marginBottom: "14px",
            }}
          >
            This Page Is Not on the Shariah Map
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#667085",
              maxWidth: "620px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            The research page, screening report, or provider profile you
            requested cannot be found. It may have been moved, renamed, or is
            currently undergoing Shariah re-audit.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            marginTop: "6px",
          }}
        >
          <Link
            href="/find"
            className="btn-hover-lift"
            style={{
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.9375rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px -1px rgba(16, 185, 129, 0.35)",
            }}
          >
            <span>Explore Options Finder</span>
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/screening-report"
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
            <span>Screening Reports</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <Link
            href="/"
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
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Recommended Hubs Section */}
        <div
          style={{
            width: "100%",
            marginTop: "32px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: "1px solid #E4E7EC",
            }}
          >
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#475467",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Explore Verified Research Hubs
            </span>
            <span style={{ fontSize: "0.75rem", color: "#98A2B3" }}>
              Verified Shariah Datasets
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {/* Card 1: Options Finder */}
            <Link
              href="/find"
              className="interactive-card"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E4E7EC",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 1px 3px rgba(16, 24, 40, 0.05)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#ECFDF3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#039855",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "#0B1F3A",
                    }}
                  >
                    Options Finder
                  </h3>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#039855",
                      fontWeight: 600,
                    }}
                  >
                    By Country of Residence
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "#667085",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Find vetted brokers, robo-advisors, and UCITS ETFs accessible
                from your jurisdiction.
              </p>
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#10B981",
                  marginTop: "auto",
                }}
              >
                Search routes →
              </span>
            </Link>

            {/* Card 2: Screening Reports */}
            <Link
              href="/screening-report"
              className="interactive-card"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E4E7EC",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 1px 3px rgba(16, 24, 40, 0.05)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#EFF8FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#175CD3",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "#0B1F3A",
                    }}
                  >
                    Screening Reports
                  </h3>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#175CD3",
                      fontWeight: 600,
                    }}
                  >
                    AAOIFI / DJIM Methodologies
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "#667085",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Review financial screening ratios, debt-to-market-cap metrics,
                and primary SEC sources.
              </p>
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#10B981",
                  marginTop: "auto",
                }}
              >
                Inspect reports →
              </span>
            </Link>

            {/* Card 3: Admin Console */}
            <Link
              href="/admin"
              className="interactive-card"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E4E7EC",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 1px 3px rgba(16, 24, 40, 0.05)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#F4F3FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#5925DC",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "#0B1F3A",
                    }}
                  >
                    Admin Console
                  </h3>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "#5925DC",
                      fontWeight: 600,
                    }}
                  >
                    Catalog & Audits
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "#667085",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Manage provider entries, inspect screening verification queues,
                and system parameters.
              </p>
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#10B981",
                  marginTop: "auto",
                }}
              >
                Open console →
              </span>
            </Link>
          </div>
        </div>

        {/* Informational Callout */}
        <div
          style={{
            marginTop: "16px",
            padding: "14px 20px",
            backgroundColor: "#F9FAFB",
            border: "1px solid #EAECF0",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.8125rem",
            color: "#667085",
            maxWidth: "680px",
          }}
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>
            Looking for a specific stock ticker or brokerage? You can search
            directly in the{" "}
            <Link
              href="/screening-report"
              style={{
                color: "#10B981",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Screening Reports
            </Link>{" "}
            or check our{" "}
            <Link
              href="/find"
              style={{
                color: "#10B981",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Options Finder
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
