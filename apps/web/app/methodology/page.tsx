"use client";

export default function MethodologyPage() {
  return (
    <main>
      <section className="w-full max-w-[1200px] py-[72px] px-[24px] mx-auto text-foreground">
        <div className="mb-[36px]">
          <h2 className="font-bold text-3xl tracking-tight mb-[6px]">
            Methodology
          </h2>
          <p className="text-muted text-lg">
            The screening criteria that shape results, in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </section>
    </main>
  );
}
