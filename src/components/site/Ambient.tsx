export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="orb animate-drift -left-[10vw] -top-[10vh] size-[45vw] bg-peach/70" />
      <div className="orb animate-drift-slow right-[-12vw] top-[15vh] size-[40vw] bg-primary/25" />
      <div className="orb animate-drift bottom-[-15vh] left-[20vw] size-[38vw] bg-coral/35" />
      <div className="orb animate-drift-slow bottom-[10vh] right-[10vw] size-[25vw] bg-maroon/15" />
    </div>
  );
}
