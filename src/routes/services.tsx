import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Target, PenTool, Flame, ArrowUpRight } from "lucide-react";
import { Float, Eyebrow } from "@/components/site/Float";
import { agencyHead } from "@/lib/agency";

export const Route = createFileRoute("/services")({
  head: () => agencyHead("/services", "Full-Funnel Digital Infrastructure — Team Bhadrakali Services", "Global and local SEO, data-driven PPC and ROAS optimization, high-converting UI/UX web design, and viral content and social media strategy."),
  component: ServicesPage,
});

const services = [
  { t: "Global & Local SEO (Search Engine Optimization)", d: "Technical audits, search-intent content and local visibility that connect your brand with buyers in Hyderabad and worldwide.", I: Search, span: "md:col-span-2", g: "from-peach/60 via-card/70 to-blush/60 hover:from-blush/70 hover:to-peach/80" },
  { t: "Data-Driven Performance Marketing (PPC & ROAS)", d: "Paid acquisition across Meta, Google and LinkedIn. Campaign structure, attribution and testing focused on return, not vanity metrics.", I: Target, span: "md:row-span-2", g: "from-primary/15 via-card/70 to-coral/30 hover:from-coral/30 hover:to-primary/25" },
  { t: "High-Converting UI/UX Web Design", d: "Fast websites and conversion-first landing pages with clear journeys from the first click to the final action.", I: PenTool, span: "", g: "from-blush/70 via-card/70 to-maroon/10 hover:from-maroon/15 hover:to-blush/80" },
  { t: "Viral Content & Social Media Strategy", d: "Short-form video, brand narratives and distribution strategies designed to earn attention and build lasting authority.", I: Flame, span: "", g: "from-coral/30 via-card/70 to-peach/60 hover:from-peach/70 hover:to-coral/40" },
];

function ServicesPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Float><Eyebrow>Services</Eyebrow></Float>
          <Float delay={0.1}><h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">Full-Funnel <span className="text-gradient">Digital Infrastructure.</span></h1></Float>
        </div>
        <div className="mt-16 grid auto-rows-[minmax(240px,auto)] gap-6 md:grid-cols-3">
          {services.map(({ t, d, I, span, g }, i) => (
            <Float key={t} delay={0.1 * i} className={span}>
              <Link to="/apply" className={`group flex h-full flex-col justify-between rounded-2xl border border-card bg-gradient-to-br p-8 shadow-soft backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 ${g}`}>
                <div className="flex items-start justify-between">
                  <div className="glow-red inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:rotate-6"><I className="!size-6" /></div>
                  <ArrowUpRight className="text-maroon transition-transform group-hover:rotate-45" />
                </div>
                <div className="mt-10">
                  <h2 className="text-2xl font-bold sm:text-3xl">{t}</h2>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </div>
              </Link>
            </Float>
          ))}
        </div>
      </div>
    </section>
  );
}
