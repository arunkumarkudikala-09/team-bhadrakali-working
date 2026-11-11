import { createFileRoute, Link } from "@tanstack/react-router";
import { Funnel, Wallet, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Float, Eyebrow, Parallax, Stagger, StaggerItem } from "@/components/site/Float";
import { GrowthAnalyzer } from "@/components/growth/GrowthAnalyzer";
import { PillarStrip } from "@/components/growth/PillarStrip";
import { agencyHead, trustMetrics } from "@/lib/agency";

export const Route = createFileRoute("/")({
  head: () => agencyHead("/", "Team Bhadrakali — Predictable Growth & SEO Dominance", "Your brand deserves a reliable, scalable growth architecture. SEO and performance marketing systems that stop leaking leads and scale revenue globally."),
  component: Index,
});

const metricTips: Record<string, string> = {
  "Client Revenue Generated": "Revenue our clients have reported from the growth systems we built with them.",
  "Average ROAS": "Average return on ad spend across the campaigns we manage.",
  "#1 Google Rankings": "Search terms where our clients hold the top Google position.",
};

const fixes = [
  { I: Wallet, t: "You're paying for leaks", d: "We audit every campaign, cut what bleeds money and reinvest your budget in what converts." },
  { I: Funnel, t: "Your funnel breaks under load", d: "From first click to checkout, we architect paths that keep converting when traffic spikes." },
  { I: Eye, t: "Your buyers can't find you", d: "We align technical SEO, search intent and authoritative content so high-intent buyers land on you first." },
];

function Index() {
  return (
    <>
      <section className="flex items-center justify-center px-6 pb-12 pt-20 sm:pb-16 sm:pt-24">
        <Parallax offset={80} className="mx-auto max-w-5xl text-center">
          <Float><Eyebrow>Team Bhadrakali · Growth systems architects</Eyebrow></Float>
          <Float delay={0.1}>
            <h1 className="text-4xl font-extrabold leading-[1.12] sm:text-6xl lg:text-7xl">
              Your Brand Deserves a <span className="text-gradient">Scalable Growth Architecture.</span>
            </h1>
          </Float>
          <Float delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              You need more than ads and keywords. You need a pipeline that is reliable under pressure, scales with your spend and stays easy to grow. We engineer predictable growth and SEO dominance for ambitious brands.
            </p>
          </Float>
          <Float delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="shakti" size="xl">
              <Link to="/apply">Get My Free Growth Audit <ArrowRight /></Link>
            </Button>
            <Button asChild variant="secondary" size="xl" className="rounded-full transition-transform hover:-translate-y-0.5">
              <a href="#growth-analyzer">Analyze My System</a>
            </Button>
          </Float>
        </Parallax>
      </section>

      <section aria-label="Client growth metrics" className="border-y border-border bg-card/50 px-6 py-9 backdrop-blur-xl">
        <Stagger className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {trustMetrics.map((metric) => (
            <StaggerItem key={metric.label} className="text-center">
              <Tooltip>
                <TooltipTrigger className="group rounded-xl px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <p className="font-display text-4xl font-extrabold text-maroon transition-transform group-hover:scale-105">{metric.value}</p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground underline decoration-dotted decoration-primary/40 underline-offset-4">{metric.label}</p>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-sm">{metricTips[metric.label]}</TooltipContent>
              </Tooltip>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">You don't need more marketing. You need a better system.</h2>
            <p className="mt-4 text-muted-foreground">We treat your funnel like engineers treat critical software. Every part is built on three principles.</p>
          </Float>
          <div className="mt-14"><PillarStrip /></div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <Eyebrow>Free interactive diagnosis</Eyebrow>
            <h2 className="text-4xl font-bold sm:text-5xl">How healthy is your growth system?</h2>
            <p className="mt-4 text-muted-foreground">Move the sliders to match your numbers. See where your system leaks and what fixing it could be worth.</p>
          </Float>
          <Float delay={0.1} className="mt-12"><GrowthAnalyzer /></Float>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">Being invisible online is costing you.</h2>
            <p className="mt-4 text-muted-foreground">Here's how we turn your leaks into leverage.</p>
          </Float>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {fixes.map(({ I, t, d }) => (
              <StaggerItem key={t}>
                <div className="glass group h-full rounded-2xl p-8 transition-transform hover:-translate-y-1">
                  <div className="glow-red inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-6"><I /></div>
                  <h3 className="mt-6 text-xl font-bold">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
