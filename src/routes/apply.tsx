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

const field = "h-12 rounded-none border-0 border-b border-input bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:border-primary";

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
        <Float delay={0.1}><h1 className="max-w-4xl text-5xl leading-none sm:text-7xl">Apply For A <span className="text-primary">Partnership.</span></h1></Float>

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <Float delay={0.2}>
            <form onSubmit={onSubmit} className="space-y-10">
              {[
                { id: "name", l: "Name", t: "text" },
                { id: "company", l: "Company", t: "text" },
                { id: "website", l: "Website", t: "url", p: "https://" },
              ].map((f) => (
                <div key={f.id} className="space-y-2">
                  <Label htmlFor={f.id} className="text-xs font-bold uppercase tracking-[0.25em]">{f.l}</Label>
                  <Input id={f.id} name={f.id} type={f.t} placeholder={f.p} required maxLength={200} className={field} />
                </div>
              ))}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-[0.25em]">Monthly Marketing Budget</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className={field}><SelectValue placeholder="Select a range" /></SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="lt1k">&lt;$1k</SelectItem>
                    <SelectItem value="1k-5k">$1k–$5k</SelectItem>
                    <SelectItem value="5k+">$5k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bottleneck" className="text-xs font-bold uppercase tracking-[0.25em]">Biggest Bottleneck</Label>
                <Textarea id="bottleneck" name="bottleneck" required maxLength={1000} rows={4} placeholder="Leads, conversions, visibility…" className="rounded-none border-0 border-b border-input bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:border-primary" />
              </div>
              <Button type="submit" variant="shakti" size="xl" className="w-full sm:w-auto">Submit Application</Button>
              {sent && <p className="text-sm text-muted-foreground">Thank you — your application is in our queue.</p>}
            </form>
          </Float>

          <Float delay={0.3}>
            <div className="flex min-h-[560px] flex-col items-center justify-center gap-6 border border-dashed border-maroon bg-card p-10 text-center">
              <CalendarDays className="size-14 text-primary" strokeWidth={1.25} />
              <p className="font-display text-2xl">Calendar Booking Integration (Calendly)</p>
              <p className="max-w-xs text-sm text-muted-foreground">Your strategy-call scheduler will appear here.</p>
            </div>
          </Float>
        </div>
      </div>
    </section>
  );
}
