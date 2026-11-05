"use client";

import { useSearchParams } from "next/navigation";
import UnsubscribeForm from "./unsubscribe-form";

export default function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <main>
        <h1>Unsubscribe</h1>
        <p>This unsubscribe link is invalid or incomplete.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Unsubscribe from Sahihfolio emails</h1>
      <p>
        Confirm below if you no longer want to receive emails about your saved
        results.
      </p>
      <UnsubscribeForm token={token} />
    </main>
  );
}