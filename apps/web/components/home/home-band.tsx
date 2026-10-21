const bandItems = [
  {
    value: "5",
    label: "Countries at launch",
  },
  {
    value: "18",
    label: "Providers reviewed",
  },
  {
    value: "90 days",
    label: "Longest gap between reviews",
  },
  {
    value: "1 Oct 2026",
    label: "Data last reviewed",
  },
];

export default function HomeBand() {
  return (
    <div className="w-full bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {bandItems.map((item, index) => (
            <div key={"band-" + index} className="py-[24px] px-[28px]">
              <p className="text-3xl font-bold tracking-tight">{item.value}</p>
              <p className="text-lg text-muted leading-[1.6]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
