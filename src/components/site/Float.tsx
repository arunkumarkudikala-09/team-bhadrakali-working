import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Float({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 110, damping: 14, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="glass mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  );
}
