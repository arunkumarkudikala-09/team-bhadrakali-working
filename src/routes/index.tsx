import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Float, Eyebrow } from "@/components/site/Float";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Team Bhadrakali — Predictable Growth for Ambitious Brands" },
      {
        name: "description",
        content:
          "Hyderabad-born growth agency fixing broken funnels and wasted ad spend for brands worldwide.",
      },
      { property: "og:title", content: "Team Bhadrakali — Predictable Growth" },
      {
        property: "og:description",
        content: "We fix broken funnels, eliminate wasted ad spend, and make your brand impossible to ignore.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "$2M+", l: "Ad Spend Managed" },
  { v: "300%", l: "Avg ROI" },
  { v: "40+", l: "Brands Scaled Globally" },
];

function Index() {
  return (
    <>
      <section className="flex min-h-screen items-center justify-center px-6 -mt-20">
        <div className="mx-auto max-w-5xl text-center">
          <Float>
            <Eyebrow>Hyderabad · Global</Eyebrow>
          </Float>
          <Float delay={0.1}>
            <h1 className="text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Predictable Growth for <span className="text-primary">Ambitious</span> Brands.
            </h1>
          </Float>
          <Float delay={0.25}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              We fix broken funnels, eliminate wasted ad spend, and make your brand impossible to
              ignore.
            </p>
          </Float>
          <Float delay={0.4} className="mt-12">
            <Button asChild variant="shakti" size="xl">
              <Link to="/apply">Scale Your Brand</Link>
            </Button>
          </Float>
        </div>
      </section>

      <section className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Float>
            <Eyebrow>The Reality</Eyebrow>
          </Float>
          <Float delay={0.1}>
            <h2 className="text-6xl uppercase leading-[0.85] sm:text-8xl lg:text-[11rem]">
              Invisible
              <br />
              <span className="text-outline">Online</span> is a
              <br />
              <span className="text-primary">Death Sentence.</span>
            </h2>
          </Float>
          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {[
              "Your customers are searching. They're finding your competitors.",
              "Every rupee and dollar spent on unoptimized ads is burned, not invested.",
              "A beautiful website that doesn't convert is just an expensive brochure.",
            ].map((t, i) => (
              <Float key={t} delay={0.1 * i}>
                <p className="border-l-2 border-maroon pl-6 text-lg text-muted-foreground">{t}</p>
              </Float>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {stats.map((s, i) => (
            <Float
              key={s.l}
              delay={0.1 * i}
              className="border-border px-6 py-16 text-center md:border-r md:last:border-r-0"
            >
              <p className="font-display text-6xl text-primary sm:text-7xl">{s.v}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em]">{s.l}</p>
            </Float>
          ))}
        </div>
      </section>

      <section className="px-6 py-32 text-center">
        <Float>
          <h2 className="mx-auto max-w-3xl text-4xl sm:text-6xl">Ready to become impossible to ignore?</h2>
        </Float>
        <Float delay={0.2} className="mt-10">
          <Button asChild variant="shakti" size="xl">
            <Link to="/apply">Apply For A Partnership</Link>
          </Button>
        </Float>
      </section>
    </>
  );
}
