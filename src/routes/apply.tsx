import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CircleCheck, Loader2, Lock, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Float } from "@/components/site/Float";
import { agencyHead, budgetOptions, calendlyUrl, isCalendlyUrl, isValidBudget } from "@/lib/agency";
import { submitApplication } from "@/lib/applications.functions";
import { applicationSchema, countryCodes, roleOptions } from "@/lib/applications";
import { Checkbox } from "@/components/ui/checkbox";
import { isFault, solutionsFor, systemFaults, timelineOptions, type FaultId } from "@/lib/growth-system";

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>): { fault?: FaultId } => (isFault(search["fault"]) ? { fault: search["fault"] } : {}),
  head: () => agencyHead("/apply", "Solution Architecture — Diagnose Your Growth System | Team Bhadrakali", "Tell us what system fault you need solved. Get a live solution matrix for your brand and book a System Architecture Strategy Call with Team Bhadrakali."),
  component: ApplyPage,
});

const field = "h-12 rounded-xl bg-card/80 text-base";
const steps = ["About You", "System Status", "Goals & Timeline"] as const;
const stepIntro = [
  { title: "Tell us a bit about you", sub: "60 seconds. Then we build your growth map." },
  { title: "Where's your system leaking?", sub: "Pick the one thing that hurts most right now." },
  { title: "Last step — your finish line", sub: "Tell us what winning looks like for you." },
] as const;
const youGet = [
  { n: "01", t: "A personal growth map", d: "Your exact leaks, ranked by the money they cost you." },
  { n: "02", t: "A 30-minute strategy call", d: "With the people who'd run your account — no sales script." },
  { n: "03", t: "Your first 3 fixes", d: "Actions you can use even if we never work together." },
] as const;

