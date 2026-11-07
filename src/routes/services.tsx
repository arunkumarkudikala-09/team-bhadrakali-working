import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Target, PenTool, Flame, ArrowUpRight } from "lucide-react";
import { Float, Eyebrow } from "@/components/site/Float";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Team Bhadrakali" },
      { name: "description", content: "Local & Global SEO, Performance Marketing, UI/UX Design and Viral Content Creation." },
      { property: "og:title", content: "Engineering Market Dominance — Services" },
      { property: "og:description", content: "SEO, paid media, UI/UX and viral content built to dominate your market." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { t: "Local & Global SEO", d: "Own the map pack in Hyderabad and page one worldwide.", I: Search },
  { t: "Performance Marketing", d: "ROI-obsessed paid media across Meta, Google & LinkedIn.", I: Target },
  { t: "UI/UX Design", d: "Conversion-first interfaces that feel premium and sell.", I: PenTool },
  { t: "Viral Content Creation", d: "Short-form video and stories engineered to spread.", I: Flame },
];

function ServicesPage() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Float><Eyebrow>Services</Eyebrow></Float>
        <Float delay={0.1}>
          <h1 className="max-w-5xl text-5xl leading-none sm:text-8xl">Engineering Market <span className="text-primary">Dominance.</span></h1>
        </Float>
        <ul className="mt-24 border-t border-border">
          {services.map(({ t, d, I }, i) => (
            <Float key={t} delay={0.08 * i}>
              <li>
                <Link to="/apply" className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-border py-10 sm:py-14">
                  <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-maroon/40 transition-transform duration-700 ease-out group-hover:scale-x-100" />
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground">0{i + 1}</span>
                    <div>
                      <h2 className="text-3xl uppercase transition-colors group-hover:text-primary sm:text-6xl lg:text-7xl">{t}</h2>
                      <p className="mt-3 max-h-0 overflow-hidden text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">{d}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <I className="size-10 -translate-y-4 text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:!size-16" strokeWidth={1.25} />
                    <ArrowUpRight className="size-8 transition-transform group-hover:rotate-45" />
                  </div>
                </Link>
              </li>
            </Float>
          ))}
        </ul>
      </div>
    </section>
  );
}
