import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Megaphone, MousePointerClick, Clapperboard } from "lucide-react";
import { Float, Eyebrow } from "@/components/site/Float";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "The Bhadrakali System — The Growth Engine" },
      { name: "description", content: "Our 4-stage growth engine: Technical SEO, Performance Marketing, UI/UX and Content." },
      { property: "og:title", content: "The Bhadrakali System" },
      { property: "og:description", content: "A 4-stage engine that turns attention into predictable revenue." },
    ],
  }),
  component: SystemPage,
});

const steps = [
  { I: Search, c: "bg-peach text-maroon", t: "Technical SEO", d: "Site speed, crawlability, schema and search intent — so Google and buyers find you first." },
  { I: Megaphone, c: "bg-coral text-primary-foreground", t: "Performance Marketing", d: "Meta, Google & LinkedIn campaigns built around unit economics. Every rupee accountable." },
  { I: MousePointerClick, c: "bg-primary text-primary-foreground", t: "UI/UX Optimization", d: "Funnels and landing pages redesigned to turn visitors into qualified leads." },
  { I: Clapperboard, c: "bg-maroon text-primary-foreground", t: "Content Creation", d: "Scroll-stopping video and stories that build authority and compound reach." },
];

function SystemPage() {
  const [active, setActive] = useState(0);
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Float><Eyebrow>The Bhadrakali System</Eyebrow></Float>
          <Float delay={0.1}><h1 className="text-5xl font-extrabold sm:text-7xl">The <span className="text-gradient">Growth Engine.</span></h1></Float>
          <Float delay={0.2}><p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Four stages. One compounding pipeline. Each step feeds the next.</p></Float>
        </div>

        <div className="relative mt-20">
          <div className="bg-pipeline absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 rounded-full opacity-40 lg:block" aria-hidden />
          <div className="grid gap-6 lg:grid-cols-4 lg:gap-0">
            {steps.map(({ I, c, t, d }, i) => (
              <Float key={t} delay={0.12 * i} className={`lg:-mx-2 ${i % 2 ? "lg:mt-24" : ""}`}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`glass relative w-full rounded-2xl p-7 text-left transition-all duration-500 ${active === i ? "z-10 -translate-y-2 scale-[1.04]" : "opacity-90"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex size-12 items-center justify-center rounded-xl ${c}`}><I /></div>
                    <span className="font-display text-4xl font-extrabold text-border">0{i + 1}</span>
                  </div>
                  <h2 className="mt-6 text-xl font-bold">{t}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{d}</p>
                </button>
              </Float>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
