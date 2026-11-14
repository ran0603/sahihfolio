"use client";

import { CountryProfile, Source } from "@sahihfolio/shared";
import CountryEditForm from "./country-edit-form";
import { CircleCheck } from "lucide-react";
import { statusOptions } from "./page";

export default function CountryEditContent({
  country,
  sources,
}: {
  country: CountryProfile;
  sources: Source[];
}) {
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
          <CountryEditForm country={country} sources={sources} />

        </div>
      </div>
    </>
  );
}
