import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/system", label: "The System" },
  { to: "/services", label: "Services" },
  { to: "/outcomes", label: "Outcomes" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {logoOk && (
            <img
              src="/TEAM_BHADRAKALI_Logo.png"
              alt="Team Bhadrakali logo"
              className="h-9 w-auto"
              onError={() => setLogoOk(false)}
            />
          )}
          <span className="font-display text-sm tracking-[0.2em]">
            TEAM <span className="text-primary">BHADRAKALI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/apply"
            className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-maroon"
          >
            Apply Now
          </Link>
        </nav>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-6 border-t border-border px-6 py-8 md:hidden">
          {[...links, { to: "/apply", label: "Apply Now" } as const].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
              className="font-display text-2xl uppercase"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
