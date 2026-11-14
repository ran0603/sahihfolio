export const statusOptions: Record<
  string,
  { label: string; state: "pos" | "neg" | "neutral" | "mist" }
> = {
  all: {
    label: "All",
    state: "neutral",
  },
  published: {
    label: "Published",
    state: "pos",
  },
  draft: {
    label: "Draft",
    state: "neutral",
  },
  archived: {
    label: "Archived",
    state: "mist",
  },
};
