import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function Ambient() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const slow = useTransform(scrollY, [0, 2000], reducedMotion ? [0, 0] : [0, -160]);
  const fast = useTransform(scrollY, [0, 2000], reducedMotion ? [0, 0] : [0, 220]);
  return (
    <div aria-hidden="true" className="ambient-mesh pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y: slow }} className="orb animate-drift -left-24 top-24 size-96 bg-peach/40" />
      <motion.div style={{ y: fast }} className="orb animate-drift-slow -right-32 top-1/3 size-[28rem] bg-blush/50" />
    </div>
  );
}
