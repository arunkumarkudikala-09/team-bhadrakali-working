import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "How We Work" },
  { to: "/services", label: "Services" },
  { to: "/outcomes", label: "Outcomes" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="glass mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full pl-5 pr-2">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <BrandLogo className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-maroon"
              activeProps={{ className: "!bg-accent !text-maroon" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/apply"
            className="glow-red ml-2 rounded-full bg-primary px-5 py-3 text-sm transition-transform hover:-translate-y-0.5 font-semibold text-primary-foreground transition-colors hover:bg-secondary"
          >
            Solution Architecture
          </Link>
          <ThemeToggle className="ml-1" />
        </nav>
        <div className="flex items-center md:hidden">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="mr-3 size-11" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
        </div>
      </div>
      {open && (
        <nav className="glass mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-4 md:hidden">
          {[...links, { to: "/apply", label: "Solution Architecture" } as const].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-accent text-primary" }}
              className="rounded-xl px-4 py-3 font-medium text-maroon"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
