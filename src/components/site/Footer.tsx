import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 bg-card shadow-soft">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-bold text-maroon">
            Team <span className="text-primary">Bhadrakali</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A growth engine for ambitious brands — from Hyderabad to the world.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-4 text-sm font-semibold text-foreground">Hyderabad HQ</p>
          <p>Plot No. 00, Jubilee Hills</p>
          <p>Hyderabad, Telangana 500033</p>
          <p>India</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p className="mb-2 text-sm font-semibold text-foreground">Global</p>
          <a href="mailto:hello@teambhadrakali.com" className="hover:text-primary">hello@teambhadrakali.com</a>
          <a href="tel:+910000000000" className="hover:text-primary">+91 00000 00000</a>
          <Link to="/apply" className="font-medium text-primary">Apply for a partnership →</Link>
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
