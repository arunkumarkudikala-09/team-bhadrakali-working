import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HealthRing } from "./HealthRing";
import { bottlenecks, conversionRange, diagnose, formatCount, formatInr, trafficSteps, valueSteps, type BottleneckId } from "@/lib/growth-system";

const faultForService = { seo: "invisible-seo", performance: "high-cpa", "web-design": "poor-conversion", content: "content-pipeline" } as const;

function Hint({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger type="button" className="ml-1.5 inline-flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary" aria-label="More info">
        <Info className="size-4" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm">{text}</TooltipContent>
    </Tooltip>
  );
}

export function GrowthAnalyzer() {
  const [trafficIdx, setTrafficIdx] = useState(3);
  const [conversion, setConversion] = useState(1.5);
  const [valueIdx, setValueIdx] = useState(3);
  const [bottleneck, setBottleneck] = useState<BottleneckId>("ux");

  const traffic = trafficSteps[trafficIdx];
  const value = valueSteps[valueIdx];
  const result = diagnose(traffic, conversion, value, bottleneck);

  return (
    <div id="growth-analyzer" className="glass scroll-mt-28 overflow-hidden rounded-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" /><span className="relative inline-flex size-2.5 rounded-full bg-primary" /></span>
          <p className="text-sm font-semibold text-maroon">Growth Architecture Analyzer</p>
        </div>
        <p className="text-xs text-muted-foreground">Live estimate from your inputs</p>
      </div>

      <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <label id="traffic-label" className="flex items-center text-sm font-semibold text-maroon">Your monthly traffic<Hint text="Unique visitors reaching your website or landing pages each month." /></label>
              <span className="font-display text-lg font-bold text-primary">{formatCount(traffic)}</span>
            </div>
            <Slider aria-labelledby="traffic-label" className="mt-4" min={0} max={trafficSteps.length - 1} step={1} value={[trafficIdx]} onValueChange={([v]) => setTrafficIdx(v)} />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label id="conversion-label" className="flex items-center text-sm font-semibold text-maroon">Your conversion rate<Hint text="The share of visitors who become a lead or customer." /></label>
              <span className="font-display text-lg font-bold text-primary">{conversion.toFixed(1)}%</span>
            </div>
            <Slider aria-labelledby="conversion-label" className="mt-4" min={conversionRange.min} max={conversionRange.max} step={conversionRange.step} value={[conversion]} onValueChange={([v]) => setConversion(v)} />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label id="value-label" className="flex items-center text-sm font-semibold text-maroon">Value of one customer<Hint text="Average revenue from one conversion. Used only to estimate hidden revenue." /></label>
              <span className="font-display text-lg font-bold text-primary">{formatInr(value)}</span>
            </div>
            <Slider aria-labelledby="value-label" className="mt-4" min={0} max={valueSteps.length - 1} step={1} value={[valueIdx]} onValueChange={([v]) => setValueIdx(v)} />
          </div>
          <div>
            <p id="bottleneck-label" className="text-sm font-semibold text-maroon">Your primary bottleneck</p>
            <ToggleGroup aria-labelledby="bottleneck-label" type="single" value={bottleneck} onValueChange={(v) => v && setBottleneck(v as BottleneckId)} className="mt-3 grid grid-cols-2 gap-2">
              {bottlenecks.map((b) => (
                <ToggleGroupItem key={b.id} value={b.id} className="h-12 rounded-xl border border-border bg-card/70 text-sm font-semibold text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-maroon data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-[var(--shadow-glow)]">
                  {b.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-blush/50 via-card/60 to-peach/50 p-6 text-center sm:p-8" aria-live="polite">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">System health score</p>
          <HealthRing score={result.score} label={result.label} />
          <AnimatePresence mode="wait">
            <motion.div key={`${result.pillar}-${result.revenue}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Scalability diagnosis</p>
              <p className="mt-2 font-display text-xl font-bold text-maroon">{result.headline}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.detail}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-auto flex w-full flex-col gap-3 pt-8">
            <Button asChild variant="shakti" size="xl" className="w-full whitespace-normal px-6">
              <Link to="/services" hash={result.service.id}>Architect My {result.service.label} <ArrowRight /></Link>
            </Button>
            <Link to="/apply" search={{ fault: faultForService[result.service.id] }} className="text-sm font-semibold text-maroon underline-offset-4 hover:text-primary hover:underline">
              Or run a full system diagnosis →
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Indicative only. Based on the numbers you entered, not an audit.</p>
        </div>
      </div>
    </div>
  );
}
