import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  className = "",
  style,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E4E7EC",
        borderRadius: "16px",
        padding: "22px",
        boxShadow: elevated
          ? "0 10px 15px -3px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.04)"
          : "0 1px 3px rgba(16, 24, 40, 0.05)",
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  style,
  ...props
}) => (
  <div style={{ marginBottom: "16px", ...style }} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  style,
  ...props
}) => (
  <h3
    style={{
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "#0B1F3A",
      margin: 0,
      ...style,
    }}
    {...props}
  >
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  style,
  ...props
}) => (
  <div
    style={{
      color: "#344054",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);
