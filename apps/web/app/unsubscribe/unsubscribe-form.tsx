"use client";

import { unsubscribeSchema } from "@sahihfolio/shared";
import { useState } from "react";

export default function UnsubscribeForm({ token }: { token: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const parsed = unsubscribeSchema.safeParse({ token });

  if (!parsed.success) {
    setStatus("error");
    return;
  }

  async function handleUnsubscribe() {
    setStatus("loading");

    const response = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    setStatus(response.ok ? "done" : "error");
  }

  if (status === "done") {
    return <p>You have been unsubscribed.</p>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleUnsubscribe}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Unsubscribing…" : "Confirm unsubscribe"}
      </button>

      {status === "error" && (
        <p role="alert">
          We couldn’t process this request. The link may be invalid or expired.
        </p>
      )}
    </div>
  );
}
