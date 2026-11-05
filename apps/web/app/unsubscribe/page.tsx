import { Suspense } from "react";
import UnsubscribeContent from "./unsubscribe-content";

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<p>Loading unsubscribe options…</p>}>
      <UnsubscribeContent />
    </Suspense>
  );
}
