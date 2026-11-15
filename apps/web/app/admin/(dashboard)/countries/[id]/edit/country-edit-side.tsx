"use client";

import { CountryProfile } from "@sahihfolio/shared";
import { CircleCheck, Undo, Archive, Clock } from "lucide-react";
import Link from "next/link";
import { statusOptions } from "../../../constants";
import { calculateDaysSince, getDateString } from "src/lib/date-utils";

export default function CountryEditSide({
  country,
  handleUnpublish,
  handlePublish,
  handleArchive,
  handleUnarchive,
  confirmAction,
  setConfirmAction,
  isBusy,
}: {
  country: CountryProfile;
  handleUnpublish: () => void;
  handlePublish: () => void;
  handleArchive: () => void;
  handleUnarchive: () => void;
  confirmAction?: "publish" | "draft" | "archive" | null;
  setConfirmAction?: (action: "publish" | "draft" | "archive" | null) => void;
  isBusy?: boolean;
}) {
  return (
    <div className="sidecol">
      <section className="rdy side" aria-labelledby="m7-st">
        <h2 id="m7-st">Status</h2>
        <div className="hb" style={{ margin: "0 0 10px" }}>
          <span className={`badge b-${statusOptions[country.status].state}`}>
            {statusOptions[country.status].label}
          </span>
        </div>
        <p className="hint" style={{ margin: "0 0 8px" }}>
          {country.status === "published"
            ? "Needed to stay published:"
            : "Needed to publish:"}
        </p>
        <ul className="rl">
          {country.lastReviewedAt &&
          calculateDaysSince(country.lastReviewedAt) <= 90 ? (
            <li className="ok">
              <CircleCheck className="ic" width={18} height={18} />
              <span>
                A review date and reviewer
                <span className="vh">, done</span>
              </span>
            </li>
          ) : (
            <li className="">
              <Clock className="ic" width={18} height={18} />
              <span>
                A review date and reviewer
                <span className="vh">, still needed</span>
              </span>
            </li>
          )}
          {country.regulatoryNotes && country.regulatoryNotes.length > 0 ? (
            <li className="ok">
              <CircleCheck className="ic" width={18} height={18} />
              <span>
                At least one regulatory note
                <span className="vh">, done</span>
              </span>
            </li>
          ) : (
            <li className="">
              <Clock className="ic" width={18} height={18} />
              <span>
                At least one regulatory note
                <span className="vh">, still needed</span>
              </span>
            </li>
          )}
          {country.providers &&
          country.providers.filter((p) => p.status === "published").length >
            0 ? (
            <li className="ok">
              <CircleCheck className="ic" width={18} height={18} />
              <span>
                At least one published provider
                <span className="vh">, done</span>
              </span>
            </li>
          ) : (
            <li className="">
              <Clock className="ic" width={18} height={18} />
              <span>
                At least one published provider
                <span className="vh">, still needed</span>
              </span>
            </li>
          )}
        </ul>
        <div className="side-a">
          {confirmAction ? (
            <div
              className="qr-cf"
              role="group"
              aria-label={`Confirm: ${confirmAction}`}
            >
              <p>
                {confirmAction === "publish" && (
                  <>
                    <b>Publish {country.name}?</b> It appears in the Finder’s
                    country list.
                  </>
                )}
                {confirmAction === "draft" && (
                  <>
                    <b>Move {country.name} to draft?</b> It leaves the Finder.
                    Saved results keep working.
                  </>
                )}
                {confirmAction === "archive" && (
                  <>
                    <b>Archive {country.name}?</b> It leaves the Finder and
                    can’t be edited until restored.
                  </>
                )}
              </p>
              <div className="btn-row">
                <button
                  type="button"
                  className={`btn ${confirmAction === "publish" ? "btn-primary" : "btn-secondary"} btn-sm`}
                  disabled={isBusy}
                  onClick={() => {
                    if (confirmAction === "publish") handlePublish();
                    else if (confirmAction === "draft") handleUnpublish();
                    else if (confirmAction === "archive") handleArchive();
                  }}
                >
                  {isBusy
                    ? "Working…"
                    : confirmAction === "publish"
                      ? "Publish"
                      : confirmAction === "draft"
                        ? "Move to draft"
                        : "Archive"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={isBusy}
                  onClick={() => setConfirmAction?.(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : country.status === "archived" ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="restore"
              disabled={isBusy}
              onClick={handleUnarchive}
            >
              <Undo className="ic" width="18" height="18" /> Restore as draft
            </button>
          ) : (
            <div className="btn-row">
              {country.status === "published" && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-act="ask-draft"
                  disabled={isBusy}
                  onClick={() =>
                    setConfirmAction
                      ? setConfirmAction("draft")
                      : handleUnpublish()
                  }
                >
                  <Undo className="ic" width={18} height={18} /> Move to draft
                </button>
              )}
              {country.status !== "published" && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-act="ask-publish"
                  disabled={isBusy}
                  onClick={() =>
                    setConfirmAction
                      ? setConfirmAction("publish")
                      : handlePublish()
                  }
                >
                  Publish
                </button>
              )}
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                data-act="ask-arc"
                disabled={isBusy}
                onClick={() =>
                  setConfirmAction
                    ? setConfirmAction("archive")
                    : handleArchive()
                }
              >
                <Archive className="ic" width={18} height={18} /> Archive
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="rdy side" aria-labelledby="m8-dt">
        <h2 id="m8-dt">Details</h2>
        <dl className="dl">
          <dt>ID</dt>
          <dd>
            <code>{country.id}</code>
          </dd>
          <dt>Created</dt>
          <dd>{getDateString(country.createdAt)}</dd>
          <dt>Updated</dt>
          <dd>{getDateString(country.updatedAt)}</dd>
        </dl>
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
        <Link href="/admin/providers" className="link-btn" data-act="noop">
          Manage providers
        </Link>
      </section>
      {country.history && country.history.length > 0 && (
        <section className="rdy side" aria-labelledby="m7-hs">
          <h2 id="m7-hs">History</h2>
          <ol className="hl">
            {country.history.map((log, index) => (
              <li key={log.entityId + "-" + index}>
                <p>
                  <b>{log.user?.name || "Unknown"}</b> {log.action}
                </p>
                <span className="muted">{log.createdAt?.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
