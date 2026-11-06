import posthog from "posthog-js";

type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

export function track(
  event: string,
  properties: AnalyticsProperties = {},
): void {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, properties);
    return;
  }

  posthog.capture(event, properties);
}