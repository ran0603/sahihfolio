"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";
import { CircleX, Info } from "lucide-react";

export function AdminSignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("next") ?? "/admin";

  async function handleSubmit() {
    setStatus("sending");

    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL,
      errorCallbackURL: "/admin/sign-in?error=verification",
    });

    setStatus(error ? "error" : "sent");
  }

  return status === "sent" ? (
    <div className="lg-card">
      <div className="lg-mark" aria-hidden="true">
        <span className="mono">Sf</span>
      </div>
      <h1 tabIndex={-1}>Check your email</h1>
      <p className="lg-lead">
        If <b>{email}</b> has admin access, a sign-in link is on its way. It
        works once and expires in 15 minutes.
      </p>
      <div className="alert a-info flat" role="status">
        <Info className="ic a-ic" width={20} height={20} strokeWidth={1.5} />
        <div className="a-body">
          <strong>Nothing arrived?</strong>
          <p>
            Check spam. We show this message for every address, so we never
            confirm who has access.
          </p>
        </div>
      </div>
      <div className="lg-acts">
        <button
          type="button"
          className="btn btn-secondary"
          data-act="resend"
          onClick={handleSubmit}
        >
          {"Send the link again"}
        </button>
        <button
          type="button"
          className="link-btn"
          data-act="change"
          onClick={() => setStatus("idle")}
        >
          Use a different email
        </button>
      </div>
    </div>
  ) : (
    <div className="lg-card">
      <div className="lg-mark" aria-hidden="true">
        <span className="mono">Sf</span>
      </div>
      <h1 tabIndex={-1}>Sign in to Admin</h1>
      <p className="lg-sub">
        Sahihfolio internal tools. We’ll email you a link that works once.
      </p>
      {status === "error" && (<div className="alert a-error flat" role="alert">
        <CircleX className="ic a-ic" width={20} height={20} strokeWidth={1.5} />
        <div className="a-body">
          <strong>We couldn’t send the link</strong>
          <p>Nothing was sent. Check your connection, then try again.</p>
        </div>
      </div>)}
      <div className="lf">
        <div className="fld">
          <label className="lbl" htmlFor="m1-le">
            Work email
          </label>
          <input
            id="m1-le"
            className="inp lemail "
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus
            placeholder="you@example.com"
            aria-describedby="m1-lh"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="hint" id="m1-lh">
            Access is by invitation only.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "16px" }}
          disabled={status === "sending"}
          onClick={handleSubmit}
        >
          {status === "sending" ? "Sending link…" : "Email me a sign-in link"}
        </button>
      </div>
    </div>
  );
}
