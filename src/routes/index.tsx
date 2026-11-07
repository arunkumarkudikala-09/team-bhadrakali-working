import { createFileRoute, Link } from "@tanstack/react-router";
import { Funnel, Wallet, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Float, Eyebrow } from "@/components/site/Float";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Team Bhadrakali — Predictable Growth for Ambitious Brands" },
      { name: "description", content: "Hyderabad-born growth agency fixing broken funnels and wasted ad spend for brands worldwide." },
      { property: "og:title", content: "Team Bhadrakali — Predictable Growth" },
      { property: "og:description", content: "We fix broken funnels, eliminate wasted ad spend, and make your brand impossible to ignore." },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "$2M+", l: "Ad Spend Managed" },
  { v: "300%", l: "Avg ROI" },
  { v: "40+", l: "Brands Scaled Globally" },
  { v: "48h", l: "Strategy Turnaround" },
];

const fixes = [
  { I: Wallet, t: "Wasted ad spend, eliminated", d: "We audit every campaign, cut what bleeds money and reinvest in what converts." },
  { I: Funnel, t: "Broken funnels, rebuilt", d: "From first click to checkout, we remove friction so more visitors become buyers." },
  { I: Eye, t: "Invisible brands, unmissable", d: "SEO and content that put you in front of the right buyers — locally and globally." },
];

function Index() {
  return (
    <>
      <section className="flex min-h-[92vh] items-center justify-center px-6 pt-10">
        <div className="mx-auto max-w-5xl text-center">
          <Float><Eyebrow>Hyderabad · Global growth partner</Eyebrow></Float>
          <Float delay={0.1}>
            <h1 className="text-5xl font-extrabold leading-[1.02] sm:text-7xl lg:text-8xl">
              <span className="text-gradient">Predictable Growth</span> for Ambitious Brands
            </h1>
          </Float>
          <Float delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              We fix broken funnels, eliminate wasted ad spend, and make your brand impossible to ignore.
            </p>
          </Float>
          <Float delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="shakti" size="xl">
              <Link to="/apply">Scale Your Brand <ArrowRight /></Link>
            </Button>
            <Button asChild variant="secondary" size="xl" className="rounded-full">
              <Link to="/system">See the System</Link>
            </Button>
          </Float>
        </div>
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

      <section className="px-6 py-16">
        <Float className="mx-auto max-w-6xl">
          <div className="glass grid grid-cols-2 gap-8 rounded-3xl p-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-4xl font-extrabold text-maroon sm:text-5xl">{s.v}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </Float>
      </section>
    </>
  );
}
