import { createFileRoute } from "@tanstack/react-router";
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
  { t: "Technical SEO", d: "We rebuild your foundation — site speed, crawlability, schema and search intent — so Google and your buyers find you first.", k: "Foundation" },
  { t: "Performance Marketing", d: "Meta, Google and LinkedIn campaigns engineered around unit economics. Every rupee tracked, every dollar accountable.", k: "Acceleration" },
  { t: "UI/UX Optimization", d: "Traffic is useless without conversion. We redesign funnels and landing pages to turn visitors into qualified leads.", k: "Conversion" },
  { t: "Content Creation", d: "Scroll-stopping video and editorial content that builds authority and compounds reach long after it's posted.", k: "Authority" },
];

function SystemPage() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Float><Eyebrow>The Bhadrakali System</Eyebrow></Float>
        <Float delay={0.1}>
          <h1 className="text-6xl leading-none sm:text-8xl">The Growth <span className="text-primary">Engine.</span></h1>
        </Float>
        <Float delay={0.2}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">Four stages. One compounding system. Each step feeds the next.</p>
        </Float>

        <div className="relative mt-24">
          <div className="timeline-line absolute left-4 top-0 h-full w-px sm:left-1/2" aria-hidden />
          <ol className="space-y-24">
            {steps.map((s, i) => (
              <li key={s.t} className={`relative pl-14 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-16" : "sm:pr-16 sm:text-right"}`}>
                <span className={`absolute left-4 top-2 size-3 -translate-x-1/2 bg-primary ring-8 ring-maroon/40 ${i % 2 ? "sm:left-0" : "sm:left-full"}`} />
                <Float delay={0.05}>
                  <p className="font-display text-7xl text-outline sm:text-8xl">0{i + 1}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">{s.k}</p>
                  <h2 className="mt-2 text-3xl sm:text-4xl">{s.t}</h2>
                  <p className="mt-4 text-muted-foreground">{s.d}</p>
                </Float>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
