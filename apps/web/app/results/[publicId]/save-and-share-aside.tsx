"use client";

import { Copy, Link, Printer, Share2, TriangleAlert, Lock } from "lucide-react";
import { getDateString } from "@/lib/date-utils";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { useState } from "react";

export default function SaveAndShareAside({ snapshot }: { snapshot: ResultSnapshot }) {
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState("");

  return (
    <aside className="res-aside" aria-label="Save and share">
      <section data-m="save" className="card2 save">
        <h3>Save this result</h3>
        <p className="save-p">
          We’ll email you a link to this result and a short checklist for
          opening an account.
        </p>

        <form className="save-form" noValidate>
          <label className="lbl" htmlFor="r9-em">
            Email address
          </label>
          <input
            id="r9-em"
            className="inp save-em "
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <p className="fmsg err" data-se="" role="alert" hidden>
            <TriangleAlert className="ic" width="16" height="16" />
            Enter a valid email address, for example you@example.com.
          </p>
          <label className="chk ">
            <input className="rin save-cb" type="checkbox" />
            <span>
              I agree to receive this email from Sahihfolio. I can
              unsubscribe at any time.
            </span>
          </label>
          <p className="fmsg err" data-se="" role="alert" hidden>
            <TriangleAlert className="ic" width="16" height="16" />
            Confirm that you agree to receive the email to continue.
          </p>
          <button
            type="button"
            className="btn btn-primary full"
            style={{ marginTop: "16px" }}
          >
            Email me this result
          </button>
        </form>
        <p className="fine" style={{ margin: "12px 0 0" }}>
          No account needed. We store your email, country, interest and
          this result.
        </p>
      </section>
      <section data-m="share" className="card2 share">
        <h3>Share this result</h3>
        <label className="lbl" htmlFor="r9-lk">
          Link
        </label>
        <div className="row">
          <input
            id="r9-lk"
            className="inp share-lk"
            readOnly
            value={`https://sahihfolio.com/results/${snapshot.publicId}`}
          />
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            data-act="copy"
            style={{ height: "48px" }}
          >
            <Copy className="ic" width="16" height="16" /> Copy
          </button>
        </div>

        <div className="quote">
          “I compared halal-investing options available in Malaysia using
          Sahihfolio’s free finder.”
        </div>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-act="share-summary"
          >
            <Share2 className="ic" width={16} height={16} /> Share summary
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-act="print"
          >
            <Printer className="ic" width="16" height="16" /> Print or
            save PDF
          </button>
        </div>
        <p
          className="fine"
          style={{ display: "flex", gap: "8px", margin: "14px 0 0" }}
        >
          <Lock className="ic" width="14" height="14" />
          <span>
            The link shows country, interest and filters. Amounts stay
            private.
          </span>
        </p>
      </section>
      <section data-m="meta" className="card2">
        <h3>About this result</h3>
        <dl className="meta-l">
          <dt>Result ID</dt>
          <dd>{snapshot.publicId}</dd>
          <dt>Created</dt>
          <dd>{getDateString(snapshot.createdAt)}</dd>
          <dt>Data version</dt>
          <dd>{snapshot.dataVersion}</dd>
          <dt>Data last reviewed</dt>
          <dd>{getDateString(snapshot.createdAt)}</dd>
        </dl>
        <p style={{ margin: 0 }}>
          <Link href="#">How we source and review data</Link>
        </p>
      </section>
    </aside>
  )
}