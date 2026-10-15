import { describe, it, expect } from "vitest";
import { formatCurrency, formatPercent, formatDate, formatNumber } from "../formatters";

describe("formatCurrency", () => {
  it("formats USD with two decimal places", () => {
    expect(formatCurrency(1234.5, "USD", "en-US")).toBe("$1,234.50");
  });

  it("uses USD and en-US as defaults", () => {
    const result = formatCurrency(100);
    expect(result).toContain("100");
  });

  it("formats a zero amount", () => {
    expect(formatCurrency(0)).toContain("0");
  });

  it("falls back gracefully for an unknown currency code", () => {
    // An invalid currency code triggers the catch branch
    const result = formatCurrency(50, "XYZ_INVALID", "en-US");
    expect(result).toContain("50");
  });
});

describe("formatPercent", () => {
  it("formats 0.25 as '25.00%'", () => {
    expect(formatPercent(0.25)).toBe("25.00%");
  });

  it("formats 1 as '100.00%'", () => {
    expect(formatPercent(1)).toBe("100.00%");
  });

  it("respects custom decimal precision", () => {
    expect(formatPercent(0.3333, 1)).toBe("33.3%");
  });

  it("formats 0 as '0.00%'", () => {
    expect(formatPercent(0)).toBe("0.00%");
  });

  it("formats a value greater than 1", () => {
    expect(formatPercent(1.5)).toBe("150.00%");
  });
});

describe("formatDate", () => {
  it("formats a date string in en-US locale", () => {
    const result = formatDate("2024-01-15", "en-US");
    expect(result).toContain("2024");
    expect(result).toContain("Jan");
  });

  it("formats a Date object", () => {
    const result = formatDate(new Date("2024-06-01"), "en-US");
    expect(result).toContain("2024");
  });

  it("formats a numeric timestamp", () => {
    const ts = new Date("2024-03-20").getTime();
    const result = formatDate(ts, "en-US");
    expect(result).toContain("2024");
  });

  it("uses en-US as default locale", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("2024");
  });
});

describe("formatNumber", () => {
  it("formats 1234567 with thousand separators", () => {
    const result = formatNumber(1234567, "en-US");
    expect(result).toBe("1,234,567");
  });

  it("formats 0", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("uses en-US as default locale", () => {
    expect(formatNumber(9999)).toBe("9,999");
  });
});
