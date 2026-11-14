import { Globe } from "lucide-react";
import { getCountry } from "@/lib/countries/get-country";
import Link from "next/link";
import { Suspense } from "react";
import { getSources } from "@/lib/sources/get-sources";
import CountryEditLoadingPage from "./country-edit-loading-page";
import CountryEditContent from "./country-edit-content";

export const appliesToOptions: readonly {
  value: string;
  label: string;
  group: string;
}[] = [
  { value: "all", label: "All countries and providers", group: "General" },

  { value: "investor", label: "Investors", group: "Audience" },
  { value: "retail_investor", label: "Retail investors", group: "Audience" },
  {
    value: "institutional_investor",
    label: "Institutional investors",
    group: "Audience",
  },

  { value: "provider", label: "All providers", group: "Provider" },
  { value: "broker", label: "Brokers", group: "Provider" },
  { value: "robo_advisor", label: "Robo-advisors", group: "Provider" },
  {
    value: "managed_portfolio",
    label: "Managed portfolios",
    group: "Provider",
  },
  { value: "etf_provider", label: "ETF providers", group: "Provider" },

  { value: "stocks", label: "Stocks", group: "Product" },
  { value: "etfs", label: "ETFs", group: "Product" },
  { value: "managed", label: "Managed portfolios", group: "Product" },

  {
    value: "international_market",
    label: "International markets",
    group: "Market",
  },
  { value: "local_market", label: "Local market", group: "Market" },

  {
    value: "foreign_currency",
    label: "Foreign-currency investments",
    group: "Currency",
  },
  {
    value: "local_currency",
    label: "Local-currency investments",
    group: "Currency",
  },

  {
    value: "cross_border",
    label: "Cross-border investing",
    group: "Cross-border",
  },
  { value: "tax", label: "Tax treatment", group: "Tax" },
  {
    value: "reporting",
    label: "Reporting and disclosures",
    group: "Reporting",
  },
  { value: "account_opening", label: "Account opening", group: "Account" },
  {
    value: "withdrawals",
    label: "Withdrawals and transfers",
    group: "Account",
  },
] as const;

export const statusOptions: Record<
  string,
  { label: string; state: "pos" | "neg" | "neutral" | "mist" }
> = {
  all: {
    label: "All",
    state: "neutral",
  },
  published: {
    label: "Published",
    state: "pos",
  },
  draft: {
    label: "Draft",
    state: "neutral",
  },
  archived: {
    label: "Archived",
    state: "mist",
  },
};

export default async function EditCountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const country = await getCountry(id);
  const sources = await getSources();

  if (!country) {
    return (
      <div data-m="notfound" className="state-c">
        <div className="big">
          <Globe className="ic" width={30} height={30} />
        </div>
        <h1 tabIndex={-1}>Country not found</h1>
        <p>It may have been removed, or the link is wrong.</p>
        <div className="btn-row">
          <Link
            href="/admin/countries"
            className="btn btn-primary"
            data-act="navto"
            data-n="Countries"
          >
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<CountryEditLoadingPage />}>
      <CountryEditContent country={country} sources={sources} />
    </Suspense>
  );
}
