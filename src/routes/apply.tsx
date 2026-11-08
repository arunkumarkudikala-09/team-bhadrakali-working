import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Float, Eyebrow } from "@/components/site/Float";
import { agencyHead, budgetOptions, isValidBudget } from "@/lib/agency";

export const Route = createFileRoute("/apply")({
  head: () => agencyHead("/apply", "Apply For A Growth Partnership — Team Bhadrakali", "Tell us your company website, monthly marketing budget and primary growth goal to explore a growth partnership with Team Bhadrakali."),
  component: ApplyPage,
});

const field = "h-12 rounded-xl bg-card/80 text-base";

function ApplyPage() {
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidBudget(budget)) {
      toast.error("Please select your monthly marketing budget.");
      return;
    }
    setSent(true);
    toast.info("Your details are ready. Application delivery is not connected yet.");
  }

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Float><Eyebrow>Team Bhadrakali · Growth partnerships</Eyebrow></Float>
        <Float delay={0.1}><h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">Apply For A <span className="text-gradient">Growth Partnership.</span></h1></Float>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Float delay={0.2}>
            <form onSubmit={onSubmit} className="glass space-y-6 rounded-3xl p-8 sm:p-10">
              {[
                { id: "name", l: "Full Name", t: "text", p: "Your full name" },
                { id: "website", l: "Company Website", t: "url", p: "https://" },
              ].map((f) => (
                <div key={f.id} className="space-y-2">
                  <Label htmlFor={f.id} className="text-sm font-semibold text-maroon">{f.l}</Label>
                  <Input id={f.id} name={f.id} type={f.t} placeholder={f.p} required maxLength={200} className={field} />
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-semibold text-maroon">Monthly Marketing Budget</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger id="budget" className={field}><SelectValue placeholder="Select a range" /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {budgetOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-semibold text-maroon">Primary Growth Goal</Label>
                <Textarea id="goal" name="goal" required maxLength={1000} rows={4} placeholder="More qualified leads, higher ROAS, global expansion…" className="rounded-xl bg-card/80 text-base" />
              </div>
              <Button type="submit" variant="shakti" size="xl" className="w-full sm:w-auto">Apply For Partnership</Button>
              {sent && <p role="status" className="text-sm text-muted-foreground">Your details have not been sent. Application delivery is not connected yet.</p>}
            </form>
          </Float>

          <Float delay={0.3}>
            <div className="flex min-h-[560px] flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-blush/60 via-card/60 to-peach/60 p-10 backdrop-blur-xl text-center">
              <CalendarDays className="size-14 text-primary" strokeWidth={1.25} />
              <h2 className="font-display text-2xl font-bold text-maroon">Strategy Call Calendar Booking (Calendly Integration)</h2>
              <p className="max-w-xs text-sm text-muted-foreground">Booking is not available yet.</p>
            </div>
          </Float>
        </div>
      </div>
    </section>
  );
}
