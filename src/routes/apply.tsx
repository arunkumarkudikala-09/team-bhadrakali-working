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

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply For A Partnership — Team Bhadrakali" },
      { name: "description", content: "Apply to work with Team Bhadrakali. We partner with a limited number of brands each quarter." },
      { property: "og:title", content: "Apply For A Partnership" },
      { property: "og:description", content: "Pre-qualify and book a strategy call with Team Bhadrakali." },
    ],
  }),
  component: ApplyPage,
});

const field = "h-12 rounded-xl bg-card/80 text-base";

function ApplyPage() {
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!budget) {
      toast.error("Please select your monthly marketing budget.");
      return;
    }
    setSent(true);
    toast.success("Application received. We'll be in touch within 48 hours.");
    e.currentTarget.reset();
  }

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Float><Eyebrow>Lead Capture Terminal</Eyebrow></Float>
        <Float delay={0.1}><h1 className="max-w-4xl text-5xl font-extrabold sm:text-7xl">Apply For A <span className="text-gradient">Partnership.</span></h1></Float>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Float delay={0.2}>
            <form onSubmit={onSubmit} className="glass space-y-6 rounded-3xl p-8 sm:p-10">
              {[
                { id: "name", l: "Name", t: "text" },
                { id: "company", l: "Company", t: "text" },
                { id: "website", l: "Website", t: "url", p: "https://" },
              ].map((f) => (
                <div key={f.id} className="space-y-2">
                  <Label htmlFor={f.id} className="text-sm font-semibold text-maroon">{f.l}</Label>
                  <Input id={f.id} name={f.id} type={f.t} placeholder={f.p} required maxLength={200} className={field} />
                </div>
              ))}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-maroon">Monthly Marketing Budget</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className={field}><SelectValue placeholder="Select a range" /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="lt1k">&lt;$1k</SelectItem>
                    <SelectItem value="1k-5k">$1k–$5k</SelectItem>
                    <SelectItem value="5k+">$5k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-semibold text-maroon">Main Goal</Label>
                <Textarea id="goal" name="goal" required maxLength={1000} rows={4} placeholder="More qualified leads, higher ROAS, global expansion…" className="rounded-xl bg-card/80 text-base" />
              </div>
              <Button type="submit" variant="shakti" size="xl" className="w-full sm:w-auto">Submit Application</Button>
              {sent && <p className="text-sm text-muted-foreground">Thank you — your application is in our queue.</p>}
            </form>
          </Float>

          <Float delay={0.3}>
            <div className="flex min-h-[560px] flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-blush/60 via-card/60 to-peach/60 p-10 backdrop-blur-xl text-center">
              <CalendarDays className="size-14 text-primary" strokeWidth={1.25} />
              <p className="font-display text-2xl font-bold text-maroon">Calendar Booking Integration (Calendly)</p>
              <p className="max-w-xs text-sm text-muted-foreground">Your strategy-call scheduler will appear here.</p>
            </div>
          </Float>
        </div>
      </div>
    </section>
  );
}
