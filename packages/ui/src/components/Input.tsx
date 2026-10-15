import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = "",
  style,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#0B1F3A",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          height: "40px",
          padding: "8px 12px",
          borderRadius: "8px",
          border: error ? "1px solid #D92D20" : "1px solid #E4E7EC",
          backgroundColor: "#FFFFFF",
          fontSize: "0.875rem",
          color: "#101828",
          outline: "none",
          fontFamily: "inherit",
          ...style,
        }}
        className={className}
        {...props}
      />
      {error ? (
        <span style={{ fontSize: "0.75rem", color: "#D92D20" }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: "0.75rem", color: "#667085" }}>{helperText}</span>
      ) : null}
    </div>
  );
};