function ApplyPage() {
  const { fault: initialFault } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", website: "", fault: (initialFault ?? "") as FaultId | "", budget: "", goal: "", timeline: "", email: "", countryCode: "+91", phone: "", role: "" });
  const [runsAds, setRunsAds] = useState<boolean | null>(null);
  const [wantsUpdates, setWantsUpdates] = useState(true);
  const firstName = form.name.trim().split(" ")[0] ?? "";
  const intro = stepIntro[step] ?? stepIntro[0];
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = useServerFn(submitApplication);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const solutions = solutionsFor(form.fault);
  const faultLabel = systemFaults.find((f) => f.id === form.fault)?.label;

  function validateStep(i: number, formEl: HTMLFormElement) {
    if (i === 0) {
      for (const id of ["name", "email", "phone"]) {
        const input = formEl.elements.namedItem(id) as HTMLInputElement | null;
        if (input && !input.reportValidity()) return false;
      }
      if (!form.role) { toast.error("Please tell us what describes you best."); return false; }
      if (runsAds === null) { toast.error("Please tell us if you run paid ads today."); return false; }
    }
    if (i === 1) {
      const input = formEl.elements.namedItem("website") as HTMLInputElement | null;
      if (input && !input.reportValidity()) return false;
      if (!isValidBudget(form.budget)) { toast.error("Please select your monthly marketing budget."); return false; }
      if (!form.fault) { toast.error("Please choose the system fault we're solving."); return false; }
    }
    if (i === 2) {
      const goal = formEl.elements.namedItem("goal") as HTMLTextAreaElement | null;
      if (goal && !goal.reportValidity()) return false;
    }
    if (i === 2 && !form.timeline) { toast.error("Please choose your deployment timeline."); return false; }
    return true;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!validateStep(step, e.currentTarget)) return;
    if (step < steps.length - 1) { setStep(step + 1); return; }
    const parsed = applicationSchema.safeParse({ ...form, runsAds, wantsUpdates, company });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Please check your answers."); return; }
    setStatus("sending");
    try {
      const res = await submit({ data: parsed.data });
      if (!res.ok) throw new Error("not stored");
      setStatus("sent");
      toast.success("Application received. We'll review your system diagnosis.");
    } catch {
      setStatus("idle");
      toast.error("We couldn't send your application. Please try again in a moment.");
    }
  }

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Float delay={0.1}><h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">Diagnose & Architect Your <span className="text-gradient">Growth System.</span></h1></Float>
        <Float delay={0.15}><p className="mt-6 max-w-2xl text-lg text-muted-foreground">Tell us what's breaking. You'll see the architecture we'd deploy for your brand as you answer.</p></Float>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Float delay={0.2}>
            <form onSubmit={onSubmit} noValidate className="glass overflow-hidden rounded-3xl">
              <div className="flex items-center gap-3 border-b border-border px-6 py-4 sm:px-10">
                <Terminal className="size-4 text-primary" aria-hidden="true" />
                <p className="text-sm font-semibold text-maroon">Diagnostic terminal</p>
                <p className="ml-auto text-xs text-muted-foreground">Step {step + 1} of {steps.length}</p>
              </div>

              <ol className="grid grid-cols-3 gap-2 px-6 pt-6 sm:px-10" aria-label="Diagnosis progress">
                {steps.map((label, i) => (
                  <li key={label} aria-current={i === step ? "step" : undefined}>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div className="bg-pipeline h-full origin-left" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
                    </div>
                    <p className={`mt-2 text-xs font-semibold ${i === step ? "text-primary" : "text-muted-foreground"}`}>{i + 1}. {label}</p>
                  </li>
                ))}
              </ol>

              {status === "sent" ? (
                <div role="status" className="flex flex-col items-start gap-5 p-6 sm:p-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}><CircleCheck className="size-12 text-health-robust" aria-hidden="true" /></motion.div>
                  <h2 className="text-3xl font-bold">You're in, {firstName}.</h2>
                  <p className="max-w-md text-muted-foreground">Your diagnosis for <span className="font-semibold text-maroon">{faultLabel}</span> is with our team. Here's exactly what happens next:</p>
                  <ol className="w-full space-y-3">
                    {["We study your website and your numbers.", `We email your growth map to ${form.email}.`, isCalendlyUrl(calendlyUrl) ? "You book your strategy call alongside." : "We reach out to schedule your strategy call."].map((t, i) => (
                      <motion.li key={t} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.12 }} className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm font-medium">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>{t}
                      </motion.li>
                    ))}
                  </ol>
                </div>
              ) : (
              <div className="p-6 sm:p-10">
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold">{step > 0 && firstName ? `${firstName}, ` : ""}{step > 0 && firstName ? intro.title.charAt(0).toLowerCase() + intro.title.slice(1) : intro.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{intro.sub}</p>
                    </div>
                    {step === 0 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-maroon">Your name</Label>
                          <Input id="name" name="name" required maxLength={200} autoComplete="name" placeholder="Your full name" value={form.name} onChange={(e) => set("name")(e.target.value)} className={field} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold text-maroon">Email address</Label>
                          <Input id="email" name="email" type="email" required maxLength={255} autoComplete="email" placeholder="you@company.com" value={form.email} onChange={(e) => set("email")(e.target.value)} className={field} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold text-maroon">Phone number</Label>
                          <div className="flex gap-2">
                            <Select value={form.countryCode} onValueChange={set("countryCode")}>
                              <SelectTrigger aria-label="Country code" className={`${field} w-32 shrink-0`}><SelectValue /></SelectTrigger>
                              <SelectContent className="rounded-xl">
                                {countryCodes.map((c) => <SelectItem key={c.code} value={c.code}>{c.flag} {c.code} <span className="text-muted-foreground">{c.name}</span></SelectItem>)}
                              </SelectContent>
                            </Select>
                            <Input id="phone" name="phone" type="tel" inputMode="tel" required pattern="[0-9 ]{6,20}" autoComplete="tel-national" placeholder="98765 43210" value={form.phone} onChange={(e) => set("phone")(e.target.value)} className={field} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p id="ads-label" className="text-sm font-semibold text-maroon">Do you run <span className="text-primary">paid ads</span> today?</p>
                          <div role="radiogroup" aria-labelledby="ads-label" className="flex gap-2">
                            {[{ v: true, l: "Yes" }, { v: false, l: "No" }].map((o) => (
                              <button key={o.l} type="button" role="radio" aria-checked={runsAds === o.v} onClick={() => setRunsAds(o.v)} className={`h-11 min-w-24 rounded-full border px-6 text-sm font-semibold transition-all hover:-translate-y-0.5 ${runsAds === o.v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/70 text-muted-foreground hover:text-maroon"}`}>{o.l}</button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-sm font-semibold text-maroon">What describes you best?</Label>
                          <Select value={form.role} onValueChange={set("role")}>
                            <SelectTrigger id="role" className={field}><SelectValue placeholder="What describes you best?" /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                              {roleOptions.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="website" className="text-sm font-semibold text-maroon">Company website</Label>
                          <Input id="website" name="website" type="url" required maxLength={200} placeholder="https://" value={form.website} onChange={(e) => set("website")(e.target.value)} className={field} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fault" className="text-sm font-semibold text-maroon">What system fault are we solving?</Label>
                          <Select value={form.fault} onValueChange={set("fault")}>
                            <SelectTrigger id="fault" className={field}><SelectValue placeholder="Choose the fault" /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                              {systemFaults.map((f) => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-sm font-semibold text-maroon">Monthly marketing budget</Label>
                          <Select value={form.budget} onValueChange={set("budget")}>
                            <SelectTrigger id="budget" className={field}><SelectValue placeholder="Select a range" /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                              {budgetOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="goal" className="text-sm font-semibold text-maroon">What should your system achieve?</Label>
                          <Textarea id="goal" name="goal" required maxLength={1000} rows={4} value={form.goal} onChange={(e) => set("goal")(e.target.value)} placeholder="More qualified leads, higher ROAS, global expansion…" className="rounded-xl bg-card/80 text-base" />
                        </div>
                        <div className="space-y-3">
                          <p id="timeline-label" className="text-sm font-semibold text-maroon">When do you want this deployed?</p>
                          <ToggleGroup aria-labelledby="timeline-label" type="single" value={form.timeline} onValueChange={(v) => v && set("timeline")(v)} className="grid grid-cols-2 gap-2">
                            {timelineOptions.map((o) => (
                              <ToggleGroupItem key={o.value} value={o.value} className="h-14 rounded-xl border border-border bg-card/70 text-sm font-semibold text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-maroon data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                                {o.label}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                        <label htmlFor="updates" className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card/70 p-4">
                          <Checkbox id="updates" checked={wantsUpdates} onCheckedChange={(v) => setWantsUpdates(v === true)} className="mt-0.5" />
                          <span className="text-sm"><span className="font-semibold text-maroon">Send me growth breakdowns</span><span className="block text-muted-foreground">Real campaign lessons, once in a while.</span></span>
                        </label>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {step > 0 && (
                    <Button type="button" variant="ghost" size="lg" className="rounded-full" onClick={() => setStep(step - 1)}><ArrowLeft /> Back</Button>
                  )}
                  <Button type="submit" variant="shakti" size="xl" className="ml-auto w-full sm:w-auto" disabled={status === "sending"}>
                    {step < steps.length - 1 ? <>Continue <ArrowRight /></> : status === "sending" ? <><Loader2 className="animate-spin" /> Sending…</> : "Get My Growth Map"}
                  </Button>
                </div>
                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:justify-end"><Lock className="size-3.5" aria-hidden="true" /> Your data is safe. No spam, ever.</p>
              </div>
              )}
            </form>
          </Float>

          <Float delay={0.3} className="flex flex-col gap-6">
            <aside className="glass rounded-3xl p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What you'll get</p>
              <ul className="mt-5 space-y-5">
                {youGet.map((g) => (
                  <li key={g.n} className="flex gap-4">
                    <span className="font-display text-2xl font-extrabold text-gradient">{g.n}</span>
                    <span><span className="block font-bold text-maroon">{g.t}</span><span className="text-sm text-muted-foreground">{g.d}</span></span>
                  </li>
                ))}
              </ul>
            </aside>
            <aside className="glass rounded-3xl p-8" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Solution matrix</p>
              <h2 className="mt-3 text-2xl font-bold">{faultLabel ? `Fixing: ${faultLabel}` : "Your architecture appears here"}</h2>
              <AnimatePresence mode="wait">
                {solutions.length > 0 ? (
                  <motion.ul key={form.fault} className="mt-6 space-y-3" initial="hidden" animate="show" exit="hidden" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
                    {solutions.map((s) => (
                      <motion.li key={s} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }} className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 font-semibold text-maroon">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-4" /></span>
                        <span><span className="text-primary">→</span> {s}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 text-sm text-muted-foreground">Choose the system fault in step 2 and you'll see the services we'd deploy for you.</motion.p>
                )}
              </AnimatePresence>
            </aside>

            <StrategyCall />
          </Float>
        </div>
      </div>
    </section>
  );
}

function StrategyCall() {
  if (isCalendlyUrl(calendlyUrl)) {
    const src = `${calendlyUrl}${calendlyUrl.includes("?") ? "&" : "?"}hide_gdpr_banner=1`;
    return (
      <div className="glass flex flex-1 flex-col overflow-hidden rounded-3xl">
        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
          <CalendarDays className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight text-maroon">System Architecture Strategy Call</h2>
        </div>
        <iframe src={src} title="Book a System Architecture Strategy Call" className="h-[680px] w-full bg-card" loading="lazy" />
      </div>
    );
  }
  return (
    <div className="flex min-h-[300px] flex-1 flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-blush/60 via-card/60 to-peach/60 p-10 text-center backdrop-blur-xl">
      <CalendarDays className="size-12 text-primary" strokeWidth={1.25} />
      <h2 className="font-display text-2xl font-bold text-maroon">System Architecture Strategy Call</h2>
      <p className="max-w-xs text-sm text-muted-foreground">Online booking opens here soon. Apply with the form and we'll schedule your call.</p>
    </div>
  );
}
