"use client";

import { Copy, Link, Printer, Share2, TriangleAlert, Lock } from "lucide-react";
import { getDateString } from "@/lib/date-utils";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { Suspense, useState } from "react";
import { getProductInterestLabel } from "src/lib/results/label-utils";
import { track } from "src/lib/analytics";

export default function SaveAndShareAside({
  snapshot,
  emailRef,
  onHandleCopy,
}: {
  snapshot: ResultSnapshot;
  emailRef?: React.RefObject<HTMLInputElement | null>;
  onHandleCopy: () => void;
}) {
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Sahihfolio — Halal investing options for ${getProductInterestLabel(snapshot.input.productInterest)}`,
        text: `I compared halal-investing options available in ${snapshot.input.countryCode} using Sahihfolio’s free finder.`,
        url: `https://sahihfolio.com/results/${snapshot.publicId}`,
      });
    } else {
      navigator.clipboard.writeText(
        `https://sahihfolio.com/results/${snapshot.publicId}`,
      );
    }

    track("result_shared", {
      public_id: snapshot.publicId,
      country_code: snapshot.input.countryCode,
      product_interest: snapshot.input.productInterest,
      result_count: snapshot.output.matches.length,
      data_version: snapshot.dataVersion,
      share_method: "native_share", // TODO: "whatsapp" | "x" | "facebook" | "linkedin";
    });
  };

  const handleEmailResult = async () => {
    if (!validateForm()) {
      return;
    }
    const response = await fetch("/api/save-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resultSnapshotId: snapshot.publicId,
        email: emailInput,
        productInterest: snapshot.input.productInterest,
        countryCode: snapshot.input.countryCode,
        consent: consentChecked,
      }),
    });

    track("email_captured", {
      public_id: snapshot.publicId,
      country_code: snapshot.input.countryCode,
      product_interest: snapshot.input.productInterest,
      result_count: snapshot.output.matches.length,
      data_version: snapshot.dataVersion,
      consent: consentChecked,
    });
  };

  const validEmail = (emailInput: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(emailInput);
  };

  const validateForm = () => {
    setEmailError(false);
    setConsentError(false);

    if (!emailInput) {
      setEmailError(true);
    }

    if (!consentChecked) {
      setConsentError(true);
    }

    return !emailError && !consentError;
  };

  return (
    <aside className="res-aside" aria-label="Save and share">
      <section data-m="save" className="card2 save">
        <h3>Save this result</h3>
        <p className="save-p">
          We’ll email you a link to this result and a short checklist for
          opening an account.
        </p>

        <Suspense fallback={null}>
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
              ref={emailRef}
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setEmailError(
                  validEmail(e.target.value) && emailInput.length == 0,
                );
              }}
            />
            <p
              className="fmsg err"
              data-se=""
              role="alert"
              hidden={!emailError}
            >
              <TriangleAlert className="ic" width="16" height="16" />
              Enter a valid email address, for example you@example.com.
            </p>
            <label className="chk ">
              <input
                className="rin save-cb"
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
              />
              <span>
                I agree to receive this email from Sahihfolio. I can unsubscribe
                at any time.
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
              disabled={!emailInput || !consentChecked}
              onClick={handleEmailResult}
            >
              Email me this result
            </button>
          </form>
        </Suspense>
        <p className="fine" style={{ margin: "12px 0 0" }}>
          No account needed. We store your email, country, interest and this
          result.
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
            onClick={onHandleCopy}
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
            onClick={handleShare}
          >
            <Share2 className="ic" width={16} height={16} /> Share summary
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-act="print"
          >
            <Printer className="ic" width="16" height="16" /> Print or save PDF
          </button>
        </div>
        <p
          className="fine"
          style={{ display: "flex", gap: "8px", margin: "14px 0 0" }}
        >
          <Lock className="ic" width="14" height="14" />
          <span>
            The link shows country, interest and filters. Amounts stay private.
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
  );
}
