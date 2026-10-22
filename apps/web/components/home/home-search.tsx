import { Button, Badge, Card, CardContent } from "@sahihfolio/ui";
import { ShieldCheck, Search } from "lucide-react";

export default function HomeSearch() {
  return (
    <section className=" max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-[72px] px-[24px]">
        <div className="flex flex-col gap-3 text-foreground">
          <h2 className="font-bold text-3xl tracking-tight">
            Looking up a specific stock or ETF?
          </h2>
          <p className="text-muted">
            Open a sourced Shariah-screening report for one security: the
            methodology, data period, ratios and review date.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="neutral">
              <ShieldCheck className="w-[16px] h-[16px]" />
              Shariah-screening information
            </Badge>
            <Badge variant="neutral">Provider-stated methodology</Badge>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 text-foreground">
              <label className="font-bold text-sm mb-[8px]" htmlFor="u2">
                Search by ticker or company name
              </label>
              <div className="relative">
                <Search className="absolute left-[14px] top-1/2 -translate-y-1/2 text-muted h-5 w-5" />
                <input
                  id="u2"
                  className="w-full appearance-none h-[48px] pr-[14px] pl-[44px] border border-[#E4E7EC] rounded-[10px] bg-[white] dark:bg-surface dark:border-[#2A3243] text-foreground"
                  type="search"
                  placeholder="Try EXMP"
                  autoComplete="off"
                />
              </div>
              <div className="mt-[12px] flex items-center gap-2">
                <span>Sample reports:</span>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ borderRadius: "20px" }}
                >
                  <span className="text-foreground">EXMP</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ borderRadius: "20px" }}
                >
                  <span className="text-foreground">DEMO</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ borderRadius: "20px" }}
                >
                  <span className="text-foreground">TEST</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
