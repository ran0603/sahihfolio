"use client";

import "./find.css";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  CircleCheck,
  CircleQuestionMark,
  CircleX,
  Compass,
  Info,
  Layers,
  LoaderCircle,
  Lock,
  Sprout,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";

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

const INVESTOR_TYPES: Record<
  string,
  { n: string; a: string; i: React.ReactNode }
> = {
  beginner: {
    n: "Beginner",
    a: "New to investing. Explain terms and keep it simple.",
    i: <Sprout className="ic h-[22px] w-[22px]" />,
  },
  self: {
    n: "Self-directed",
    a: "Comfortable choosing and monitoring my own investments.",
    i: <Compass className="ic h-[22px] w-[22px]" />,
  },
  saver: {
    n: "Long-term saver",
    a: "Focused on regular contributions and low ongoing costs.",
    i: <Calendar className="ic h-[22px] w-[22px]" />,
  },
};

const INTERESTS: Record<string, { n: string; a: string; i: React.ReactNode }> =
  {
    stocks: {
      n: "Stocks",
      a: "Buy individual company shares through a broker.",
      i: <TrendingUp className="ic h-[22px] w-[22px]" />,
    },
    etfs: {
      n: "ETFs",
      a: "Hold a basket of securities in a single fund.",
      i: <Layers className="ic h-[22px] w-[22px]" />,
    },
    managed: {
      n: "Managed portfolio",
      a: "A provider builds and rebalances a portfolio for you.",
      i: <Briefcase className="ic h-[22px] w-[22px]" />,
    },
    unsure: {
      n: "Not sure yet",
      a: "We'll show every route available in your country.",
      i: <CircleQuestionMark className="ic h-[22px] w-[22px]" />,
    },
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
  screening: {
    n: "Require Shariah-screening information",
    a: "Hide options that don't publish how they screen.",
    t: "filter",
  },
  currency: {
    n: "Supports MYR",
    a: "Prefer options that let you fund and invest in your local currency.",
    t: "rank",
  },
  islamic: {
    n: "Offers an Islamic account",
    a: "Prefer providers that offer an Islamic (swap-free) account type.",
    t: "rank",
  },
};

