import { CountryProfile, MatchResult } from "@sahihfolio/shared";
import ChecklistSection from "./checklist-section";
import FiltersSection from "./filters-section";
import { ResultSnapshot } from "src/lib/results/get-result-snapshot";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { ProviderArticle } from "./provider-article";
import { getProductInterestLabel } from "src/lib/results/label-utils";
import { getDateString } from "src/lib/date-utils";

export default function ResultOptionsMain({
  snapshot,
  country,
}: {
  snapshot: ResultSnapshot;
  country: CountryProfile;
}) {
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
    <div className="res-main" aria-label="Result Options">
      <section data-m="notice" className="notices" hidden></section>
      <FiltersSection inputFilters={snapshot.input} country={country} />
      <section data-m="options" className="opts">
        <div className="sec-h">
          <h2>Your options</h2>
        </div>
        <p className="sec-n">
          Grouped by route and ordered by how many of your preferences each
          option meets. This isn’t a ranking of quality.
        </p>
        <p className="sec-n" style={{ display: "flex", gap: "8px" }}>
          <Info className="ic" width="16" height="16" />
          <span>
            Some links are referral links and are labelled. Sahihfolio may earn
            a commission if you open an account through them.{" "}
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
              <ProviderArticle
                key={`broker-${match.provider.slug}`}
                match={match}
              />
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
              A platform builds and rebalances a portfolio from your answers.
            </p>
            {providerTypeIsRoboAdvisor.map((match) => (
              <ProviderArticle
                key={`robo-${match.provider.slug}`}
                match={match}
              />
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
              Funds you buy through a broker. The details shown are the fund
              provider’s own.
            </p>
            {providerTypeIsEtfProvider.map((match) => (
              <ProviderArticle
                key={`etf-${match.provider.slug}`}
                match={match}
              />
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
              <ProviderArticle
                key={`managed-${match.provider.slug}`}
                match={match}
              />
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
                    {match.provider.fees.find((f: any) => f.kind === "trading")
                      ?.value || <span className="ns">Not stated</span>}
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
                    {match.provider.fees.find((f: any) => f.kind === "custody")
                      ?.value || <span className="ns">Not stated</span>}
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
                    {match.provider.markets.map((m) => m.name).join(", ") ||
                      "N/A"}
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
                  <td key={"halal-screening-supported-" + match.provider.slug}>
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
                    key={"halal-screening-methodology-" + match.provider.slug}
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
                    {match.provider.fees.some((fee) => fee.currency === "MYR")
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
          <ArrowRight className="ic" width="14" height="14" /> Scroll sideways
          to see every option.
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
            investment, tax, legal, accounting, or Shariah advice. Availability,
            fees, and product details can change; verify directly with the
            provider before making a decision.
          </p>
        </div>
      </section>
    </div>
  );
}
