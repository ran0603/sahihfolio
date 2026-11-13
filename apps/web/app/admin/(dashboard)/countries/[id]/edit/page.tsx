import { Archive, CircleCheck, Globe, Undo } from "lucide-react";
import { getCountry } from "@/lib/countries/get-country";
import Link from "next/link";
import CountryEditForm from "./country-edit-form";
import { Suspense } from "react";
import { getSources } from "@/lib/sources/get-sources";

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

export default async function EditCountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const country = await getCountry(id);
  const sources = await getSources();

  if (!country) {
    return (
      <div data-m="notfound" className="state-c">
        <div className="big">
          <Globe className="ic" width={30} height={30} />
        </div>
        <h1 tabIndex={-1}>Country not found</h1>
        <p>It may have been removed, or the link is wrong.</p>
        <div className="btn-row">
          <Link
            href="/admin/countries"
            className="btn btn-primary"
            data-act="navto"
            data-n="Countries"
          >
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section data-m="head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="#" data-act="navto" data-n="Countries">
            Countries
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{country.name}</span>
        </nav>
        <div className="ad-head">
          <div>
            <h1 tabIndex={-1}>
              {country.name} <span className="cc">{country.code}</span>
            </h1>
            <div className="hb">
              <span
                className={`badge b-${statusOptions[country.status].state}`}
              >
                {statusOptions[country.status].label}
              </span>
              <span className="muted">
                Last reviewed 20 Oct 2026 by Layla M.
              </span>
            </div>
          </div>
          <div className="ad-act hact">
            <span className="sv-w" role="status">
              <span className="svl">
                <CircleCheck className="ic" width={14} height={14} />
                No changes
              </span>
            </span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="mark"
            >
              <CircleCheck className="ic" width={18} height={18} />
              Mark as reviewed today
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-act="save"
              disabled
            >
              Save changes
            </button>
          </div>
        </div>
      </section>
      <section data-m="notice" hidden></section>
      <div data-m="dialog" hidden></div>
      <div data-m="form">
        <div className="nw">
          <Suspense fallback={null}>
            <CountryEditForm country={country} sources={sources} />
          </Suspense>
          <div className="sidecol">
            <section className="rdy side" aria-labelledby="m7-st">
              <h2 id="m7-st">Status</h2>
              <div className="hb" style={{ margin: "0 0 10px" }}>
                <span
                  className={`badge b-${statusOptions[country.status].state}`}
                >
                  {statusOptions[country.status].label}
                </span>
              </div>
              <p className="hint" style={{ margin: "0 0 8px" }}>
                Needed to stay published:
              </p>
              <ul className="rl">
                <li className="ok">
                  <CircleCheck className="ic" width={18} height={18} />
                  <span>
                    A review date and reviewer<span className="vh">, done</span>
                  </span>
                </li>
                <li className="ok">
                  <CircleCheck className="ic" width={18} height={18} />
                  <span>
                    At least one source link<span className="vh">, done</span>
                  </span>
                </li>
                <li className="ok">
                  <CircleCheck className="ic" width={18} height={18} />
                  <span>
                    At least one published provider
                    <span className="vh">, done</span>
                  </span>
                </li>
              </ul>
              <div className="side-a">
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    data-act="ask-draft"
                  >
                    <Undo className="ic" width={18} height={18} /> Move to draft
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    data-act="ask-arc"
                  >
                    <Archive className="ic" width={18} height={18} /> Archive
                  </button>
                </div>
              </div>
            </section>
            <section className="rdy side" aria-labelledby="m7-pv">
              <h2 id="m7-pv">Providers</h2>
              {country.providers && country.providers.length > 0 ? (
                <ul className="pl">
                  {country.providers.map((provider) => (
                    <li key={provider.id}>
                      <span>{provider.name}</span>
                      <span className="badge b-pos">{provider.status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="hint" style={{ margin: "0" }}>
                  No providers are linked yet.
                </p>
              )}
              <p className="hint" style={{ margin: "8px 0 0" }}>
                Linked from each provider’s own record.
              </p>
              <Link
                href="/admin/providers"
                className="link-btn"
                data-act="noop"
              >
                Manage providers
              </Link>
            </section>
            {country.history && country.history.length > 0 && (
              <section className="rdy side" aria-labelledby="m7-hs">
                <h2 id="m7-hs">History</h2>
                <ol className="hl">
                  {country.history.map((log) => (
                    <li key={log.id}>
                      <b>{log.name}</b> edited {log.action}
                      <span className="muted">
                        {log.createdAt.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
