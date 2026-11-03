export const COUNTRIES: Record<
  string,
  { n: string; c: string; k: number; days: number; rev: string }
> = {
  MY: { n: "Malaysia", c: "MYR", k: 4, days: 14, rev: "1 Oct 2026" },
  ID: { n: "Indonesia", c: "IDR", k: 3, days: 112, rev: "25 Jun 2026" },
  SG: { n: "Singapore", c: "SGD", k: 3, days: 14, rev: "1 Oct 2026" },
  GB: { n: "United Kingdom", c: "GBP", k: 5, days: 14, rev: "1 Oct 2026" },
  US: { n: "United States", c: "USD", k: 6, days: 14, rev: "1 Oct 2026" },
  XX: { n: "Another country", c: "N/A", k: 0, days: 14, rev: "1 Oct 2026" },
};

export const AMOUNTS: Record<string, { s: string[]; r: string[] }> = {
  MYR: {
    s: [
      "Under MYR 1,000",
      "MYR 1,000–5,000",
      "MYR 5,000–25,000",
      "Over MYR 25,000",
    ],
    r: [
      "Under MYR 200",
      "MYR 200–1,000",
      "Over MYR 1,000",
      "Prefer not to say",
    ],
  },
  IDR: {
    s: [
      "Under IDR 5 million",
      "IDR 5–25 million",
      "IDR 25–100 million",
      "Over IDR 100 million",
    ],
    r: [
      "Under IDR 1 million",
      "IDR 1–5 million",
      "Over IDR 5 million",
      "Prefer not to say",
    ],
  },
  SGD: {
    s: [
      "Under SGD 500",
      "SGD 500–2,500",
      "SGD 2,500–10,000",
      "Over SGD 10,000",
    ],
    r: ["Under SGD 100", "SGD 100–500", "Over SGD 500", "Prefer not to say"],
  },
  GBP: {
    s: ["Under GBP 250", "GBP 250–1,000", "GBP 1,000–5,000", "Over GBP 5,000"],
    r: ["Under GBP 50", "GBP 50–250", "Over GBP 250", "Prefer not to say"],
  },
  USD: {
    s: ["Under USD 300", "USD 300–1,500", "USD 1,500–6,000", "Over USD 6,000"],
    r: ["Under USD 75", "USD 75–300", "Over USD 300", "Prefer not to say"],
  },
};

export const PREFERENCES: Record<
  string,
  { n: string; a: string; t: "filter" | "rank" }
> = {
  halalScreeningRequired: {
    n: "Require Shariah-screening information",
    a: "Hide options that don't publish how they screen.",
    t: "filter",
  },
  localCurrencyPreferred: {
    n: "Supports local currency",
    a: "Prefer options that let you fund and invest in your local currency.",
    t: "rank",
  },
  islamicAccountPreferred: {
    n: "Offers an Islamic account",
    a: "Prefer providers that offer an Islamic (swap-free) account type.",
    t: "rank",
  },
};
