import HomeHero from "components/home/home-hero";
import HomeBand from "components/home/home-band";
import {
  ChartColumn,
  Clock4,
  FileText,
  Globe,
  Info,
  Percent,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Card, CardContent, Badge } from "@sahihfolio/ui";
import Link from "next/link";
import HomeSearch from "components/home/home-search";

export default async function HomePage() {
  const stepItems = [
    {
      label: "Choose your country",
      description:
        "Availability and rules depend on where you live, so we start there.",
    },
    {
      label: "Answer a few questions",
      description:
        "Tell us what you want to invest in. Amounts and preferences are optional.",
      hint: { icon: <Clock4 className="h-4 w-4" />, text: "About two minutes" },
    },
    {
      label: "Compare sourced options",
      description:
        "See why each option appeared, with fees, coverage, sources and review dates.",
    },
  ];

  const howitworksItems = [
    {
      title: "Access",
      description:
        "Which providers accept investors from your country, and what restrictions apply.",
      icon: <Globe className="h-[22px] w-[22px]" />,
    },
    {
      title: "Fees",
      description:
        "Trading, currency conversion, custody and management fees, side by side.",
      icon: <Percent className="h-[22px] w-[22px]" />,
    },
    {
      title: "Markets and ETFs",
      description:
        "Which exchanges, asset types and ETFs each provider offers.",
      icon: <ChartColumn className="h-[22px] w-[22px]" />,
    },
    {
      title: "Screening methodology",
      description:
        "Which Shariah-screening methodology is used, and who states it.",
      icon: <ShieldCheck className="h-[22px] w-[22px]" />,
    },
    {
      title: "Disclosures",
      description:
        "Affiliate relationships, account requirements and source documents.",
      icon: <FileText className="h-[22px] w-[22px]" />,
    },
  ];

  const researchItems = [
    {
      title: "Evidence over opinion",
      description:
        "Every claim links to a source and shows the date we reviewed it.",
      icon: <FileText className="h-[22px] w-[22px]" />,
    },
    {
      title: "Methodology on show",
      description:
        "Screening methodologies differ. We show which one was used and what it checks.",
      icon: <ShieldCheck className="h-[22px] w-[22px]" />,
    },
    {
      title: "Not advice",
      description:
        "We do not issue religious rulings or personalised investment, tax or legal advice.",
      icon: <Info className="h-[22px] w-[22px]" />,
    },
  ];

  return (
    <>
      <HomeHero />
      <HomeBand />
      <section className="w-full max-w-[1200px] py-[72px] px-[24px] mx-auto text-foreground">
        <div className="mb-[36px]">
          <h2 className="font-bold text-3xl tracking-tight mb-[6px]">
            How it works
          </h2>
          <p className="text-muted text-lg">
            Three steps, about two minutes. You see useful results before we ask
            for anything.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stepItems.map((step, index) => (
            <Card key={"step-" + index} elevated>
              <CardContent>
                <div className="flex flex-col gap-3 text-foreground">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e3f6f4] dark:bg-brand-700 font-bold border border-pos text-foreground">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.label}</h3>
                  <p className="text-muted">{step.description}</p>
                  {step.hint && (
                    <span className="flex items-center gap-2 text-sm text-muted">
                      {step.hint.icon} {step.hint.text}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="w-full bg-surface">
        <div className="max-w-[1200px] py-[72px] px-[24px] mx-auto text-foreground">
          <div className="mb-[36px]">
            <h2 className="font-bold text-3xl tracking-tight mb-[6px]">
              What we check before you decide
            </h2>
            <p className="text-muted text-lg">
              The things that change the outcome, shown side by side so
              trade-offs are visible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howitworksItems.map((ibox, index) => (
              <Card key={"howitworks-" + index} elevated>
                <CardContent>
                  <div className="flex flex-col gap-2 text-foreground">
                    <div className="bg-[#e8ebf0] dark:bg-[#2a303c] w-[40px] h-[40px] text-sec grid place-items-center rounded-lg">
                      {ibox.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{ibox.title}</h3>
                    <p className="text-muted text-sm">{ibox.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card elevated className="dark">
              <CardContent className="">
                <div className="flex flex-col gap-3 text-foreground">
                  <h3 className="text-lg font-semibold">
                    See how we source and review
                  </h3>
                  <p className="text-sm">
                    Our methodology explains where data comes from and how often
                    we update it.
                  </p>
                  <Link
                    className="inline-flex items-center justify-center rounded-lg border border-muted p-[8px] font-semibold cursor-pointer bg-brand-900 dark:bg-surface dark:hover:bg-[#2a303c] hover:bg-brand-700 hover:shadow-sm w-[200px]"
                    href="#"
                  >
                    <span className="text-[#F2F4F7]">Read the methodology</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <HomeSearch />
      <section className="w-full bg-surface">
        <div className="max-w-[1200px] py-[72px] px-[24px] mx-auto text-foreground">
          <div className="mb-[36px]">
            <h2 className="font-bold text-3xl tracking-tight mb-[6px]">
              Research, not rulings
            </h2>
            <p className="text-muted text-lg">
              We explain what a methodology checks and what the data says. You
              decide what to do with it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {researchItems.map((ibox, index) => (
              <Card key={"research-" + index} elevated>
                <CardContent>
                  <div className="flex flex-col gap-2 text-foreground">
                    <div className="bg-[#e8ebf0] dark:bg-[#2a303c] w-[40px] h-[40px] text-sec grid place-items-center rounded-lg">
                      {ibox.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{ibox.title}</h3>
                    <p className="text-muted text-sm">{ibox.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-[20px]">
            <Badge variant="neutral">Shariah-screening information</Badge>
            <Badge variant="neutral">Provider-stated methodology</Badge>
            <Badge variant="neutral">Sahihfolio editorial note</Badge>
            <Badge variant="warning">
              <TriangleAlert className="h-[14px] w-[14px]" />
              Not a religious ruling
            </Badge>
          </div>
        </div>
      </section>
    </>
  );
}
