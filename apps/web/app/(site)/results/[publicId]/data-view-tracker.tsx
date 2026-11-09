"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";

export default function DataViewTracker({
  snapshot,
}: {
  snapshot: ResultSnapshot;
}) {
  const trackedPublicId = useRef<string | null>(null);

  useEffect(() => {
    if (trackedPublicId.current === snapshot.publicId) return;

    track("result_viewed", {
      public_id: snapshot.publicId,
      country_code: snapshot.input.countryCode,
      product_interest: snapshot.input.productInterest,
      result_count: snapshot.output.matches.length,
      data_version: snapshot.dataVersion,
    });

    trackedPublicId.current = snapshot.publicId;
  }, [snapshot]);

  return null;
}
