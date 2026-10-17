import Link from "next/link";
import { Button, Card, CardContent } from "@sahihfolio/ui";
import { ArrowRight, Check, ChevronDown, Clock4, ExternalLink, Info } from "lucide-react";

export default function HomePage() {
  return (
    <div className="grid grid-cols-2 gap-18 px-12 py-14">
      <section className="text-left">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold py-1 px-3 rounded-full w-fit bg-[#e3f6f4] border border-[#95d5d1]">
          <i className="h-[8px] w-[8px] bg-[#14B8A6] rounded-full block"></i>
          Free tool · Data last reviewed 1 Oct 2026
        </div>
        <h2 className="text-5xl font-bold tracking-tight my-6">
          Find halal-investing options available in your country.
        </h2>
        <p className="text-lg text-muted leading-[1.6] mb-[30px]">
          Compare brokers, ETFs, and managed services with clear fees, coverage,
          and sourcing.
        </p>

        <Card elevated>
          <CardContent>
            <div className="flex flex-col gap-4">
              <fieldset className="flex flex-col text-left gap-2">
                <label className="font-bold text-sm">
                  Country of residence
                </label>
                <div className="relative">
                  <select className="w-full appearance-none h-[48px] pr-[44px] pl-[14px] border border-[#E4E7EC] rounded-[10px] bg-[white]">
                    <option>Malaysia</option>
                    <option>Indonesia</option>
                    <option>Singapore</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none h-5 w-5" />
                </div>
              </fieldset>
              <div className="text-muted flex items-center gap-2">
                <Info className="h-4 w-4" />
                Select your country to see relevant options.
              </div>
              <Button className="w-full gap-2">
                <span>Find my options</span>
                <ArrowRight />
              </Button>
              <p className="text-muted text-center">
                No email needed to see your results.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        <Card elevated style={{ padding: "0" }}>
          <CardContent>
            <div className="flex flex-col divide-y divide-[#E4E7EC]">
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-bold">Example result</p>
                  <span className="sub">Malaysia · ETF investing</span>
                </div>
                <span className="badge b-neutral">Sample data</span>
              </div>
              <div className="px-6 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg">Example Broker A</p>
                  <span className="badge b-info">Broker</span>
                </div>
                <dl className="kv">
                  <dt>Trading</dt>
                  <dd>0.10%</dd>
                  <dt>FX</dt>
                  <dd>0.50%</dd>
                  <dt>Minimum</dt>
                  <dd>MYR 100</dd>
                  <dt>Screening</dt>
                  <dd>Provider-stated · AAOIFI-aligned</dd>
                </dl>
                <div className="flex flex-row gap-2 items-top">
                <Check className="h-4 w-4 text-acc" />
                  <span>
                    Included because it serves Malaysia-based investors, offers
                    ETFs and provides Shariah-screening information.
                  </span>
                </div>
                <p className="flex flex-row gap-2 items-center">
                  Source: <a href="#">Provider pricing page</a>{" "}
                  <ExternalLink className="h-4 w-4" />
                  · reviewed 1 Oct 2026
                </p>
              </div>
              <div className="px-6 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg">Example Robo B</p>
                  <span className="badge b-info">Robo-advisor</span>
                </div>
                <dl className="kv">
                  <dt>Management</dt>
                  <dd>0.45%</dd>
                  <dt>FX</dt>
                  <dd>Not stated</dd>
                  <dt>Minimum</dt>
                  <dd>MYR 500</dd>
                  <dt>Screening</dt>
                  <dd>Methodology not named by provider</dd>
                </dl>
                <div className="flex flex-row gap-2 items-top">
                  <Check className="h-4 w-4 text-acc" />
                  <span>
                    Included because it serves Malaysia-based investors and
                    offers managed ETF portfolios. Verify the screening basis
                    with the provider.
                  </span>
                </div>
                <p className="flex flex-row gap-2 items-center">
                  Source: <a href="#">Provider fee schedule</a>{" "}
                  <ExternalLink className="h-4 w-4" />
                  · reviewed 1 Oct 2026
                </p>
              </div>
              <button type="button" className="flex items-center justify-between px-6 py-4">
                + 2 more options in this example
              </button>
              <div className="text-muted flex items-center gap-2 px-6 py-4">
                <Clock4 className="h-4 w-4" />
                <span>
                  Data last reviewed 1 Oct 2026. Illustrative only, not a real
                  result.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
