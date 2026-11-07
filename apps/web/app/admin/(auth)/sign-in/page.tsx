"use client";

import Link from "next/link";
import "./sign-in.css";
import { AdminSignInForm } from "./admin-sign-in-form";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div data-m="card">
      <div className="lg-card">
        <div className="lg-mark" aria-hidden="true">
          <span className="mono">Sf</span>
        </div>
        <h1 tabIndex={-1}>Sign in to Admin</h1>
        <p className="lg-sub">
          Sahihfolio internal tools. We’ll email you a link that works once.
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AdminSignInForm />
        </Suspense>
      </div>
      <p className="lg-foot">
        Internal tool. Sign-ins are logged.{" "}
        <Link href="/" data-act="site">
          Back to the public site
        </Link>
      </p>
    </div>
  );
}
