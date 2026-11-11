import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Layers, Zap, Send, ArrowRight } from "lucide-react";
import { Float, Eyebrow, Stagger, StaggerItem } from "@/components/site/Float";
import { Button } from "@/components/ui/button";
import { agencyHead } from "@/lib/agency";

export const Route = createFileRoute("/about")({
  head: () => agencyHead("/about", "About & How We Work — Team Bhadrakali", "A systems-driven remote growth agency. From forensic audits and conversion architecture to high-velocity execution and asynchronous client delivery."),
  component: AboutPage,
});

const steps = [
  { icon: Search, title: "Forensic Audit & Strategy", text: "We examine your acquisition data, search visibility and funnel friction to find exactly what is blocking your growth.", deliverable: "Audit findings & growth priorities" },
  { icon: Layers, title: "Conversion Architecture", text: "We architect the landing pages, tracking foundations, content and conversion paths your system needs to stay reliable.", deliverable: "Conversion-ready digital assets" },
  { icon: Zap, title: "High-Velocity Execution", text: "We deploy your ads and SEO, measure what converts and scale what works without breaking ROI.", deliverable: "Campaign launches & optimization sprints" },
  { icon: Send, title: "Asynchronous Delivery", text: "You receive weekly sprint deliverables, data dashboards and ROI reports directly through our digital portal.", deliverable: "Weekly deliverables, dashboards & ROI reports" },
];

function AboutPage() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Float className="mx-auto max-w-4xl text-center">
          <Eyebrow>About us & how we work</Eyebrow>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">A Systems-Driven <span className="text-gradient">Growth Engine.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">You need a partner who treats your growth like critical infrastructure. Here is the connected process that takes your brand from diagnosis to delivery.</p>
        </Float>
        <Stagger className="relative mt-16 grid gap-6 lg:grid-cols-4">
          <div className="bg-pipeline absolute inset-x-8 top-12 hidden h-px lg:block" aria-hidden="true" />
          {steps.map(({ icon: Icon, title, text, deliverable }, index) => (
            <StaggerItem key={title}>
              <article className="glass group relative flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="glow-red flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-6"><Icon aria-hidden="true" /></span>
                  <span className="font-display text-3xl font-bold text-primary/40">0{index + 1}</span>
                </div>
                <h2 className="mt-8 text-xl font-bold">{title}</h2>
                <p className="mb-8 mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <div className="mt-auto border-t border-border pt-5">
                  <h3 className="text-xs font-semibold text-primary">DELIVERABLE</h3>
                  <p className="mt-2 text-sm font-medium">{deliverable}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Float className="mt-12 text-center"><Button asChild variant="shakti" size="xl"><Link to="/apply">Get My Free Growth Audit <ArrowRight /></Link></Button></Float>
      </div>
    </section>
  );
}