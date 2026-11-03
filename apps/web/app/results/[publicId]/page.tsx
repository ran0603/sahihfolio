import { getResultSnapshot } from "@/lib/results/get-result-snapshot";
import { notFound } from "next/navigation";
import Link from "next/link";
import "./results.css";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Info,
  Lock,
  Mail,
  Printer,
  Share2,
  TriangleAlert,
} from "lucide-react";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { getCountry } from "@/lib/countries/get-country";
import { CountryProfile, MatchResult } from "@sahihfolio/shared";
import { PREFERENCES } from "@/lib/finder/constants";
import { ProviderArticle } from "./provider-article";
import { getDateString } from "@/lib/date-utils";
import { getProductInterestLabel } from "@/lib/results/label-utils";
import ChecklistSection from "./checklist-section";
import FiltersSection from "./filters-section";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const snapshot: ResultSnapshot | null = await getResultSnapshot(publicId);

  if (!snapshot) notFound();

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
            <FiltersSection inputFilters={snapshot.input} country={country} />
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
                  {providerTypeIsBroker.map((match) => (
                    <ProviderArticle key={match.provider.slug} match={match} />
                  ))}
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
                  {providerTypeIsRoboAdvisor.map((match) => (
                    <ProviderArticle key={match.provider.slug} match={match} />
                  ))}
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
                  {providerTypeIsEtfProvider.map((match) => (
                    <ProviderArticle key={match.provider.slug} match={match} />
                  ))}
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
                  {providerTypeIsManagedPortfolio.map((match) => (
                    <ProviderArticle key={match.provider.slug} match={match} />
                  ))}
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
                      {matches.map((match) => (
                        <th key={"option-" + match.provider.slug} scope="col">
                          {match.provider.name}
                          <small>
                            <span className="badge b-info">
                              {match.provider.type}
                            </span>
                          </small>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Route</th>
                      {matches.map((match) => (
                        <td key={"route-" + match.provider.slug}>
                          {getProductInterestLabel(match.provider.type)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Trading fee</th>
                      {matches.map((match) => (
                        <td key={"trading-fee-" + match.provider.slug}>
                          {match.provider.fees.find(
                            (f: any) => f.kind === "trading",
                          )?.value || <span className="ns">Not stated</span>}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">FX fee</th>
                      {matches.map((match) => (
                        <td key={"fx-fee-" + match.provider.slug}>
                          {match.provider.fees.find((f: any) => f.kind === "fx")
                            ?.value || <span className="ns">Not stated</span>}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Management / expense</th>
                      {matches.map((match) => (
                        <td key={"management-fee-" + match.provider.slug}>
                          {match.provider.fees.find(
                            (f: any) => f.kind === "management",
                          )?.value || <span className="ns">Not stated</span>}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Custody fee</th>
                      {matches.map((match) => (
                        <td key={"custody-fee-" + match.provider.slug}>
                          {match.provider.fees.find(
                            (f: any) => f.kind === "custody",
                          )?.value || <span className="ns">Not stated</span>}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Minimum</th>
                      {matches.map((match) => (
                        <td key={"minimum-" + match.provider.slug}>
                          {match.provider.minimumInvestment}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Markets</th>
                      {matches.map((match) => (
                        <td key={"markets-" + match.provider.slug}>
                          {match.provider.markets
                            .map((m) => m.name)
                            .join(", ") || "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Asset types</th>
                      {matches.map((match) => (
                        <td key={"asset-types-" + match.provider.slug}>
                          {match.provider.assetTypes
                            .map((a) => getProductInterestLabel(a))
                            .join(", ") || "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Screening information</th>
                      {matches.map((match) => (
                        <td
                          key={
                            "halal-screening-supported-" + match.provider.slug
                          }
                        >
                          {match.provider.halalScreening.supported
                            ? "Provided"
                            : "Not provided"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Methodology</th>
                      {matches.map((match) => (
                        <td
                          key={
                            "halal-screening-methodology-" + match.provider.slug
                          }
                        >
                          {match.provider.halalScreening.methodology || (
                            <span className="ns">Not named</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Supports local currency</th>
                      {matches.map((match) => (
                        <td key={"local-currency-" + match.provider.slug}>
                          {match.provider.fees.some(
                            (fee) => fee.currency === "MYR",
                          )
                            ? "Yes"
                            : "No"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Last reviewed</th>
                      {matches.map((match) => (
                        <td key={"last-reviewed-" + match.provider.slug}>
                          {getDateString(match.provider.lastReviewedAt)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="tbl-hint">
                <ArrowRight className="ic" width="14" height="14" /> Scroll
                sideways to see every option.
              </p>
            </section>
            <ChecklistSection />
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
                <dd>{getDateString(snapshot.createdAt)}</dd>
                <dt>Data version</dt>
                <dd>{snapshot.dataVersion}</dd>
                <dt>Data last reviewed</dt>
                <dd>{getDateString(snapshot.createdAt)}</dd>
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
