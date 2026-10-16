import React from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  id,
  className = "",
  style,
  ...props
}) => {
  const selectId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#0B1F3A",
          }}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
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
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: "0.75rem", color: "#D92D20" }}>{error}</span>
      )}
    </div>
  );
};
