import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Target, PenTool, Flame, ArrowUpRight } from "lucide-react";
import { Float, Stagger, StaggerItem } from "@/components/site/Float";
import { GrowthAnalyzer } from "@/components/growth/GrowthAnalyzer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { agencyHead } from "@/lib/agency";
import { pillars, type FaultId, type Pillar } from "@/lib/growth-system";

export const Route = createFileRoute("/services")({
  head: () => agencyHead("/services", "Full-Funnel Digital Infrastructure — Team Bhadrakali Services", "Global and local SEO, data-driven PPC and ROAS optimization, high-converting UI/UX web design, and viral content strategy — architected to be reliable, scalable and maintainable."),
  component: ServicesPage,
});

const services: { id: string; fault: FaultId; t: string; need: string; d: string; I: typeof Search; pillar: Pillar; span: string; g: string }[] = [
  { id: "seo", fault: "invisible-seo", t: "Global & Local SEO (Search Engine Optimization)", need: "You need buyers to find you before your competitors.", d: "We architect technical foundations, search-intent content and local visibility that connect your brand with buyers in Hyderabad and worldwide.", I: Search, pillar: "Scalability", span: "md:col-span-2", g: "from-peach/60 via-card/70 to-blush/60 hover:from-blush/70 hover:to-peach/80" },
  { id: "performance", fault: "high-cpa", t: "Data-Driven Performance Marketing (PPC & ROAS)", need: "You need every rupee of ad spend to come back with interest.", d: "We structure Meta, Google and LinkedIn campaigns, attribution and testing so your returns hold as you scale spend.", I: Target, pillar: "Scalability", span: "md:row-span-2", g: "from-primary/15 via-card/70 to-coral/30 hover:from-coral/30 hover:to-primary/25" },
  { id: "web-design", fault: "poor-conversion", t: "High-Converting UI/UX Web Design", need: "You need a website that never leaks a lead.", d: "We build fast websites and conversion-first landing pages with clear journeys from first click to final action.", I: PenTool, pillar: "Reliability", span: "", g: "from-blush/70 via-card/70 to-maroon/10 hover:from-maroon/15 hover:to-blush/80" },
  { id: "content", fault: "content-pipeline", t: "Viral Content & Social Media Strategy", need: "You need attention that compounds, not posts that vanish.", d: "We design short-form video, brand narratives and distribution systems your team can keep running.", I: Flame, pillar: "Maintainability", span: "", g: "from-coral/30 via-card/70 to-peach/60 hover:from-peach/70 hover:to-coral/40" },
];

const pillarTip = Object.fromEntries(pillars.map((p) => [p.name, p.tip])) as Record<Pillar, string>;

function ServicesPage() {
  return (
    <>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Float delay={0.1}><h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">Pick the part that keeps <span className="text-gradient">you up at night.</span></h1></Float>
            <Float delay={0.2}><p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Each service fixes one real problem. Together, they become one system that brings buyers in and keeps them coming.</p></Float>
          </div>
          <Stagger className="mt-16 grid auto-rows-[minmax(260px,auto)] gap-6 md:grid-cols-3">
            {services.map(({ id, fault, t, need, d, I, pillar, span, g }) => (
              <StaggerItem key={id} className={span}>
                <div id={id} className="h-full scroll-mt-28">
                  <Link to="/apply" search={{ fault }} className={`group flex h-full flex-col justify-between rounded-2xl border border-card bg-gradient-to-br p-8 shadow-soft backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 target:ring-2 target:ring-primary ${g}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="glow-red inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:rotate-6"><I className="!size-6" /></div>
                      <div className="flex items-center gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-xs font-semibold text-primary">{pillar}</span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-sm">{pillarTip[pillar]}</TooltipContent>
                        </Tooltip>
                        <ArrowUpRight className="text-maroon transition-transform group-hover:rotate-45" />
                      </div>
                    </div>
                    <div className="mt-10">
                      <p className="text-sm font-semibold text-primary">{need}</p>
                      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{t}</h2>
                      <p className="mt-2 text-muted-foreground">{d}</p>
                    </div>
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">Not sure which you need?</h2>
            <p className="mt-4 text-muted-foreground">Enter your numbers and the analyzer will point you to the right service.</p>
          </Float>
          <Float delay={0.1} className="mt-12"><GrowthAnalyzer /></Float>
        </div>
      </section>
    </>
  );
}
