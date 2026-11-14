"use client";

import {
  Funnel,
  Search,
  TriangleAlert,
  X,
  ChevronRight,
  Plus,
  ChevronLeft,
  Pencil,
  Eye,
  Undo,
  Archive,
  Send,
  Loader2,
} from "lucide-react";
import { Country } from "@sahihfolio/database";
import { useState, useTransition, useMemo } from "react";
import { statusOptions } from "../constants";
import { calculateDaysSince, getDateString } from "src/lib/date-utils";
import Link from "next/link";
import {
  publishCountry,
  unpublishCountry,
  archiveCountry,
  unarchiveCountry,
} from "src/lib/countries/actions";

const sortOptions: Record<string, string> = {
  name: "Name, A to Z",
  stale: "Stalest review first",
  new: "Recently added",
  prov: "Most providers",
};

const reviewOptions: Record<string, string> = {
  all: "All",
  stale: "Stale (over 90 days)",
  never: "Never reviewed",
  fresh: "Reviewed recently",
};

const initialFilters = {
  q: "",
  sort: "name",
  status: "all",
  review: "all",
};

export default function CountriesContent({
  countries: initialCountries,
}: {
  countries: (Country & { totalProviders: number })[];
}) {
  const [countries, setCountries] = useState(initialCountries);
  const [filterValues, setFilterValues] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [openTrayId, setOpenTrayId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    type: "publish" | "draft" | "archive";
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning" | "info";
    title: string;
    body?: string;
  } | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const showToast = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    body?: string,
  ) => {
    setToast({ type, title, body });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const staleCountries = useMemo(
    () =>
      countries.filter(
        (c) =>
          c.status === "published" &&
          c.lastReviewedAt &&
          calculateDaysSince(c.lastReviewedAt) > 90,
      ),
    [countries],
  );

  const resetFilters = () => {
    setFilterValues(initialFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Filtering & Sorting
  const filteredCountries = useMemo(() => {
    let result = countries.filter((c) => {
      // Status filter
      if (filterValues.status !== "all" && c.status !== filterValues.status) {
        return false;
      }
      // Review filter
      if (filterValues.review !== "all") {
        const days = c.lastReviewedAt
          ? calculateDaysSince(c.lastReviewedAt)
          : null;
        if (filterValues.review === "stale") {
          if (!days || days <= 90) return false;
        } else if (filterValues.review === "never") {
          if (c.lastReviewedAt) return false;
        } else if (filterValues.review === "fresh") {
          if (days === null || days > 90) return false;
        }
      }
      // Query search
      if (filterValues.q.trim()) {
        const query = filterValues.q.trim().toLowerCase();
        const match =
          c.name.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.currency.toLowerCase().includes(query);
        if (!match) return false;
      }
      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (filterValues.sort === "name") {
        return a.name.localeCompare(b.name);
      }
      if (filterValues.sort === "stale") {
        const aDate = a.lastReviewedAt
          ? new Date(a.lastReviewedAt).getTime()
          : 0;
        const bDate = b.lastReviewedAt
          ? new Date(b.lastReviewedAt).getTime()
          : 0;
        return aDate - bDate;
      }
      if (filterValues.sort === "new") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (filterValues.sort === "prov") {
        return (b.totalProviders || 0) - (a.totalProviders || 0);
      }
      return 0;
    });

    return result;
  }, [countries, filterValues]);

  // Pagination calculation
  const totalItems = filteredCountries.length;
  const totalPages = Math.ceil(totalItems / pagination.limit) || 1;
  const currentPage = Math.min(pagination.page, totalPages);
  const startIndex = (currentPage - 1) * pagination.limit;
  const paginatedCountries = filteredCountries.slice(
    startIndex,
    startIndex + pagination.limit,
  );

  const activeFilterChips = useMemo(() => {
    const chips: { key: keyof typeof filterValues; label: string }[] = [];
    if (filterValues.status !== "all") {
      chips.push({
        key: "status",
        label: `Status: ${statusOptions[filterValues.status]?.label || filterValues.status}`,
      });
    }
    if (filterValues.review !== "all") {
      chips.push({
        key: "review",
        label: `Review: ${reviewOptions[filterValues.review] || filterValues.review}`,
      });
    }
    return chips;
  }, [filterValues]);

  // Quick Action Handlers
  const handlePublish = (country: Country) => {
    startTransition(async () => {
      const res = await publishCountry(country.id);
      if (res.status === "success") {
        setCountries((prev) =>
          prev.map((c) =>
            c.id === country.id ? { ...c, status: "published" } : c,
          ),
        );
        setConfirmAction(null);
        showToast(
          "success",
          `${country.name} published`,
          "It now appears in the Finder’s country list.",
        );
      } else {
        showToast("error", "Failed to publish", res.errors?.form?.[0]);
      }
    });
  };

  const handleUnpublish = (country: Country) => {
    startTransition(async () => {
      const res = await unpublishCountry(country.id);
      if (res.status === "success") {
        setCountries((prev) =>
          prev.map((c) =>
            c.id === country.id ? { ...c, status: "draft" } : c,
          ),
        );
        setConfirmAction(null);
        showToast(
          "success",
          `${country.name} moved to draft`,
          "It no longer appears in the Finder.",
        );
      } else {
        showToast("error", "Failed to move to draft", res.errors?.form?.[0]);
      }
    });
  };

  const handleArchive = (country: Country) => {
    startTransition(async () => {
      const form = new FormData();
      form.append("id", country.id);
      const res = await archiveCountry(null, form);
      if (res.status === "success") {
        setCountries((prev) =>
          prev.map((c) =>
            c.id === country.id ? { ...c, status: "archived" } : c,
          ),
        );
        setConfirmAction(null);
        showToast(
          "success",
          `${country.name} archived`,
          "You can restore it as a draft.",
        );
      } else {
        showToast("error", "Failed to archive", res.errors?.form?.[0]);
      }
    });
  };

  const handleRestore = (country: Country) => {
    startTransition(async () => {
      const res = await unarchiveCountry(country.id);
      if (res.status === "success") {
        setCountries((prev) =>
          prev.map((c) =>
            c.id === country.id ? { ...c, status: "draft" } : c,
          ),
        );
        setConfirmAction(null);
        showToast("success", `${country.name} restored`, "Restored as draft.");
      } else {
        showToast("error", "Failed to restore", res.errors?.form?.[0]);
      }
    });
  };

  return (
    <>
      {toast && (
        <div className="toasts" aria-live="polite">
          <div
            className={`toast t-${toast.type}`}
            role={toast.type === "error" ? "alert" : "status"}
          >
            <div className="t-body">
              <strong>{toast.title}</strong>
              {toast.body && <span>{toast.body}</span>}
            </div>
            <button
              type="button"
              className="icon-btn sm"
              aria-label="Dismiss notification"
              onClick={() => setToast(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <section data-m="head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <span>Admin</span>
          <ChevronRight
            className="ic"
            width={14}
            height={14}
            strokeWidth={1.5}
          />
          <span aria-current="page">Countries</span>
        </nav>
        <div className="ad-head">
          <div>
            <h1 tabIndex={-1}>Countries</h1>
            <p className="ad-sub">
              Where the Options Finder can help: currency, regulatory notes,
              restrictions and the sources behind them.
            </p>
            <p className="sumline" role="status">
              {countries.length} countries ·{" "}
              {countries.filter((c) => c.status === "published").length}{" "}
              published · {countries.filter((c) => c.status === "draft").length}{" "}
              drafts · {countries.filter((c) => c.status === "archived").length}{" "}
              archived ·{" "}
              <b className={staleCountries.length > 0 ? "stl" : ""}>
                {staleCountries.length} stale
              </b>
            </p>
          </div>
          <div className="ad-act">
            <Link
              href="/admin/countries/new"
              className="btn btn-primary btn-sm"
              data-act="new"
            >
              <Plus className="ic" width={18} height={18} strokeWidth={1.5} />
              Add country
            </Link>
          </div>
        </div>
      </section>

      {staleCountries.length > 0 && (
        <section data-m="notice">
          <div className="alert a-warning flat" role="status">
            <TriangleAlert
              className="ic a-ic"
              width={20}
              height={20}
              strokeWidth={1.5}
            />
            <div className="a-body">
              <strong>
                {staleCountries.length} published{" "}
                {staleCountries.length === 1
                  ? "country hasn’t"
                  : "countries haven’t"}{" "}
                been reviewed in 90+ days
              </strong>
              <p>
                Their regulatory notes may be out of date. Public results show
                the last-reviewed date.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: "10px" }}
                data-act="show-stale"
                onClick={() => {
                  setFilterValues({ ...filterValues, review: "stale" });
                  setShowFilters(true);
                }}
              >
                Show them
              </button>
            </div>
          </div>
        </section>
      )}

      <section data-m="filters">
        <div className="ad-card fcard">
          <div className="fbar">
            <div className="sbox qsearch">
              <Search
                className="ic lead"
                width={20}
                height={20}
                strokeWidth={1.5}
              />
              <input
                id="m2-q"
                className="inp qq"
                type="search"
                placeholder="Search"
                aria-label="Search countries by name, code or currency"
                autoComplete="off"
                value={filterValues.q}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, q: e.target.value })
                }
              />
            </div>
            <div className="qsort">
              <label className="vh" htmlFor="m2-s">
                Sort countries
              </label>
              <select
                id="m2-s"
                className="sel fsel"
                data-k="sort"
                value={filterValues.sort}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, sort: e.target.value })
                }
              >
                {Object.entries(sortOptions).map(([key, label]) => (
                  <option key={"sort_" + key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm ftoggle"
              data-act="fo"
              aria-expanded={showFilters}
              aria-controls="m2-fp"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Funnel className="ic" width={18} height={18} strokeWidth={1.5} />
              Filters
              {activeFilterChips.length > 0 && ` (${activeFilterChips.length})`}
            </button>
          </div>

          <div className={`${showFilters ? "open" : ""} fpanel`} id="m2-fp">
            <div className="ff">
              <label className="lbl" htmlFor="m2-fs">
                Status
              </label>
              <select
                id="m2-fs"
                className="sel fsel"
                data-k="fs"
                value={filterValues.status}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, status: e.target.value })
                }
              >
                {Object.entries(statusOptions).map(([key, status]) => (
                  <option key={"status_" + key} value={key}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="ff">
              <label className="lbl" htmlFor="m2-fv">
                Review age
              </label>
              <select
                id="m2-fv"
                className="sel fsel"
                data-k="fv"
                value={filterValues.review}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, review: e.target.value })
                }
              >
                {Object.entries(reviewOptions).map(([key, label]) => (
                  <option key={"review_" + key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeFilterChips.length > 0 && (
            <ul className="achips" aria-label="Active filters">
              {activeFilterChips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    className="chip"
                    onClick={() =>
                      setFilterValues({ ...filterValues, [chip.key]: "all" })
                    }
                  >
                    <span>{chip.label}</span>
                    <X className="ic" width={14} height={14} />
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="link-btn"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              </li>
            </ul>
          )}

          <p className="gl-c" role="status" aria-live="polite">
            {filteredCountries.length} countries
          </p>
        </div>
      </section>

      <section data-m="table">
        {filteredCountries.length === 0 ? (
          <div className="ad-card">
            <div className="state-c gl-none" style={{ padding: "32px 12px" }}>
              <div className="big">
                <Search width={28} height={28} />
              </div>
              <h2 style={{ margin: 0 }}>
                <b>No countries match</b>
              </h2>
              <p>
                Check the spelling, or clear the filters. If it’s new, add it.
              </p>
              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetFilters}
                >
                  Clear search and filters
                </button>
                <Link href="/admin/countries/new" className="btn btn-primary">
                  <Plus className="ic" width={18} height={18} /> Add country
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="ad-card flush">
            <div className="sl-h" aria-hidden="true">
              <span>Country</span>
              <span>Coverage</span>
              <span>Last reviewed</span>
              <span>Status</span>
              <span></span>
            </div>
            <ul className="sl">
              {paginatedCountries.map((country) => {
                const isOpen = openTrayId === country.id;
                const isArchived = country.status === "archived";
                const days = country.lastReviewedAt
                  ? calculateDaysSince(country.lastReviewedAt)
                  : null;
                const isStale = days !== null && days > 90;
                const isConfirming =
                  confirmAction && confirmAction.id === country.id;

                const notesCount = Array.isArray(country.regulatoryNotes)
                  ? country.regulatoryNotes.length
                  : 0;
                const restrCount = Array.isArray(country.restrictions)
                  ? country.restrictions.length
                  : 0;
                const srcCount = Array.isArray(country.sourceUrls)
                  ? country.sourceUrls.length
                  : 0;

                return (
                  <li
                    key={country.id}
                    className={`sl-r ${isOpen ? "open" : ""} ${isArchived ? "off" : ""}`}
                    data-row={`c-${country.code.toLowerCase()}`}
                  >
                    <div className="sl-m">
                      <div className="c1">
                        <b>
                          <span className="qn">{country.name}</span>
                          <span className="vh">, </span>{" "}
                          <span className="cc">{country.code}</span>
                        </b>
                        <span>{country.currency}</span>
                      </div>
                      <div className="c2">
                        {country.totalProviders} providers
                        <small>
                          {notesCount} notes · {restrCount} restrictions ·{" "}
                          {srcCount} sources
                        </small>
                      </div>
                      <div className="c3">
                        {country.lastReviewedAt ? (
                          <>
                            {getDateString(country.lastReviewedAt)}
                            <small>
                              {days} {days === 1 ? "day" : "days"} ago
                              {isStale && (
                                <>
                                  {" "}
                                  · <span className="stale">Stale</span>
                                </>
                              )}
                            </small>
                          </>
                        ) : (
                          <span className="badge b-warn">Never reviewed</span>
                        )}
                      </div>
                      <div className="c4">
                        <span
                          className={`badge b-${statusOptions[country.status]?.state || "neutral"}`}
                        >
                          {statusOptions[country.status]?.label ||
                            country.status}
                        </span>
                      </div>
                      <div className="c5">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          data-act="tray"
                          data-id={country.id}
                          aria-expanded={isOpen}
                          onClick={() =>
                            setOpenTrayId(isOpen ? null : country.id)
                          }
                        >
                          {isOpen ? "Close" : "Manage"}
                          <span className="vh"> {country.name}</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Tray View */}
                    {isOpen && (
                      <div className="qr-tray" id={`tray-${country.id}`}>
                        <div className="tr-g">
                          <div className="tr-a">
                            <span className="lbl">Coverage</span>
                            <span>
                              {country.totalProviders} providers · {notesCount}{" "}
                              notes · {restrCount} restrictions · {srcCount}{" "}
                              sources
                            </span>
                          </div>
                          <div className="tr-a">
                            <span className="lbl">Open</span>
                            <span className="tr-l">
                              <Link
                                href={`/admin/countries/${country.id}/edit`}
                                className="btn btn-secondary btn-sm"
                              >
                                <Pencil className="ic" width={16} height={16} />{" "}
                                Edit
                              </Link>
                              <a
                                href={`/find`}
                                target="_blank"
                                rel="noreferrer"
                                className={`btn btn-ghost btn-sm ${isArchived ? "disabled" : ""}`}
                              >
                                <Eye className="ic" width={16} height={16} />{" "}
                                Preview in the Finder
                              </a>
                            </span>
                          </div>
                          <div className="tr-a">
                            <span className="lbl">Status</span>
                            <div className="tr-s">
                              {isConfirming ? (
                                <div
                                  className="qr-cf"
                                  role="group"
                                  aria-label={`Confirm: ${confirmAction.type}`}
                                >
                                  <p>
                                    {confirmAction.type === "publish" && (
                                      <>
                                        <b>Publish {country.name}?</b> It
                                        appears in the Finder’s country list and
                                        people can get results for it.
                                      </>
                                    )}
                                    {confirmAction.type === "draft" && (
                                      <>
                                        <b>Move {country.name} to draft?</b> It
                                        leaves the Finder’s country list. Saved
                                        results keep working.
                                      </>
                                    )}
                                    {confirmAction.type === "archive" && (
                                      <>
                                        <b>Archive {country.name}?</b> It leaves
                                        the Finder and the admin lists by
                                        default. You can restore it as a draft.
                                      </>
                                    )}
                                  </p>
                                  <div className="btn-row">
                                    <button
                                      type="button"
                                      className={`btn ${
                                        confirmAction.type === "publish"
                                          ? "btn-primary"
                                          : "btn-secondary"
                                      } btn-sm`}
                                      disabled={isPending}
                                      onClick={() => {
                                        if (confirmAction.type === "publish")
                                          handlePublish(country);
                                        else if (confirmAction.type === "draft")
                                          handleUnpublish(country);
                                        else if (
                                          confirmAction.type === "archive"
                                        )
                                          handleArchive(country);
                                      }}
                                    >
                                      {isPending ? (
                                        <>
                                          <Loader2
                                            className="ic animate-spin"
                                            width={14}
                                            height={14}
                                          />{" "}
                                          Working…
                                        </>
                                      ) : confirmAction.type === "publish" ? (
                                        "Publish"
                                      ) : confirmAction.type === "draft" ? (
                                        "Move to draft"
                                      ) : (
                                        "Archive"
                                      )}
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-ghost btn-sm"
                                      disabled={isPending}
                                      onClick={() => setConfirmAction(null)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : country.status === "draft" ? (
                                <div className="btn-row">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    disabled={isPending}
                                    onClick={() =>
                                      setConfirmAction({
                                        id: country.id,
                                        type: "publish",
                                      })
                                    }
                                  >
                                    <Send
                                      className="ic"
                                      width={16}
                                      height={16}
                                    />{" "}
                                    Publish
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-sm"
                                    disabled={isPending}
                                    onClick={() =>
                                      setConfirmAction({
                                        id: country.id,
                                        type: "archive",
                                      })
                                    }
                                  >
                                    <Archive
                                      className="ic"
                                      width={16}
                                      height={16}
                                    />{" "}
                                    Archive
                                  </button>
                                </div>
                              ) : country.status === "published" ? (
                                <div className="btn-row">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    disabled={isPending}
                                    onClick={() =>
                                      setConfirmAction({
                                        id: country.id,
                                        type: "draft",
                                      })
                                    }
                                  >
                                    <Undo
                                      className="ic"
                                      width={16}
                                      height={16}
                                    />{" "}
                                    Move to draft
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-ghost btn-sm"
                                    disabled={isPending}
                                    onClick={() =>
                                      setConfirmAction({
                                        id: country.id,
                                        type: "archive",
                                      })
                                    }
                                  >
                                    <Archive
                                      className="ic"
                                      width={16}
                                      height={16}
                                    />{" "}
                                    Archive
                                  </button>
                                </div>
                              ) : (
                                <div className="btn-row">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    disabled={isPending}
                                    onClick={() => handleRestore(country)}
                                  >
                                    <Undo
                                      className="ic"
                                      width={16}
                                      height={16}
                                    />{" "}
                                    Restore as draft
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Pager controls */}
            {totalPages > 1 && (
              <div className="pager">
                <div className="pg-info" role="status" aria-live="polite">
                  Showing {startIndex + 1}–
                  {Math.min(startIndex + pagination.limit, totalItems)} of{" "}
                  {totalItems}
                </div>
                <div className="pg-size">
                  <label htmlFor="m2-ps">Per page</label>
                  <select
                    id="m2-ps"
                    className="sel ps"
                    value={pagination.limit}
                    onChange={(e) =>
                      setPagination((prev) => ({
                        ...prev,
                        limit: Number(e.target.value),
                        page: 1,
                      }))
                    }
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </select>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={currentPage <= 1}
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: Math.max(1, prev.page - 1),
                      }))
                    }
                  >
                    <ChevronLeft className="ic" width={18} height={18} />
                    Previous
                  </button>
                  <span className="pg-n">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: Math.min(totalPages, prev.page + 1),
                      }))
                    }
                  >
                    Next <ChevronRight className="ic" width={18} height={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
