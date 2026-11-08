import { createFileRoute, Link } from "@tanstack/react-router";
import { Funnel, Wallet, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Float, Eyebrow } from "@/components/site/Float";
import { agencyHead, trustMetrics } from "@/lib/agency";

export const Route = createFileRoute("/")({
  head: () => agencyHead("/", "Team Bhadrakali — Predictable Growth & SEO Dominance", "We build high-converting digital pipelines that eliminate wasted ad spend and scale revenue globally. SEO and performance marketing for ambitious brands."),
  component: Index,
});

const fixes = [
  { I: Wallet, t: "Wasted ad spend, eliminated", d: "We audit every campaign, cut what bleeds money and reinvest in what converts." },
  { I: Funnel, t: "Broken funnels, rebuilt", d: "From first click to checkout, we remove friction so more visitors become buyers." },
  { I: Eye, t: "Search visibility, engineered", d: "We align technical SEO, search intent and authoritative content to connect your brand with high-intent buyers." },
];

function Index() {
  return (
    <>
      <section className="flex items-center justify-center px-6 pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <Float><Eyebrow>Team Bhadrakali · Global growth partner</Eyebrow></Float>
          <Float delay={0.1}>
            <h1 className="text-4xl font-extrabold leading-[1.12] sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Predictable Growth & SEO Dominance</span> for Ambitious Brands.
            </h1>
          </Float>
          <Float delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              We build high-converting digital pipelines that eliminate wasted ad spend and scale revenue globally.
            </p>
          </Float>
          <Float delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="shakti" size="xl">
              <Link to="/apply">Get My Free Growth Audit <ArrowRight /></Link>
            </Button>
            <Button asChild variant="secondary" size="xl" className="rounded-full">
              <Link to="/about">How We Work</Link>
            </Button>
          </Float>
        </div>
      </section>

      <section aria-label="Client growth metrics" className="border-y border-border bg-card/50 px-6 py-9 backdrop-blur-xl">
        <Float className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="font-display text-4xl font-extrabold text-maroon">{metric.value}</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </Float>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">Being invisible online is costing you.</h2>
            <p className="mt-4 text-muted-foreground">Here's how we turn leaks into leverage.</p>
          </Float>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {fixes.map(({ I, t, d }, i) => (
              <Float key={t} delay={0.1 * i}>
                <div className="glass h-full rounded-2xl p-8 transition-transform hover:-translate-y-1">
                  <div className="glow-red inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><I /></div>
                  <h3 className="mt-6 text-xl font-bold">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              </Float>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
