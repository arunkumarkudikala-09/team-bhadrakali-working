import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Moon, Search, ShoppingCart, PhoneOff, Compass, Wrench, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Float, Parallax, Stagger, StaggerItem } from "@/components/site/Float";
import { GrowthAnalyzer } from "@/components/growth/GrowthAnalyzer";
import { PillarStrip } from "@/components/growth/PillarStrip";
import { agencyHead, trustMetrics } from "@/lib/agency";

export const Route = createFileRoute("/")({
  head: () => agencyHead("/", "Team Bhadrakali — Growth that doesn't sleep when you do", "Your customers are searching right now. Team Bhadrakali builds the SEO and performance marketing systems that make sure they find you, not your competitor."),
  component: Index,
});

const metricTips: Record<string, string> = {
  "Client Revenue Generated": "Revenue our clients have reported from the growth systems we built with them.",
  "Average ROAS": "Average return on ad spend across the campaigns we manage.",
  "#1 Google Rankings": "Search terms where our clients hold the top Google position.",
};

// Everyday moments a founder recognises instantly; each maps to a fix.
const scenes = [
  { I: Moon, time: "11:47 PM", t: "Someone searches for exactly what you sell.", d: "They click the first result. It isn't you. We make sure next time it is." },
  { I: ShoppingCart, time: "2:15 PM", t: "A cart fills up. Then the tab closes.", d: "Somewhere between click and checkout, your funnel lets go. We find where, and fix it." },
  { I: PhoneOff, time: "Month end", t: "The ad bill arrives. The phone stayed quiet.", d: "Spend that doesn't sell gets cut. What's left gets sharper and pays for itself." },
];

const path = [
  { I: Search, t: "We look", d: "Your ads, search and site, read like a story. Where it breaks becomes obvious." },
  { I: Wrench, t: "We rebuild", d: "One system: search that brings buyers, ads that convert, pages that close." },
  { I: LineChart, t: "You watch it grow", d: "Clear numbers every month. No jargon, no mystery." },
];

function Index() {
  return (
    <>
      <section className="flex items-center justify-center px-6 pb-14 pt-20 sm:pb-20 sm:pt-28">
        <Parallax offset={80} className="mx-auto max-w-5xl text-center">
          <Float>
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-6xl lg:text-7xl">
              Right now, someone is searching for you. <span className="text-gradient">Will they find you?</span>
            </h1>
          </Float>
          <Float delay={0.15}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Every day, buyers who are ready to pay end up with someone else. We build the search and ad systems that bring them to you, even while you sleep.
            </p>
          </Float>
          <Float delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="shakti" size="xl">
              <Link to="/apply">Show me what I'm missing <ArrowRight /></Link>
            </Button>
            <Button asChild variant="secondary" size="xl" className="rounded-full transition-transform hover:-translate-y-0.5">
              <a href="#growth-analyzer">Check my numbers in 30 seconds</a>
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

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">You've lived these moments.</h2>
            <p className="mt-4 text-muted-foreground">Each one is money walking out the door, quietly.</p>
          </Float>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {scenes.map(({ I, time, t, d }) => (
              <StaggerItem key={t}>
                <article className="glass group h-full rounded-2xl p-8 transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="glow-red inline-flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-6"><I className="size-5" /></span>
                    <span className="font-display text-sm font-bold text-primary">{time}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">How much is slipping away?</h2>
            <p className="mt-4 text-muted-foreground">Slide in your real numbers. The answer usually surprises people.</p>
          </Float>
          <Float delay={0.1} className="mt-12"><GrowthAnalyzer /></Float>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Float className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">From leaking to leading, in three moves.</h2>
          </Float>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {path.map(({ I, t, d }, i) => (
              <StaggerItem key={t}>
                <div className="h-full rounded-2xl border border-border bg-card/60 p-8">
                  <div className="flex items-center justify-between">
                    <I className="size-6 text-primary" />
                    <span className="font-display text-5xl font-extrabold text-primary/15">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{t}</h3>
                  <p className="mt-3 text-muted-foreground">{d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-20"><PillarStrip /></div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-8">
        <Float className="glass mx-auto max-w-4xl rounded-3xl p-10 text-center sm:p-16">
          <Compass className="mx-auto size-8 text-primary" />
          <h2 className="mt-6 text-3xl font-bold sm:text-5xl">Tomorrow, someone searches again.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Make sure the first name they see is yours. It starts with a 60-second application.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="shakti" size="xl"><Link to="/apply">Start my 60 seconds <ArrowRight /></Link></Button>
            <Button asChild variant="secondary" size="xl" className="rounded-full"><Link to="/outcomes">See who we've helped</Link></Button>
          </div>
        </Float>
      </section>
    </>
  );
}
