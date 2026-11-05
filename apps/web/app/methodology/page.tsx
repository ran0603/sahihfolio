"use client";

import "./methodology.css";
import {
  ArrowLeft,
  ChevronDown,
  CircleCheck,
  Clock,
  Copy,
  Eye,
  Info,
  Link as LinkIcon,
  Minus,
  Pen,
  Scale,
  Search,
  ThumbsDown,
  ThumbsUp,
  TriangleAlert,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  {
    title: "At a glance",
    slug: "at-a-glance",
  },
  {
    title: "How we source information",
    slug: "sourcing",
  },
  {
    title: "How we review and update",
    slug: "review",
  },
  {
    title: "How the Options Finder works",
    slug: "finder",
  },
  {
    title: "How Screening Reports work",
    slug: "screening",
  },
  {
    title: "What we don't do",
    slug: "not-do",
  },
  {
    title: "Independence and corrections",
    slug: "independence",
  },
  // {
  //   title: "Version history",
  //   slug: "changelog"
  // },
  {
    title: "Glossary",
    slug: "glossary",
  },
];

export default function MethodologyPage() {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrectSection] = useState("at-a-glance");
  const [feedback, setFeedback] = useState(false);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [feedbackDetails, setFeedbackDetails] = useState("");

  const gotoSection = (section: string) => {
    setOpen(false);
    setCurrectSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const openFeedback = () => {
    setCurrectSection("feedback");
    document.getElementById("feedback")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(
      `https://sahihfolio.com/methodology/#${text}`,
    );
  };

  return (
    <div className="wrap" data-view="">
      <Link className="crumb" href="/" data-act="home">
        <ArrowLeft className="ic" width={16} height={16} /> Home
      </Link>
      <section data-m="head" className="mt-head">
        <h1 tabIndex={-1}>Methodology</h1>
        <p className="mt-sub">
          How Sahihfolio sources, reviews and presents halal-investing
          information, in plain language.
        </p>
        <dl className="mt-meta">
          <div>
            <dt>Version</dt>
            <dd>
              1.2 <span className="badge b-neutral">Current</span>
            </dd>
          </div>
          <div>
            <dt>Last reviewed</dt>
            <dd>1 Oct 2026 </dd>
          </div>
          <div>
            <dt>Next review due</dt>
            <dd>30 Dec 2026</dd>
          </div>
          <div>
            <dt>Applies to</dt>
            <dd>Options Finder and Screening Reports</dd>
          </div>
        </dl>
        <div className="mt-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            data-act="copy-sec"
            data-sec=""
          >
            <Copy className="ic" width="18" height="18" /> Copy link
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-act="problem"
            onClick={openFeedback}
          >
            <Pen className="ic" width="18" height="18" /> Tell us what’s unclear
          </button>
        </div>
      </section>
      <div className="mt-grid">
        <aside className="mt-aside" aria-label="On this page">
          <section data-m="toc" className="">
            <div className={`toc-box ${open ? "open" : ""}`}>
              <button
                type="button"
                className="toc-t"
                data-act="toc-toggle"
                aria-expanded={open}
                aria-controls="m1-toc"
                onClick={() => setOpen(!open)}
              >
                <span>
                  <small>On this page</small>At a glance
                </span>
                <ChevronDown className="ic chev" width={20} height={20} />
              </button>
              <p className="toc-h" aria-hidden="true">
                ON THIS PAGE
              </p>
              <ul className="toc" id="m1-toc">
                {SECTIONS.map((section, index) => (
                  <li key={`menu-${index}`}>
                    <button
                      type="button"
                      className="l"
                      data-act="goto"
                      data-t={section.slug}
                      aria-current={
                        currentSection === section.slug ? "true" : "false"
                      }
                      onClick={() => gotoSection(section.slug)}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </aside>
        <div className="mt-main">
          <section data-m="notice" className="notices" hidden></section>
          <section
            data-m="glance"
            data-sec="at-a-glance"
            id="at-a-glance"
            className="card2"
          >
            <h2 id="at-a-glance">
              At a glance
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="at-a-glance"
                aria-label="Copy link to the section “At a glance”"
                onClick={() => handleCopy("at-a-glance")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <p>
              Sahihfolio publishes two things: the <b>Options Finder</b>, which
              shows the halal-investing routes available in your country, and{" "}
              <b>Shariah Screening Reports</b>, which show what a screening
              methodology says about one stock or ETF. This page explains how
              both are built, reviewed and presented, so you can judge how far
              to rely on them.
            </p>
            <div className="pillars">
              <div className="pil">
                <div className="tile">
                  <LinkIcon className="ic" width={20} height={20} />
                </div>
                <b>Sourced</b>
                <span>
                  Every material claim links to a source with a retrieved date.
                </span>
              </div>
              <div className="pil">
                <div className="tile">
                  <Eye className="ic" width={20} height={20} />
                </div>
                <b>Reviewed</b>
                <span>
                  A person reviews each record. Anything older than 90 days is
                  flagged.
                </span>
              </div>
              <div className="pil">
                <div className="tile">
                  <Scale className="ic" width={20} height={20} />
                </div>
                <b>Explainable</b>
                <span>
                  Each result says why it appears. The rules are fixed and
                  published.
                </span>
              </div>
              <div className="pil">
                <div className="tile">
                  <Info className="ic" width={20} height={20} />
                </div>
                <b>Humble</b>
                <span>
                  Information, not a religious ruling or personal advice.
                </span>
              </div>
              <div className="pil">
                <div className="tile">
                  <Users className="ic" width={20} height={20} />
                </div>
                <b>Independent</b>
                <span>
                  Referral links never change which options appear or their
                  order.
                </span>
              </div>
            </div>
          </section>
          <section
            data-m="sourcing"
            data-sec="sourcing"
            id="sourcing"
            className="card2"
          >
            <h2 id="sourcing">
              How we source information
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="sourcing"
                aria-label="Copy link to the section “How we source information”"
                onClick={() => handleCopy("sourcing")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <p>
              We prefer primary sources, and we say so when we can’t use one. We
              look in this order:
            </p>
            <ol className="list">
              <li>
                The company’s or provider’s own documents, such as annual
                reports and pricing pages.
              </li>
              <li>Exchange and regulator filings.</li>
              <li>Scholarly bodies and the publishers of a methodology.</li>
              <li>
                Reputable secondary sources. These are always shown with Low
                confidence.
              </li>
            </ol>
            <h3>What we record for every claim</h3>
            <div
              className="tbl-wrap"
              tabIndex={0}
              role="region"
              aria-label="What we record for every claim. Scroll sideways if needed."
            >
              <table className="mt-t ">
                <thead>
                  <tr>
                    <th scope="col">Field</th>
                    <th scope="col">What it tells you</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Source</th>
                    <td>
                      A link to the document, and the page where it matters.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Source type</th>
                    <td>
                      Annual report, exchange filing, provider page, scholarly
                      body or news release.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Retrieved</th>
                    <td>The date we read the source.</td>
                  </tr>
                  <tr>
                    <th scope="row">Reviewed</th>
                    <td>
                      The date a person checked the claim against the source.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Reviewer</th>
                    <td>Who checked it.</td>
                  </tr>
                  <tr>
                    <th scope="row">Confidence</th>
                    <td>How reliable we judge the source to be. See below.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>Confidence</h3>
            <div
              className="tbl-wrap"
              tabIndex={0}
              role="region"
              aria-label="Confidence levels. Scroll sideways if needed."
            >
              <table className="mt-t ">
                <thead>
                  <tr>
                    <th scope="col">Level</th>
                    <th scope="col">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <span className="badge b-pos">High</span>
                    </th>
                    <td>A primary source that is current and unambiguous.</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="badge b-info">Medium</span>
                    </th>
                    <td>
                      A primary source that is older, or that needs
                      interpretation.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="badge b-warn">Low</span>
                    </th>
                    <td>
                      A secondary or unverified source. We show it as it is and
                      say so.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="note">
              <Info className="ic" width={16} height={16} />
              <span>
                Confidence describes the source, not the provider or the
                security.
              </span>
            </p>
          </section>
          <section
            data-m="review"
            data-sec="review"
            id="review"
            className="card2"
          >
            <h2 id="review">
              How we review and update
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="review"
                aria-label="Copy link to the section “How we review and update”"
                onClick={() => handleCopy("review")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <p>
              Nothing is published without a source, a review date and a named
              reviewer. Published records aren’t edited in place. Each change
              creates a new version.
            </p>
            <ol className="flow">
              <li>
                <b>Draft</b>
                <span>An editor collects the data and sources.</span>
              </li>
              <li>
                <b>Check</b>
                <span>Each claim is matched to its source.</span>
              </li>
              <li>
                <b>Review</b>
                <span>A second person reviews it and signs off.</span>
              </li>
              <li>
                <b>Publish</b>
                <span>A new version goes live. The old one is kept.</span>
              </li>
              <li>
                <b>Monitor</b>
                <span>Records older than 90 days are flagged.</span>
              </li>
            </ol>
            <h3>Versions and corrections</h3>
            <ul className="list">
              <li>
                A public link always shows the latest published version. Earlier
                versions are kept for audit.
              </li>
              <li>
                Material changes are listed in the{" "}
                <Link href="#" data-act="goto" data-t="changelog">
                  version history
                </Link>
                .
              </li>
              <li>
                If we find a mistake, we fix it, publish a new version and say
                what changed.
              </li>
            </ul>
            <h3>Out-of-date records</h3>
            <p>
              After 90 days without a review, a record gets a “Needs review”
              badge and a plain warning. We don’t hide it, because an older
              record with a clear date is more useful than none.
            </p>
          </section>
          <section
            data-m="finder"
            data-sec="finder"
            id="finder"
            className="card2"
          >
            <h2 id="finder">
              How the Options Finder works
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="finder"
                aria-label="Copy link to the section “How the Options Finder works”"
                onClick={() => handleCopy("finder")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <p>
              The finder follows fixed rules. The same answers and the same data
              version always give the same result, and every result says why it
              appears.
            </p>
            <h3>The rules, in order</h3>
            <ol className="list">
              <li>
                Leave out providers that aren’t available in your country.
              </li>
              <li>Keep only the kind of product you chose.</li>
              <li>
                Apply any filter you turned on, such as requiring
                Shariah-screening information.
              </li>
              <li>Order what’s left using the factors below.</li>
              <li>Show the reason each option appears.</li>
            </ol>
            <h3>What counts, and how much</h3>
            <div
              className="tbl-wrap"
              tabIndex={0}
              role="region"
              aria-label="Ordering factors. Scroll sideways if needed."
            >
              <table className="mt-t ">
                <thead>
                  <tr>
                    <th scope="col">Factor</th>
                    <th scope="col">Role</th>
                    <th scope="col">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Country availability</th>
                    <td>Required</td>
                    <td>Hard requirement</td>
                  </tr>
                  <tr>
                    <th scope="row">Product-type match</th>
                    <td>Required</td>
                    <td>Hard requirement</td>
                  </tr>
                  <tr>
                    <th scope="row">Shariah-screening information</th>
                    <td>Filter or preference</td>
                    <td>High</td>
                  </tr>
                  <tr>
                    <th scope="row">Fee transparency</th>
                    <td>Preference</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <th scope="row">Market and ETF coverage</th>
                    <td>Preference</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <th scope="row">Local-currency support</th>
                    <td>Preference</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <th scope="row">Beginner suitability</th>
                    <td>Preference</td>
                    <td>Low to medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="note">
              <Info className="ic" width={16} height={16} />
              <span>
                The order isn’t a ranking of quality, and we don’t show a score.
                Your starting amount and investor type change the explanations
                and the fit notes, not which options appear.
              </span>
            </p>
          </section>
          <section
            data-m="screening"
            data-sec="screening"
            id="screening"
            className="card2"
          >
            <h2 id="screening">
              How Screening Reports work
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="screening"
                aria-label="Copy link to the section “How Screening Reports work”"
                onClick={() => handleCopy("screening")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <p>
              A report covers one security, under one methodology, for one data
              period. It shows what the methodology checks, the figures behind
              each check, and when a person last reviewed it.
            </p>
            <h3>The methodology at launch</h3>
            <p>
              We use an <b>AAOIFI-aligned</b> methodology. “Aligned” means we
              apply published criteria in the spirit of the standard. It doesn’t
              mean AAOIFI has reviewed or approved our reports. Other
              methodologies can reach different results, and we’ll add them one
              at a time.
            </p>
            <h3>Two checks</h3>
            <p>
              <b>Business activity.</b> We identify non-permissible activities
              and estimate their share of revenue from the company’s own segment
              disclosure.
            </p>
            <p>
              <b>Financial ratios.</b> We calculate three ratios from figures in
              the annual report. Every report shows the formula, the inputs and
              the denominator.
            </p>
            <div
              className="tbl-wrap"
              tabIndex={0}
              role="region"
              aria-label="Financial ratios and thresholds. Scroll sideways if needed."
            >
              <table className="mt-t ">
                <thead>
                  <tr>
                    <th scope="col">Ratio</th>
                    <th scope="col">Formula</th>
                    <th scope="col">Threshold</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Non-permissible income</th>
                    <td>Non-permissible revenue ÷ total revenue</td>
                    <td>≤ 5%</td>
                  </tr>
                  <tr>
                    <th scope="row">Interest-bearing debt</th>
                    <td>Interest-bearing debt ÷ total assets</td>
                    <td>≤ 30%</td>
                  </tr>
                  <tr>
                    <th scope="row">Interest-bearing securities</th>
                    <td>Interest-bearing securities ÷ total assets</td>
                    <td>≤ 30%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="note">
              <Info className="ic" width={16} height={16} />
              <span>
                Some methodologies divide by market capitalization instead of
                total assets. When that changes the answer, the report shows
                both and uses the label “Varies by methodology”. Thresholds here
                are placeholders for the real values.
              </span>
            </p>
            <h3>How a result is reached</h3>
            <ol className="list">
              <li>An editor enters the figures from the sources.</li>
              <li>The system calculates the ratios.</li>
              <li>The system proposes a result using the thresholds above.</li>
              <li>
                A reviewer confirms it, or changes it only with a written
                reason.
              </li>
              <li>The report is published as a new version.</li>
            </ol>
            <h3>Result labels</h3>
            <p>
              We use six labels and no others. None of them says “halal” or
              “haram”.
            </p>
            <div
              className="tbl-wrap"
              tabIndex={0}
              role="region"
              aria-label="Result labels. Scroll sideways if needed."
            >
              <table className="mt-t ">
                <thead>
                  <tr>
                    <th scope="col">Label</th>
                    <th scope="col">What it means</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <span className="badge b-pos ">
                        <CircleCheck className="ic" width={14} height={14} />
                        Meets selected criteria
                      </span>
                    </th>
                    <td>
                      The published criteria are met, based on the reviewed
                      data. It isn’t a ruling, and the report shows the inputs
                      so you can check them.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="badge b-warn ">
                        <TriangleAlert className="ic" width={14} height={14} />
                        Does not meet selected criteria
                      </span>
                    </th>
                    <td>
                      One or more criteria aren’t met. The report names which
                      one and shows the figures.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="badge b-sand ">
                        <Info className="ic" width={14} height={14} />
                        Varies by methodology
                      </span>
                    </th>
                    <td>
                      The result differs depending on the methodology or how a
                      ratio is measured. The report explains where.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="badge b-neutral ">
                        <Minus className="ic" width={14} height={14} />
                        Insufficient verified data
                      </span>
                    </th>
                    <td>
                      Required inputs are missing or couldn’t be verified, so we
                      don’t publish a result.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="badge b-mist ">
                        <Clock className="ic" width={14} height={14} />
                        Under review
                      </span>
                    </th>
                    <td>
                      A new assessment is being prepared. Treat any earlier
                      result as out of date.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="badge b-mist ">
                        <Minus className="ic" width={14} height={14} />
                        Archived
                      </span>
                    </th>
                    <td>
                      We no longer maintain the report. It stays available for
                      reference.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section
            data-m="notdo"
            data-sec="not-do"
            id="not-do"
            className="card2"
          >
            <h2 id="not-do">
              What we don’t do
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="not-do"
                aria-label="Copy link to the section “What we don’t do”"
                onClick={() => handleCopy("not-do")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <ul className="not">
              <li>
                <Minus className="ic" width={18} height={18} />
                <span>Issue religious rulings or fatwas.</span>
              </li>
              <li>
                <Minus className="ic" width={18} height={18} />
                <span>
                  Give personalized investment, tax, legal, accounting or
                  Shariah advice.
                </span>
              </li>
              <li>
                <Minus className="ic" width={18} height={18} />
                <span>
                  Calculate purification or zakat. We may add this later.
                </span>
              </li>
              <li>
                <Minus className="ic" width={18} height={18} />
                <span>
                  Screen every listed security automatically. We publish fewer,
                  fully sourced reports.
                </span>
              </li>
              <li>
                <Minus className="ic" width={18} height={18} />
                <span>Track real-time changes during the trading day.</span>
              </li>
              <li>
                <Minus className="ic" width={18} height={18} />
                <span>
                  Rank providers by quality, or call anything “the best”.
                </span>
              </li>
            </ul>
          </section>
          <section
            data-m="indep"
            data-sec="independence"
            id="independence"
            className="card2"
          >
            <h2 id="independence">
              Independence and corrections
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="independence"
                aria-label="Copy link to the section “Independence and corrections”"
                onClick={() => handleCopy("independence")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <p>
              Some provider links are referral links. We label them on the
              option and near the list, and we may earn a commission if you open
              an account through one. A referral link doesn’t change which
              options appear or their order, and providers can’t pay to be
              included or rated. Read the{" "}
              <Link href="/disclosures" data-act="disclosures">
                full disclosures
              </Link>
              .
            </p>
            <p>
              We keep facts separate from opinion. Anything that is our judgment
              appears in a box labelled “Sahihfolio editorial note”.
            </p>
            <p>
              If something looks wrong or out of date, tell us. You can use
              “Request an update” on any report, or the feedback box at the end
              of this page.
            </p>
          </section>
          {false && (
            <section
              data-m="changelog"
              data-sec="changelog"
              id="changelog"
              className="card2"
            >
              <h2 id="changelog">
                Version history
                <button
                  type="button"
                  className="anc"
                  data-act="copy-sec"
                  data-sec="changelog"
                  aria-label="Copy link to the section “Version history”"
                  onClick={() => handleCopy("changelog")}
                >
                  <LinkIcon className="ic" width={18} height={18} />
                </button>
              </h2>
              <p>
                Each version of this page is kept. The most recent is shown
                first.
              </p>
              <details className="ver" data-vd="v1.2">
                <summary>
                  <b>Version 1.2</b>
                  <span className="badge b-neutral">Viewing</span>
                  <span className="d">1 Oct 2026</span>
                </summary>
                <div className="vb">
                  <ul>
                    <li>
                      Reports show both denominators when methodologies differ.
                    </li>
                    <li>
                      Added a report-level confidence, taken from the weakest
                      source.
                    </li>
                    <li>
                      Clarified how “Insufficient verified data” is decided.
                    </li>
                  </ul>
                </div>
              </details>
              <details className="ver" data-vd="v1.1">
                <summary>
                  <b>Version 1.1</b>
                  <span className="badge b-mist">Archived</span>
                  <span className="d">4 Aug 2026</span>
                </summary>
                <div className="vb">
                  <ul>
                    <li>
                      Added the 90-day stale flag and the “Needs review” badge.
                    </li>
                    <li>Added the version history to each report.</li>
                  </ul>
                  <p style={{ margin: "10px 0 0", fontSize: "14px" }}>
                    <button
                      type="button"
                      className="link-btn"
                      data-act="to-ver"
                      data-v="v1.1"
                    >
                      View version 1.1
                    </button>
                  </p>
                </div>
              </details>
              <details className="ver" data-vd="v1.0">
                <summary>
                  <b>Version 1.0</b>
                  <span className="badge b-mist">Archived</span>
                  <span className="d">10 Apr 2026</span>
                </summary>
                <div className="vb">
                  <ul>
                    <li>First published.</li>
                  </ul>
                  <p style={{ margin: "10px 0 0", fontSize: "14px" }}>
                    <button
                      type="button"
                      className="link-btn"
                      data-act="to-ver"
                      data-v="v1.0"
                    >
                      View version 1.0
                    </button>
                  </p>
                </div>
              </details>
            </section>
          )}
          <section
            data-m="glossary"
            data-sec="glossary"
            id="glossary"
            className="card2"
          >
            <h2 id="glossary">
              Glossary
              <button
                type="button"
                className="anc"
                data-act="copy-sec"
                data-sec="glossary"
                aria-label="Copy link to the section “Glossary”"
                onClick={() => handleCopy("glossary")}
              >
                <LinkIcon className="ic" width={18} height={18} />
              </button>
            </h2>
            <p>Short definitions of the terms used on this site.</p>
            {false && (
              <>
                <label className="lbl" htmlFor="m1-g">
                  Search the glossary
                </label>
                <div className="sbox">
                  <Search className="ic lead" width={20} height={20} />
                  <input
                    id="m1-g"
                    className="inp gq"
                    type="search"
                    placeholder="For example, denominator"
                    autoComplete="off"
                    value=""
                    aria-controls="m1-gl"
                  />
                </div>
                <p className="gl-c" role="status" aria-live="polite">
                  11 terms
                </p>
              </>
            )}
            <dl className="gl" id="m1-gl">
              <div className="gl-i">
                <dt>AAOIFI</dt>
                <dd>
                  The Accounting and Auditing Organization for Islamic Financial
                  Institutions, a standard-setting body. Our launch methodology
                  is aligned with its published screening standard. We apply the
                  criteria ourselves, and AAOIFI hasn’t reviewed our reports.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Confidence</dt>
                <dd>
                  How reliable we judge a source to be: High, Medium or Low. It
                  describes the source, not the security.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Data period</dt>
                <dd>
                  The reporting period the figures come from, such as a
                  fiscal-year annual report.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Denominator</dt>
                <dd>
                  The figure a ratio is divided by, such as total assets or
                  market capitalization. Methodologies differ, so each report
                  states which it uses.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Interest-bearing debt</dt>
                <dd>
                  Borrowings on which the company pays interest. It is one input
                  to a screening ratio.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Interest-bearing securities</dt>
                <dd>
                  Holdings, such as interest-paying bonds or deposits, that earn
                  interest. It is one input to a screening ratio.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Methodology</dt>
                <dd>
                  The published set of criteria used to screen a security.
                  Different methodologies can reach different results.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Needs review</dt>
                <dd>
                  A badge shown when a record was last reviewed more than 90
                  days ago.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Non-permissible income</dt>
                <dd>
                  Revenue from activities the methodology treats as
                  impermissible, as a share of total revenue.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Screening result</dt>
                <dd>
                  What a report says about one security under one methodology on
                  one date. It is information, not a ruling.
                </dd>
              </div>
              <div className="gl-i">
                <dt>Under review</dt>
                <dd>
                  A new assessment is being prepared. The earlier result is out
                  of date.
                </dd>
              </div>
            </dl>
          </section>
          <section id="feedback" data-m="feedback" className="card2 fb">
            {!feedback ? (
              <>
                <h2>Was this page helpful?</h2>
                <div
                  className="btn-row"
                  role="group"
                  aria-label="Was this page helpful?"
                >
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="fb-yes"
                    aria-pressed={helpful || false}
                    onClick={() => setHelpful(true)}
                  >
                    <ThumbsUp className="ic" width={18} height={18} /> Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="fb-no"
                    aria-pressed={!helpful || false}
                    onClick={() => {
                      setHelpful(false);
                      setFeedback(true);
                    }}
                  >
                    <ThumbsDown className="ic" width={18} height={18} /> No
                  </button>
                </div>
                {helpful && (
                  <p
                    className="fmsg"
                    role="status"
                    style={{ marginTop: "12px" }}
                  >
                    <CircleCheck className="ic" width={16} height={16} />
                    Thanks. Glad it helped.
                  </p>
                )}
              </>
            ) : (
              <>
                <h2>What was missing or unclear?</h2>
                <p className="muted" style={{ marginBottom: "12px" }}>
                  Tell us what to improve. You don’t need to share your name or
                  email.
                </p>
                <form className="fb-f" noValidate>
                  <div className="fld">
                    <label className="vh" htmlFor="m1-n">
                      What was missing or unclear?
                    </label>
                    <textarea
                      id="m1-n"
                      className={`ta fb-note ${feedbackDetails.length >= 500 ? "invalid" : ""}`}
                      placeholder="For example, how thresholds are chosen"
                      onChange={(e) => setFeedbackDetails(e.target.value)}
                    ></textarea>
                    <div className="cnt ">
                      <span
                        className="fmsg err"
                        data-nm=""
                        role="alert"
                        style={{ margin: 0 }}
                        hidden={feedbackDetails.length < 500}
                      >
                        <TriangleAlert className="ic" width={16} height={16} />
                        Keep it to 500 characters or fewer.
                      </span>
                      <span className="cn">0/500</span>
                    </div>
                  </div>
                  <div className="btn-row" style={{ marginTop: "14px" }}>
                    <button type="submit" className="btn btn-primary btn-sm">
                      Send feedback
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      data-act="fb-reset"
                      onClick={() => {
                        setHelpful(null);
                        setFeedback(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </section>
          <section data-m="disc" className="disc">
            <Info className="ic" width={20} height={20} />
            <div>
              <b>Informational research, not a religious ruling</b>
              <p>
                Sahihfolio provides general educational information. It does not
                provide personalized investment, tax, legal, accounting or
                Shariah advice. Availability, fees and screening results can
                change; verify directly with the provider or a qualified scholar
                before making a decision.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
