import type { Source } from "@sahihfolio/shared";

export type ProviderWithSources = {
  id: string;
  status: "draft" | "published" | "archived";
  reviewedBy: string | null;
  reviewedAt: Date | null;
  sources: Source[];
};
