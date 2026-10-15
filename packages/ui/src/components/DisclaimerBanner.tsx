import React from "react";

export interface DisclaimerBannerProps {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  text = "Informational research only. Sahihfolio provides Shariah-screening methodologies and provider comparisons. We do not issue fatwas or personalized financial advice. Verify all terms and criteria directly with providers and qualified scholars before making investment decisions.",
  className = "",
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#F8F9FA",
        border: "1px solid #E4E7EC",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "0.8125rem",
        color: "#667085",
        lineHeight: "1.5",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        ...style,
      }}
      className={className}
      role="note"
      aria-label="Compliance and Shariah disclaimer"
    >
      <span style={{ color: "#DC6803", fontWeight: "bold" }}>ℹ</span>
      <div>{text}</div>
    </div>
  );
};
