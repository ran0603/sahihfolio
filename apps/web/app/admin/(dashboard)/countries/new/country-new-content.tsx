"use client";

import {
  REGULATORY_NOTE_CATEGORIES,
  RegulatoryNote,
  Restriction,
  Source,
} from "@sahihfolio/shared";
import {
  TriangleAlert,
  Trash,
  Plus,
  X,
  ChevronRight,
  CircleCheck,
  Clock,
  Loader2,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { createCountry } from "@/lib/countries/actions";
import { Country } from "@sahihfolio/database";

const ISO_COUNTRIES: [string, string, string][] = [
  ["MY", "Malaysia", "MYR"],
  ["GB", "United Kingdom", "GBP"],
  ["US", "United States", "USD"],
  ["CA", "Canada", "CAD"],
  ["AE", "United Arab Emirates", "AED"],
  ["SA", "Saudi Arabia", "SAR"],
  ["SG", "Singapore", "SGD"],
  ["AU", "Australia", "AUD"],
  ["ID", "Indonesia", "IDR"],
  ["TR", "Türkiye", "TRY"],
  ["PK", "Pakistan", "PKR"],
  ["QA", "Qatar", "QAR"],
  ["BH", "Bahrain", "BHD"],
  ["EG", "Egypt", "EGP"],
  ["KW", "Kuwait", "KWD"],
  ["OM", "Oman", "OMR"],
  ["JO", "Jordan", "JOD"],
  ["MA", "Morocco", "MAD"],
  ["BD", "Bangladesh", "BDT"],
  ["NG", "Nigeria", "NGN"],
  ["ZA", "South Africa", "ZAR"],
  ["DE", "Germany", "EUR"],
  ["FR", "France", "EUR"],
];

const appliesToOptions = [
  { value: "all", label: "All countries and providers", group: "General" },
  { value: "investor", label: "Investors", group: "Audience" },
  { value: "retail_investor", label: "Retail investors", group: "Audience" },
  {
    value: "institutional_investor",
    label: "Institutional investors",
    group: "Audience",
  },
  { value: "provider", label: "All providers", group: "Provider" },
  { value: "broker", label: "Brokers", group: "Provider" },
  { value: "robo_advisor", label: "Robo-advisors", group: "Provider" },
  {
    value: "managed_portfolio",
    label: "Managed portfolios",
    group: "Provider",
  },
  { value: "etf_provider", label: "ETF providers", group: "Provider" },
  { value: "stocks", label: "Stocks", group: "Product" },
  { value: "etfs", label: "ETFs", group: "Product" },
  { value: "managed", label: "Managed portfolios", group: "Product" },
  {
    value: "international_market",
    label: "International markets",
    group: "Market",
  },
  { value: "local_market", label: "Local market", group: "Market" },
  {
    value: "foreign_currency",
    label: "Foreign-currency investments",
    group: "Currency",
  },
  {
    value: "local_currency",
    label: "Local-currency investments",
    group: "Currency",
  },
  {
    value: "cross_border",
    label: "Cross-border investing",
    group: "Cross-border",
  },
  { value: "tax", label: "Tax treatment", group: "Tax" },
  {
    value: "reporting",
    label: "Reporting and disclosures",
    group: "Reporting",
  },
  { value: "account_opening", label: "Account opening", group: "Account" },
  {
    value: "withdrawals",
    label: "Withdrawals and transfers",
    group: "Account",
  },
] as const;

export default function CountryNewContent({
  existingCountries,
  sources,
}: {
  existingCountries: (Country & { totalProviders?: number })[];
  sources: Source[];
}) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [lastReviewedAt, setLastReviewedAt] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [regulatoryNotes, setRegulatoryNotes] = useState<RegulatoryNote[]>([]);
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [sourceUrls, setSourceUrls] = useState<string[]>([""]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const existingCountry = existingCountries.find(
    (c) => c.code.toUpperCase() === code.toUpperCase(),
  );

  const handleCountrySelect = (selectedCode: string) => {
    setCode(selectedCode);
    const preset = ISO_COUNTRIES.find(([k]) => k === selectedCode);
    if (preset) {
      if (!name) setName(preset[1]);
      if (!currency) setCurrency(preset[2]);
    }
  };

  const addRegulatoryNote = () => {
    setRegulatoryNotes((prev) => [
      ...prev,
      {
        category: "other",
        summary: "",
        appliesTo: [],
        source: {
          id: crypto.randomUUID(),
          label: "",
          url: "",
          retrievedAt: new Date(),
          sourceType: "other",
          confidence: "low",
        },
        detail: "",
      },
    ]);
  };

  const addRestriction = () => {
    setRestrictions((prev) => [
      ...prev,
      {
        type: "other",
        summary: "",
        appliesTo: [],
        source: {
          id: crypto.randomUUID(),
          label: "",
          url: "",
          retrievedAt: new Date(),
          sourceType: "other",
          confidence: "low",
        },
        severity: "informational",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!code) {
      setFormError("Please choose a country code.");
      return;
    }
    if (existingCountry) {
      setFormError(`A country with code ${code} has already been added.`);
      return;
    }
    if (!name.trim()) {
      setFormError("Country display name is required.");
      return;
    }
    if (!currency.trim() || currency.length !== 3) {
      setFormError("A valid 3-letter currency code is required.");
      return;
    }
    const validUrls = sourceUrls.filter((u) => u.trim().length > 0);
    if (validUrls.length === 0) {
      setFormError("Please provide at least one source URL.");
      return;
    }

    startTransition(async () => {
      const data = new FormData();
      data.append("code", code.toUpperCase());
      data.append("name", name.trim());
      data.append("currency", currency.trim().toUpperCase());
      data.append("regulatoryNotes", JSON.stringify(regulatoryNotes));
      data.append("restrictions", JSON.stringify(restrictions));
      data.append("sourceUrls", JSON.stringify(validUrls));
      data.append("lastReviewedAt", lastReviewedAt);
      data.append("status", "draft");

      const res = await createCountry(null, data);
      if (res?.status === "error") {
        const msg =
          res.errors && "code" in res.errors
            ? res.errors.code?.[0]
            : res.errors && "form" in res.errors
            ? res.errors.form?.[0]
            : "Could not create country.";
        setFormError(msg || "Failed to create country.");
      }
    });
  };

  return (
    <>
      <section data-m="head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/admin/countries" data-act="navto" data-n="Countries">
            Countries
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Add country</span>
        </nav>
        <div className="ad-head">
          <div>
            <h1 tabIndex={-1}>Add a country</h1>
            <p className="ad-sub">
              It starts as a draft. Publish it from the list once it’s ready.
            </p>
          </div>
        </div>
      </section>

      {formError && (
        <section data-m="notice" style={{ marginBottom: "16px" }}>
          <div className="alert a-error flat" role="alert">
            <TriangleAlert className="ic" width={20} height={20} />
            <div className="a-body">
              <strong>Cannot create country</strong>
              <span> {formError}</span>
            </div>
          </div>
        </section>
      )}

      <div data-m="form">
        <div className="nw">
          <form className="nwf" noValidate onSubmit={handleSubmit}>
            <section className="wz-card">
              <h2 className="wz-h">Basics</h2>
              <div className="fld">
                <label className="lbl" htmlFor="m7-code">
                  Country
                </label>
                <p className="hint">The code can’t be changed after you create it.</p>
                <select
                  id="m7-code"
                  className={`sel ${existingCountry ? "invalid" : ""}`}
                  value={code}
                  onChange={(e) => handleCountrySelect(e.target.value)}
                >
                  <option value="">Choose a country</option>
                  {ISO_COUNTRIES.map(([k, n]) => {
                    const exists = existingCountries.some(
                      (c) => c.code.toUpperCase() === k.toUpperCase(),
                    );
                    return (
                      <option key={k} value={k}>
                        {n} ({k})
                        {exists ? " — already added" : ""}
                      </option>
                    );
                  })}
                </select>
                {existingCountry && (
                  <p className="fine dupn" style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                    <Info className="ic" width={16} height={16} />
                    <span>
                      <Link
                        href={`/admin/countries/${existingCountry.id}/edit`}
                        className="link-btn"
                      >
                        Open {existingCountry.name}
                      </Link>{" "}
                      to edit it instead.
                    </span>
                  </p>
                )}
              </div>

              <div className="g2">
                <div className="fld">
                  <label className="lbl" htmlFor="m7-name">
                    Display name
                  </label>
                  <p className="hint">How visitors see it.</p>
                  <input
                    id="m7-name"
                    className="inp"
                    type="text"
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="fld">
                  <label className="lbl" htmlFor="m7-cur">
                    Currency
                  </label>
                  <p className="hint">A 3-letter code.</p>
                  <input
                    id="m7-cur"
                    className="inp up"
                    type="text"
                    placeholder="MYR"
                    maxLength={3}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              <div className="fld">
                <label className="lbl" htmlFor="m7-rev">
                  Last reviewed
                </label>
                <p className="hint">
                  When someone last checked this country’s information. Starts as today.
                </p>
                <input
                  id="m7-rev"
                  className="inp"
                  type="date"
                  value={lastReviewedAt}
                  onChange={(e) => setLastReviewedAt(e.target.value)}
                />
              </div>
            </section>

            {/* Regulatory Notes Section */}
            <section className="wz-card">
              <h2 className="wz-h">Regulatory notes</h2>
              <p className="hint" style={{ marginTop: "0" }}>
                What a visitor should know about investing from this country.
              </p>
              <ul className="esl">
                {regulatoryNotes.map((note, index) => (
                  <li key={index} className="cd">
                    <div className="cd-h">
                      <span className="cd-t">
                        <b>{index + 1}</b>
                        <span>
                          {note.summary ? note.summary : "New regulatory note"}
                        </span>
                      </span>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`Remove regulatory note ${index + 1}`}
                        onClick={() =>
                          setRegulatoryNotes((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <Trash className="ic" width={20} height={20} />
                      </button>
                    </div>
                    <div className="fld">
                      <label className="lbl">Category</label>
                      <select
                        className="sel"
                        value={note.category}
                        onChange={(e) =>
                          setRegulatoryNotes((prev) =>
                            prev.map((n, i) =>
                              i === index
                                ? { ...n, category: e.target.value as any }
                                : n,
                            ),
                          )
                        }
                      >
                        {REGULATORY_NOTE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="fld">
                      <label className="lbl">Summary</label>
                      <textarea
                        className="ta"
                        rows={2}
                        value={note.summary}
                        placeholder="Key point in plain language"
                        onChange={(e) =>
                          setRegulatoryNotes((prev) =>
                            prev.map((n, i) =>
                              i === index
                                ? { ...n, summary: e.target.value }
                                : n,
                            ),
                          )
                        }
                      />
                    </div>
                    <div className="fld">
                      <label className="lbl">Source link / reference URL</label>
                      <input
                        type="url"
                        className="inp"
                        placeholder="https://..."
                        value={note.source.url}
                        onChange={(e) =>
                          setRegulatoryNotes((prev) =>
                            prev.map((n, i) =>
                              i === index
                                ? {
                                    ...n,
                                    source: {
                                      ...n.source,
                                      url: e.target.value,
                                    },
                                  }
                                : n,
                            ),
                          )
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={addRegulatoryNote}
              >
                <Plus className="ic" width={18} height={18} />
                Add a regulatory note
              </button>
            </section>

            {/* Restrictions Section */}
            <section className="wz-card">
              <h2 className="wz-h">Restrictions</h2>
              <p className="hint" style={{ marginTop: "0" }}>
                Limits that affect who can use a route.
              </p>
              <ul className="esl">
                {restrictions.map((restriction, index) => (
                  <li key={index} className="cd">
                    <div className="cd-h">
                      <span className="cd-t">
                        <b>{index + 1}</b>
                        <span>
                          {restriction.summary
                            ? restriction.summary
                            : "New restriction"}
                        </span>
                      </span>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`Remove restriction ${index + 1}`}
                        onClick={() =>
                          setRestrictions((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <Trash className="ic" width={20} height={20} />
                      </button>
                    </div>
                    <div className="g2">
                      <div className="fld">
                        <label className="lbl">Type</label>
                        <select
                          className="sel"
                          value={restriction.type}
                          onChange={(e) =>
                            setRestrictions((prev) =>
                              prev.map((r, i) =>
                                i === index
                                  ? { ...r, type: e.target.value as any }
                                  : r,
                              ),
                            )
                          }
                        >
                          {[
                            "residency",
                            "citizenship",
                            "age",
                            "sanctions",
                            "product",
                            "market",
                            "currency",
                            "tax",
                            "brokerage",
                            "other",
                          ].map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="fld">
                        <label className="lbl">Severity</label>
                        <select
                          className="sel"
                          value={restriction.severity}
                          onChange={(e) =>
                            setRestrictions((prev) =>
                              prev.map((r, i) =>
                                i === index
                                  ? { ...r, severity: e.target.value as any }
                                  : r,
                              ),
                            )
                          }
                        >
                          <option value="blocking">Blocking</option>
                          <option value="conditional">Conditional</option>
                          <option value="informational">Informational</option>
                        </select>
                      </div>
                    </div>
                    <div className="fld">
                      <label className="lbl">Summary</label>
                      <textarea
                        className="ta"
                        rows={2}
                        value={restriction.summary}
                        placeholder="Plain-language description"
                        onChange={(e) =>
                          setRestrictions((prev) =>
                            prev.map((r, i) =>
                              i === index
                                ? { ...r, summary: e.target.value }
                                : r,
                            ),
                          )
                        }
                      />
                    </div>
                    <div className="fld">
                      <label className="lbl">Source link / reference URL</label>
                      <input
                        type="url"
                        className="inp"
                        placeholder="https://..."
                        value={restriction.source.url}
                        onChange={(e) =>
                          setRestrictions((prev) =>
                            prev.map((r, i) =>
                              i === index
                                ? {
                                    ...r,
                                    source: {
                                      ...r.source,
                                      url: e.target.value,
                                    },
                                  }
                                : r,
                            ),
                          )
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={addRestriction}
              >
                <Plus className="ic" width={18} height={18} />
                Add a restriction
              </button>
            </section>

            {/* General Source Links */}
            <section className="wz-card">
              <h2 className="wz-h">General source links</h2>
              <p className="hint" style={{ marginTop: "0" }}>
                Official and reference pages for this country profile.
              </p>
              <ul className="sl-list" style={{ listStyle: "none", padding: 0 }}>
                {sourceUrls.map((url, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "8px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="url"
                      className="inp"
                      placeholder="https://..."
                      value={url}
                      onChange={(e) => {
                        const next = [...sourceUrls];
                        next[index] = e.target.value;
                        setSourceUrls(next);
                      }}
                    />
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Remove link ${index + 1}`}
                      onClick={() =>
                        setSourceUrls((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      <Trash className="ic" width={20} height={20} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSourceUrls((prev) => [...prev, ""])}
              >
                <Plus className="ic" width={18} height={18} />
                Add a link
              </button>
            </section>

            <div className="btn-row nwb">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="ic animate-spin" width={16} height={16} />
                    Creating…
                  </>
                ) : (
                  <>
                    <Plus className="ic" width={18} height={18} />
                    Create draft
                  </>
                )}
              </button>
              <Link href="/admin/countries" className="btn btn-ghost">
                Cancel
              </Link>
            </div>
          </form>

          {/* Before you publish checklist */}
          <aside className="rdy" aria-labelledby="rdy-rt">
            <h2 id="rdy-rt">Before you publish</h2>
            <p className="hint" style={{ margin: "0 0 8px" }}>
              You can create the draft without these.
            </p>
            <ul className="rl">
              <li className={lastReviewedAt ? "ok" : ""}>
                {lastReviewedAt ? (
                  <CircleCheck className="ic" width={18} height={18} />
                ) : (
                  <Clock className="ic" width={18} height={18} />
                )}
                <span>
                  Reviewed in the last 90 days
                  <span className="vh">
                    {lastReviewedAt ? ", done" : ", still needed"}
                  </span>
                </span>
              </li>
              <li className={regulatoryNotes.length > 0 ? "ok" : ""}>
                {regulatoryNotes.length > 0 ? (
                  <CircleCheck className="ic" width={18} height={18} />
                ) : (
                  <Clock className="ic" width={18} height={18} />
                )}
                <span>
                  At least one regulatory note
                  <span className="vh">
                    {regulatoryNotes.length > 0 ? ", done" : ", still needed"}
                  </span>
                </span>
              </li>
              <li>
                <Clock className="ic" width={18} height={18} />
                <span>
                  At least one published provider
                  <span className="vh">, still needed</span>
                </span>
              </li>
            </ul>
            <p className="hint" style={{ margin: "8px 0 0" }}>
              Providers are linked from the provider side.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
