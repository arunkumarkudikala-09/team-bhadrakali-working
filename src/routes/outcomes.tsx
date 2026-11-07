import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Float, Eyebrow } from "@/components/site/Float";

export const Route = createFileRoute("/outcomes")({
  head: () => ({
    meta: [
      { title: "Outcomes & Data Room — Team Bhadrakali" },
      { name: "description", content: "Metric-based case studies: ROI, revenue growth and cost reductions we've delivered." },
      { property: "og:title", content: "The Data Room — Team Bhadrakali" },
      { property: "og:description", content: "No pretty pictures. Just numbers." },
    ],
  }),
  component: OutcomesPage,
});

const cases = [
  {
    tag: "SaaS · Global", title: "Scaled SaaS Brand by 300% in 6 Months", roi: "+300%",
    bars: [{ l: "MRR growth", v: 100 }, { l: "Organic traffic", v: 78 }, { l: "Trial→paid", v: 54 }],
    series: [18, 24, 30, 42, 61, 100],
  },
  {
    tag: "Real Estate · Hyderabad", title: "Cut Cost-Per-Lead by 62% for a Luxury Developer", roi: "-62% CPL",
    bars: [{ l: "Qualified leads", v: 88 }, { l: "Site visits", v: 70 }, { l: "Ad spend waste", v: 18 }],
    series: [100, 84, 70, 55, 46, 38],
  },
  {
    tag: "D2C · India + UAE", title: "5.4x ROAS on Performance Campaigns", roi: "5.4x ROAS",
    bars: [{ l: "Revenue", v: 92 }, { l: "Repeat customers", v: 64 }, { l: "Checkout CVR", v: 47 }],
    series: [22, 35, 41, 58, 74, 92],
  },
];

function Bar({ v, delay }: { v: number; delay: number }) {
  return (
    <div className="h-1.5 w-full bg-muted">
      <motion.div className="h-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }} />
    </div>
  );
}

function OutcomesPage() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Float><Eyebrow>Outcomes & Data</Eyebrow></Float>
        <Float delay={0.1}><h1 className="text-6xl leading-none sm:text-8xl">The Data <span className="text-primary">Room.</span></h1></Float>
        <Float delay={0.2}><p className="mt-8 max-w-xl text-lg text-muted-foreground">No mood boards. No vanity screenshots. Just the numbers our partners report to their boards.</p></Float>

        <div className="mt-20 space-y-px bg-border">
          {cases.map((c, ci) => (
            <Float key={c.title} delay={0.05}>
              <article className="grid gap-12 bg-background py-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Case 0{ci + 1} · {c.tag}</p>
                  <h2 className="mt-4 text-3xl sm:text-4xl">{c.title}</h2>
                  <p className="mt-8 font-display text-6xl text-primary sm:text-7xl">{c.roi}</p>
                </div>
                <div className="space-y-6 lg:col-span-4">
                  {c.bars.map((b, i) => (
                    <div key={b.l}>
                      <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.2em]"><span>{b.l}</span><span className="text-muted-foreground">{b.v}%</span></div>
                      <Bar v={b.v} delay={0.15 * i} />
                    </div>
                  ))}
                </div>
                <div className="flex h-48 items-end gap-2 border-b border-l border-border p-2 lg:col-span-3">
                  {c.series.map((h, i) => (
                    <motion.div key={i} className={`flex-1 ${i === c.series.length - 1 ? "bg-primary" : "bg-maroon"}`} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 * i }} />
                  ))}
                </div>
              </article>
            </Float>
          ))}
        </div>
      </div>
    </section>
  );
}
