import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/TEAM_BHADRAKALI_Logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 bg-card shadow-soft">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logoAsset.url}
            alt="Team Bhadrakali"
            className="h-14 w-auto"
            width={862}
            height={469}
          />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Reliable, scalable, maintainable growth systems for your brand — from Hyderabad to the world.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-4 text-sm font-semibold text-foreground">Remote by design</p>
          <p>Serving Hyderabad & brands worldwide.</p>
          <p className="mt-2">Online delivery. Connected growth.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p className="mb-2 text-sm font-semibold text-foreground">Global</p>
          <Link to="/about" className="hover:text-primary">About & how we work</Link>
          <Link to="/services" className="hover:text-primary">Explore our services</Link>
          <Link to="/apply" className="font-medium text-primary">Diagnose your growth system →</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 border-t border-border px-6 py-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Team Bhadrakali. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
