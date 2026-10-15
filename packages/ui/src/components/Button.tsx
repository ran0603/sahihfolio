import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    borderRadius: "8px",
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: "all 0.15s ease-in-out",
    border: "1px solid transparent",
    fontFamily: "inherit",
    textDecoration: "none",
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "6px 12px", fontSize: "0.8125rem", height: "32px" },
    md: { padding: "8px 16px", fontSize: "0.875rem", height: "40px" },
    lg: { padding: "12px 24px", fontSize: "1rem", height: "48px" },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "#10B981", // Emerald accent
      color: "#FFFFFF",
      borderColor: "#10B981",
    },
    secondary: {
      backgroundColor: "#0B1F3A", // Deep Navy
      color: "#FFFFFF",
      borderColor: "#0B1F3A",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#0B1F3A",
      borderColor: "#E4E7EC",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#2D4B73",
      borderColor: "transparent",
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
