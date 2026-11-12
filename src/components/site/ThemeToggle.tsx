import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Inline head script: applies the saved theme before first paint so there is no flash. Light is the default. */
export const themeInitScript = `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable: theme still switches for this visit */
    }
  }
  return (
    <Button type="button" variant="ghost" size="icon" className={`size-11 rounded-full text-maroon hover:bg-accent ${className ?? ""}`} aria-label="Switch between light and dark theme" onClick={toggle}>
      <Moon className="dark:hidden" aria-hidden="true" />
      <Sun className="hidden dark:block" aria-hidden="true" />
    </Button>
  );
}
