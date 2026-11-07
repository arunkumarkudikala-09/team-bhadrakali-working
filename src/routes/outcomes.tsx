import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Float, Eyebrow } from "@/components/site/Float";

export const Route = createFileRoute("/outcomes")({
  head: () => ({
    meta: [
      { title: "Outcomes & Data Room — Team Bhadrakali" },
      { name: "description", content: "Metric-based case studies: ROI, revenue growth and cost reductions we've delivered." },
      { property: "og:title", content: "The Data Room — Team Bhadrakali" },
      { property: "og:description", content: "Real growth, measured in numbers." },
    ],
  }),
  component: OutcomesPage,
});

const colors = ["bg-peach", "bg-coral", "bg-primary", "bg-maroon"];

const cases = [
  { tag: "SaaS · Global", title: "Scaled a SaaS brand by 300% in 6 months", roi: "+300%", bars: [{ l: "MRR growth", v: 100 }, { l: "Organic traffic", v: 78 }, { l: "Trial → paid", v: 54 }], series: [18, 24, 30, 42, 61, 100] },
  { tag: "Real Estate · Hyderabad", title: "Cut cost-per-lead by 62% for a luxury developer", roi: "−62%", bars: [{ l: "Qualified leads", v: 88 }, { l: "Site visits", v: 70 }, { l: "Wasted spend", v: 18 }], series: [100, 84, 70, 55, 46, 38] },
  { tag: "D2C · India + UAE", title: "5.4x ROAS on performance campaigns", roi: "5.4x", bars: [{ l: "Revenue", v: 92 }, { l: "Repeat buyers", v: 64 }, { l: "Checkout CVR", v: 47 }], series: [22, 35, 41, 58, 74, 92] },
];

function OutcomesPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Float><Eyebrow>Outcomes & Data</Eyebrow></Float>
          <Float delay={0.1}><h1 className="text-5xl font-extrabold sm:text-7xl">The <span className="text-gradient">Data Room.</span></h1></Float>
          <Float delay={0.2}><p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">The numbers our partners report to their boards.</p></Float>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {cases.map((c, ci) => (
            <Float key={c.title} delay={0.12 * ci}>
              <article className="flex h-full flex-col rounded-2xl bg-card p-8 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{c.tag}</p>
                <p className="text-gradient mt-4 font-display text-6xl font-extrabold">{c.roi}</p>
                <h2 className="mt-3 text-lg font-bold">{c.title}</h2>
                <div className="mt-8 flex h-32 items-end gap-2">
                  {c.series.map((h, i) => (
                    <motion.div key={i} className={`flex-1 rounded-t-lg ${colors[Math.min(3, Math.floor(i / 1.5))]}`} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 70, damping: 12, delay: 0.08 * i }} />
                  ))}
                </div>
                <div className="mt-8 space-y-4">
                  {c.bars.map((b, i) => (
                    <div key={b.l}>
                      <div className="mb-1.5 flex justify-between text-sm"><span className="font-medium">{b.l}</span><span className="text-muted-foreground">{b.v}%</span></div>
                      <div className="h-2 rounded-full bg-muted">
                        <motion.div className="bg-pipeline h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: `${b.v}%` }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.15 * i }} />
                      </div>
                    </div>
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
