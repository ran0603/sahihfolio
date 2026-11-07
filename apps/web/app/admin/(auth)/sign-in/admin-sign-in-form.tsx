"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";

export function AdminSignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("next") ?? "/admin/screening-reports";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL,
      errorCallbackURL: "/admin/sign-in?error=verification",
    });

    setStatus(error ? "error" : "sent");
  }

  return (
    <form className="lf" noValidate onSubmit={handleSubmit}>
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
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "16px" }}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending link…" : "Email me a sign-in link"}
      </button>

      {status === "sent" && (
        <p role="status">
          If this address has access, we’ve sent a sign-in link.
        </p>
      )}

      {status === "error" && (
        <p role="alert">We couldn’t send a sign-in link. Try again.</p>
      )}
    </form>
  );
}
