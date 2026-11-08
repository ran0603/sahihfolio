export default function AdminDashboardPage() {
  return (
    <>
      <section data-m="head" className="">
        <div className="ad-head">
          <div>
            <h1 tabIndex={-1}>Dashboard</h1>
            <p className="ad-sub">
              The reports, review dates and requests that need you.
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
              New report
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="new-sec"
            >
              Add security
            </button>
          </div>
        </div>
      </section>
      <section data-m="attention" className="">
        <div className="ad-card">
          <div className="ad-h2">
            <h2>Needs attention</h2>
            <span className="badge b-warn">4</span>
          </div>
          <ul className="att">
            <li className="att-i">
              <span className="att-ic w">
                <svg
                  className="ic "
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </span>
              <div className="att-t">
                <b>2 published reports need review</b>
                <span>
                  Last reviewed more than 90 days ago. The public page shows a
                  “Needs review” notice.
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="stat"
                data-f="stale"
                data-t="stale"
              >
                Show
                <span className="vh"> 2 published reports need review</span>
              </button>
            </li>
            <li className="att-i">
              <span className="att-ic w">
                <svg
                  className="ic "
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
              </span>
              <div className="att-t">
                <b>2 drafts can’t be published yet</b>
                <span>
                  Each is missing something the publish rules require, such as a
                  source or a reviewer.
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="stat"
                data-f="draft"
                data-t="draft"
              >
                Show
                <span className="vh"> 2 drafts can’t be published yet</span>
              </button>
            </li>
            <li className="att-i">
              <span className="att-ic i">
                <svg
                  className="ic "
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
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </span>
              <div className="att-t">
                <b>1 report is waiting for sign-off</b>
                <span>Drafts submitted for review.</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="stat"
                data-f="review"
                data-t="review"
              >
                Show
                <span className="vh"> 1 report is waiting for sign-off</span>
              </button>
            </li>
            <li className="att-i">
              <span className="att-ic i">
                <svg
                  className="ic "
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
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </span>
              <div className="att-t">
                <b>3 new update requests from readers</b>
                <span>Readers asked us to look at a report again.</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="goto"
                data-f="requests"
                data-t="requests"
              >
                Open inbox
                <span className="vh"> 3 new update requests from readers</span>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section data-m="stats" className="">
        <ul className="stiles">
          <li>
            <button
              type="button"
              className="stile  "
              data-act="stat"
              data-f="pub"
              aria-pressed="false"
            >
              <span className="sl">Published</span>
              <span className="sn">6</span>
              <span className="ss">live on the site</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="stile  "
              data-act="stat"
              data-f="review"
              aria-pressed="false"
            >
              <span className="sl">In review</span>
              <span className="sn">1</span>
              <span className="ss">waiting for sign-off</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="stile  "
              data-act="stat"
              data-f="draft"
              aria-pressed="false"
            >
              <span className="sl">Drafts</span>
              <span className="sn">2</span>
              <span className="ss">not public yet</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="stile t-warn "
              data-act="stat"
              data-f="stale"
              aria-pressed="false"
            >
              <span className="sl">Needs review</span>
              <span className="sn">2</span>
              <span className="ss">over 90 days</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="stile t-info "
              data-act="stat"
              data-f="reqs"
            >
              <span className="sl">Update requests</span>
              <span className="sn">3</span>
              <span className="ss">from readers</span>
            </button>
          </li>
        </ul>
      </section>
      <section data-m="queue" className="">
        <div className="ad-card flush">
          <div className="ad-h2">
            <h2>Reports</h2>
          </div>
          <div className="qhead">
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
                placeholder="Search by ticker or name"
                aria-label="Search reports"
                autoComplete="off"
                value=""
              />
            </div>
            <div className="qsort">
              <label className="vh" htmlFor="m2-s">
                Sort reports
              </label>
              <select id="m2-s" className="sel qs">
                <option value="attn" selected>
                  Needs attention first
                </option>
                <option value="old">Oldest review first</option>
                <option value="name">Name, A to Z</option>
              </select>
            </div>
          </div>
          <div
            className="btn-row qchips"
            role="group"
            aria-label="Filter reports by status"
          >
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="qf"
              data-f="all"
              aria-pressed="true"
            >
              All <span className="qc">10</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="qf"
              data-f="stale"
              aria-pressed="false"
            >
              Needs review <span className="qc">2</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="qf"
              data-f="review"
              aria-pressed="false"
            >
              In review <span className="qc">1</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="qf"
              data-f="draft"
              aria-pressed="false"
            >
              Drafts <span className="qc">2</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="qf"
              data-f="pub"
              aria-pressed="false"
            >
              Published <span className="qc">6</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="qf"
              data-f="arc"
              aria-pressed="false"
            >
              Archived <span className="qc">1</span>
            </button>
          </div>
          <p className="gl-c" role="status" aria-live="polite">
            10 reports
          </p>
          <ul className="qlist">
            <li className="qr hd" aria-hidden="true">
              <div className="qr-main">
                <span className="c-s">Security</span>
                <span className="c-t">Status</span>
                <span className="c-r">Public result</span>
                <span className="c-d">Last reviewed</span>
                <span className="c-a"></span>
              </div>
            </li>
            <li className="qr stale  " data-row="r5">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    EXTL<span className="vh">, </span>{" "}
                    <span className="qn">Example Telecom Ltd</span>
                  </b>
                  <span>Stock · LSE · v1</span>
                </div>
                <div className="c-t">
                  <span className="badge b-pos">Published</span>
                  <span className="badge b-warn">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
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
                    Needs review
                  </span>
                </div>
                <div className="c-r">
                  <span className="badge b-pos">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    Meets selected criteria
                  </span>
                </div>
                <div className="c-d">
                  <span className="old">1 Jul 2026</span>
                  <small>111 days ago · Omar</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r5"
                  >
                    Open<span className="vh"> EXTL</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for EXTL"
                    aria-expanded="false"
                    aria-controls="tray-m2-r5"
                    data-act="tray"
                    data-id="r5"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr stale  " data-row="r9">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    EXGE<span className="vh">, </span>{" "}
                    <span className="qn">Example Group Energy</span>
                  </b>
                  <span>Stock · NYSE · v1</span>
                </div>
                <div className="c-t">
                  <span className="badge b-pos">Published</span>
                  <span className="badge b-warn">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
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
                    Needs review
                  </span>
                </div>
                <div className="c-r">
                  <span className="badge b-pos">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    Meets selected criteria
                  </span>
                </div>
                <div className="c-d">
                  <span className="old">20 Jul 2026</span>
                  <small>92 days ago · Layla</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r9"
                  >
                    Open<span className="vh"> EXGE</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for EXGE"
                    aria-expanded="false"
                    aria-controls="tray-m2-r9"
                    data-act="tray"
                    data-id="r9"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr  blocked " data-row="r7">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    EXBK<span className="vh">, </span>{" "}
                    <span className="qn">Example Bank Group</span>
                  </b>
                  <span>Stock · NYSE · draft</span>
                </div>
                <div className="c-t">
                  <span className="badge b-neutral">Draft</span>
                  <span className="badge b-warn">2 blockers</span>
                </div>
                <div className="c-r">
                  <span className="muted">Not published</span>
                </div>
                <div className="c-d">
                  <span className="muted">Never reviewed</span>
                  <small>Owner: Razan</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r7"
                  >
                    Open<span className="vh"> EXBK</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for EXBK"
                    aria-expanded="false"
                    aria-controls="tray-m2-r7"
                    data-act="tray"
                    data-id="r7"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr  blocked " data-row="r8">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    EXRT<span className="vh">, </span>{" "}
                    <span className="qn">Example Retail REIT</span>
                  </b>
                  <span>REIT · NYSE · draft</span>
                </div>
                <div className="c-t">
                  <span className="badge b-neutral">Draft</span>
                  <span className="badge b-warn">1 blocker</span>
                </div>
                <div className="c-r">
                  <span className="muted">Not published</span>
                </div>
                <div className="c-d">
                  <span className="muted">Never reviewed</span>
                  <small>Owner: Omar</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r8"
                  >
                    Open<span className="vh"> EXRT</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for EXRT"
                    aria-expanded="false"
                    aria-controls="tray-m2-r8"
                    data-act="tray"
                    data-id="r8"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr   " data-row="r6">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    EXHC<span className="vh">, </span>{" "}
                    <span className="qn">Example Healthcare Inc.</span>
                  </b>
                  <span>Stock · NASDAQ · draft v2</span>
                </div>
                <div className="c-t">
                  <span className="badge b-info">In review</span>
                </div>
                <div className="c-r">
                  <span className="badge b-mist">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                    Under review
                  </span>
                </div>
                <div className="c-d">
                  <span className="">15 Oct 2026</span>
                  <small>5 days ago · Layla</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r6"
                  >
                    Open<span className="vh"> EXHC</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for EXHC"
                    aria-expanded="false"
                    aria-controls="tray-m2-r6"
                    data-act="tray"
                    data-id="r6"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr   " data-row="r4">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    SAMP<span className="vh">, </span>{" "}
                    <span className="qn">Sample Global ETF</span>
                  </b>
                  <span>ETF · LSE · v2</span>
                </div>
                <div className="c-t">
                  <span className="badge b-pos">Published</span>
                </div>
                <div className="c-r">
                  <span className="badge b-sand">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    Varies by methodology
                  </span>
                </div>
                <div className="c-d">
                  <span className="">3 Aug 2026</span>
                  <small>78 days ago · Layla</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r4"
                  >
                    Open<span className="vh"> SAMP</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for SAMP"
                    aria-expanded="false"
                    aria-controls="tray-m2-r4"
                    data-act="tray"
                    data-id="r4"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr   " data-row="r3">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    TEST<span className="vh">, </span>{" "}
                    <span className="qn">Test Foods Co.</span>
                  </b>
                  <span>Stock · NYSE · v1</span>
                </div>
                <div className="c-t">
                  <span className="badge b-pos">Published</span>
                </div>
                <div className="c-r">
                  <span className="badge b-warn">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
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
                    Does not meet selected criteria
                  </span>
                </div>
                <div className="c-d">
                  <span className="">29 Aug 2026</span>
                  <small>52 days ago · Razan</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r3"
                  >
                    Open<span className="vh"> TEST</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for TEST"
                    aria-expanded="false"
                    aria-controls="tray-m2-r3"
                    data-act="tray"
                    data-id="r3"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr   " data-row="r2">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    DEMO<span className="vh">, </span>{" "}
                    <span className="qn">Demo Software Inc.</span>
                  </b>
                  <span>Stock · NASDAQ · v2</span>
                </div>
                <div className="c-t">
                  <span className="badge b-pos">Published</span>
                </div>
                <div className="c-r">
                  <span className="badge b-pos">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    Meets selected criteria
                  </span>
                </div>
                <div className="c-d">
                  <span className="">12 Sep 2026</span>
                  <small>38 days ago · Omar</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r2"
                  >
                    Open<span className="vh"> DEMO</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for DEMO"
                    aria-expanded="false"
                    aria-controls="tray-m2-r2"
                    data-act="tray"
                    data-id="r2"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr   " data-row="r1">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    EXMP<span className="vh">, </span>{" "}
                    <span className="qn">Example Manufacturing Corp</span>
                  </b>
                  <span>Stock · NYSE · v3</span>
                </div>
                <div className="c-t">
                  <span className="badge b-pos">Published</span>
                </div>
                <div className="c-r">
                  <span className="badge b-pos">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    Meets selected criteria
                  </span>
                </div>
                <div className="c-d">
                  <span className="">1 Oct 2026</span>
                  <small>19 days ago · Razan</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r1"
                  >
                    Open<span className="vh"> EXMP</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for EXMP"
                    aria-expanded="false"
                    aria-controls="tray-m2-r1"
                    data-act="tray"
                    data-id="r1"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className="qr   " data-row="r10">
              <div className="qr-main">
                <div className="c-s rg-n">
                  <b>
                    OLDC<span className="vh">, </span>{" "}
                    <span className="qn">Old Chemicals Corp</span>
                  </b>
                  <span>Stock · NYSE · v2</span>
                </div>
                <div className="c-t">
                  <span className="badge b-mist">Archived</span>
                </div>
                <div className="c-r">
                  <span className="badge b-mist">
                    <svg
                      className="ic "
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                    </svg>
                    Archived
                  </span>
                </div>
                <div className="c-d">
                  <span className="">14 Feb 2026</span>
                  <small>248 days ago · Razan</small>
                </div>
                <div className="c-a">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="open-report"
                    data-id="r10"
                  >
                    Open<span className="vh"> OLDC</span>
                  </button>
                  <button
                    type="button"
                    className="icon-btn sm"
                    aria-label="More actions for OLDC"
                    aria-expanded="false"
                    aria-controls="tray-m2-r10"
                    data-act="tray"
                    data-id="r10"
                  >
                    <svg
                      className="ic "
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div className="ad-two">
        <section data-m="requests" className="">
          <div className="ad-card">
            <div className="ad-h2">
              <h2>Update requests</h2>
              <span className="badge b-info">3 new</span>
            </div>
            <div className="btn-row" role="group" aria-label="Show requests">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="rq"
                data-r="new"
                aria-pressed="true"
              >
                New <span className="qc">3</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-act="rq"
                data-r="done"
                aria-pressed="false"
              >
                Handled <span className="qc">1</span>
              </button>
            </div>
            <ul className="rqs">
              <li className="rq">
                <div className="rq-t">
                  <b>EXTL</b>
                  <span className="badge b-info">Out of date</span>
                  <span className="muted rq-at">Today, 09:12</span>
                </div>
                <p>A new annual report was published in September.</p>
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="rq-open"
                    data-id="q1"
                  >
                    Open report<span className="vh"> EXTL</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    data-act="rq-done"
                    data-id="q1"
                  >
                    Mark handled<span className="vh"> EXTL</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    data-act="rq-dismiss"
                    data-id="q1"
                  >
                    Dismiss<span className="vh"> EXTL</span>
                  </button>
                </div>
              </li>
              <li className="rq">
                <div className="rq-t">
                  <b>TEST</b>
                  <span className="badge b-info">Looks incorrect</span>
                  <span className="muted rq-at">2 days ago</span>
                </div>
                <p>Interest-bearing debt looks higher than in the 10-K.</p>
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="rq-open"
                    data-id="q2"
                  >
                    Open report<span className="vh"> TEST</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    data-act="rq-done"
                    data-id="q2"
                  >
                    Mark handled<span className="vh"> TEST</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    data-act="rq-dismiss"
                    data-id="q2"
                  >
                    Dismiss<span className="vh"> TEST</span>
                  </button>
                </div>
              </li>
              <li className="rq">
                <div className="rq-t">
                  <b>SAMP</b>
                  <span className="badge b-info">Missing information</span>
                  <span className="muted rq-at">4 days ago</span>
                </div>
                <p>
                  <span className="muted">No note.</span>
                </p>
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="rq-open"
                    data-id="q3"
                  >
                    Open report<span className="vh"> SAMP</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    data-act="rq-done"
                    data-id="q3"
                  >
                    Mark handled<span className="vh"> SAMP</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    data-act="rq-dismiss"
                    data-id="q3"
                  >
                    Dismiss<span className="vh"> SAMP</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section data-m="activity" className="">
          <div className="ad-card">
            <div className="ad-h2">
              <h2>Recent activity</h2>
            </div>
            <ul className="act">
              <li>
                <span className="av" aria-hidden="true">
                  L
                </span>
                <div>
                  <span>
                    Layla submitted <b>EXHC</b> v2 for review
                  </span>
                  <small>5 days ago</small>
                </div>
              </li>
              <li>
                <span className="av" aria-hidden="true">
                  O
                </span>
                <div>
                  <span>
                    Omar handled an update request for <b>DEMO</b>
                  </span>
                  <small>1 week ago</small>
                </div>
              </li>
              <li>
                <span className="av" aria-hidden="true">
                  R
                </span>
                <div>
                  <span>
                    Razan published <b>EXMP</b> v3
                  </span>
                  <small>19 days ago</small>
                </div>
              </li>
              <li>
                <span className="av" aria-hidden="true">
                  R
                </span>
                <div>
                  <span>
                    Razan archived <b>OLDC</b>
                  </span>
                  <small>2 months ago</small>
                </div>
              </li>
              <li>
                <span className="av" aria-hidden="true">
                  L
                </span>
                <div>
                  <span>
                    Layla edited the methodology <b>AAOIFI-aligned</b>
                  </span>
                  <small>3 months ago</small>
                </div>
              </li>
            </ul>
            <p className="hl-n">
              Every edit is logged with who, when and what changed.
            </p>
          </div>
        </section>
      </div>
      <div className="ad-two">
        <section data-m="health" className="">
          <div className="ad-card">
            <div className="ad-h2">
              <h2>Review health</h2>
            </div>
            <ul className="bars">
              <li className="bar ">
                <span className="bl">0–30 days</span>
                <span className="bt" aria-hidden="true">
                  <i style={{ width: "50%" }}></i>
                </span>
                <span className="bn">
                  1<span className="vh"> report</span>
                </span>
              </li>
              <li className="bar ">
                <span className="bl">31–60 days</span>
                <span className="bt" aria-hidden="true">
                  <i style={{ width: "100%" }}></i>
                </span>
                <span className="bn">
                  2<span className="vh"> reports</span>
                </span>
              </li>
              <li className="bar ">
                <span className="bl">61–90 days</span>
                <span className="bt" aria-hidden="true">
                  <i style={{ width: "50%" }}></i>
                </span>
                <span className="bn">
                  1<span className="vh"> report</span>
                </span>
              </li>
              <li className="bar warn">
                <span className="bl">Over 90 days</span>
                <span className="bt" aria-hidden="true">
                  <i style={{ width: "100%" }}></i>
                </span>
                <span className="bn">
                  2<span className="vh"> reports</span>
                </span>
              </li>
            </ul>
            <p className="hl-n">
              Time since last review, published reports only.
            </p>
            <h3 className="ad-h3">Reaching 90 days soon</h3>
            <ul className="soon">
              <li>
                <b>SAMP</b>
                <span>in 12 days</span>
              </li>
            </ul>
          </div>
        </section>
        <section data-m="insights" className="">
          <div className="ad-card">
            <div className="ad-h2">
              <h2>Engagement</h2>
              <span className="badge b-neutral">Sample data</span>
            </div>
            <ul className="mets">
              <li>
                <span className="ml">Report views</span>
                <span className="mn">4,820</span>
                <span className="ms">last 30 days</span>
              </li>
              <li>
                <span className="ml">Save rate</span>
                <span className="mn">6.4%</span>
                <span className="ms">saved ÷ viewed</span>
              </li>
              <li>
                <span className="ml">Source clicks</span>
                <span className="mn">31%</span>
                <span className="ms">of report views</span>
              </li>
              <li>
                <span className="ml">Requests per report</span>
                <span className="mn">0.5</span>
                <span className="ms">new, per published</span>
              </li>
              <li>
                <span className="ml">Older than 90 days</span>
                <span className="mn">33%</span>
                <span className="ms">2 of 6 published</span>
              </li>
            </ul>
            <p className="hl-n">
              From analytics events, not live in this mockup.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
