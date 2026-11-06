"use client";

import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { CountryProfile } from "@sahihfolio/shared";
import { useRef } from "react";
import ResultOptionsHeader from "./result-options-header";
import ResultOptionsMain from "./result-options-main";
import SaveAndShareAside from "./save-and-share-aside";
import { track } from "src/lib/analytics";

export default function DataViewWrapper({
  snapshot,
  country,
}: {
  snapshot: ResultSnapshot;
  country: CountryProfile;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://sahihfolio.com/results/${snapshot.publicId}`,
    );

    track("result_shared", {
      public_id: snapshot.publicId,
      country_code: snapshot.input.countryCode,
      product_interest: snapshot.input.productInterest,
      result_count: snapshot.output.matches.length,
      data_version: snapshot.dataVersion,
      share_method: "copy_link",
    });
  };

  return (
    <div data-view="">
      <ResultOptionsHeader
        snapshot={snapshot}
        country={country}
        onHandleFocus={handleFocus}
        onHandleCopy={handleCopy}
      />
      <div className="res-grid">
        <ResultOptionsMain snapshot={snapshot} country={country} />
        <SaveAndShareAside
          snapshot={snapshot}
          emailRef={inputRef}
          onHandleCopy={handleCopy}
        />
      </div>
    </div>
  );
}
