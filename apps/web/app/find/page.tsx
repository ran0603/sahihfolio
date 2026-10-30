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

export default function FinderPage() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedAsset, setSelectedAsset] = useState("all");

  return (
    <div className="wrap">
      <a className="crumb" href="#">
        <ArrowLeft className="ic h-[16px] w-[16px]" /> Back to home
      </a>
      <h1 className="sr">Options finder</h1>
      <div className="find-grid">
        <aside className="summary" aria-label="Your answers">
          <p className="stitle">Options finder</p>
          <p className="ssub">Five short questions. No sign-up needed.</p>
          <ol className="slist">
            <li>
              <button
                type="button"
                className="sitem is-done"
                data-act="goto"
                data-step="1"
              >
                <span className="sico">
                  <Check className="ic h-[14px] w-[14px]" />
                </span>
                <span className="stx">
                  <b>Country</b>
                  <small>Malaysia · MYR</small>
                </span>
                <span className="schg">Change</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="sitem is-done"
                data-act="goto"
                data-step="2"
              >
                <span className="sico">
                  <Check className="ic h-[14px] w-[14px]" />
                </span>
                <span className="stx">
                  <b>Investor type</b>
                  <small>Beginner</small>
                </span>
                <span className="schg">Change</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="sitem is-done"
                data-act="goto"
                data-step="3"
              >
                <span className="sico">
                  <Check className="ic h-[14px] w-[14px]" />
                </span>
                <span className="stx">
                  <b>Interest</b>
                  <small>Stocks</small>
                </span>
                <span className="schg">Change</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="sitem is-current"
                data-act="goto"
                data-step="4"
                disabled
                aria-current="step"
              >
                <span className="sico">4</span>
                <span className="stx">
                  <b>
                    Amounts<span className="opt">Optional</span>
                  </b>
                  <small>Not set</small>
                </span>
                <span className="schg">Change</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="sitem "
                data-act="goto"
                data-step="5"
                disabled
              >
                <span className="sico">5</span>
                <span className="stx">
                  <b>
                    Preferences<span className="opt">Optional</span>
                  </b>
                  <small>Default: screening information required</small>
                </span>
                <span className="schg">Change</span>
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
                aria-valuenow={4}
              >
                <i className="d"></i>
                <i className="d"></i>
                <i className="d"></i>
                <i className="c"></i>
                <i className=""></i>
              </div>
              <div className="mchips" aria-label="Your answers">
                <button
                  type="button"
                  className="chip"
                  data-act="goto"
                  data-step="1"
                >
                  Malaysia
                </button>
                <button
                  type="button"
                  className="chip"
                  data-act="goto"
                  data-step="2"
                >
                  Beginner
                </button>
                <button
                  type="button"
                  className="chip"
                  data-act="goto"
                  data-step="3"
                >
                  Stocks
                </button>
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
                <div data-p="1" hidden>
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
                    >
                      <option value="">Select your country</option>
                      <option value="MY">Malaysia</option>
                      <option value="ID">Indonesia</option>
                      <option value="SG">Singapore</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="XX">Another country</option>
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
                    <p className="fmsg" data-c="default" hidden>
                      <Info className="ic h-[16px] w-[16px]" />
                      Select your country to see relevant options.
                    </p>
                    <p
                      className="fmsg err"
                      data-c="validation"
                      role="alert"
                      hidden
                    >
                      <TriangleAlert className="ic h-[16px] w-[16px]" />
                      Select your country to continue.
                    </p>
                    <p className="fmsg ok" data-c="ok">
                      <CircleCheck className="ic h-[16px] w-[16px]" />
                      <span>
                        <b className="cc-k">4</b> options reviewed for{" "}
                        <b className="cc-name">Malaysia</b> ·{" "}
                        <span className="cc-cur">MYR</span> · Last reviewed{" "}
                        <span className="cc-rev">1 Oct 2026</span>
                      </span>
                    </p>
                    <div style={{ marginTop: 14 }} data-c="stale" hidden>
                      <div className="alert a-warning flat" role="status">
                        <TriangleAlert className="ic a-ic h-[20px] w-[20px]" />
                        <div className="a-body">
                          <strong>
                            Some data for{" "}
                            <span className="cc-name">Malaysia</span> may be out
                            of date
                          </strong>
                          <p>
                            <span className="cc-k">4</span> options reviewed.
                            Country data was last reviewed{" "}
                            <span className="cc-days">14</span> days ago (
                            <span className="cc-rev">1 Oct 2026</span>). You can
                            continue; every option shows its own review date.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 14 }} data-c="unsupported" hidden>
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
                <div data-p="2" hidden>
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
                      Country set to <b className="cc-name">Malaysia</b> from
                      the previous page.{" "}
                      <button
                        type="button"
                        className="link-btn"
                        data-act="goto"
                        data-step="1"
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
                    <label className="rcard">
                      <input
                        className="rin"
                        type="radio"
                        name="u57-investor"
                        data-f="investor"
                        value="beginner"
                      />
                      <span className="rib">
                        <Sprout className="ic h-[22px] w-[22px]" />
                      </span>
                      <span className="rtx">
                        <b>Beginner</b>
                        <small>
                          New to investing. Explain terms and keep it simple.
                        </small>
                      </span>
                    </label>
                    <label className="rcard">
                      <input
                        className="rin"
                        type="radio"
                        name="u57-investor"
                        data-f="investor"
                        value="self"
                      />
                      <span className="rib">
                        <Compass className="ic h-[22px] w-[22px]" />
                      </span>
                      <span className="rtx">
                        <b>Self-directed</b>
                        <small>
                          Comfortable choosing and monitoring my own
                          investments.
                        </small>
                      </span>
                    </label>
                    <label className="rcard">
                      <input
                        className="rin"
                        type="radio"
                        name="u57-investor"
                        data-f="investor"
                        value="saver"
                      />
                      <span className="rib">
                        <Calendar className="ic h-[22px] w-[22px]" />
                      </span>
                      <span className="rtx">
                        <b>Long-term saver</b>
                        <small>
                          Focused on regular contributions and low ongoing
                          costs.
                        </small>
                      </span>
                    </label>
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
                <div data-p="3" hidden>
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
                    <label className="rcard">
                      <input
                        className="rin"
                        type="radio"
                        name="u57-product"
                        data-f="product"
                        value="stocks"
                      />
                      <span className="rib">
                        <TrendingUp className="ic h-[22px] w-[22px]" />
                      </span>
                      <span className="rtx">
                        <b>Stocks</b>
                        <small>
                          Buy individual company shares through a broker.
                        </small>
                      </span>
                    </label>
                    <label className="rcard">
                      <input
                        className="rin"
                        type="radio"
                        name="u57-product"
                        data-f="product"
                        value="etfs"
                      />
                      <span className="rib">
                        <Layers className="ic h-[22px] w-[22px]" />
                      </span>
                      <span className="rtx">
                        <b>ETFs</b>
                        <small>
                          Hold a basket of securities in a single fund.
                        </small>
                      </span>
                    </label>
                    <label className="rcard">
                      <input
                        className="rin"
                        type="radio"
                        name="u57-product"
                        data-f="product"
                        value="managed"
                      />
                      <span className="rib">
                        <Briefcase className="ic h-[22px] w-[22px]" />
                      </span>
                      <span className="rtx">
                        <b>Managed portfolio</b>
                        <small>
                          A provider builds and rebalances a portfolio for you.
                        </small>
                      </span>
                    </label>
                    <label className="rcard">
                      <input
                        className="rin"
                        type="radio"
                        name="u57-product"
                        data-f="product"
                        value="unsure"
                      />
                      <span className="rib">
                        <CircleQuestionMark className="ic h-[22px] w-[22px]" />
                      </span>
                      <span className="rtx">
                        <b>Not sure yet</b>
                        <small>
                          We&apos;ll show every route available in your country.
                        </small>
                      </span>
                    </label>
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
                <div data-p="4">
                  <div className="qh-row">
                    <h2 className="qh" id="u57-h-amt" tabIndex={-1}>
                      Roughly how much are you planning to invest?
                    </h2>
                    <span className="badge b-neutral">Optional</span>
                  </div>
                  <p className="qs">
                    Ranges only, never exact figures. We use them to compare
                    fees in <b className="cc-cur">MYR</b>. Skip if you&apos;d
                    rather not say.
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
                        hidden
                      >
                        Clear
                      </button>
                    </div>
                    <div
                      className="chips"
                      data-chips="start"
                      data-name="u57-start"
                    >
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-start"
                          data-f="start"
                          value="Under MYR 1,000"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          Under MYR 1,000
                        </span>
                      </label>
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-start"
                          data-f="start"
                          value="MYR 1,000–5,000"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          MYR 1,000–5,000
                        </span>
                      </label>
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-start"
                          data-f="start"
                          value="MYR 5,000–25,000"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          MYR 5,000–25,000
                        </span>
                      </label>
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-start"
                          data-f="start"
                          value="Over MYR 25,000"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          Over MYR 25,000
                        </span>
                      </label>
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-start"
                          data-f="start"
                          value="Prefer not to say"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          Prefer not to say
                        </span>
                      </label>
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
                        hidden
                      >
                        Clear
                      </button>
                    </div>
                    <div
                      className="chips"
                      data-chips="recur"
                      data-name="u57-recur"
                    >
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-recur"
                          data-f="recur"
                          value="Under MYR 200"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          Under MYR 200
                        </span>
                      </label>
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-recur"
                          data-f="recur"
                          value="MYR 200–1,000"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          MYR 200–1,000
                        </span>
                      </label>
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-recur"
                          data-f="recur"
                          value="Over MYR 1,000"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          Over MYR 1,000
                        </span>
                      </label>
                      <label className="rchip">
                        <input
                          type="radio"
                          name="u57-recur"
                          data-f="recur"
                          value="Prefer not to say"
                        />
                        <span>
                          <Check className="ic h-[16px] w-[16px]" />
                          Prefer not to say
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* <!-- STEP 5 --> */}
                <div data-p="5" hidden>
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
                    <label className="rcard noic">
                      <input className="rin" type="checkbox" data-f="screen" />
                      <span className="rtx">
                        <b>Require Shariah-screening information</b>
                        <small>
                          Hide options that don&apos;t publish how they screen.
                        </small>
                        <span className="badge b-info">Filters results</span>
                      </span>
                    </label>
                    <label className="rcard noic">
                      <input
                        className="rin"
                        type="checkbox"
                        data-f="currency"
                      />
                      <span className="rtx">
                        <b>
                          Supports <span className="cc-cur">MYR</span>
                        </b>
                        <small>
                          Prefer options that let you fund and invest in your
                          local currency.
                        </small>
                        <span className="badge b-neutral">Ranks results</span>
                      </span>
                    </label>
                    <label className="rcard noic">
                      <input className="rin" type="checkbox" data-f="islamic" />
                      <span className="rtx">
                        <b>Offers an Islamic account</b>
                        <small>
                          Prefer providers that offer an Islamic (swap-free)
                          account type.
                        </small>
                        <span className="badge b-neutral">Ranks results</span>
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
              <p className="fnote">
                <Lock className="ic h-[16px] w-[16px]" />
                <span>
                  No email needed to see your results. We never ask for ID, bank
                  or brokerage details. <a href="#">How we source data</a>
                </span>
              </p>
            </div>
            <div className="actions">
              <button
                type="button"
                className="btn btn-ghost"
                data-act="back"
                aria-label="Back"
              >
                <ArrowLeft className="ic h-[18px] w-[18px]" />
                <span className="bl">Back</span>
              </button>
              <span className="sp"></span>
              <button type="button" className="btn btn-ghost" data-act="skip">
                Skip
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-act="next"
                aria-busy="false"
              >
                <span className="inl" data-nl="continue">
                  Continue <ArrowRight className="ic h-[18px] w-[18px]" />
                </span>
                <span className="inl" data-nl="show" hidden>
                  Show my options{" "}
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
