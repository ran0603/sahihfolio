import React from "react";
import "./card.css";

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
        ...style,
      }}
      className={`card ${className} ${!elevated && "flat"} `}
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
