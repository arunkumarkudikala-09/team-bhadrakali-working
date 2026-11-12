import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import type { HealthTier } from "@/lib/growth-system";

const R = 70;
const C = 2 * Math.PI * R;

export function HealthRing({ score, label, tier }: { score: number; label: string; tier: HealthTier }) {
  const tone = `var(--health-${tier})`;
  const reducedMotion = useReducedMotion();
  const value = useMotionValue(0);
  const dash = useTransform(value, (v) => C - (v / 100) * C);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const controls = animate(value, score, reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 16 });
    const unsub = value.on("change", (v) => setShown(Math.round(v)));
    return () => { controls.stop(); unsub(); };
  }, [score, reducedMotion, value]);

  return (
    <div className="relative size-44" role="img" aria-label={`System health score ${score} out of 100, ${label}`}>
      <svg viewBox="0 0 160 160" className="size-full -rotate-90">
        <circle cx="80" cy="80" r={R} fill="none" stroke="var(--muted)" strokeWidth="12" />
        <motion.circle cx="80" cy="80" r={R} fill="none" stroke={tone} strokeWidth="12" strokeLinecap="round" strokeDasharray={C} style={{ strokeDashoffset: dash, transition: "stroke 0.4s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <span className="font-display text-5xl font-extrabold text-maroon">{shown}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: tone }}>{label}</span>
      </div>
    </div>
  );
}
