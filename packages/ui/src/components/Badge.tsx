"use client";

import React from "react";
import { useTheme } from "next-themes";
import "./badge.css";

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

const badgeClasses: Record<BadgeVariant, string> = {
  compliant: "b-pos",
  non_compliant: "b-neg",
  methodology_dependent: "b-warn",
  under_review: "b-neutral",
  warning: "b-warn",
  neutral: "b-info",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  style,
  className = "",
  ...props
}) => {
  return (
    <span
      className={`badge ${badgeClasses[variant]} ${size === "md" && "badge-lg"} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
