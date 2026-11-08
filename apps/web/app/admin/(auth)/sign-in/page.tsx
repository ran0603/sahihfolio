"use client";

import Link from "next/link";
import "./sign-in.css";
import { AdminSignInForm } from "./admin-sign-in-form";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div data-m="card">
      <Suspense fallback={<div>Loading...</div>}>
        <AdminSignInForm />
      </Suspense>
      <p className="lg-foot">
        Internal tool. Sign-ins are logged.{" "}
        <Link href="/" data-act="site">
          Back to the public site
        </Link>
      </p>
    </div>
  );
}
