import { ChevronRight } from "lucide-react";

export default function CountriesPage() {
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
              15 countries · 5 published · 8 drafts ·{" "}
              <b className="stl">2 stale</b>
            </p>
          </div>
          <div className="ad-act">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-act="new"
            >
              <svg
                className="ic "
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>{" "}
              Add country
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="export"
            >
              <svg
                className="ic "
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>{" "}
              Export
            </button>
          </div>
        </div>
      </section>
      <section data-m="notice">
        <div className="alert a-warning flat" role="status">
          <svg
            className="ic a-ic"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          <div className="a-body">
            <strong>
              2 published countries haven’t been reviewed in 90+ days
            </strong>
            <p>
              Their regulatory notes may be out of date. Public results show the
              last-reviewed date.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: "10px" }}
              data-act="show-stale"
            >
              Show them
            </button>
          </div>
        </div>
      </section>
      <section data-m="filters">
        <div className="ad-card fcard">
          <div className="fbar">
            <div className="sbox qsearch">
              <svg
                className="ic lead"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                id="m2-q"
                className="inp qq"
                type="search"
                placeholder="Search"
                aria-label="Search countries by name, code or currency"
                autoComplete="off"
                value=""
              />
            </div>
            <div className="qsort">
              <label className="vh" htmlFor="m2-s">
                Sort countries
              </label>
              <select id="m2-s" className="sel fsel" data-k="sort">
                <option value="name" selected>
                  Name, A to Z
                </option>
                <option value="stale">Stalest review first</option>
                <option value="new">Recently added</option>
                <option value="prov">Most providers</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm ftoggle"
              data-act="fo"
              aria-expanded="false"
              aria-controls="m2-fp"
            >
              <svg
                className="ic "
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>{" "}
              Filters
            </button>
          </div>
          <div className="fpanel " id="m2-fp">
            <div className="ff">
              <label className="lbl" htmlFor="m2-fs">
                Status
              </label>
              <select id="m2-fs" className="sel fsel" data-k="fs">
                <option value="all" selected>
                  All
                </option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="ff">
              <label className="lbl" htmlFor="m2-fv">
                Review
              </label>
              <select id="m2-fv" className="sel fsel" data-k="fv">
                <option value="all" selected>
                  All
                </option>
                <option value="stale">Stale (over 90 days)</option>
                <option value="never">Never reviewed</option>
                <option value="fresh">Reviewed recently</option>
              </select>
            </div>
            <div className="ff sortm">
              <label className="lbl" htmlFor="m2-sm">
                Sort by
              </label>
              <select id="m2-sm" className="sel fsel" data-k="sort">
                <option value="name" selected>
                  Name, A to Z
                </option>
                <option value="stale">Stalest review first</option>
                <option value="new">Recently added</option>
                <option value="prov">Most providers</option>
              </select>
            </div>
          </div>

          <p className="gl-c" role="status" aria-live="polite">
            15 countries
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
            <li className="sl-r  " data-row="c-au">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Australia</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">AU</span>
                  </b>
                  <span>AUD</span>
                </div>
                <div className="c2">
                  0 providers<small>0 securities · 0 sources</small>
                </div>
                <div className="c3">
                  <span className="badge b-warn">Never reviewed</span>
                </div>
                <div className="c4">
                  <span className="badge b-neutral">Draft</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-au"
                    aria-expanded="false"
                    aria-controls="tray-c-au"
                  >
                    Manage<span className="vh"> Australia</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  " data-row="c-bh">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Bahrain</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">BH</span>
                  </b>
                  <span>BHD</span>
                </div>
                <div className="c2">
                  0 providers<small>0 securities · 1 source</small>
                </div>
                <div className="c3">
                  28 Oct 2026<small>12 days ago</small>
                </div>
                <div className="c4">
                  <span className="badge b-neutral">Draft</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-bh"
                    aria-expanded="false"
                    aria-controls="tray-c-bh"
                  >
                    Manage<span className="vh"> Bahrain</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  " data-row="c-ca">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Canada</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">CA</span>
                  </b>
                  <span>CAD</span>
                </div>
                <div className="c2">
                  3 providers<small>2 securities · 3 sources</small>
                </div>
                <div className="c3">
                  23 Sept 2026<small>47 days ago</small>
                </div>
                <div className="c4">
                  <span className="badge b-pos">Published</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-ca"
                    aria-expanded="false"
                    aria-controls="tray-c-ca"
                  >
                    Manage<span className="vh"> Canada</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  off" data-row="c-eg">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Egypt</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">EG</span>
                  </b>
                  <span>EGP</span>
                </div>
                <div className="c2">
                  0 providers<small>0 securities · 1 source</small>
                </div>
                <div className="c3">
                  13 Apr 2026
                  <small>
                    210 days ago · <span className="stale">Stale</span>
                  </small>
                </div>
                <div className="c4">
                  <span className="badge b-mist">Archived</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-eg"
                    aria-expanded="false"
                    aria-controls="tray-c-eg"
                  >
                    Manage<span className="vh"> Egypt</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  " data-row="c-id">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Indonesia</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">ID</span>
                  </b>
                  <span>IDR</span>
                </div>
                <div className="c2">
                  1 provider<small>0 securities · 2 sources</small>
                </div>
                <div className="c3">
                  5 Sept 2026<small>65 days ago</small>
                </div>
                <div className="c4">
                  <span className="badge b-neutral">Draft</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-id"
                    aria-expanded="false"
                    aria-controls="tray-c-id"
                  >
                    Manage<span className="vh"> Indonesia</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  off" data-row="c-kw">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Kuwait</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">KW</span>
                  </b>
                  <span>KWD</span>
                </div>
                <div className="c2">
                  0 providers<small>0 securities · 0 sources</small>
                </div>
                <div className="c3">
                  13 May 2026
                  <small>
                    180 days ago · <span className="stale">Stale</span>
                  </small>
                </div>
                <div className="c4">
                  <span className="badge b-mist">Archived</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-kw"
                    aria-expanded="false"
                    aria-controls="tray-c-kw"
                  >
                    Manage<span className="vh"> Kuwait</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  " data-row="c-my">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Malaysia</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">MY</span>
                  </b>
                  <span>MYR</span>
                </div>
                <div className="c2">
                  6 providers<small>2 securities · 4 sources</small>
                </div>
                <div className="c3">
                  20 Oct 2026<small>20 days ago</small>
                </div>
                <div className="c4">
                  <span className="badge b-pos">Published</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-my"
                    aria-expanded="false"
                    aria-controls="tray-c-my"
                  >
                    Manage<span className="vh"> Malaysia</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  " data-row="c-pk">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Pakistan</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">PK</span>
                  </b>
                  <span>PKR</span>
                </div>
                <div className="c2">
                  0 providers<small>0 securities · 1 source</small>
                </div>
                <div className="c3">
                  12 Jun 2026
                  <small>
                    150 days ago · <span className="stale">Stale</span>
                  </small>
                </div>
                <div className="c4">
                  <span className="badge b-neutral">Draft</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-pk"
                    aria-expanded="false"
                    aria-controls="tray-c-pk"
                  >
                    Manage<span className="vh"> Pakistan</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  " data-row="c-qa">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Qatar</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">QA</span>
                  </b>
                  <span>QAR</span>
                </div>
                <div className="c2">
                  0 providers<small>0 securities · 0 sources</small>
                </div>
                <div className="c3">
                  <span className="badge b-warn">Never reviewed</span>
                </div>
                <div className="c4">
                  <span className="badge b-neutral">Draft</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-qa"
                    aria-expanded="false"
                    aria-controls="tray-c-qa"
                  >
                    Manage<span className="vh"> Qatar</span>
                  </button>
                </div>
              </div>
            </li>
            <li className="sl-r  " data-row="c-sa">
              <div className="sl-m">
                <div className="c1">
                  <b>
                    <span className="qn">Saudi Arabia</span>
                    <span className="vh">, </span>{" "}
                    <span className="cc">SA</span>
                  </b>
                  <span>SAR</span>
                </div>
                <div className="c2">
                  1 provider<small>1 security · 1 source</small>
                </div>
                <div className="c3">
                  1 Nov 2026<small>8 days ago</small>
                </div>
                <div className="c4">
                  <span className="badge b-neutral">Draft</span>
                </div>
                <div className="c5">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="tray"
                    data-id="c-sa"
                    aria-expanded="false"
                    aria-controls="tray-c-sa"
                  >
                    Manage<span className="vh"> Saudi Arabia</span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className="pager">
            <div className="pg-info" role="status" aria-live="polite">
              Showing 1–10 of 15
            </div>
            <div className="pg-size">
              <label htmlFor="m2-ps">Per page</label>
              <select id="m2-ps" className="sel ps">
                <option selected>10</option>
                <option>25</option>
              </select>
            </div>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="pg"
                data-p="0"
                disabled
              >
                <svg
                  className="ic "
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>{" "}
                Previous
              </button>
              <span className="pg-n">Page 1 of 2</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="pg"
                data-p="2"
              >
                Next{" "}
                <svg
                  className="ic "
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
