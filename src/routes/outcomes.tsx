import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Float, Eyebrow } from "@/components/site/Float";
import { agencyHead, campaigns } from "@/lib/agency";

export const Route = createFileRoute("/outcomes")({
  head: () => agencyHead("/outcomes", "Audited Client Campaigns & ROI — Team Bhadrakali", "Commercial outcomes across SaaS SEO, e-commerce performance marketing and local search: lead volume, cost per lead, blended ROAS and direct inquiries."),
  component: OutcomesPage,
});

function OutcomesPage() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Float className="mx-auto max-w-4xl text-center">
          <Eyebrow>Commercial outcomes · Data room</Eyebrow>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">Audited Client <span className="text-gradient">Campaigns & ROI.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Your growth should be measured in revenue, not vanity metrics. Here is what reliable, scalable systems delivered for brands like yours.</p>
        </Float>
        <div className="mt-16 space-y-8">
          {campaigns.map((campaign, index) => (
            <Float key={campaign.id} delay={index * 0.08}>
              <article className="glass grid gap-8 rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-9 lg:grid-cols-2 lg:gap-12">
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">{campaign.id} / {campaign.sector} · {campaign.discipline}</p>
                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{campaign.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{campaign.summary}</p>
                  <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div><dt className="text-sm text-muted-foreground">{campaign.metricLabel}</dt><dd className="mt-2 font-display text-4xl font-extrabold text-primary">{campaign.metric}</dd></div>
                    <div><dt className="text-sm text-muted-foreground">{campaign.secondaryLabel}</dt><dd className="mt-2 font-display text-4xl font-extrabold text-maroon">{campaign.secondary}</dd></div>
                  </dl>
                  <p className="mt-6 text-xs text-muted-foreground">{campaign.detail} / {campaign.period}</p>
                </div>
                <figure className="flex flex-col justify-center border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <h3 className="text-sm font-semibold">{campaign.chartTitle}</h3>
                  <div className="mt-7 space-y-6" role="img" aria-label={`${campaign.chartTitle}: ${campaign.beforeLabel}; ${campaign.afterLabel}`}>
                    <div><p className="mb-2 text-sm text-muted-foreground">{campaign.beforeLabel}</p><div className="h-10 bg-muted"><motion.div className="h-full origin-left bg-peach" style={{ width: `${campaign.before / campaign.after * 100}%` }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 60, damping: 18 }} /></div></div>
                    <div><p className="mb-2 text-sm font-semibold text-maroon">{campaign.afterLabel}</p><motion.div className="bg-pipeline h-10 w-full origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 50, damping: 16, delay: 0.25 }} /></div>
                  </div>
                  <figcaption className="mt-6 text-xs leading-relaxed text-muted-foreground">{campaign.id === "02" ? "ROAS comparison: advertising spend versus attributed revenue." : "Normalized comparison derived from the reported change; not raw campaign counts."}</figcaption>
                </figure>
              </article>
            </Float>
          ))}
        </div>
      </div>
    </section>
  );
}
