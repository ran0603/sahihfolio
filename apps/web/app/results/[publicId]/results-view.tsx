import "./results.css";
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Clock,
  Copy,
  ExternalLink,
  Flag,
  Info,
  Lock,
  Mail,
  Pen,
  Printer,
  Share2,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { getCountry } from "@/lib/countries/get-country";
import { CountryProfile, MatchOutput, MatchResult } from "@sahihfolio/shared";

const getDateString = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, dateFormat);
};

const getProductInterestLabel = (productInterest: string) => {
  switch (productInterest) {
    case "etfs":
      return "ETFs";
    case "stocks":
      return "Stocks";
    case "sukuk":
      return "Sukuk";
    case "crypto":
      return "Crypto";
    case "real_estate":
      return "Real Estate";
    case "gold":
      return "Gold";
    case "mutual_funds":
      return "Mutual Funds";
    default:
      return "All Products";
  }
};

const getInvestorLabel = (investorType: string) => {
  switch (investorType) {
    case "beginner":
      return "Beginner";
    case "self_directed":
      return "Self-directed";
    case "long_term_saver":
      return "Long-term Saver";
    default:
      return "Any";
  }
};

const AMOUNTS: Record<string, { s: string[]; r: string[] }> = {
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

const PREFERENCES: Record<
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

function renderProviderArticle(match: MatchResult) {
  return (
    <article
      key={`broker_${match.provider.slug}`}
      className="optc"
      data-pid={match.provider.id}
      aria-labelledby={`r9-n-${match.provider.slug}`}
    >
      <header className="opt-h">
        <div className="opt-t">
          <h4 id={`r9-n-${match.provider.slug}`}>{match.provider.name}</h4>
          <span className="badge b-info">Broker</span>
          {match.provider.isAffiliate && (
            <span className="badge b-neutral">Referral link</span>
          )}
        </div>
        <span className="opt-rev">
          <Clock className="ic" width="14" height="14" /> Reviewed{" "}
          {getDateString(match.provider.lastReviewedAt)}
        </span>
      </header>
      <p className="why">
        <CircleCheck className="ic" width="16" height="16" />
        <span>Included because it is {match.reasons.join(", ")}</span>
      </p>

      <dl className="facts">
        <div>
          <dt>Trading fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "trading")
              ?.value || "N/A"}
          </dd>
        </div>
        <div>
          <dt>FX fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "fx")?.value ||
              "N/A"}
          </dd>
        </div>
        <div>
          <dt>Management fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "management")
              ?.value || "N/A"}
          </dd>
        </div>
        <div>
          <dt>Custody fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "custody")
              ?.value || "N/A"}
          </dd>
        </div>
        <div>
          <dt>Minimum investment</dt>
          <dd>{match.provider.minimumInvestment || "None"}</dd>
        </div>
        <div>
          <dt>Asset types</dt>
          <dd>
            {match.provider.assetTypes
              .map((a) => getProductInterestLabel(a))
              .join(", ") || "N/A"}
          </dd>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <dt>Markets</dt>
          <dd>
            {match.provider.markets.map((m) => m.name).join(", ") || "N/A"}
          </dd>
        </div>
      </dl>
      {match.provider.halalScreening.supported && (
        <div className="screen">
          <div className="screen-h">
            <ShieldCheck className="ic" width="16" height="16" />
            <b>Shariah-screening information</b>
            <span className="badge b-info">Provider-stated methodology</span>
          </div>
          <p>
            Methodology: {match.provider.halalScreening.methodology || "N/A"}
          </p>
          <p className="fine">
            Informational, not a personal religious ruling. Source:{" "}
            <Link
              href={match.provider.halalScreening.source?.url || "#"}
              data-act="source"
              data-n="Provider screening page"
              target="_blank"
              rel="noopener noreferrer"
            >
              Provider screening page{" "}
              <ExternalLink className="ic" width="12" height="12" />
            </Link>
            , reviewed {getDateString(match.provider.lastReviewedAt)}.
          </p>
        </div>
      )}
      {match.provider.minimumInvestment && (
        <p className="fit ok">
          <CircleCheck className="ic" width="16" height="16" />
          <span>{match.provider.minimumInvestment}</span>
        </p>
      )}
      <details className="pc" data-pc="a">
        <summary>Pros and cons</summary>
        <div className="pc-g">
          <div>
            <b>Pros</b>
            <ul>
              {match.provider.pros.map((pro, i) => (
                <li key={`${match.provider.slug}_pro_${i}`}>{pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <b>Cons</b>
            <ul>
              {match.provider.cons.map((con, i) => (
                <li key={`${match.provider.slug}_con_${i}`}>{con}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
      <div className="reqs">
        <b>Account requirements</b>
        <ul>
          {match.provider.accountRequirements.map((areq, i) => (
            <li key={`${match.provider.slug}_areq_${i}`}>{areq.requirement}</li>
          ))}
        </ul>
      </div>
      <footer className="opt-f">
        <div className="srcs">
          <span>Sources:</span>
          <Link
            href={match.provider.disclosureUrl}
            data-act="source"
            data-n="Provider pricing page"
            target="_blank"
            rel="noopener noreferrer"
          >
            Provider pricing page{" "}
            <ExternalLink className="ic" width="12" height="12" />
          </Link>
          <Link
            href={match.provider.halalScreening.source?.url || "#"}
            data-act="source"
            data-n="Provider screening page"
            target="_blank"
            rel="noopener noreferrer"
          >
            Provider screening page{" "}
            <ExternalLink className="ic" width="12" height="12" />
          </Link>
        </div>
        <div className="opt-a">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-act="report"
            data-n={match.provider.slug}
          >
            <Flag className="ic" width="16" height="16" /> Report a problem
          </button>
          <Link
            className="btn btn-secondary btn-sm"
            href={match.provider.websiteUrl || match.provider.disclosureUrl}
            data-act="visit"
            data-pid="a"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit provider{" "}
            <ExternalLink className="ic" width="16" height="16" />
          </Link>
        </div>
      </footer>
      {match.provider.isAffiliate && (
        <p className="aff">
          <Info className="ic" width="14" height="14" />
          <span>
            This is a referral link. Sahihfolio may earn a commission if you
            open an account through it. It doesn’t change which options appear
            or their order.{" "}
            <Link href="/disclosures">Read our disclosures</Link>.
          </span>
        </p>
      )}
    </article>
  );
}

export async function ResultsView({ snapshot }: { snapshot: ResultSnapshot }) {
  const country: CountryProfile = await getCountry(snapshot.input.countryCode);
  const matches: MatchResult[] = Array.isArray(snapshot.output)
    ? (snapshot.output as unknown as MatchResult[])
    : ((snapshot.output.matches ?? []) as unknown as MatchResult[]);

  const providerTypeIsBroker = matches.filter(
    (match) => match.provider.type === "broker",
  );
  const providerTypeIsManagedPortfolio = matches.filter(
    (match) => match.provider.type === "managed_portfolio",
  );
  const providerTypeIsRoboAdvisor = matches.filter(
    (match) => match.provider.type === "robo_advisor",
  );
  const providerTypeIsEtfProvider = matches.filter(
    (match) => match.provider.type === "etf_provider",
  );

  return (
    <div className="wrap">
      <Link className="crumb" href="/find" data-act="change-country">
        <ArrowLeft className="ic" width={16} height={16} /> Back to the finder
      </Link>
      <div data-view="">
        <section data-m="head" className="res-head">
          <h1 tabIndex={-1}>
            We found {country.supportedProviders.length} option
            {country.supportedProviders.length !== 1 ? "s" : ""} for{" "}
            {getProductInterestLabel(snapshot.input.productInterest)} in{" "}
            {country.name}.
          </h1>
          <p className="res-sub">
            Results for {country.name} ({country.currency}). Data last reviewed{" "}
            {getDateString(country.lastReviewedAt)}
          </p>
          <div className="res-meta">
            <span>Result {snapshot.publicId}</span>
            <span>Created {getDateString(snapshot.createdAt)}</span>
            <span>Data version {snapshot.dataVersion}</span>
          </div>
          <div className="res-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-act="goto-save"
            >
              <Mail className="ic" width="18" height="18" /> Save by email
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="copy"
            >
              <Copy className="ic" width="18" height="18" /> Copy link
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              data-act="print"
            >
              <Printer className="ic" width="18" height="18" /> Print
            </button>
          </div>
        </section>
        <div className="res-grid">
          <div className="res-main">
            <section data-m="notice" className="notices" hidden></section>
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
                  <b>
                    {getProductInterestLabel(snapshot.input.productInterest)}
                  </b>
                </li>
                <li className="fchip">
                  <span className="k">Investor</span>
                  <b>{getInvestorLabel(snapshot.input.investorType)}</b>
                </li>
                <li className="fchip">
                  <span className="k">Starting</span>
                  <b>
                    {
                      AMOUNTS[country.currency].s[
                        snapshot.input.startingAmount!
                      ]
                    }
                  </b>
                </li>
                <li className="fchip">
                  <span className="k">Monthly</span>
                  <b>
                    {
                      AMOUNTS[country.currency].r[
                        snapshot.input.recurringContribution!
                      ]
                    }
                  </b>
                </li>
                {snapshot.input.preferences.halalScreeningRequired && (
                  <li className="fchip f">
                    <span className="k">Filter</span>
                    <b>{PREFERENCES.halalScreeningRequired.n}</b>
                  </li>
                )}
                <li className="fchip">
                  <span className="k">Prefers</span>
                  <b>
                    {getPreferenceLabels(snapshot.input.preferences).join(
                      ", ",
                    ) || "None"}
                  </b>
                </li>
              </ul>
              <p className="fa-note">
                <span>
                  Filters remove options. Preferences only change the order.
                </span>
                <Link
                  href={`/find?country=${country.countryCode}`}
                  data-act="change-country"
                >
                  Change country
                </Link>
              </p>
            </section>
            <section data-m="options" className="opts">
              <div className="sec-h">
                <h2>Your options</h2>
              </div>
              <p className="sec-n">
                Grouped by route and ordered by how many of your preferences
                each option meets. This isn’t a ranking of quality.
              </p>
              <p className="sec-n" style={{ display: "flex", gap: "8px" }}>
                <Info className="ic" width="16" height="16" />
                <span>
                  Some links are referral links and are labelled. Sahihfolio may
                  earn a commission if you open an account through them.{" "}
                  <Link href="/disclosures">Read our disclosures</Link>.
                </span>
              </p>

              {providerTypeIsBroker.length > 0 && (
                <>
                  <div className="grp-t">
                    <h3>Broker</h3>
                    <span>
                      {providerTypeIsBroker.length} option
                      {providerTypeIsBroker.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="grp-d">You pick and place your own trades.</p>
                  {providerTypeIsBroker.map((match) =>
                    renderProviderArticle(match),
                  )}
                </>
              )}

              {providerTypeIsRoboAdvisor.length > 0 && (
                <>
                  <div className="grp-t">
                    <h3>Robo-advisor</h3>
                    <span>
                      {providerTypeIsRoboAdvisor.length} option
                      {providerTypeIsRoboAdvisor.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="grp-d">
                    A platform builds and rebalances a portfolio from your
                    answers.
                  </p>
                  {providerTypeIsRoboAdvisor.map((match) =>
                    renderProviderArticle(match),
                  )}
                </>
              )}

              {providerTypeIsEtfProvider.length > 0 && (
                <>
                  <div className="grp-t">
                    <h3>ETF providers</h3>
                    <span>
                      {providerTypeIsEtfProvider.length} option
                      {providerTypeIsEtfProvider.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="grp-d">
                    Funds you buy through a broker. The details shown are the
                    fund provider’s own.
                  </p>
                  {providerTypeIsEtfProvider.map((match) =>
                    renderProviderArticle(match),
                  )}
                </>
              )}

              {providerTypeIsManagedPortfolio.length > 0 && (
                <>
                  <div className="grp-t">
                    <h3>Managed portfolios</h3>
                    <span>
                      {providerTypeIsManagedPortfolio.length} option
                      {providerTypeIsManagedPortfolio.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="grp-d">
                    Platforms that select and manage investments on your behalf.
                  </p>
                  {providerTypeIsManagedPortfolio.map((match) =>
                    renderProviderArticle(match),
                  )}
                </>
              )}
            </section>
            <section data-m="table" className="tbl">
              <div className="sec-h">
                <h2>Compare side by side</h2>
                <label className="diff-t">
                  <input className="rin" type="checkbox" data-f="diff" />
                  Show differences only
                </label>
              </div>
              <div
                className="tbl-wrap"
                tabIndex={0}
                role="region"
                aria-label="Comparison table. Scroll sideways to see every option."
              >
                <table className="cmp-t">
                  <thead>
                    <tr>
                      <th scope="col">Option</th>
                      <th scope="col">
                        Example Broker A
                        <small>
                          <span className="badge b-info">Broker</span>
                        </small>
                      </th>
                      <th scope="col">
                        Example Broker D
                        <small>
                          <span className="badge b-info">Broker</span>
                        </small>
                      </th>
                      <th scope="col">
                        Example Robo B
                        <small>
                          <span className="badge b-info">Robo-advisor</span>
                        </small>
                      </th>
                      <th scope="col">
                        Example ETF Provider C
                        <small>
                          <span className="badge b-info">ETF provider</span>
                        </small>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Route</th>
                      <td>Broker</td>
                      <td>Broker</td>
                      <td>Robo-advisor</td>
                      <td>ETF provider</td>
                    </tr>
                    <tr>
                      <th scope="row">Trading fee</th>
                      <td>0.10%</td>
                      <td>MYR 8 per trade</td>
                      <td>None</td>
                      <td>Set by your broker</td>
                    </tr>
                    <tr>
                      <th scope="row">FX fee</th>
                      <td>0.50%</td>
                      <td>Not applicable (MYR only)</td>
                      <td>
                        <span className="ns">Not stated</span>
                      </td>
                      <td>Depends on your broker</td>
                    </tr>
                    <tr>
                      <th scope="row">Management / expense</th>
                      <td>None</td>
                      <td>None</td>
                      <td>0.45%</td>
                      <td>0.40% expense ratio</td>
                    </tr>
                    <tr>
                      <th scope="row">Custody fee</th>
                      <td>None</td>
                      <td>MYR 3 per quarter</td>
                      <td>
                        <span className="ns">Not stated</span>
                      </td>
                      <td>Set by your broker</td>
                    </tr>
                    <tr>
                      <th scope="row">Minimum</th>
                      <td>MYR 100</td>
                      <td>MYR 1,000</td>
                      <td>MYR 500</td>
                      <td>Price of one unit</td>
                    </tr>
                    <tr>
                      <th scope="row">Markets</th>
                      <td>Bursa Malaysia, NYSE, NASDAQ</td>
                      <td>Bursa Malaysia</td>
                      <td>Global ETFs selected by the provider</td>
                      <td>Bursa Malaysia, NYSE Arca</td>
                    </tr>
                    <tr>
                      <th scope="row">Asset types</th>
                      <td>Stocks and ETFs</td>
                      <td>Stocks and ETFs</td>
                      <td>ETFs and managed portfolios</td>
                      <td>ETFs</td>
                    </tr>
                    <tr>
                      <th scope="row">Screening information</th>
                      <td>Provided</td>
                      <td>Provided</td>
                      <td>Provided</td>
                      <td>Provided</td>
                    </tr>
                    <tr>
                      <th scope="row">Methodology</th>
                      <td>AAOIFI-aligned (provider-stated)</td>
                      <td>Provider-specific (provider-stated)</td>
                      <td>
                        <span className="ns">Not named</span>
                      </td>
                      <td>Provider-specific (provider-stated)</td>
                    </tr>
                    <tr>
                      <th scope="row">Islamic account</th>
                      <td>Yes</td>
                      <td>Yes</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <th scope="row">Supports MYR</th>
                      <td>Yes</td>
                      <td>Yes</td>
                      <td>Yes</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <th scope="row">Last reviewed</th>
                      <td>1 Oct 2026</td>
                      <td>1 Oct 2026</td>
                      <td>1 Oct 2026</td>
                      <td>1 Oct 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="tbl-hint">
                <ArrowRight className="ic" width="14" height="14" /> Scroll
                sideways to see every option.
              </p>
            </section>
            <section data-m="checklist" className="card2">
              <div className="cl-top">
                <h2
                  style={{
                    fontSize: "24px",
                    margin: 0,
                    fontWeight: 600,
                    letterSpacing: "-.01em",
                  }}
                >
                  Before you open an account, verify
                </h2>
              </div>
              <p className="sec-n" style={{ marginTop: "6px" }}>
                Information changes. These six checks take a few minutes and
                protect you from surprises.
              </p>
              <div className="segs" aria-hidden="true">
                <i className=""></i>
                <i className=""></i>
                <i className=""></i>
                <i className=""></i>
                <i className=""></i>
                <i className=""></i>
              </div>
              <p className="cl-count" aria-live="polite" data-cl-count="">
                <b>0</b> of 6 checked. Ticks stay on this device.
              </p>
              <div>
                <label className="clrow">
                  <input className="rin" type="checkbox" data-ck="0" />
                  <span>
                    <b>Residency eligibility</b>
                    <small>
                      Confirm the provider accepts residents of Malaysia and
                      note the documents it asks for.
                    </small>
                  </span>
                </label>
                <label className="clrow">
                  <input className="rin" type="checkbox" data-ck="1" />
                  <span>
                    <b>Account type</b>
                    <small>
                      Check whether it offers an Islamic (swap-free) account and
                      ask what that changes.
                    </small>
                  </span>
                </label>
                <label className="clrow">
                  <input className="rin" type="checkbox" data-ck="2" />
                  <span>
                    <b>Fees</b>
                    <small>
                      Check trading, currency-conversion, custody and withdrawal
                      fees on the provider’s current fee page.
                    </small>
                  </span>
                </label>
                <label className="clrow">
                  <input className="rin" type="checkbox" data-ck="3" />
                  <span>
                    <b>Tax reporting</b>
                    <small>
                      Find out what tax documents the provider issues and what
                      you may need to report in Malaysia. Ask a qualified tax
                      adviser if unsure.
                    </small>
                  </span>
                </label>
                <label className="clrow">
                  <input className="rin" type="checkbox" data-ck="4" />
                  <span>
                    <b>Withdrawal process</b>
                    <small>
                      Check how long withdrawals take, any limits, and any fees.
                    </small>
                  </span>
                </label>
                <label className="clrow">
                  <input className="rin" type="checkbox" data-ck="5" />
                  <span>
                    <b>Current screening methodology</b>
                    <small>
                      Confirm the methodology is still current and see how it
                      treats debt and non-permissible income.
                    </small>
                  </span>
                </label>
              </div>
            </section>
            <section data-m="disc" className="disc">
              <Info className="ic" width="20" height="20" />
              <div>
                <b>Informational only</b>
                <p>
                  Sahihfolio provides general educational information about
                  halal-investing options. It does not provide personalized
                  investment, tax, legal, accounting, or Shariah advice.
                  Availability, fees, and product details can change; verify
                  directly with the provider before making a decision.
                </p>
              </div>
            </section>
          </div>
          <aside className="res-aside" aria-label="Save and share">
            <section data-m="save" className="card2 save">
              <h3>Save this result</h3>
              <p className="save-p">
                We’ll email you a link to this result and a short checklist for
                opening an account.
              </p>

              <form className="save-form" noValidate>
                <label className="lbl" htmlFor="r9-em">
                  Email address
                </label>
                <input
                  id="r9-em"
                  className="inp save-em "
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value=""
                />
                <p className="fmsg err" data-se="" role="alert" hidden>
                  <TriangleAlert className="ic" width="16" height="16" />
                  Enter a valid email address, for example you@example.com.
                </p>
                <label className="chk ">
                  <input className="rin save-cb" type="checkbox" />
                  <span>
                    I agree to receive this email from Sahihfolio. I can
                    unsubscribe at any time.
                  </span>
                </label>
                <p className="fmsg err" data-se="" role="alert" hidden>
                  <TriangleAlert className="ic" width="16" height="16" />
                  Confirm that you agree to receive the email to continue.
                </p>
                <button
                  type="submit"
                  className="btn btn-primary full"
                  style={{ marginTop: "16px" }}
                >
                  Email me this result
                </button>
              </form>
              <p className="fine" style={{ margin: "12px 0 0" }}>
                No account needed. We store your email, country, interest and
                this result.
              </p>
            </section>
            <section data-m="share" className="card2 share">
              <h3>Share this result</h3>
              <label className="lbl" htmlFor="r9-lk">
                Link
              </label>
              <div className="row">
                <input
                  id="r9-lk"
                  className="inp share-lk"
                  readOnly
                  value="sahihfolio.com/results/{snapshot.publicId}"
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-act="copy"
                  style={{ height: "48px" }}
                >
                  <Copy className="ic" width="16" height="16" /> Copy
                </button>
              </div>

              <div className="quote">
                “I compared halal-investing options available in Malaysia using
                Sahihfolio’s free finder.”
              </div>
              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  data-act="share-summary"
                >
                  <Share2 className="ic" width={16} height={16} /> Share summary
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  data-act="print"
                >
                  <Printer className="ic" width="16" height="16" /> Print or
                  save PDF
                </button>
              </div>
              <p
                className="fine"
                style={{ display: "flex", gap: "8px", margin: "14px 0 0" }}
              >
                <Lock className="ic" width="14" height="14" />
                <span>
                  The link shows country, interest and filters. Amounts stay
                  private.
                </span>
              </p>
            </section>
            <section data-m="meta" className="card2">
              <h3>About this result</h3>
              <dl className="meta-l">
                <dt>Result ID</dt>
                <dd>{snapshot.publicId}</dd>
                <dt>Created</dt>
                <dd>17 Oct 2026</dd>
                <dt>Data version</dt>
                <dd>2026-10-01</dd>
                <dt>Data last reviewed</dt>
                <dd>1 Oct 2026</dd>
              </dl>
              <p style={{ margin: 0 }}>
                <Link href="#">How we source and review data</Link>
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
