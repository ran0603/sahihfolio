export interface SupportedCountry {
  code: string;
  name: string;
  currency: string;
  region: string;
}

export const SUPPORTED_COUNTRIES: SupportedCountry[] = [
  { code: "US", name: "United States", currency: "USD", region: "North America" },
  { code: "GB", name: "United Kingdom", currency: "GBP", region: "Europe" },
  { code: "CA", name: "Canada", currency: "CAD", region: "North America" },
  { code: "MY", name: "Malaysia", currency: "MYR", region: "Southeast Asia" },
  { code: "SG", name: "Singapore", currency: "SGD", region: "Southeast Asia" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", region: "Middle East" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", region: "Middle East" },
  { code: "AU", name: "Australia", currency: "AUD", region: "Oceania" },
  { code: "ID", name: "Indonesia", currency: "IDR", region: "Southeast Asia" },
];

export const COUNTRY_CODES = SUPPORTED_COUNTRIES.map((c) => c.code);
