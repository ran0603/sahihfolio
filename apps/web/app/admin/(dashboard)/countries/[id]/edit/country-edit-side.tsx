"use client";

import { CountryProfile } from "@sahihfolio/shared";
import { statusOptions } from "./page";
import { CircleCheck, Undo, Archive } from "lucide-react";
import Link from "next/link";

export default function CountryEditSide({ country }: { country: CountryProfile }) {
  return (
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
  )
}