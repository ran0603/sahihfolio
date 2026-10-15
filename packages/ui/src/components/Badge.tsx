import React from "react";

export type BadgeVariant =
  | "compliant"
  | "non_compliant"
  | "methodology_dependent"
  | "under_review"
  | "neutral"
  | "warning";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  style,
  className = "",
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    compliant: {
      backgroundColor: "#ECFDF3",
      color: "#039855",
      border: "1px solid #A6F4C5",
    },
    non_compliant: {
      backgroundColor: "#FEF3F2",
      color: "#D92D20",
      border: "1px solid #FECDCA",
    },
    methodology_dependent: {
      backgroundColor: "#FEF6EE",
      color: "#DC6803",
      border: "1px solid #FEE4E2",
    },
    under_review: {
      backgroundColor: "#EFF8FF",
      color: "#175CD3",
      border: "1px solid #B2DDFF",
    },
    warning: {
      backgroundColor: "#FFFAEB",
      color: "#B54708",
      border: "1px solid #FEDF89",
    },
    neutral: {
      backgroundColor: "#F2F4F7",
      color: "#344054",
      border: "1px solid #EAECF0",
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "2px 8px", fontSize: "0.75rem" },
    md: { padding: "4px 10px", fontSize: "0.8125rem" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontWeight: 600,
        borderRadius: "9999px",
        lineHeight: "1.25",
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </span>
  );
};
