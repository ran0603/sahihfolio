"use client";

import {
  ArrowRight,
  ChartColumn,
  ChevronDown,
  CircleCheck,
  Clock4,
  FileText,
  Globe,
  Info,
  LoaderCircle,
  Percent,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import "./home.css";
import { useState } from "react";

const stepItems = [
  {
    label: "Choose your country",
    description:
      "Availability and rules depend on where you live, so we start there.",
  },
  {
    label: "Answer a few questions",
    description:
      "Tell us what you want to invest in. Amounts and preferences are optional.",
    hint: { icon: <Clock4 className="h-4 w-4" />, text: "About two minutes" },
  },
  {
    label: "Compare sourced options",
    description:
      "See why each option appeared, with fees, coverage, sources and review dates.",
  },
];

const checkItems = [
  {
    title: "Access",
    description:
      "Which providers accept investors from your country, and what restrictions apply.",
    icon: <Globe className="h-[22px] w-[22px]" />,
  },
  {
    title: "Fees",
    description:
      "Trading, currency conversion, custody and management fees, side by side.",
    icon: <Percent className="h-[22px] w-[22px]" />,
  },
  {
    title: "Markets and ETFs",
    description: "Which exchanges, asset types and ETFs each provider offers.",
    icon: <ChartColumn className="h-[22px] w-[22px]" />,
  },
  {
    title: "Screening methodology",
    description:
      "Which Shariah-screening methodology is used, and who states it.",
    icon: <ShieldCheck className="h-[22px] w-[22px]" />,
  },
  {
    title: "Disclosures",
    description:
      "Affiliate relationships, account requirements and source documents.",
    icon: <FileText className="h-[22px] w-[22px]" />,
  },
];

const researchItems = [
  {
    title: "Evidence over opinion",
    description:
      "Every claim links to a source and shows the date we reviewed it.",
    icon: <FileText className="h-[22px] w-[22px]" />,
  },
  {
    title: "Methodology on show",
    description:
      "Screening methodologies differ. We show which one was used and what it checks.",
    icon: <ShieldCheck className="h-[22px] w-[22px]" />,
  },
  {
    title: "Not advice",
    description:
      "We do not issue religious rulings or personalised investment, tax or legal advice.",
    icon: <Info className="h-[22px] w-[22px]" />,
  },
];

const COUNTRIES: Record<
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

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const gotoFindPage = () => {
    if (!selectedCountry) return;
    setIsLoading(true);
    window.location.href = `/find?country=${selectedCountry}`;
  };

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">
              <i className="dot"></i>Free tool · Data last reviewed 1 Oct 2026
            </span>
            <h1 className="display">
              Find halal-investing options available in your country.
            </h1>
            <p className="lead">
              Compare brokers, ETFs, and managed services with clear fees,
              coverage, and sourcing.
            </p>
            <form className="finder" noValidate>
              <label className="lbl" htmlFor="u1">
                Country of residence
              </label>
              <div className="sel-wrap">
                <select
                  className={`country ${selectedCountry === "" ? "is-empty" : ""}`}
                  id="u1"
                  aria-describedby="u1-m"
                  aria-invalid="false"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  value={selectedCountry}
                >
                  <option value="">Select your country</option>
                  {Object.entries(COUNTRIES).map(([code, country]) => (
                    <option key={code} value={code}>
                      {country.n}
                    </option>
                  ))}
                  <option value="__loading" disabled>
                    Loading countries…
                  </option>
                  <option value="__error" disabled>
                    Couldn&apos;t load countries
                  </option>
                </select>
                <ChevronDown className="ic h-[20px] w-[20px]" />
              </div>
              <div className="msgs" id="u1-m" aria-live="polite">
                {!selectedCountry && (
                  <p className="fmsg" data-c="default">
                    <Info className="ic h-[16px] w-[16px]" />
                    Select your country to see relevant options.
                  </p>
                )}
                {selectedCountry === "__error" && (
                  <p className="fmsg err" data-c="validation" role="alert">
                    <TriangleAlert className="ic h-[16px] w-[16px]" />
                    Select your country to continue.
                  </p>
                )}
                {selectedCountry && selectedCountry !== "XX" && (
                  <p className="fmsg ok" data-s="selected">
                    <CircleCheck className="ic h-[16px] w-[16px]" />
                    <span>
                      <b className="cc-k">{COUNTRIES[selectedCountry].k}</b>{" "}
                      options reviewed for{" "}
                      <b className="cc-name">{COUNTRIES[selectedCountry].n}</b>{" "}
                      ·{" "}
                      <span className="cc-cur">
                        {COUNTRIES[selectedCountry].c}
                      </span>{" "}
                      · Last reviewed{" "}
                      <span className="cc-rev">
                        {COUNTRIES[selectedCountry].rev}
                      </span>
                    </span>
                  </p>
                )}
                <div
                  className="skel-wrap"
                  data-s="loading"
                  aria-hidden="true"
                  hidden
                >
                  <i className="skel-line" style={{ width: "74%" }}></i>
                  <i className="skel-line" style={{ width: "48%" }}></i>
                </div>
                {selectedCountry === "XX" && (
                  <div style={{ marginTop: 14 }} data-c="unsupported">
                    <div className="alert a-info" role="status">
                      <Info className="ic a-ic h-[20px] w-[20px]" />
                      <div className="a-body">
                        <strong>
                          No verified options for this country yet
                        </strong>
                        <p>
                          We do not currently have verified options for this
                          combination. We review new providers regularly.
                        </p>
                        <button
                          type="button"
                          className="link-btn"
                          data-act="notify"
                        >
                          Tell me when more countries are added
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div data-s="error" hidden>
                  <div className="alert a-error " role="alert">
                    <svg
                      className="ic a-ic"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m15 9-6 6"></path>
                      <path d="m9 9 6 6"></path>
                    </svg>
                    <div className="a-body">
                      <strong>We couldn't load the country list</strong>
                      <p>Check your connection, then try again.</p>
                      <button
                        type="button"
                        className="link-btn"
                        data-act="retry"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary full"
                data-act="cta"
                aria-busy="false"
                disabled={!selectedCountry || selectedCountry === "XX"}
                onClick={gotoFindPage}
              >
                {isLoading ? (
                  <span className="inl" data-s="loading">
                    <LoaderCircle className="ic spin h-[18px] w-[18px]" /> Finding
                    your options…
                  </span>
                ) : (
                  <span
                    className="inl"
                    data-s="default validation selected unsupported error"
                  >
                    Find my options <ArrowRight className="h-[18px] w-[18px]" />
                  </span>
                )}
              </button>
              <p className="micro">No email needed to see your results.</p>
            </form>
          </div>
          <aside aria-label="Example result">
            <div className="sample">
              <div className="sample-h">
                <div>
                  <b>Example result</b>
                  <span className="sub">Malaysia · ETF investing</span>
                </div>
                <span className="badge b-neutral">Sample data</span>
              </div>
              <div className="opt">
                <div className="opt-top">
                  <b>Example Broker A</b>
                  <span className="badge b-info">Broker</span>
                </div>
                <dl className="kv">
                  <dt>Trading</dt>
                  <dd>0.10%</dd>
                  <dt>FX</dt>
                  <dd>0.50%</dd>
                  <dt>Minimum</dt>
                  <dd>MYR 100</dd>
                  <dt>Screening</dt>
                  <dd>Provider-stated · AAOIFI-aligned</dd>
                </dl>
                <p className="why">
                  <svg
                    className="ic "
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>
                    Included because it serves Malaysia-based investors, offers
                    ETFs and provides Shariah-screening information.
                  </span>
                </p>
                <p className="src">
                  Source: <Link href="#">Provider pricing page</Link>{" "}
                  <svg
                    className="ic "
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>{" "}
                  · reviewed 1 Oct 2026
                </p>
              </div>
              <div className="opt">
                <div className="opt-top">
                  <b>Example Robo B</b>
                  <span className="badge b-info">Robo-advisor</span>
                </div>
                <dl className="kv">
                  <dt>Management</dt>
                  <dd>0.45%</dd>
                  <dt>FX</dt>
                  <dd>Not stated</dd>
                  <dt>Minimum</dt>
                  <dd>MYR 500</dd>
                  <dt>Screening</dt>
                  <dd>Methodology not named by provider</dd>
                </dl>
                <p className="why">
                  <svg
                    className="ic "
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>
                    Included because it serves Malaysia-based investors and
                    offers managed ETF portfolios. Verify the screening basis
                    with the provider.
                  </span>
                </p>
                <p className="src">
                  Source: <Link href="#">Provider fee schedule</Link>{" "}
                  <svg
                    className="ic "
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>{" "}
                  · reviewed 1 Oct 2026
                </p>
              </div>
              <button type="button" className="more" data-act="more">
                + 2 more options in this example
              </button>
              <div className="sample-f">
                <svg
                  className="ic "
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                <span>
                  Data last reviewed 1 Oct 2026. Illustrative only, not a real
                  result.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="band">
        <div className="wrap stats">
          <div className="stat">
            <b>5</b>
            <span>Countries at launch</span>
          </div>
          <div className="stat">
            <b>18</b>
            <span>Providers reviewed</span>
          </div>
          <div className="stat">
            <b>90 days</b>
            <span>Longest gap between reviews</span>
          </div>
          <div className="stat">
            <b>1 Oct 2026</b>
            <span>Data last reviewed</span>
          </div>
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <h2>How it works</h2>
            <p>
              Three steps, about two minutes. You see useful results before we
              ask for anything.
            </p>
          </div>
          <div className="steps">
            {stepItems.map((step, index) => (
              <div className="card" key={"step" + index}>
                <div className="num">{index + 1}</div>
                <h3>{step.label}</h3>
                <p>{step.description}</p>
                {step.hint && (
                  <span className="time">
                    {step.hint.icon} {step.hint.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="sec-head">
            <h2>What we check before you decide</h2>
            <p>
              The things that change the outcome, shown side by side so
              trade-offs are visible.
            </p>
          </div>
          <div className="checks">
            {checkItems.map((check, index) => (
              <div className="card" key={"check" + index}>
                <div className="ibox">{check.icon}</div>
                <h3>{check.title}</h3>
                <p>{check.description}</p>
              </div>
            ))}
            <div className="card cta-card">
              <div>
                <h3>See how we source and review</h3>
                <p>
                  Our methodology explains where data comes from and how often
                  we update it.
                </p>
              </div>
              <Link className="btn btn-secondary btn-sm" href="/methodology">
                Read the methodology
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap teaser">
          <div>
            <h2>Looking up a specific stock or ETF?</h2>
            <p className="sub-p">
              Open a sourced Shariah-screening report for one security: the
              methodology, data period, ratios and review date.
            </p>
            <div className="labels">
              <span className="badge b-info">
                <svg
                  className="ic "
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Shariah-screening information
              </span>
              <span className="badge b-neutral">
                Provider-stated methodology
              </span>
            </div>
          </div>
          <div className="card flat">
            <div className="qbox" data-q="idle" data-val="">
              <label className="lbl" htmlFor="u2">
                Search by ticker or company name
              </label>
              <div className="sel-wrap">
                <input
                  id="u2"
                  className="inp has-ic qinput "
                  type="search"
                  placeholder="Try EXMP"
                  autoComplete="off"
                />
                <svg
                  className="ic lead-ic"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <div className="chip-row" data-qs="idle">
                <span>Sample reports:</span>
                <button type="button" className="chip" data-fill="EXMP">
                  EXMP
                </button>
                <button type="button" className="chip" data-fill="DEMO">
                  DEMO
                </button>
                <button type="button" className="chip" data-fill="TEST">
                  TEST
                </button>
              </div>
              <div className="q-panel" data-qs="loading results none" hidden>
                <div
                  className="q-load"
                  data-qs="loading"
                  aria-busy="true"
                  hidden
                >
                  <i className="skel-line" style={{ width: "60%" }}></i>
                  <i className="skel-line" style={{ width: "85%" }}></i>
                  <i className="skel-line" style={{ width: "40%" }}></i>
                </div>
                <div className="q-list" data-qs="results" hidden></div>
                <div className="q-none" data-qs="none" hidden>
                  <p>
                    <b>
                      No published report for “<span className="q-term"></span>”
                      yet.
                    </b>
                  </p>
                  <p className="muted">
                    We publish a small number of fully sourced reports instead
                    of thin pages. You can ask us to prioritise this one.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="request-report"
                  >
                    Request this report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="sec-head">
            <h2>Research, not rulings</h2>
            <p>
              We explain what a methodology checks and what the data says. You
              decide what to do with it.
            </p>
          </div>
          <div className="pgrid">
            {researchItems.map((item, index) => (
              <div className="card" key={"research" + index}>
                <div className="ibox">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="labels">
            <span className="badge b-info">Shariah-screening information</span>
            <span className="badge b-neutral">Provider-stated methodology</span>
            <span className="badge b-sand">Sahihfolio editorial note</span>
            <span className="badge b-warn">
              <TriangleAlert className="ic w-[14px] h-[14px]" />
              Not a religious ruling
            </span>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="card signup-card">
            <div>
              <h2>Get research updates when data changes</h2>
              <p className="sub-p">
                Practical updates, not daily hype. We email when provider
                details or screening information changes.
              </p>
            </div>
            <div>
              <form className="signup" data-fs="idle" noValidate>
                <div data-f="idle email-error consent-error loading">
                  <label className="lbl" htmlFor="u3">
                    Email address
                  </label>
                  <div className="row">
                    <input
                      id="u3"
                      className="inp semail"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid="false"
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-submit=""
                      aria-busy="false"
                    >
                      <span
                        className="inl"
                        data-f="idle email-error consent-error"
                      >
                        Join updates
                      </span>
                      <span className="inl" data-f="loading" hidden>
                        <svg
                          className="ic spin"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                        </svg>{" "}
                        Joining…
                      </span>
                    </button>
                  </div>
                  <p
                    className="fmsg err"
                    data-f="email-error"
                    role="alert"
                    hidden
                  >
                    <svg
                      className="ic "
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                      <path d="M12 9v4"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                    Enter a valid email address, for example you@example.com.
                  </p>
                  <label className="chk">
                    <input type="checkbox" className="sconsent" />
                    <span>
                      I agree to receive research updates from Sahihfolio. I can
                      unsubscribe at any time.
                    </span>
                  </label>
                  <p
                    className="fmsg err"
                    data-f="consent-error"
                    role="alert"
                    hidden
                  >
                    <svg
                      className="ic "
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                      <path d="M12 9v4"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                    Confirm that you agree to receive emails to continue.
                  </p>
                </div>
                <div data-f="success" hidden>
                  <div className="alert a-success flat" role="status">
                    <svg
                      className="ic a-ic"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <div className="a-body">
                      <strong>You're on the list</strong>
                      <p>
                        We will email you when provider data or screening
                        information changes. Check your inbox to confirm.
                      </p>
                      <button
                        type="button"
                        className="link-btn"
                        data-act="reset-form"
                      >
                        Use a different email
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