export default function FinderPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedInvestorType, setSelectedInvestorType] = useState<string>("");
  const [selectedInterest, setSelectedInterest] = useState<string>("");
  const [selectedStartingAmount, setSelectedStartingAmount] =
    useState<string>("");
  const [selectedMonthlyContribution, setSelectedMonthlyContribution] =
    useState<string>("");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const reset = () => {
    setSelectedCountry("");
    setSelectedInvestorType("");
    setSelectedInterest("");
    setSelectedStartingAmount("");
    setSelectedMonthlyContribution("");
    setSelectedPreferences([]);
    setCurrentStep(1);
  };

  return (
    <div className="wrap">
      <Link className="crumb" href="/">
        <ArrowLeft className="ic h-[16px] w-[16px]" /> Back to home
      </Link>
      <h1 className="sr">Options finder</h1>
      <div className="find-grid">
        <aside className="summary" aria-label="Your answers">
          <p className="stitle">Options finder</p>
          <p className="ssub">Five short questions. No sign-up needed.</p>
          <ol className="slist">
            <li>
              <button
                type="button"
                className={`sitem ${1 < currentStep ? "is-done" : 1 === currentStep ? "is-current" : ""}`}
                data-act="goto"
                data-step="1"
              >
                <span className="sico">
                  {1 < currentStep ? (
                    <Check className="ic h-[14px] w-[14px]" />
                  ) : (
                    1
                  )}
                </span>
                <span className="stx">
                  <b>Country</b>
                  <small>
                    {selectedCountry
                      ? `${COUNTRIES[selectedCountry].n} • ${COUNTRIES[selectedCountry].c} `
                      : "Not answered yet"}
                  </small>
                </span>
                <span className="schg" onClick={() => setCurrentStep(1)}>
                  Change
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sitem ${2 < currentStep ? "is-done" : 2 === currentStep ? "is-current" : ""}`}
                data-act="goto"
                data-step="2"
              >
                <span className="sico">
                  {2 < currentStep ? (
                    <Check className="ic h-[14px] w-[14px]" />
                  ) : (
                    2
                  )}
                </span>
                <span className="stx">
                  <b>Investor type</b>
                  <small>
                    {selectedInvestorType
                      ? INVESTOR_TYPES[selectedInvestorType].n
                      : "Not answered yet"}
                  </small>
                </span>
                <span className="schg" onClick={() => setCurrentStep(2)}>
                  Change
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sitem ${3 < currentStep ? "is-done" : 3 === currentStep ? "is-current" : ""}`}
                data-act="goto"
                data-step="3"
              >
                <span className="sico">
                  {3 < currentStep ? (
                    <Check className="ic h-[14px] w-[14px]" />
                  ) : (
                    3
                  )}
                </span>
                <span className="stx">
                  <b>Interests</b>
                  <small>
                    {selectedInterest
                      ? INTERESTS[selectedInterest].n
                      : "Not answered yet"}
                  </small>
                </span>
                <span className="schg" onClick={() => setCurrentStep(3)}>
                  Change
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sitem ${4 < currentStep ? "is-done" : 4 === currentStep ? "is-current" : ""}`}
                data-act="goto"
                data-step="4"
                disabled
                aria-current="step"
              >
                <span className="sico">
                  {4 < currentStep ? (
                    <Check className="ic h-[14px] w-[14px]" />
                  ) : (
                    4
                  )}
                </span>
                <span className="stx">
                  <b>
                    Amounts<span className="opt">Optional</span>
                  </b>
                  <small>
                    {selectedStartingAmount && selectedMonthlyContribution
                      ? AMOUNTS[COUNTRIES[selectedCountry]?.c]?.s[
                          Number(selectedStartingAmount)
                        ] +
                        " to start • " +
                        AMOUNTS[COUNTRIES[selectedCountry]?.c]?.r[
                          Number(selectedMonthlyContribution)
                        ] +
                        " monthly"
                      : "Not set"}
                  </small>
                </span>
                <span className="schg" onClick={() => setCurrentStep(4)}>
                  Change
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sitem ${5 < currentStep ? "is-done" : 5 === currentStep ? "is-current" : ""}`}
                data-act="goto"
                data-step="5"
                disabled
              >
                <span className="sico">
                  {5 < currentStep ? (
                    <Check className="ic h-[14px] w-[14px]" />
                  ) : (
                    5
                  )}
                </span>
                <span className="stx">
                  <b>
                    Preferences<span className="opt">Optional</span>
                  </b>
                  <small>
                    {selectedPreferences.length > 0
                      ? selectedPreferences
                          .map((preference) => PREFERENCES[preference].n)
                          .join(" • ")
                      : "Not set"}
                  </small>
                </span>
                <span className="schg" onClick={() => setCurrentStep(5)}>
                  Change
                </span>
              </button>
            </li>
          </ol>
          <div className="sfoot" data-so="">
            <Lock className="ic h-[16px] w-[16px]" />
            <span>
              Saved on this device while you answer.
              <button
                type="button"
                className="link-btn"
                data-act="open-startover"
                onClick={reset}
              >
                Start over
              </button>
            </span>
          </div>
        </aside>
        <form
          className="fcard fform-wrap"
          noValidate
          aria-labelledby="u57-h1"
          aria-busy={false}
        >
          <div className="fform fform-in">
            <div className="fhead">
              <div className="prog">
                <span aria-live="polite">
                  Step <b className="stepn">4</b> of 5
                </span>
                <span className="prog-t">About 2 minutes</span>
              </div>
              <div
                className="segs"
                role="progressbar"
                aria-label="Progress"
                aria-valuemin={1}
                aria-valuemax={5}
                aria-valuenow={currentStep}
              >
                <i
                  className={
                    1 < currentStep ? "d" : 1 === currentStep ? "c" : ""
                  }
                ></i>
                <i
                  className={
                    2 < currentStep ? "d" : 2 === currentStep ? "c" : ""
                  }
                ></i>
                <i
                  className={
                    3 < currentStep ? "d" : 3 === currentStep ? "c" : ""
                  }
                ></i>
                <i
                  className={
                    4 < currentStep ? "d" : 4 === currentStep ? "c" : ""
                  }
                ></i>
                <i
                  className={
                    5 < currentStep ? "d" : 5 === currentStep ? "c" : ""
                  }
                ></i>
              </div>
            </div>
            <div className="fbody">
              <div className="alerts">
                <div data-restored="" hidden>
                  <div className="alert a-info flat" role="status">
                    <Info className="ic a-ic h-[20px] w-[20px]" />
                    <div className="a-body">
                      <strong>We restored your answers</strong>
                      <p>
                        They were saved on this device earlier today. You can
                        keep going or start over.
                      </p>
                      <button
                        type="button"
                        className="link-btn"
                        data-act="open-startover"
                      >
                        Start over
                      </button>
                    </div>
                  </div>
                </div>
                <div data-sa="error" hidden>
                  <div className="alert a-error flat" role="alert">
                    <CircleX className="ic a-ic h-[20px] w-[20px]" />
                    <div className="a-body">
                      <strong>We couldn&apos;t get your options</strong>
                      <p>
                        Your answers are saved. Check your connection, then try
                        again.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-sa="offline" hidden>
                  <div className="alert a-warning flat" role="status">
                    <TriangleAlert className="ic a-ic h-[20px] w-[20px]" />
                    <div className="a-body">
                      <strong>You&apos;re offline</strong>
                      <p>
                        Reconnect to see your options. Your answers are saved on
                        this device.
                      </p>
                    </div>
                  </div>
                </div>
                <div data-sa="ratelimit" hidden>
                  <div className="alert a-warning flat" role="status">
                    <TriangleAlert className="ic a-ic h-[20px] w-[20px]" />
                    <div className="a-body">
                      <strong>Too many attempts</strong>
                      <p>
                        Wait <span className="cd">30</span> seconds, then try
                        again. Your answers are saved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <fieldset className="lock">
                {/* <!-- STEP 1 --> */}
                <div data-p="1" hidden={currentStep !== 1}>
                  <h2 className="qh" id="u57-h1" tabIndex={-1}>
                    Where do you live?
                  </h2>
                  <p className="qs">
                    Provider access and rules depend on your country of
                    residence.
                  </p>
                  <label className="lbl" htmlFor="u57-c">
                    Country of residence
                  </label>
                  <div className="sel-wrap">
                    <select
                      className="country"
                      id="u57-c"
                      aria-describedby="u57-cm"
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
                  <div id="u57-cm" aria-live="polite">
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
                    {selectedCountry &&
                      selectedCountry !== "XX" &&
                      COUNTRIES[selectedCountry].days <= 100 && (
                        <p className="fmsg ok" data-c="ok">
                          <CircleCheck className="ic h-[16px] w-[16px]" />
                          <span>
                            <b className="cc-k">
                              {COUNTRIES[selectedCountry].k}
                            </b>{" "}
                            options reviewed for{" "}
                            <b className="cc-name">
                              {COUNTRIES[selectedCountry].n}
                            </b>{" "}
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
                    {selectedCountry &&
                      COUNTRIES[selectedCountry].days > 100 && (
                        <div style={{ marginTop: 14 }} data-c="stale">
                          <div className="alert a-warning flat" role="status">
                            <TriangleAlert className="ic a-ic h-[20px] w-[20px]" />
                            <div className="a-body">
                              <strong>
                                Some data for{" "}
                                <span className="cc-name">
                                  {COUNTRIES[selectedCountry].n}
                                </span>{" "}
                                may be out of date
                              </strong>
                              <p>
                                <span className="cc-k">
                                  {COUNTRIES[selectedCountry].k}
                                </span>{" "}
                                options reviewed. Country data was last reviewed{" "}
                                <span className="cc-days">
                                  {COUNTRIES[selectedCountry].days}
                                </span>{" "}
                                days ago (
                                <span className="cc-rev">
                                  {COUNTRIES[selectedCountry].rev}
                                </span>
                                ). You can continue; every option shows its own
                                review date.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    {selectedCountry === "XX" && (
                      <div style={{ marginTop: 14 }} data-c="unsupported">
                        <div className="alert a-info flat" role="status">
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
                              Get updates when more countries are added
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className="skel-wrap"
                      data-c="loading"
                      aria-hidden="true"
                      hidden
                    >
                      <i className="skel-line" style={{ width: 74 }}></i>
                      <i className="skel-line" style={{ width: 48 }}></i>
                    </div>
                    <div style={{ marginTop: 14 }} data-c="loaderror" hidden>
                      <div className="alert a-error flat" role="alert">
                        <CircleX className="ic a-ic h-[20px] w-[20px]" />
                        <div className="a-body">
                          <strong>
                            We couldn&apos;t load the country list
                          </strong>
                          <p>Check your connection, then try again.</p>
                          <button
                            type="button"
                            className="link-btn"
                            data-act="retry-countries"
                          >
                            Try again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- STEP 2 --> */}
                <div data-p="2" hidden={currentStep !== 2}>
                  <h2 className="qh" id="u57-h-investor" tabIndex={-1}>
                    How would you describe yourself as an investor?
                  </h2>
                  <p className="qs">
                    This adjusts how much explanation we show. It doesn&apos;t
                    change which providers you see.
                  </p>
                  <p
                    className="fmsg"
                    data-pre=""
                    style={{ margin: "-8px 0 20px" }}
                    hidden
                  >
                    <CircleCheck className="ic h-[16px] w-[16px]" />
                    <span>
                      Country set to{" "}
                      <b className="cc-name">{COUNTRIES[selectedCountry]?.n}</b>{" "}
                      the previous page.{" "}
                      <button
                        type="button"
                        className="link-btn"
                        data-act="goto"
                        data-step="1"
                        onClick={() => setCurrentStep(1)}
                      >
                        Change
                      </button>
                    </span>
                  </p>
                  <div
                    className="rgrp"
                    role="radiogroup"
                    data-g="investor"
                    aria-labelledby="u57-h-investor"
                    aria-describedby="u57-e-investor"
                    aria-invalid="false"
                  >
                    {Object.entries(INVESTOR_TYPES).map(([key, value]) => (
                      <label key={key} className="rcard">
                        <input
                          className="rin"
                          type="radio"
                          name="u57-investor"
                          data-f="investor"
                          value={key}
                          checked={selectedInvestorType === key}
                          onChange={(e) =>
                            setSelectedInvestorType(e.target.value)
                          }
                        />
                        <span className="rib">{value.i}</span>
                        <span className="rtx">
                          <b>{value.n}</b>
                          <span className="rs">{value.a}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <p
                    className="fmsg err"
                    id="u57-e-investor"
                    data-e="investor"
                    role="alert"
                    hidden
                  >
                    <TriangleAlert className="ic h-[16px] w-[16px]" />
                    <span data-msg="">
                      Choose the option that fits you best. You can change it
                      later.
                    </span>
                  </p>
                </div>
                {/* <!-- STEP 3 --> */}
                <div data-p="3" hidden={currentStep !== 3}>
                  <h2 className="qh" id="u57-h-product" tabIndex={-1}>
                    What are you interested in?
                  </h2>
                  <p className="qs">
                    Choose the type of route you want to compare. You can change
                    this on the results page.
                  </p>
                  <div
                    className="rgrp two"
                    role="radiogroup"
                    data-g="product"
                    aria-labelledby="u57-h-product"
                    aria-describedby="u57-e-product"
                    aria-invalid="false"
                  >
                    {Object.entries(INTERESTS).map(([key, value]) => (
                      <label className="rcard" key={key}>
                        <input
                          className="rin"
                          type="radio"
                          name="u57-product"
                          data-f="product"
                          value={key}
                          checked={selectedInterest === key}
                          onChange={(e) => setSelectedInterest(e.target.value)}
                        />
                        <span className="rib">{value.i}</span>
                        <span className="rtx">
                          <b>{value.n}</b>
                          <span className="rs">{value.a}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <p
                    className="fmsg err"
                    id="u57-e-product"
                    data-e="product"
                    role="alert"
                    hidden
                  >
                    <TriangleAlert className="ic h-[16px] w-[16px]" />
                    <span data-msg="">
                      Choose what you want to compare, or select “Not sure yet”.
                    </span>
                  </p>
                  <p className="fmsg ok" data-unsure="" hidden>
                    <CircleCheck className="ic h-[16px] w-[16px]" />
                    <span>
                      We&apos;ll show brokers, ETFs and managed portfolios
                      available in <b className="cc-name">Malaysia</b>, grouped
                      by route.
                    </span>
                  </p>
                </div>
                {/* <!-- STEP 4 --> */}
                <div data-p="4" hidden={currentStep !== 4}>
                  <div className="qh-row">
                    <h2 className="qh" id="u57-h-amt" tabIndex={-1}>
                      Roughly how much are you planning to invest?
                    </h2>
                    <span className="badge b-neutral">Optional</span>
                  </div>
                  <p className="qs">
                    Ranges only, never exact figures. We use them to compare
                    fees in{" "}
                    <b className="cc-cur">{COUNTRIES[selectedCountry]?.c}</b>.
                    Skip if you&apos;d rather not say.
                  </p>
                  <div
                    className="grp"
                    role="radiogroup"
                    aria-labelledby="u57-h-start"
                  >
                    <div className="grp-h">
                      <b id="u57-h-start">Starting amount</b>
                      <button
                        type="button"
                        className="link-btn"
                        data-act="clear-start"
                        hidden={!selectedStartingAmount}
                        onClick={() => setSelectedStartingAmount("")}
                      >
                        Clear
                      </button>
                    </div>
                    <div
                      className="chips"
                      data-chips="start"
                      data-name="u57-start"
                    >
                      {AMOUNTS[COUNTRIES[selectedCountry]?.c]?.s.map(
                        (amount, index) => (
                          <label className="rchip" key={index}>
                            <input
                              type="radio"
                              name="u57-start"
                              data-f="start"
                              value={index}
                              onChange={() =>
                                setSelectedStartingAmount(index.toString())
                              }
                            />
                            <span>
                              <Check className="ic h-[16px] w-[16px]" />
                              {amount}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                  <div
                    className="grp"
                    role="radiogroup"
                    aria-labelledby="u57-h-recur"
                  >
                    <div className="grp-h">
                      <b id="u57-h-recur">Monthly contribution</b>
                      <button
                        type="button"
                        className="link-btn"
                        data-act="clear-recur"
                        hidden={!selectedMonthlyContribution}
                        onClick={() => setSelectedMonthlyContribution("")}
                      >
                        Clear
                      </button>
                    </div>
                    <div
                      className="chips"
                      data-chips="recur"
                      data-name="u57-recur"
                    >
                      {AMOUNTS[COUNTRIES[selectedCountry]?.c]?.r.map(
                        (amount, index) => (
                          <label className="rchip" key={index}>
                            <input
                              type="radio"
                              name="u57-recur"
                              data-f="recur"
                              value={index.toString()}
                              onChange={() =>
                                setSelectedMonthlyContribution(index.toString())
                              }
                            />
                            <span>
                              <Check className="ic h-[16px] w-[16px]" />
                              {amount}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                {/* <!-- STEP 5 --> */}
                <div data-p="5" hidden={currentStep !== 5}>
                  <div className="qh-row">
                    <h2 className="qh" id="u57-h-pref" tabIndex={-1}>
                      Anything that matters to you?
                    </h2>
                    <span className="badge b-neutral">Optional</span>
                  </div>
                  <p className="qs">
                    These narrow or re-rank your results. You can change them on
                    the results page.
                  </p>
                  <div className="rgrp">
                    {Object.entries(PREFERENCES).map(([key, value]) => (
                      <label className="rcard noic" key={key}>
                        <input
                          className="rin"
                          type="checkbox"
                          data-f="preference"
                          value={key}
                          onChange={() => {
                            const newPreferences = selectedPreferences.includes(
                              key,
                            )
                              ? selectedPreferences.filter((p) => p !== key)
                              : [...selectedPreferences, key];
                            setSelectedPreferences(newPreferences);
                          }}
                        />
                        <span className="rtx">
                          <b>{value.n}</b>
                          <small>{value.a}</small>
                          <span className="badge b-info">
                            {value.t === "filter"
                              ? "Filters results"
                              : "Ranks results"}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>
              <p className="fnote">
                <Lock className="ic h-[16px] w-[16px]" />
                <span>
                  No email needed to see your results. We never ask for ID, bank
                  or brokerage details. <Link href="#">How we source data</Link>
                </span>
              </p>
            </div>
            <div className="actions">
              <button
                type="button"
                className="btn btn-ghost"
                data-act="back"
                aria-label="Back"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="ic h-[18px] w-[18px]" />
                <span className="bl">Back</span>
              </button>
              <span className="sp"></span>
              {(currentStep === 4 || currentStep === 5) && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  data-act="skip"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Skip
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary"
                data-act="next"
                aria-busy="false"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                <span className="inl" data-nl="continue">
                  {currentStep === 5 ? "Continue" : "Show my options"}{" "}
                  <ArrowRight className="ic h-[18px] w-[18px]" />
                </span>
                <span className="inl" data-nl="loading" hidden>
                  <LoaderCircle className="ic spin h-[18px] w-[18px]" /> Finding
                  your options…
                </span>
                <span className="inl" data-nl="retry" hidden>
                  Try again
                </span>
                <span data-nl="wait" hidden>
                  Try again in <span className="cd">30</span>s
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
