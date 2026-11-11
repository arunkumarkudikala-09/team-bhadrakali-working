import { ShieldCheck, TrendingUp, Wrench } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/site/Float";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { pillars } from "@/lib/growth-system";

const icons = { Reliability: ShieldCheck, Scalability: TrendingUp, Maintainability: Wrench };

export function PillarStrip() {
  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {pillars.map((p, i) => {
        const Icon = icons[p.name];
        return (
          <StaggerItem key={p.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <article tabIndex={0} className="glass group h-full cursor-default rounded-2xl p-8 text-left outline-none transition-all duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="flex items-center justify-between">
                    <span className="glow-red inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:-rotate-6"><Icon aria-hidden="true" /></span>
                    <span className="font-display text-sm font-bold text-primary/50">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{p.short}</h3>
                  <p className="mt-3 text-muted-foreground">{p.text}</p>
                </article>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs text-sm">{p.tip}</TooltipContent>
            </Tooltip>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
