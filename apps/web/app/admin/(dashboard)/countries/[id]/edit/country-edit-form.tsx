"use client";

import {
  CountryProfile,
  REGULATORY_NOTE_CATEGORIES,
  RegulatoryNote,
  Restriction,
  Source,
} from "@sahihfolio/shared";
import { TriangleAlert, Trash, Plus, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Country } from "node_modules/@sahihfolio/database/src";

export const appliesToOptions: readonly {
  value: string;
  label: string;
  group: string;
}[] = [
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

export default function CountryEditForm({
  country,
  sources,
}: {
  country: CountryProfile;
  sources: Source[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [countryName, setCountryName] = useState<string>(country.name);
  const [countryCurrency, setCountryCurrency] = useState<string>(
    country.currency,
  );
  const [countryRegulatoryNotes, setCountryRegulatoryNotes] = useState<
    RegulatoryNote[]
  >(country.regulatoryNotes || []);
  const [countryRestrictions, setCountryRestrictions] = useState<Restriction[]>(
    country.restrictions || [],
  );

  const addRegulatoryNote = () => {
    setCountryRegulatoryNotes([
      ...countryRegulatoryNotes,
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
    setCountryRestrictions([
      ...countryRestrictions,
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
  const [countrySourceUrls, setCountrySourceUrls] = useState<string[]>(
    country.sourceUrls || [],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const updatedCountry: Country = {
      id: country.id,
      name: countryName,
      currency: countryCurrency,
      sourceUrls: countrySourceUrls,
      regulatoryNotes: countryRegulatoryNotes,
      restrictions: countryRestrictions,
      status: country.status,
      code: country.code,
      createdAt: country.createdAt,
      updatedAt: new Date(),
      lastReviewedAt: country.lastReviewedAt,
    };
    console.log(updatedCountry);
  };

  return (
    <form className="nwfw" noValidate onSubmit={handleSubmit}>
      <div className="nwf">
        <section className="wz-card">
          <h2 className="wz-h">Basics</h2>
          <div className="fld">
            <span className="lbl">Country</span>
            <p className="ro-v">
              {country.name} <span className="cc">{country.code}</span>
              <span className="muted"> · The code can’t be changed.</span>
            </p>
          </div>
          <div className="g2">
            <div className="fld">
              <label className="lbl" htmlFor="m7-name">
                Display name
              </label>
              <p className="hint" id="m7-name-h">
                How visitors see it.
              </p>
              <input
                className={`inp ${countryName.trim().length === 0 && "invalid"}`}
                type="text"
                id="m7-name"
                data-p="F.name"
                aria-describedby="m7-name-e m7-name-h"
                maxLength={80}
                autoComplete="off"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
              />
              <p
                className="fmsg err"
                data-ef="name"
                id="m7-name-e"
                role="alert"
                hidden={countryName.trim().length > 0}
              >
                <TriangleAlert className="ic" width={16} height={16} />
                <span>Enter a display name.</span>
              </p>
            </div>
            <div className="fld">
              <label className="lbl" htmlFor="m7-cur">
                Currency
              </label>
              <p className="hint" id="m7-cur-h">
                A 3-letter code.
              </p>
              <input
                className={`inp up ${countryCurrency.trim().length === 0 && "invalid"}`}
                type="text"
                id="m7-cur"
                data-p="F.cur"
                aria-describedby="m7-cur-e m7-cur-h"
                value={countryCurrency}
                placeholder="MYR"
                maxLength={3}
                autoComplete="off"
                onChange={(e) => setCountryCurrency(e.target.value)}
              />
              <p
                className="fmsg err"
                data-ef="cur"
                id="m7-cur-e"
                role="alert"
                hidden={countryCurrency.trim().length > 0}
              >
                <TriangleAlert className="ic" width={16} height={16} />
                <span>A currency code is 3 letters, like MYR.</span>
              </p>
            </div>
          </div>
        </section>
        <section className="wz-card">
          <h2 className="wz-h">Regulatory notes</h2>
          <p className="hint" style={{ marginTop: "0" }}>
            What a visitor should know about investing from here. Each needs its
            own source.
          </p>
          <ul className="cards">
            {countryRegulatoryNotes.map(
              (note: RegulatoryNote, index: number) => (
                <li
                  className="icard open "
                  key={`notes.${index}`}
                  data-card={`notes.${index}`}
                >
                  <div className="ic-h">
                    <button
                      type="button"
                      className="ic-t"
                      data-act="toggle"
                      data-k={`notes.${index}`}
                      aria-expanded="true"
                      aria-controls={`m8-notes-${index}-b`}
                    >
                      <span className="chv">
                        <ChevronRight
                          className="ic"
                          width={18}
                          height={18}
                          strokeWidth={1.5}
                        />
                      </span>
                      <span className="ic-n">{`Note ${index + 1} · ${note.category.replace("_", " ")}`}</span>
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      data-act="rm-item"
                      data-k="notes"
                      data-i={index}
                      aria-label={`Remove note ${index + 1}`}
                      onClick={() => {
                        const newNotes = [...countryRegulatoryNotes];
                        newNotes.splice(index, 1);
                        setCountryRegulatoryNotes(newNotes);
                      }}
                    >
                      <Trash
                        className="ic"
                        width={20}
                        height={20}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                  <div className="ic-b" id={`m8-notes-${index}-b`}>
                    <div className="g2">
                      <div className="fld">
                        <label
                          className="lbl"
                          htmlFor={`m8-notes-${index}-category`}
                        >
                          Category
                        </label>
                        <select
                          className="sel "
                          id={`m8-notes-${index}-category`}
                          data-p={`F.notes.${index}.category`}
                          aria-describedby={`m8-notes-${index}-category-e`}
                          value={note.category}
                          onChange={(e) => {
                            const newNotes = [...countryRegulatoryNotes];
                            newNotes[index].category = e.target
                              .value as RegulatoryNote["category"];
                            setCountryRegulatoryNotes(newNotes);
                          }}
                        >
                          <option value="">Choose</option>
                          {REGULATORY_NOTE_CATEGORIES.map(
                            (category, cindex) => (
                              <option
                                key={`notes.${index}-opt-${cindex}`}
                                value={category}
                              >
                                {category}
                              </option>
                            ),
                          )}
                        </select>
                        <p
                          className="fmsg err"
                          data-ef={`notes.${index}.category`}
                          id={`m8-notes-${index}-category-e`}
                          role="alert"
                          hidden
                        >
                          <TriangleAlert
                            className="ic"
                            width={16}
                            height={16}
                          />
                          <span></span>
                        </p>
                      </div>
                      <div className="fld">
                        <label
                          className="lbl"
                          htmlFor={`m8-notes-${index}-appliesTo`}
                        >
                          Applies to <span className="opt">(optional)</span>
                        </label>
                        <p
                          className="hint"
                          id={`m8-notes-${index}-appliesTo-h`}
                        >
                          Products or investor groups. Empty means everyone.
                        </p>
                        <div
                          className="tags "
                          data-tags={`F.notes.${index}.appliesTo`}
                        >
                          <ul className="tl" aria-label="Selected">
                            {note.appliesTo.map((applyTo, atIndex) => (
                              <li
                                className="tag"
                                key={`notes.${index}.appliesTo.${atIndex}`}
                              >
                                {applyTo}
                                <button
                                  type="button"
                                  className="tx"
                                  data-act="rm-tag"
                                  data-tp={`F.notes.${index}.appliesTo`}
                                  data-ti={atIndex}
                                  aria-label={`Remove ${applyTo}`}
                                  onClick={() => {
                                    const newNotes = [
                                      ...countryRegulatoryNotes,
                                    ];
                                    newNotes[index].appliesTo.splice(
                                      atIndex,
                                      1,
                                    );
                                    setCountryRegulatoryNotes(newNotes);
                                  }}
                                >
                                  <X
                                    className="ic"
                                    width={14}
                                    height={14}
                                    strokeWidth={1.5}
                                  />
                                </button>
                              </li>
                            ))}
                          </ul>
                          <input
                            id={`m8-notes-${index}-appliesTo`}
                            className="tagin"
                            type="text"
                            maxLength={40}
                            list="m8-apply"
                            placeholder="Add another"
                            autoComplete="off"
                            aria-describedby={`m8-notes-${index}-appliesTo-e m8-notes-${index}-appliesTo-h`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value;
                                if (value) {
                                  const newNotes = [...countryRegulatoryNotes];
                                  newNotes[index].appliesTo.push(value);
                                  setCountryRegulatoryNotes(newNotes);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <datalist id="m8-apply">
                            {appliesToOptions.map((option, optionIndex) => (
                              <option
                                key={`notes.${index}.appliesTo.${optionIndex}`}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </datalist>
                        </div>
                        <p
                          className="fmsg err"
                          data-ef={`notes.${index}.appliesTo`}
                          id={`m8-notes-${index}-appliesTo-e`}
                          role="alert"
                          hidden
                        >
                          <TriangleAlert
                            className="ic"
                            width={16}
                            height={16}
                          />
                          <span></span>
                        </p>
                      </div>
                    </div>

                    <div className="fld">
                      <label
                        className="lbl"
                        htmlFor={`m8-notes-${index}-summary`}
                      >
                        Summary
                      </label>
                      <p className="hint" id={`m8-notes-${index}-summary-h`}>
                        One or two plain sentences visitors will read.
                      </p>
                      <textarea
                        className="ta "
                        id={`m8-notes-${index}-summary`}
                        data-p={`F.notes.${index}.summary`}
                        aria-describedby={`m8-notes-${index}-summary-e m8-notes-${index}-summary-h`}
                        rows={3}
                        data-cnt="300"
                        value={note.summary}
                        onChange={(e) =>
                          setCountryRegulatoryNotes((prev) =>
                            prev.map((n, i) =>
                              i === index
                                ? { ...n, summary: e.target.value }
                                : n,
                            ),
                          )
                        }
                      />
                      <span className="cnt" aria-hidden="true">
                        {note.summary?.length}/300
                      </span>
                      <p
                        className="fmsg err"
                        data-ef="notes.${index}.summary"
                        id="m8-notes-${index}-summary-e"
                        role="alert"
                        hidden={note.summary.length < 300}
                      >
                        <TriangleAlert
                          className="ic"
                          width={16}
                          height={16}
                          strokeWidth={1.5}
                        />
                        <span>
                          Keep it to 300 characters ({note.summary?.length}{" "}
                          now).
                        </span>
                      </p>
                    </div>
                    <div className="fld">
                      <label
                        className="lbl"
                        htmlFor={`m8-notes-${index}-detail`}
                      >
                        Detail <span className="opt">(optional)</span>
                      </label>
                      <p className="hint" id={`m8-notes-${index}-detail-h`}>
                        Extra context for the review team; not shown in results.
                      </p>
                      <textarea
                        className="ta "
                        id={`m8-notes-${index}-detail`}
                        data-p={`F.notes.${index}.detail`}
                        aria-describedby={`m8-notes-${index}-detail-e m8-notes-${index}-detail-h`}
                        rows={4}
                        value={note.detail}
                        placeholder="The regulator publishes a register of licensed firms. Check it before listing a provider."
                        data-cnt="2000"
                        onChange={(e) => {
                          const newNotes = [...countryRegulatoryNotes];
                          newNotes[index].detail = e.target.value;
                          setCountryRegulatoryNotes(newNotes);
                        }}
                      />
                      <span className="cnt" aria-hidden="true">
                        {note.detail?.length}/2000
                      </span>
                      <p
                        className="fmsg err"
                        data-ef={`notes.${index}.detail`}
                        id={`m8-notes-${index}-detail-e`}
                        role="alert"
                        hidden={!note.detail || note.detail?.length < 2000}
                      >
                        <TriangleAlert
                          className="ic"
                          width={16}
                          height={16}
                          strokeWidth={1.5}
                        />
                        <span>
                          Keep it to 2000 characters ({note.detail?.length}{" "}
                          now).
                        </span>
                      </p>
                    </div>
                    <fieldset className="srcf">
                      <legend>Source</legend>
                      <div className="fld">
                        <label className="lbl" htmlFor={`m8-notes-${index}-re`}>
                          Copy from another source{" "}
                          <span className="opt">(optional)</span>
                        </label>
                        <select
                          className="sel"
                          id={`m8-notes-${index}-re`}
                          data-reuse={`notes.${index}`}
                          onChange={(e) =>
                            setCountryRegulatoryNotes((prev) =>
                              prev.map((n, i) =>
                                i === index
                                  ? {
                                      ...n,
                                      source: sources.find(
                                        (s) => s.id === e.target.value,
                                      ) as Source,
                                    }
                                  : n,
                              ),
                            )
                          }
                        >
                          <option value="">Choose a source</option>
                          {sources?.map((s, i) => (
                            <option key={`source-${i}`} value={s.id}>
                              {s.label} [{s.sourceType}]
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="g2">
                        <div className="fld">
                          <label
                            className="lbl"
                            htmlFor={`m8-notes-${index}-source-label`}
                          >
                            Name
                          </label>
                          <input
                            className="inp  "
                            type="text"
                            id={`m8-notes-${index}-source-label`}
                            data-p={`F.notes.${index}.source.label`}
                            aria-describedby={`m8-notes-${index}-source-label-e`}
                            value={note?.source?.label || ""}
                            placeholder="Regulator or publication"
                            maxLength={90}
                            autoComplete="off"
                            onChange={(e) =>
                              setCountryRegulatoryNotes((prev) =>
                                prev.map((n, i) =>
                                  i === index
                                    ? {
                                        ...n,
                                        source: {
                                          ...n.source,
                                          label: e.target.value,
                                        },
                                      }
                                    : n,
                                ),
                              )
                            }
                          />
                          <p
                            className="fmsg err"
                            data-ef="notes.${index}.source.label"
                            id={`m8-notes-${index}-source-label-e`}
                            role="alert"
                            hidden
                          >
                            <TriangleAlert
                              className="ic"
                              width={16}
                              height={16}
                              strokeWidth={1.5}
                            />
                            <span></span>
                          </p>
                        </div>
                        <div className="fld">
                          <label
                            className="lbl"
                            htmlFor={`m8-notes-${index}-source-sourceType`}
                          >
                            Type
                          </label>
                          <select
                            className="sel "
                            id={`m8-notes-${index}-source-sourceType`}
                            data-p={`F.notes.${index}.source.sourceType`}
                            aria-describedby={`m8-notes-${index}-source-sourceType-e`}
                            value={note?.source?.sourceType || "other"}
                            onChange={(e) =>
                              setCountryRegulatoryNotes((prev) =>
                                prev.map((n, i) =>
                                  i === index
                                    ? {
                                        ...n,
                                        source: {
                                          ...n.source,
                                          sourceType: e.target.value,
                                        } as Source,
                                      }
                                    : n,
                                ),
                              )
                            }
                          >
                            <option value="">Choose</option>
                            <option value="official">Official</option>
                            <option value="regulator">Regulator</option>
                            <option value="provider">Provider</option>
                            <option value="research">Research</option>
                            <option value="news">News</option>
                            <option value="other">Other</option>
                          </select>
                          <p
                            className="fmsg err"
                            data-ef={`notes.${index}.source.sourceType`}
                            id={`m8-notes-${index}-source-sourceType-e`}
                            role="alert"
                            hidden
                          >
                            <TriangleAlert
                              className="ic"
                              width={16}
                              height={16}
                              strokeWidth={1.5}
                            />
                            <span></span>
                          </p>
                        </div>
                      </div>
                      <div className="fld">
                        <label
                          className="lbl"
                          htmlFor={`m8-notes-${index}-source-url`}
                        >
                          Link
                        </label>
                        <input
                          className="inp  "
                          type="url"
                          id={`m8-notes-${index}-source-url`}
                          data-p={`F.notes.${index}.source.url`}
                          aria-describedby={`m8-notes-${index}-source-url-e`}
                          value={note.source.url}
                          placeholder="https://"
                          autoComplete="off"
                          inputMode="url"
                          onChange={(e) =>
                            setCountryRegulatoryNotes((prev) =>
                              prev.map((n, i) =>
                                i === index
                                  ? {
                                      ...n,
                                      source: {
                                        ...n.source,
                                        url: e.target.value,
                                      } as Source,
                                    }
                                  : n,
                              ),
                            )
                          }
                        />
                        <p
                          className="fmsg err"
                          data-ef={`notes.${index}.source.url`}
                          id={`m8-notes-${index}-source-url-e`}
                          role="alert"
                          hidden
                        >
                          <TriangleAlert
                            className="ic"
                            width={16}
                            height={16}
                          />
                          <span></span>
                        </p>
                      </div>
                      <div className="g2">
                        <div className="fld">
                          <label
                            className="lbl"
                            htmlFor={`m8-notes-${index}-source-retrievedAt`}
                          >
                            Retrieved on
                          </label>
                          <p
                            className="hint"
                            id={`m8-notes-${index}-source-retrievedAt-h`}
                          >
                            When you last checked it.
                          </p>
                          <input
                            className="inp  "
                            type="date"
                            id={`m8-notes-${index}-source-retrievedAt`}
                            data-p={`F.notes.${index}.source.retrievedAt`}
                            aria-describedby={`m8-notes-${index}-source-retrievedAt-e m8-notes-${index}-source-retrievedAt-h`}
                            value={
                              new Date(
                                note.source.retrievedAt,
                              ).getUTCFullYear() +
                              "-" +
                              (
                                new Date(
                                  note.source.retrievedAt,
                                ).getUTCMonth() + 1
                              )
                                .toString()
                                .padStart(2, "0") +
                              "-" +
                              new Date(note.source.retrievedAt)
                                .getUTCDate()
                                .toString()
                                .padStart(2, "0")
                            }
                            onChange={(e) =>
                              setCountryRegulatoryNotes((prev) =>
                                prev.map((n, i) =>
                                  i === index
                                    ? {
                                        ...n,
                                        source: {
                                          ...n.source,
                                          retrievedAt: new Date(e.target.value),
                                        } as Source,
                                      }
                                    : n,
                                ),
                              )
                            }
                            autoComplete="off"
                          />
                          <p
                            className="fmsg err"
                            data-ef={`notes.${index}.source.retrievedAt`}
                            id={`m8-notes-${index}-source-retrievedAt-e`}
                            role="alert"
                            hidden
                          >
                            <TriangleAlert
                              className="ic"
                              width={16}
                              height={16}
                              strokeWidth={1.5}
                            />
                            <span></span>
                          </p>
                        </div>
                        <div className="fld">
                          <label
                            className="lbl"
                            htmlFor={`m8-notes-${index}-source-confidence`}
                          >
                            Confidence <span className="opt">(optional)</span>
                          </label>
                          <select
                            className="sel "
                            id={`m8-notes-${index}-source-confidence`}
                            data-p={`F.notes.${index}.source.confidence`}
                            aria-describedby={`m8-notes-${index}-source-confidence-e`}
                            value={note?.source?.confidence || "low"}
                            onChange={(e) =>
                              setCountryRegulatoryNotes((prev) =>
                                prev.map((n, i) =>
                                  i === index
                                    ? {
                                        ...n,
                                        source: {
                                          ...n.source,
                                          confidence: e.target.value,
                                        } as Source,
                                      }
                                    : n,
                                ),
                              )
                            }
                          >
                            <option value="">Not set</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                          <p
                            className="fmsg err"
                            data-ef={`notes.${index}.source.confidence`}
                            id={`m8-notes-${index}-source-confidence-e`}
                            role="alert"
                            hidden
                          >
                            <TriangleAlert
                              className="ic"
                              width={16}
                              height={16}
                              strokeWidth={1.5}
                            />
                            <span></span>
                          </p>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </li>
              ),
            )}
          </ul>
          <p className="fmsg err" data-ef="notes" role="alert" hidden>
            <TriangleAlert
              className="ic"
              width={16}
              height={16}
              strokeWidth={1.5}
            />
            <span></span>
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            data-act="add-item"
            data-k="notes"
            onClick={addRegulatoryNote}
          >
            <Plus className="ic" width={18} height={18} strokeWidth={1.5} />
            Add a note
          </button>
        </section>
        <section className="wz-card">
          <h2 className="wz-h">Restrictions</h2>
          <p className="hint" style={{ marginTop: "0" }}>
            Limits that affect who can use a route. Each needs a severity and
            its own source.
          </p>
          <ul className="cards">
            {countryRestrictions.map((restr: Restriction, index: number) => (
              <li
                className="icard open "
                data-card={`restr.${index}`}
                key={`rest.${index}`}
              >
                <div className="ic-h">
                  <button
                    type="button"
                    className="ic-t"
                    data-act="toggle"
                    data-k={`restr.${index}`}
                    aria-expanded="true"
                    aria-controls={`m8-restr-${index}-b`}
                  >
                    <span className="chv">
                      <ChevronRight
                        className="ic"
                        width={18}
                        height={18}
                        strokeWidth={1.5}
                      />
                    </span>
                    <span className="ic-n">{`Restriction ${index + 1} · ${restr.type || ""}`}</span>
                    <span className="badge b-warn">{restr.severity}</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    data-act="rm-item"
                    data-k="restr"
                    data-i={index}
                    aria-label={`Remove restriction ${index + 1}`}
                    onClick={() => {
                      const newRestrictions = [...countryRestrictions];
                      newRestrictions.splice(index, 1);
                      setCountryRestrictions(newRestrictions);
                    }}
                  >
                    <Trash
                      className="ic"
                      width={20}
                      height={20}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
                <div className="ic-b" id={`m8-restr-${index}-b`}>
                  <div className="g2">
                    <div className="fld">
                      <label className="lbl" htmlFor={`m8-restr-${index}-type`}>
                        Type
                      </label>
                      <select
                        className="sel "
                        id={`m8-restr-${index}-type`}
                        data-p={`F.restr.${index}.type`}
                        aria-describedby={`m8-restr-${index}-type-e`}
                        value={restr.type}
                        onChange={(e) => {
                          const newRestrictions = [...countryRestrictions];
                          newRestrictions[index].type = e.target
                            .value as Restriction["type"];
                          setCountryRestrictions(newRestrictions);
                        }}
                      >
                        <option value="">Choose</option>
                        <option value="residency">Residency</option>
                        <option value="citizenship">Citizenship</option>
                        <option value="age">Age</option>
                        <option value="sanctions">Sanctions</option>
                        <option value="product">Product</option>
                        <option value="market">Market</option>
                        <option value="currency">Currency</option>
                        <option value="tax">Tax</option>
                        <option value="brokerage">Brokerage</option>
                        <option value="other">Other</option>
                      </select>
                      <p
                        className="fmsg err"
                        data-ef={`restr.${index}.type`}
                        id={`m8-restr-${index}-type-e`}
                        role="alert"
                        hidden
                      >
                        <TriangleAlert
                          className="ic"
                          width={16}
                          height={16}
                          strokeWidth={1.5}
                        />
                        <span></span>
                      </p>
                    </div>
                    <div className="fld">
                      <label
                        className="lbl"
                        htmlFor={`m8-restr-${index}-appliesTo`}
                      >
                        Applies to <span className="opt">(optional)</span>
                      </label>
                      <p className="hint" id={`m8-restr-${index}-appliesTo-h`}>
                        Products or investor groups. Empty means everyone.
                      </p>
                      <div
                        className="tags "
                        data-tags={`F.restr.${index}.appliesTo`}
                      >
                        <ul className="tl" aria-label="Selected">
                          {restr.appliesTo.map((applyTo, atIndex) => (
                            <li
                              className="tag"
                              key={`restr.${index}.appliesTo.${atIndex}`}
                            >
                              {applyTo}
                              <button
                                type="button"
                                className="tx"
                                data-act="rm-tag"
                                data-tp={`F.restr.${index}.appliesTo`}
                                data-ti={atIndex}
                                aria-label={`Remove ${applyTo}`}
                                onClick={() => {
                                  const newRestrictions = [
                                    ...countryRestrictions,
                                  ];
                                  newRestrictions[index].appliesTo.splice(
                                    atIndex,
                                    1,
                                  );
                                  setCountryRestrictions(newRestrictions);
                                }}
                              >
                                <X
                                  className="ic"
                                  width={14}
                                  height={14}
                                  strokeWidth={1.5}
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                        <input
                          id={`m8-restr-${index}-appliesTo`}
                          className="tagin"
                          type="text"
                          maxLength={40}
                          list="m8-apply"
                          placeholder="Add another"
                          autoComplete="off"
                          aria-describedby={`m8-restr-${index}-appliesTo-e m8-restr-${index}-appliesTo-h`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const value = e.currentTarget.value;
                              if (value) {
                                const newRestrictions = [
                                  ...countryRestrictions,
                                ];
                                newRestrictions[index].appliesTo.push(value);
                                setCountryRestrictions(newRestrictions);
                                e.currentTarget.value = "";
                              }
                            }
                          }}
                        />
                        <datalist id="m8-apply">
                          {appliesToOptions.map((option, optionIndex) => (
                            <option
                              key={`restr.${index}.appliesTo.${optionIndex}`}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </datalist>
                      </div>
                      <p
                        className="fmsg err"
                        data-ef={`restr.${index}.appliesTo`}
                        id={`m8-restr-${index}-appliesTo-e`}
                        role="alert"
                        hidden
                      >
                        <TriangleAlert
                          className="ic"
                          width={16}
                          height={16}
                          strokeWidth={1.5}
                        />
                        <span></span>
                      </p>
                    </div>
                  </div>
                  <div className="fld">
                    <span className="lbl" id={`m8-restr-${index}-sl`}>
                      Severity
                    </span>
                    <div
                      className="seg"
                      role="radiogroup"
                      aria-labelledby={`m8-restr-${index}-sl`}
                      aria-describedby={`m8-restr-${index}-severity-e`}
                    >
                      <label className="sevo">
                        <input
                          type="radio"
                          className="vh"
                          name={`m8-restr-${index}-sev`}
                          value="blocking"
                          data-p={`F.restr.${index}.severity`}
                          checked={restr.severity === "blocking"}
                          onChange={(e) => {
                            const newRestrictions = [...countryRestrictions];
                            newRestrictions[index].severity = e.currentTarget
                              .value as
                              "blocking" | "conditional" | "informational";
                            setCountryRestrictions(newRestrictions);
                          }}
                        />
                        <b>Blocking</b>
                        <span>Stops people from using this route</span>
                      </label>
                      <label className="sevo">
                        <input
                          type="radio"
                          className="vh"
                          name={`m8-restr-${index}-sev`}
                          value="conditional"
                          data-p={`F.restr.${index}.severity`}
                          checked={restr.severity === "conditional"}
                          onChange={(e) => {
                            const newRestrictions = [...countryRestrictions];
                            newRestrictions[index].severity = e.currentTarget
                              .value as
                              "blocking" | "conditional" | "informational";
                            setCountryRestrictions(newRestrictions);
                          }}
                        />
                        <b>Conditional</b>
                        <span>Depends on their situation</span>
                      </label>
                      <label className="sevo">
                        <input
                          type="radio"
                          className="vh"
                          name={`m8-restr-${index}-sev`}
                          value="informational"
                          data-p={`F.restr.${index}.severity`}
                          checked={restr.severity === "informational"}
                          onChange={(e) => {
                            const newRestrictions = [...countryRestrictions];
                            newRestrictions[index].severity = e.currentTarget
                              .value as
                              "blocking" | "conditional" | "informational";
                            setCountryRestrictions(newRestrictions);
                          }}
                        />
                        <b>Informational</b>
                        <span>Good to know; doesn’t block</span>
                      </label>
                    </div>
                    <p
                      className="fmsg err"
                      data-ef={`restr.${index}.severity`}
                      id={`m8-restr-${index}-severity-e`}
                      role="alert"
                      hidden
                    >
                      <TriangleAlert
                        className="ic"
                        width={16}
                        height={16}
                        strokeWidth={1.5}
                      />
                      <span></span>
                    </p>
                  </div>
                  <div className="fld">
                    <label
                      className="lbl"
                      htmlFor={`m8-restr-${index}-summary`}
                    >
                      Summary
                    </label>
                    <p className="hint" id={`m8-restr-${index}-summary-h`}>
                      One or two plain sentences visitors will read.
                    </p>
                    <textarea
                      className="ta "
                      id={`m8-restr-${index}-summary`}
                      data-p={`F.restr.${index}.summary`}
                      aria-describedby={`m8-restr-${index}-summary-e m8-restr-${index}-summary-h`}
                      rows={3}
                      value={restr.summary}
                      placeholder="Some providers accept residents only."
                      data-cnt="300"
                      onChange={(e) =>
                        setCountryRestrictions((prev) =>
                          prev.map((r, i) =>
                            i === index ? { ...r, summary: e.target.value } : r,
                          ),
                        )
                      }
                    />
                    <span className="cnt" aria-hidden="true">
                      {restr.summary.length}/300
                    </span>
                    <p
                      className="fmsg err"
                      data-ef={`restr.${index}.summary`}
                      id={`m8-restr-${index}-summary-e`}
                      role="alert"
                      hidden={restr.summary.length <= 300}
                    >
                      <TriangleAlert
                        className="ic"
                        width={16}
                        height={16}
                        strokeWidth={1.5}
                      />
                      <span>
                        Keep it to 300 characters ({restr.summary?.length} now).
                      </span>
                    </p>
                  </div>

                  <fieldset className="srcf">
                    <legend>Source</legend>
                    <div className="fld">
                      <label className="lbl" htmlFor={`m8-restr-${index}-re`}>
                        Copy from another source{" "}
                        <span className="opt">(optional)</span>
                      </label>
                      <select
                        className="sel"
                        id={`m8-restr-${index}-re`}
                        data-reuse={`restr.${index}`}
                        onChange={(e) =>
                          setCountryRestrictions((prev) =>
                            prev.map((r, i) =>
                              i === index
                                ? {
                                    ...r,
                                    source: sources.find(
                                      (s) => s.id === e.target.value,
                                    ) as Source,
                                  }
                                : r,
                            ),
                          )
                        }
                      >
                        <option value="">Choose a source</option>
                        {sources?.map((s, i) => (
                          <option key={`source-${i}`} value={s.id}>
                            {s.label} [{s.sourceType}]
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="g2">
                      <div className="fld">
                        <label
                          className="lbl"
                          htmlFor={`m8-restr-${index}-source-label`}
                        >
                          Name
                        </label>
                        <input
                          className="inp  "
                          type="text"
                          id={`m8-restr-${index}-source-label`}
                          data-p={`F.restr.${index}.source.label`}
                          aria-describedby={`m8-restr-${index}-source-label-e`}
                          value="Ministry of Finance"
                          placeholder="Regulator or publication"
                          maxLength={90}
                          autoComplete="off"
                          onChange={(e) => {
                            const newRestrictions = [...countryRestrictions];
                            newRestrictions[index].source.label =
                              e.currentTarget.value;
                            setCountryRestrictions(newRestrictions);
                          }}
                        />
                        <p
                          className="fmsg err"
                          data-ef={`restr.${index}.source.label`}
                          id={`m8-restr-${index}-source-label-e`}
                          role="alert"
                          hidden
                        >
                          <TriangleAlert
                            className="ic"
                            width={16}
                            height={16}
                            strokeWidth={1.5}
                          />
                          <span></span>
                        </p>
                      </div>
                      <div className="fld">
                        <label
                          className="lbl"
                          htmlFor="m8-restr-${index}-source-sourceType"
                        >
                          Type
                        </label>
                        <select
                          className="sel "
                          id={`m8-restr-${index}-source-sourceType`}
                          data-p={`F.restr.${index}.source.sourceType`}
                          aria-describedby={`m8-restr-${index}-source-sourceType-e`}
                        >
                          <option value="">Choose</option>
                          <option value="official">Official</option>
                          <option value="regulator">Regulator</option>
                          <option value="provider">Provider</option>
                          <option value="research">Research</option>
                          <option value="news">News</option>
                          <option value="other">Other</option>
                        </select>
                        <p
                          className="fmsg err"
                          data-ef={`restr.${index}.source.sourceType`}
                          id={`m8-restr-${index}-source-sourceType-e`}
                          role="alert"
                          hidden
                        >
                          <TriangleAlert
                            className="ic"
                            width={16}
                            height={16}
                            strokeWidth={1.5}
                          />
                          <span></span>
                        </p>
                      </div>
                    </div>
                    <div className="fld">
                      <label
                        className="lbl"
                        htmlFor={`m8-restr-${index}-source-url`}
                      >
                        Link
                      </label>
                      <input
                        className="inp  "
                        type="url"
                        id={`m8-restr-${index}-source-url`}
                        data-p={`F.restr.${index}.source.url`}
                        aria-describedby={`m8-restr-${index}-source-url-e`}
                        value={restr.source?.url}
                        placeholder="https://"
                        autoComplete="off"
                        inputMode="url"
                        onChange={(e) => {
                          const newRestrictions = [...countryRestrictions];
                          newRestrictions[index].source.url =
                            e.currentTarget.value;
                          setCountryRestrictions(newRestrictions);
                        }}
                      />
                      <p
                        className="fmsg err"
                        data-ef={`restr.${index}.source.url`}
                        id={`m8-restr-${index}-source-url-e`}
                        role="alert"
                        hidden
                      >
                        <TriangleAlert
                          className="ic"
                          width={16}
                          height={16}
                          strokeWidth={1.5}
                        />
                        <span></span>
                      </p>
                    </div>
                    <div className="g2">
                      <div className="fld">
                        <label
                          className="lbl"
                          htmlFor={`m8-restr-${index}-source-retrievedAt`}
                        >
                          Retrieved on
                        </label>
                        <p
                          className="hint"
                          id={`m8-restr-${index}-source-retrievedAt-h`}
                        >
                          When you last checked it.
                        </p>
                        <input
                          className="inp  "
                          type="date"
                          id={`m8-restr-${index}-source-retrievedAt`}
                          data-p={`F.restr.${index}.source.retrievedAt`}
                          aria-describedby={`m8-restr-${index}-source-retrievedAt-e m8-restr-${index}-source-retrievedAt-h`}
                          value={
                            new Date(
                              restr.source.retrievedAt,
                            ).getUTCFullYear() +
                            "-" +
                            (
                              new Date(restr.source.retrievedAt).getUTCMonth() +
                              1
                            )
                              .toString()
                              .padStart(2, "0") +
                            "-" +
                            new Date(restr.source.retrievedAt)
                              .getUTCDate()
                              .toString()
                              .padStart(2, "0")
                          }
                          onChange={(e) =>
                            setCountryRestrictions((prev) =>
                              prev.map((r, i) =>
                                i === index
                                  ? {
                                      ...r,
                                      source: {
                                        ...r.source,
                                        retrievedAt: new Date(e.target.value),
                                      } as Source,
                                    }
                                  : r,
                              ),
                            )
                          }
                          autoComplete="off"
                        />
                        <p
                          className="fmsg err"
                          data-ef={`restr.${index}.source.retrievedAt`}
                          id={`m8-restr-${index}-source-retrievedAt-e`}
                          role="alert"
                          hidden
                        >
                          <TriangleAlert
                            className="ic"
                            width={16}
                            height={16}
                            strokeWidth={1.5}
                          />
                          <span></span>
                        </p>
                      </div>
                      <div className="fld">
                        <label
                          className="lbl"
                          htmlFor={`m8-restr-${index}-source-confidence`}
                        >
                          Confidence <span className="opt">(optional)</span>
                        </label>
                        <select
                          className="sel "
                          id={`m8-restr-${index}-source-confidence`}
                          data-p={`F.restr.${index}.source.confidence`}
                          aria-describedby={`m8-restr-${index}-source-confidence-e`}
                          value={restr.source?.confidence}
                          onChange={(e) =>
                            setCountryRestrictions((prev) =>
                              prev.map((r, i) =>
                                i === index
                                  ? {
                                      ...r,
                                      source: {
                                        ...r.source,
                                        confidence: e.target.value,
                                      } as Source,
                                    }
                                  : r,
                              ),
                            )
                          }
                        >
                          <option value="">Not set</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                        <p
                          className="fmsg err"
                          data-ef={`restr.${index}.source.confidence`}
                          id={`m8-restr-${index}-source-confidence-e`}
                          role="alert"
                          hidden
                        >
                          <TriangleAlert
                            className="ic"
                            width={16}
                            height={16}
                            strokeWidth={1.5}
                          />
                          <span></span>
                        </p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </li>
            ))}
          </ul>
          <p className="fmsg err" data-ef="restr" role="alert" hidden>
            <TriangleAlert
              className="ic"
              width={16}
              height={16}
              strokeWidth={1.5}
            />
            <span></span>
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            data-act="add-item"
            data-k="restr"
            onClick={addRestriction}
          >
            <Plus className="ic" width={18} height={18} strokeWidth={1.5} />
            Add a restriction
          </button>
        </section>
        <section className="wz-card">
          <h2 className="wz-h">General source links</h2>
          <p className="hint" style={{ marginTop: "0" }}>
            Other pages worth linking for this country. Optional.
          </p>
          <ul className="rows">
            {countrySourceUrls.map((url, index) => (
              <li className="lrow" key={"url-" + index}>
                <div className="fld">
                  <label className="vh" htmlFor={`m8-urls-${index}`}>
                    General source link ${index + 1}
                  </label>
                  <input
                    id={`m8-urls-${index}`}
                    className="inp "
                    type="url"
                    inputMode="url"
                    data-p={`F.urls.${index}`}
                    placeholder="https://"
                    value={url}
                    autoComplete="off"
                    aria-describedby={`m8-urls-${index}-e`}
                    onChange={(e) => {
                      const newCountrySourceUrls = [...countrySourceUrls];
                      newCountrySourceUrls[index] = e.target.value;
                      setCountrySourceUrls(newCountrySourceUrls);
                    }}
                  />
                  <p
                    className="fmsg err"
                    data-ef={`urls.${index}`}
                    id={`m8-urls-${index}-e`}
                    role="alert"
                    hidden
                  >
                    <TriangleAlert
                      className="ic"
                      width={16}
                      height={16}
                      strokeWidth={1.5}
                    />
                    <span></span>
                  </p>
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  data-act="rm-url"
                  data-i={index}
                  aria-label={`Remove link ${index + 1}`}
                  onClick={() => {
                    const newCountrySourceUrls = [...countrySourceUrls];
                    newCountrySourceUrls.splice(index, 1);
                    setCountrySourceUrls(newCountrySourceUrls);
                  }}
                >
                  <Trash
                    className="ic"
                    width={20}
                    height={20}
                    strokeWidth={1.5}
                  />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            data-act="add-url"
            onClick={() => setCountrySourceUrls([...countrySourceUrls, ""])}
          >
            <Plus className="ic" width={18} height={18} strokeWidth={1.5} />
            Add a link
          </button>
        </section>
        <div className="btn-row nwb">
          <button
            type="submit"
            className="btn btn-primary"
            data-act="save"
            disabled={loading}
          >
            Save changes
          </button>
          <Link
            href="/admin/countries"
            className="btn btn-ghost"
            data-act="cancel"
          >
            Back to the list
          </Link>
        </div>
      </div>
    </form>
  );
}
