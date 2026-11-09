"use client";

import { Check, Info, Pen } from "lucide-react";
import Link from "next/link";
import { AMOUNTS, COUNTRIES, PREFERENCES } from "@/lib/finder/constants";
import {
  getProductInterestLabel,
  getInvestorLabel,
} from "@/lib/results/label-utils";
import { CountryProfile } from "@sahihfolio/shared";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { useState } from "react";
import { redirect } from "next/navigation";
import { track } from "@/lib/analytics";
import { snapshot } from "node:test";

const INVESTOR_TYPE = {
  beginner: "Beginner",
  self_directed: "Self-directed",
  long_term_saver: "Long-term saver",
};

const INTERESTS = {
  stocks: "Stocks",
  etfs: "ETFs",
  real_estate: "Real Estate",
  sukuk: "Sukuk",
  gold: "Gold",
  crypto: "Cryptocurrency",
  mutual_funds: "Mutual funds",
  unsure: "Not sure yet",
};

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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStartingAmount, setSelectedStartingAmount] = useState(
    inputFilters.startingAmount,
  );
  const [selectedMonthlyContribution, setSelectedMonthlyContribution] =
    useState(inputFilters.recurringContribution);
  const [selectedHalalScreening, setSelectedHalalScreening] = useState(
    inputFilters.preferences.halalScreeningRequired,
  );
  const [selectedLocalCurrency, setSelectedLocalCurrency] = useState(
    inputFilters.preferences.localCurrencyPreferred,
  );
  const [selectedIslamicAccount, setSelectedIslamicAccount] = useState(
    inputFilters.preferences.islamicAccountPreferred,
  );
  const [selectedProductInterest, setSelectedProductInterest] =
    useState<string>(inputFilters.productInterest);
  const [selectedInvestorType, setSelectedInvestorType] = useState<string>(
    inputFilters.investorType,
  );

  const reset = () => {
    setIsEditing(false);
    setSelectedStartingAmount(inputFilters.startingAmount);
    setSelectedMonthlyContribution(inputFilters.recurringContribution);
    setSelectedHalalScreening(inputFilters.preferences.halalScreeningRequired);
    setSelectedLocalCurrency(inputFilters.preferences.localCurrencyPreferred);
    setSelectedIslamicAccount(inputFilters.preferences.islamicAccountPreferred);
    setSelectedProductInterest(inputFilters.productInterest);
    setSelectedInvestorType(inputFilters.investorType);
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/find-options", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        countryCode: country.countryCode,
        investorType: selectedInvestorType,
        productInterest: selectedProductInterest,
        startingAmount: Number(selectedStartingAmount),
        recurringContribution: Number(selectedMonthlyContribution),
        preferences: {
          halalScreeningRequired: selectedHalalScreening,
          islamicAccountPreferred: selectedIslamicAccount,
          localCurrencyPreferred: selectedLocalCurrency,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    track("result_saved", {
      public_id: data.publicId,
      country_code: data.country.code,
      product_interest: selectedProductInterest,
      result_count: data.output.matches.length,
      data_version: data.dataVersion,
      save_method: "email",
    });

    redirect(`/results/${data.publicId}`);
  };

  return (
    <section data-m="filters" className="card2">
      <div className="fa-h">
        <h3>Based on your answers</h3>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          data-act="edit-toggle"
          aria-expanded="false"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            `Close`
          ) : (
            <>
              <Pen className="ic" width="16" height="16" /> Edit answers
            </>
          )}
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
      {isEditing && (
        <div className="edit" id="r9-edit">
          <div className="grp" role="radiogroup" aria-labelledby="r9-gp">
            <div className="grp-h">
              <b id="r9-gp">Interest</b>
            </div>
            <div className="chips">
              {Object.entries(INTERESTS).map(([key, value]) => (
                <label className="rchip" key={`product-${key}`}>
                  <input
                    type="radio"
                    name="r9-product"
                    data-d="product"
                    value={key}
                    checked={selectedProductInterest === key}
                    onChange={() => setSelectedProductInterest(key)}
                  />
                  <span>
                    <Check className="ic" width="16" height="16" />
                    {value}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="grp" role="radiogroup" aria-labelledby="r9-gi">
            <div className="grp-h">
              <b id="r9-gi">Investor type</b>
              <span className="fine">
                Changes the explanations, not the options
              </span>
            </div>
            <div className="chips">
              {Object.entries(INVESTOR_TYPE).map(([value, label]) => (
                <label className="rchip" key={`investor-${value}`}>
                  <input
                    type="radio"
                    name="r9-investor"
                    data-d="investor"
                    value={value}
                    checked={selectedInvestorType === value}
                    onChange={() => {
                      setSelectedInvestorType(value);
                    }}
                  />
                  <span>
                    <Check className="ic" width="16" height="16" />
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="grp" role="radiogroup" aria-labelledby="r9-gs">
            <div className="grp-h">
              <b id="r9-gs">Starting amount</b>
              <button
                type="button"
                className="link-btn"
                data-act="clear-d"
                data-k="start"
              >
                Clear
              </button>
            </div>
            <div className="chips">
              {AMOUNTS[COUNTRIES[country.countryCode]?.c]?.s.map(
                (amount, index) => (
                  <label className="rchip" key={`start-${index}`}>
                    <input
                      type="radio"
                      name="r9-start"
                      data-f="start"
                      value={index}
                      checked={selectedStartingAmount === index}
                      onChange={() => setSelectedStartingAmount(index)}
                    />
                    <span>
                      <Check className="ic" width="16" height="16" />
                      {amount}
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>
          <div className="grp" role="radiogroup" aria-labelledby="r9-gr">
            <div className="grp-h">
              <b id="r9-gr">Monthly contribution</b>
              <button
                type="button"
                className="link-btn"
                data-act="clear-d"
                data-k="recur"
              >
                Clear
              </button>
            </div>
            <div className="chips">
              {AMOUNTS[COUNTRIES[country.countryCode]?.c]?.r.map(
                (amount, index) => (
                  <label className="rchip" key={`recur-${index}`}>
                    <input
                      type="radio"
                      name="r9-recur"
                      data-f="recur"
                      value={index}
                      checked={selectedMonthlyContribution === index}
                      onChange={() => setSelectedMonthlyContribution(index)}
                    />
                    <span>
                      <Check className="ic" width="16" height="16" />
                      {amount}
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>
          <div className="grp">
            <div className="grp-h">
              <b>Filters and preferences</b>
            </div>
            {Object.entries(PREFERENCES).map(([key, value]) => {
              const isChecked =
                key === "halalScreeningRequired"
                  ? selectedHalalScreening
                  : key === "localCurrencyPreferred"
                    ? selectedLocalCurrency
                    : selectedIslamicAccount;

              return (
                <label className="prow" key={`pref-${key}`}>
                  <input
                    className="rin"
                    type="checkbox"
                    data-d="screen"
                    checked={isChecked}
                    onChange={() => {
                      if (key === "halalScreeningRequired") {
                        setSelectedHalalScreening(!selectedHalalScreening);
                      } else if (key === "localCurrencyPreferred") {
                        setSelectedLocalCurrency(!selectedLocalCurrency);
                      } else if (key === "islamicAccountPreferred") {
                        setSelectedIslamicAccount(!selectedIslamicAccount);
                      }
                    }}
                  />
                  <span>
                    <b>
                      {value.n}{" "}
                      <span className="badge b-info">
                        {value.t === "filter"
                          ? "Filters results"
                          : "Ranks results"}
                      </span>
                    </b>
                    <small>{value.a}</small>
                    {value.t === "filter" && (
                      <span className="hint" data-hint="screen">
                        <Info className="ic" width="14" height="14" />
                        <span>
                          All options for {country.name} that match this
                          interest provide screening information, so this filter
                          changes nothing right now.
                        </span>
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
          <div className="edit-f">
            <span className="fine">
              Updating creates a new result with its own link. This one stays as
              it is.
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              data-act="edit-cancel"
              onClick={reset}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-act="edit-apply"
              onClick={handleSubmit}
            >
              Update results
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
