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

export function ResultsView({ snapshot }: { snapshot: ResultSnapshot }) {
  console.log(snapshot);
  return (
    <div className="wrap">
      <Link className="crumb" href="/find" data-act="change-country">
        <ArrowLeft className="ic h-[16px] w-[16px]" /> Back to the finder
      </Link>
      <div data-view="">
        <section data-m="head" className="res-head">
          <h1 tabIndex={-1}>
            We found 4 options for ETF investing in Malaysia.
          </h1>
          <p className="res-sub">
            Results for Malaysia (MYR). Data last reviewed 1 Oct 2026.
          </p>
          <div className="res-meta">
            <span>Result k7x2m9</span>
            <span>Created 17 Oct 2026</span>
            <span>Data version 2026-10-01</span>
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
                  <b>Malaysia · MYR</b>
                </li>
                <li className="fchip">
                  <span className="k">Interest</span>
                  <b>ETFs</b>
                </li>
                <li className="fchip">
                  <span className="k">Investor</span>
                  <b>Beginner</b>
                </li>
                <li className="fchip">
                  <span className="k">Starting</span>
                  <b>MYR 1,000–5,000</b>
                </li>
                <li className="fchip">
                  <span className="k">Monthly</span>
                  <b>MYR 200–1,000</b>
                </li>
                <li className="fchip f">
                  <span className="k">Filter</span>
                  <b>Screening information required</b>
                </li>
                <li className="fchip">
                  <span className="k">Prefers</span>
                  <b>MYR support</b>
                </li>
              </ul>
              <p className="fa-note">
                <span>
                  Filters remove options. Preferences only change the order.
                </span>
                <Link href="#" data-act="change-country">
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
              <div className="grp-t">
                <h3>Brokers</h3>
                <span>2 options</span>
              </div>
              <p className="grp-d">You pick and place your own trades.</p>
              <article className="optc" data-pid="a" aria-labelledby="r9-n-a">
                <header className="opt-h">
                  <div className="opt-t">
                    <h4 id="r9-n-a">Example Broker A</h4>
                    <span className="badge b-info">Broker</span>
                    <span className="badge b-neutral">Referral link</span>
                  </div>
                  <span className="opt-rev">
                    <Clock className="ic" width="14" height="14" /> Reviewed 1
                    Oct 2026
                  </span>
                </header>
                <p className="why">
                  <CircleCheck className="ic" width="16" height="16" />
                  <span>
                    Included because it is available to Malaysia-based
                    investors, supports ETF investing, provides
                    Shariah-screening information and supports MYR.
                  </span>
                </p>

                <dl className="facts">
                  <div>
                    <dt>Trading fee</dt>
                    <dd>0.10%</dd>
                  </div>
                  <div>
                    <dt>FX fee</dt>
                    <dd>0.50%</dd>
                  </div>
                  <div>
                    <dt>Management fee</dt>
                    <dd>None</dd>
                  </div>
                  <div>
                    <dt>Custody fee</dt>
                    <dd>None</dd>
                  </div>
                  <div>
                    <dt>Minimum investment</dt>
                    <dd>MYR 100</dd>
                  </div>
                  <div>
                    <dt>Asset types</dt>
                    <dd>Stocks and ETFs</dd>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <dt>Markets</dt>
                    <dd>Bursa Malaysia, NYSE, NASDAQ</dd>
                  </div>
                </dl>
                <div className="screen">
                  <div className="screen-h">
                    <ShieldCheck className="ic" width="16" height="16" />
                    <b>Shariah-screening information</b>
                    <span className="badge b-info">
                      Provider-stated methodology
                    </span>
                  </div>
                  <p>
                    Methodology: AAOIFI-aligned screening, as described by the
                    provider. The provider publishes its screening list monthly.
                  </p>
                  <p className="fine">
                    Informational, not a personal religious ruling. Source:{" "}
                    <Link
                      href="#"
                      data-act="source"
                      data-n="Provider screening page"
                    >
                      Provider screening page{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    , reviewed 1 Oct 2026.
                  </p>
                </div>
                <p className="fit ok">
                  <CircleCheck className="ic" width="16" height="16" />
                  <span>Minimum MYR 100 fits your starting range.</span>
                </p>
                <details className="pc" data-pc="a">
                  <summary>Pros and cons</summary>
                  <div className="pc-g">
                    <div>
                      <b>Pros</b>
                      <ul>
                        <li>Low trading fee</li>
                        <li>Funding in MYR</li>
                        <li>Islamic account type available</li>
                      </ul>
                    </div>
                    <div>
                      <b>Cons</b>
                      <ul>
                        <li>FX fee applies to US-listed ETFs</li>
                        <li>No fractional shares</li>
                      </ul>
                    </div>
                  </div>
                </details>
                <div className="reqs">
                  <b>Account requirements</b>
                  <ul>
                    <li>Passport or national ID</li>
                    <li>Bank account in your country for funding</li>
                  </ul>
                </div>
                <footer className="opt-f">
                  <div className="srcs">
                    <span>Sources:</span>
                    <Link
                      href="#"
                      data-act="source"
                      data-n="Provider pricing page"
                    >
                      Provider pricing page{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    <Link
                      href="#"
                      data-act="source"
                      data-n="Provider screening page"
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
                      data-n="Example Broker A"
                    >
                      <Flag className="ic" width="16" height="16" /> Report a
                      problem
                    </button>
                    <Link
                      className="btn btn-secondary btn-sm"
                      href="#"
                      data-act="visit"
                      data-pid="a"
                    >
                      Visit provider{" "}
                      <ExternalLink className="ic" width="16" height="16" />
                    </Link>
                  </div>
                </footer>
                <p className="aff">
                  <Info className="ic" width="14" height="14" />
                  <span>
                    This is a referral link. Sahihfolio may earn a commission if
                    you open an account through it. It doesn’t change which
                    options appear or their order.{" "}
                    <Link href="/disclosures">Read our disclosures</Link>.
                  </span>
                </p>
              </article>
              <article className="optc" data-pid="d" aria-labelledby="r9-n-d">
                <header className="opt-h">
                  <div className="opt-t">
                    <h4 id="r9-n-d">Example Broker D</h4>
                    <span className="badge b-info">Broker</span>
                  </div>
                  <span className="opt-rev">
                    <Clock className="ic" width="14" height="14" /> Reviewed 1
                    Oct 2026
                  </span>
                </header>
                <p className="why">
                  <CircleCheck className="ic" width="16" height="16" />
                  <span>
                    Included because it is available to Malaysia-based
                    investors, supports ETF investing, provides
                    Shariah-screening information and supports MYR.
                  </span>
                </p>

                <dl className="facts">
                  <div>
                    <dt>Trading fee</dt>
                    <dd>MYR 8 per trade</dd>
                  </div>
                  <div>
                    <dt>FX fee</dt>
                    <dd>Not applicable (MYR only)</dd>
                  </div>
                  <div>
                    <dt>Management fee</dt>
                    <dd>None</dd>
                  </div>
                  <div>
                    <dt>Custody fee</dt>
                    <dd>MYR 3 per quarter</dd>
                  </div>
                  <div>
                    <dt>Minimum investment</dt>
                    <dd>MYR 1,000</dd>
                  </div>
                  <div>
                    <dt>Asset types</dt>
                    <dd>Stocks and ETFs</dd>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <dt>Markets</dt>
                    <dd>Bursa Malaysia</dd>
                  </div>
                </dl>
                <div className="screen">
                  <div className="screen-h">
                    <ShieldCheck className="ic" width="16" height="16" />
                    <b>Shariah-screening information</b>
                    <span className="badge b-info">
                      Provider-stated methodology
                    </span>
                  </div>
                  <p>
                    Methodology: Provider-specific screening, as described by
                    the provider. Shariah-screened list based on the local
                    market regulator’s guidance, as described by the provider.
                  </p>
                  <p className="fine">
                    Informational, not a personal religious ruling. Source:{" "}
                    <Link
                      href="#"
                      data-act="source"
                      data-n="Provider screening page"
                    >
                      Provider screening page{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    , reviewed 1 Oct 2026.
                  </p>
                </div>
                <p className="fit ok">
                  <CircleCheck className="ic" width="16" height="16" />
                  <span>Minimum MYR 1,000 fits your starting range.</span>
                </p>
                <details className="pc" data-pc="d">
                  <summary>Pros and cons</summary>
                  <div className="pc-g">
                    <div>
                      <b>Pros</b>
                      <ul>
                        <li>Islamic account type available</li>
                        <li>Local support in Malay and English</li>
                      </ul>
                    </div>
                    <div>
                      <b>Cons</b>
                      <ul>
                        <li>Local market only</li>
                        <li>Quarterly custody fee</li>
                      </ul>
                    </div>
                  </div>
                </details>
                <div className="reqs">
                  <b>Account requirements</b>
                  <ul>
                    <li>National ID</li>
                    <li>Local bank account</li>
                  </ul>
                </div>
                <footer className="opt-f">
                  <div className="srcs">
                    <span>Sources:</span>
                    <Link
                      href="#"
                      data-act="source"
                      data-n="Provider pricing page"
                    >
                      Provider pricing page{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    <Link
                      href="#"
                      data-act="source"
                      data-n="Provider screening page"
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
                      data-n="Example Broker D"
                    >
                      <Flag className="ic" width="16" height="16" /> Report a
                      problem
                    </button>
                    <Link
                      className="btn btn-secondary btn-sm"
                      href="#"
                      data-act="visit"
                      data-pid="d"
                    >
                      Visit provider{" "}
                      <ExternalLink className="ic" width="16" height="16" />
                    </Link>
                  </div>
                </footer>
              </article>
              <div className="grp-t">
                <h3>Robo-advisors</h3>
                <span>1 option</span>
              </div>
              <p className="grp-d">
                A platform builds and rebalances a portfolio from your answers.
              </p>
              <article className="optc" data-pid="b" aria-labelledby="r9-n-b">
                <header className="opt-h">
                  <div className="opt-t">
                    <h4 id="r9-n-b">Example Robo B</h4>
                    <span className="badge b-info">Robo-advisor</span>
                  </div>
                  <span className="opt-rev">
                    <Clock className="ic" width="14" height="14" /> Reviewed 1
                    Oct 2026
                  </span>
                </header>
                <p className="why">
                  <CircleCheck className="ic" width="16" height="16" />
                  <span>
                    Included because it is available to Malaysia-based
                    investors, supports ETF investing, provides
                    Shariah-screening information and supports MYR.
                  </span>
                </p>

                <dl className="facts">
                  <div>
                    <dt>Trading fee</dt>
                    <dd>None</dd>
                  </div>
                  <div>
                    <dt>FX fee</dt>
                    <dd>
                      <span className="ns">Not stated</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Management fee</dt>
                    <dd>0.45%</dd>
                  </div>
                  <div>
                    <dt>Custody fee</dt>
                    <dd>
                      <span className="ns">Not stated</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Minimum investment</dt>
                    <dd>MYR 500</dd>
                  </div>
                  <div>
                    <dt>Asset types</dt>
                    <dd>ETFs and managed portfolios</dd>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <dt>Markets</dt>
                    <dd>Global ETFs selected by the provider</dd>
                  </div>
                </dl>
                <div className="screen">
                  <div className="screen-h">
                    <ShieldCheck className="ic" width="16" height="16" />
                    <b>Shariah-screening information</b>
                    <span className="badge b-neutral">
                      Methodology not named
                    </span>
                  </div>
                  <p>
                    The provider says its portfolios are screened but does not
                    name a methodology. Ask which methodology it uses before you
                    decide.
                  </p>
                  <p className="fine">
                    Source:{" "}
                    <Link href="#" data-act="source" data-n="Provider FAQ">
                      Provider FAQ{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    , reviewed 1 Oct 2026.
                  </p>
                </div>
                <p className="fit ok">
                  <CircleCheck className="ic" width="16" height="16" />
                  <span>Minimum MYR 500 fits your starting range.</span>
                </p>
                <details className="pc" data-pc="b">
                  <summary>Pros and cons</summary>
                  <div className="pc-g">
                    <div>
                      <b>Pros</b>
                      <ul>
                        <li>Automatic rebalancing</li>
                        <li>Low minimum</li>
                      </ul>
                    </div>
                    <div>
                      <b>Cons</b>
                      <ul>
                        <li>FX and custody fees not stated</li>
                        <li>Methodology not named</li>
                      </ul>
                    </div>
                  </div>
                </details>
                <div className="reqs">
                  <b>Account requirements</b>
                  <ul>
                    <li>National ID or passport</li>
                    <li>Selfie verification</li>
                  </ul>
                </div>
                <footer className="opt-f">
                  <div className="srcs">
                    <span>Sources:</span>
                    <Link
                      href="#"
                      data-act="source"
                      data-n="Provider fee schedule"
                    >
                      Provider fee schedule{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    <Link href="#" data-act="source" data-n="Provider FAQ">
                      Provider FAQ{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                  </div>
                  <div className="opt-a">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      data-act="report"
                      data-n="Example Robo B"
                    >
                      <Flag className="ic" width="16" height="16" /> Report a
                      problem
                    </button>
                    <Link
                      className="btn btn-secondary btn-sm"
                      href="#"
                      data-act="visit"
                      data-pid="b"
                    >
                      Visit provider{" "}
                      <ExternalLink className="ic" width="16" height="16" />
                    </Link>
                  </div>
                </footer>
              </article>
              <div className="grp-t">
                <h3>ETF providers</h3>
                <span>1 option</span>
              </div>
              <p className="grp-d">
                Funds you buy through a broker. The details shown are the fund
                provider’s own.
              </p>
              <article className="optc" data-pid="c" aria-labelledby="r9-n-c">
                <header className="opt-h">
                  <div className="opt-t">
                    <h4 id="r9-n-c">Example ETF Provider C</h4>
                    <span className="badge b-info">ETF provider</span>
                  </div>
                  <span className="opt-rev">
                    <Clock className="ic" width="14" height="14" /> Reviewed 1
                    Oct 2026
                  </span>
                </header>
                <p className="why">
                  <CircleCheck className="ic" width="16" height="16" />
                  <span>
                    Included because it is available to Malaysia-based
                    investors, supports ETF investing and provides
                    Shariah-screening information.
                    <span className="unmet">
                      Not matched: doesn’t support MYR.
                    </span>
                  </span>
                </p>

                <dl className="facts">
                  <div>
                    <dt>Trading fee</dt>
                    <dd>Set by your broker</dd>
                  </div>
                  <div>
                    <dt>FX fee</dt>
                    <dd>Depends on your broker</dd>
                  </div>
                  <div>
                    <dt>Expense ratio</dt>
                    <dd>0.40% expense ratio</dd>
                  </div>
                  <div>
                    <dt>Custody fee</dt>
                    <dd>Set by your broker</dd>
                  </div>
                  <div>
                    <dt>Minimum investment</dt>
                    <dd>Price of one unit</dd>
                  </div>
                  <div>
                    <dt>Asset types</dt>
                    <dd>ETFs</dd>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <dt>Markets</dt>
                    <dd>Bursa Malaysia, NYSE Arca</dd>
                  </div>
                </dl>
                <div className="screen">
                  <div className="screen-h">
                    <ShieldCheck className="ic" width="16" height="16" />
                    <b>Shariah-screening information</b>
                    <span className="badge b-info">
                      Provider-stated methodology
                    </span>
                  </div>
                  <p>
                    Methodology: Provider-specific screening, as described by
                    the provider. The fund follows an index that applies its own
                    screening rules.
                  </p>
                  <p className="fine">
                    Informational, not a personal religious ruling. Source:{" "}
                    <Link href="#" data-act="source" data-n="Fund factsheet">
                      Fund factsheet{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    , reviewed 1 Oct 2026.
                  </p>
                </div>

                <details className="pc" data-pc="c">
                  <summary>Pros and cons</summary>
                  <div className="pc-g">
                    <div>
                      <b>Pros</b>
                      <ul>
                        <li>Single fund, simple to hold</li>
                        <li>Published factsheet</li>
                      </ul>
                    </div>
                    <div>
                      <b>Cons</b>
                      <ul>
                        <li>Priced in USD</li>
                        <li>You need a broker</li>
                      </ul>
                    </div>
                  </div>
                </details>
                <div className="reqs">
                  <b>Account requirements</b>
                  <ul>
                    <li>A brokerage account that can buy the fund</li>
                  </ul>
                </div>
                <footer className="opt-f">
                  <div className="srcs">
                    <span>Sources:</span>
                    <Link href="#" data-act="source" data-n="Fund factsheet">
                      Fund factsheet{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                    <Link href="#" data-act="source" data-n="Index methodology">
                      Index methodology{" "}
                      <ExternalLink className="ic" width="12" height="12" />
                    </Link>
                  </div>
                  <div className="opt-a">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      data-act="report"
                      data-n="Example ETF Provider C"
                    >
                      <Flag className="ic" width="16" height="16" /> Report a
                      problem
                    </button>
                    <Link
                      className="btn btn-secondary btn-sm"
                      href="#"
                      data-act="visit"
                      data-pid="c"
                    >
                      Visit provider{" "}
                      <ExternalLink className="ic" width="16" height="16" />
                    </Link>
                  </div>
                </footer>
              </article>
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
                  value="sahihfolio.com/results/k7x2m9"
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
                <dd>k7x2m9</dd>
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
