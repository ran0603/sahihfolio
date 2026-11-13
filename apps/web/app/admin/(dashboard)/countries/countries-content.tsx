"use client";

import {
  Funnel,
  Search,
  TriangleAlert,
  X,
  ChevronRight,
  Download,
  Plus,
  ChevronLeft,
} from "lucide-react";
import { Country } from "@sahihfolio/database";
import { useState } from "react";

const sortOptions: Record<string, string> = {
  name: "Name, A to Z",
  stale: "Stalest review first",
  new: "Recently added",
  prov: "Most providers",
};

const statusOptions: Record<
  string,
  { label: string; state: "pos" | "neg" | "neutral" | "mist" }
> = {
  all: {
    label: "All",
    state: "neutral",
  },
  published: {
    label: "Published",
    state: "pos",
  },
  draft: {
    label: "Draft",
    state: "neutral",
  },
  archived: {
    label: "Archived",
    state: "mist",
  },
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

const calculateDaysSince = (date: Date) => {
  return Number(
    ((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)).toFixed(
      0,
    ),
  );
};

export default function CountriesContent({
  countries,
}: {
  countries: (Country & { totalProviders: number })[];
}) {
  const [filterValues, setFilterValues] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const staleCountries = countries.filter(
    (c) =>
      c.status === "published" &&
      new Date(c.updatedAt) < new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  );

  const resetFilters = () => {
    setFilterValues(initialFilters);
  };

  const handleManageCountry = (countryCode?: string) => {
    window.location.href = countryCode
      ? `/admin/countries/${countryCode}/edit`
      : "/admin/countries/new";
  };

  const [pagination, setPagination] = useState({
    offset: 0,
    page: 1,
    limit: 10,
    total: countries.length,
    totalPages: Math.ceil(countries.length / 10),
  });

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

  return (
    <>
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
              drafts ·{" "}
              <b className={staleCountries.length > 0 ? "stl" : ""}>
                {staleCountries.length} stale
              </b>
            </p>
          </div>
          <div className="ad-act">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-act="new"
              onClick={() => handleManageCountry()}
            >
              <Plus className="ic" width={18} height={18} strokeWidth={1.5} />
              Add country
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="export"
            >
              <Download
                className="ic"
                width={18}
                height={18}
                strokeWidth={1.5}
              />
              Export
            </button>
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
                {staleCountries.length} published countries haven’t been
                reviewed in 90+ days
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
                onClick={() =>
                  setFilterValues({ ...filterValues, review: "stale" })
                }
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
              aria-expanded="false"
              aria-controls="m2-fp"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Funnel className="ic" width={18} height={18} strokeWidth={1.5} />
              Filters
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
                onChange={(e) =>
                  setFilterValues({ ...filterValues, status: e.target.value })
                }
              >
                {Object.entries(statusOptions).map(([key, status]) => (
                  <option
                    key={"status_" + key}
                    value={key}
                    selected={filterValues.status === key}
                  >
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="ff">
              <label className="lbl" htmlFor="m2-fv">
                Review
              </label>
              <select
                id="m2-fv"
                className="sel fsel"
                data-k="fv"
                onChange={(e) =>
                  setFilterValues({ ...filterValues, review: e.target.value })
                }
              >
                {Object.entries(reviewOptions).map(([key, label]) => (
                  <option
                    key={"review_" + key}
                    value={key}
                    selected={filterValues.review === key}
                  >
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="ff sortm">
              <label className="lbl" htmlFor="m2-sm">
                Sort by
              </label>
              <select
                id="m2-sm"
                className="sel fsel"
                data-k="sort"
                onChange={(e) =>
                  setFilterValues({ ...filterValues, sort: e.target.value })
                }
              >
                {Object.entries(sortOptions).map(([key, label]) => (
                  <option
                    key={"sort2_" + key}
                    value={key}
                    selected={filterValues.sort === key}
                  >
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(filterValues.status !== "all" || filterValues.review !== "all") && (
            <ul className="achips" aria-label="Active filters">
              {filterValues.status !== "all" && (
                <li>
                  <button
                    type="button"
                    className="chipx"
                    data-act="rm-f"
                    data-k="fv"
                    onClick={() =>
                      setFilterValues({ ...filterValues, status: "all" })
                    }
                  >
                    Status: {statusOptions[filterValues.status].label}
                    <X
                      className="ic"
                      width={14}
                      height={14}
                      strokeWidth={1.5}
                    />
                    <span className="vh"> Remove filter</span>
                  </button>
                </li>
              )}
              {filterValues.review !== "all" && (
                <li>
                  <button
                    type="button"
                    className="chipx"
                    data-act="rm-f"
                    data-k="fv"
                    onClick={() =>
                      setFilterValues({ ...filterValues, review: "all" })
                    }
                  >
                    Review: {reviewOptions[filterValues.review]}
                    <X
                      className="ic"
                      width={14}
                      height={14}
                      strokeWidth={1.5}
                    />
                    <span className="vh"> Remove filter</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="link-btn"
                  data-act="clear-f"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              </li>
            </ul>
          )}
          <p className="gl-c" role="status" aria-live="polite">
            {countries.length} countries
          </p>
        </div>
      </section>
      <section data-m="table">
        <div className="ad-card flush">
          <div className="sl-h" aria-hidden="true">
            <span>Country</span>
            <span>Coverage</span>
            <span>Last reviewed</span>
            <span>Status</span>
            <span></span>
          </div>
          <ul className="sl">
            {countries.map((country) => (
              <li
                key={country.code}
                className="sl-r  "
                data-row={"c-" + country.code.toLowerCase()}
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
                    <small>0 securities · 0 sources</small>
                  </div>
                  <div className="c3">
                    {country.lastReviewedAt ? (
                      <>
                        {country.lastReviewedAt.toLocaleDateString()}
                        <small>
                          {calculateDaysSince(country.lastReviewedAt)}{" "}
                          {calculateDaysSince(country.lastReviewedAt) == 1
                            ? "day"
                            : "days"}{" "}
                          ago
                          {calculateDaysSince(country.lastReviewedAt) > 90 ? (
                            <>
                              {" "}
                              · <span className="stale">Stale</span>
                            </>
                          ) : null}
                        </small>
                      </>
                    ) : (
                      <span className="badge b-warn">Never reviewed</span>
                    )}
                  </div>
                  <div className="c4">
                    <span
                      className={`badge b-${statusOptions[country.status].state}`}
                    >
                      {statusOptions[country.status].label}
                    </span>
                  </div>
                  <div className="c5">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      data-act="tray"
                      data-id={`c-${country.code.toLowerCase()}`}
                      aria-expanded="false"
                      aria-controls={`tray-c-${country.code.toLowerCase()}`}
                      onClick={() => handleManageCountry(country.code)}
                    >
                      Manage<span className="vh"> {country.name}</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="pager" hidden>
            <div className="pg-info" role="status" aria-live="polite">
              Showing {pagination.offset + 1}-
              {Math.min(pagination.offset + pagination.limit, countries.length)}{" "}
              of {countries.length}
            </div>
            <div className="pg-size">
              <label htmlFor="m2-ps">Per page</label>
              <select id="m2-ps" className="sel ps" value={pagination.limit} onChange={(e) => handleLimitChange(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="pg"
                data-p="0"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                <ChevronLeft
                  className="ic"
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                />
                Previous
              </button>
              <span className="pg-n">Page 1 of 2</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="pg"
                data-p="2"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next{" "}
                <ChevronRight
                  className="ic"
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
