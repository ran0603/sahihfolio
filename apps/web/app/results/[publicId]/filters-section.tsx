import { Pen } from "lucide-react";
import Link from "next/link";
import { AMOUNTS, PREFERENCES } from "@/lib/finder/constants";
import {
  getProductInterestLabel,
  getInvestorLabel,
} from "@/lib/results/label-utils";
import { CountryProfile } from "@sahihfolio/shared";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";

type FilteredResultsInput = {
  preferences: {
    halalScreeningRequired: boolean;
    localCurrencyPreferred: boolean;
    islamicAccountPreferred: boolean;
  };
};
const getPreferenceLabels = (
  preferences: FilteredResultsInput["preferences"],
) => {
  let labels: string[] = [];
  if (preferences.localCurrencyPreferred) {
    labels.push(PREFERENCES.localCurrencyPreferred.n);
  }
  if (preferences.islamicAccountPreferred) {
    labels.push(PREFERENCES.islamicAccountPreferred.n);
  }
  return labels;
};

interface FiltersSectionProps {
  inputFilters: ResultSnapshot["input"];
  country: CountryProfile;
}

export default function FiltersSection({
  inputFilters,
  country,
}: FiltersSectionProps) {
  return (
    <section data-m="filters" className="card2">
      <div className="fa-h">
        <h3>Based on your answers</h3>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          data-act="edit-toggle"
          aria-expanded="false"
        >
          <Pen className="ic" width="16" height="16" /> Edit answers
        </button>
      </div>
      <ul className="fa-chips" aria-label="Your answers">
        <li className="fchip">
          <span className="k">Country</span>
          <b>
            {country.name} · {country.currency}
          </b>
        </li>
        <li className="fchip">
          <span className="k">Interest</span>
          <b>{getProductInterestLabel(inputFilters.productInterest)}</b>
        </li>
        <li className="fchip">
          <span className="k">Investor</span>
          <b>{getInvestorLabel(inputFilters.investorType)}</b>
        </li>
        <li className="fchip">
          <span className="k">Starting</span>
          <b>{AMOUNTS[country.currency].s[inputFilters.startingAmount!]}</b>
        </li>
        <li className="fchip">
          <span className="k">Monthly</span>
          <b>
            {AMOUNTS[country.currency].r[inputFilters.recurringContribution!]}
          </b>
        </li>
        {inputFilters.preferences.halalScreeningRequired && (
          <li className="fchip f">
            <span className="k">Filter</span>
            <b>{PREFERENCES.halalScreeningRequired.n}</b>
          </li>
        )}
        <li className="fchip">
          <span className="k">Prefers</span>
          <b>
            {getPreferenceLabels(inputFilters.preferences).join(", ") || "None"}
          </b>
        </li>
      </ul>
      <p className="fa-note">
        <span>Filters remove options. Preferences only change the order.</span>
        <Link
          href={`/find?country=${country.countryCode}`}
          data-act="change-country"
        >
          Change country
        </Link>
      </p>
    </section>
  );
}
