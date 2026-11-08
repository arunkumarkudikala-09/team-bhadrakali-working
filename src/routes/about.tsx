import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Layers, Zap, Send, ArrowRight } from "lucide-react";
import { Float, Eyebrow } from "@/components/site/Float";
import { Button } from "@/components/ui/button";
import { agencyHead } from "@/lib/agency";

export const Route = createFileRoute("/about")({
  head: () => agencyHead("/about", "About & How We Work — Team Bhadrakali", "A systems-driven remote growth agency. From forensic audits and conversion architecture to high-velocity execution and asynchronous client delivery."),
  component: AboutPage,
});

const steps = [
  { icon: Search, title: "Forensic Audit & Strategy", text: "We examine acquisition data, search visibility and funnel friction to identify what is blocking growth.", deliverable: "Audit findings & growth priorities" },
  { icon: Layers, title: "Conversion Architecture", text: "We build the landing pages, tracking foundations, content and conversion paths your strategy needs.", deliverable: "Conversion-ready digital assets" },
  { icon: Zap, title: "High-Velocity Execution", text: "We deploy ads and SEO, measure what converts and refine campaigns around commercial performance.", deliverable: "Campaign launches & optimization sprints" },
  { icon: Send, title: "Asynchronous Delivery", text: "Weekly sprint deliverables, data dashboards and ROI reports reach you directly through our digital portal.", deliverable: "Weekly deliverables, dashboards & ROI reports" },
];

function AboutPage() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Float className="mx-auto max-w-4xl text-center">
          <Eyebrow>About us & how we work</Eyebrow>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">A Systems-Driven <span className="text-gradient">Growth Engine.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Remote infrastructure. Clear accountability. A connected process that takes your brand from diagnosis to delivery.</p>
        </Float>
        <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
          <div className="bg-pipeline absolute inset-x-8 top-12 hidden h-px lg:block" aria-hidden="true" />
          {steps.map(({ icon: Icon, title, text, deliverable }, index) => (
            <Float key={title} delay={index * 0.1}>
              <article className="glass relative flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon aria-hidden="true" /></span>
                  <span className="font-display text-3xl font-bold text-primary/40">0{index + 1}</span>
                </div>
                <h2 className="mt-8 text-xl font-bold">{title}</h2>
                <p className="mb-8 mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <div className="mt-auto border-t border-border pt-5">
                  <h3 className="text-xs font-semibold text-primary">DELIVERABLE</h3>
                  <p className="mt-2 text-sm font-medium">{deliverable}</p>
                </div>
              </article>
            </Float>
          ))}
        </div>
        <Float className="mt-12 text-center"><Button asChild variant="shakti" size="xl"><Link to="/apply">Get My Free Growth Audit <ArrowRight /></Link></Button></Float>
      </div>
    </section>
  );
}