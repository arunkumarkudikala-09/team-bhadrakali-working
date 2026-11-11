// Pure, browser-safe logic shared by the Growth Architecture Analyzer,
// the Solution Architecture terminal and their tests.

export const trafficSteps = [1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000] as const;
export const valueSteps = [1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000] as const;
export const conversionRange = { min: 0.1, max: 10, step: 0.1 } as const;

export type Pillar = "Reliability" | "Scalability" | "Maintainability";

export const pillars: { name: Pillar; short: string; text: string; tip: string }[] = [
  { name: "Reliability", short: "Reliable", text: "Your funnel should never break or leak leads, even when traffic spikes.", tip: "Tracking, landing pages and forms that keep capturing every lead under load." },
  { name: "Scalability", short: "Scalable", text: "Your ROI should hold steady as you increase ad spend and search reach.", tip: "Campaign structures and technical SEO that keep returns intact as budgets grow." },
  { name: "Maintainability", short: "Maintainable", text: "Your brand assets and UI should be easy to adapt as you grow.", tip: "Design systems and content pipelines your team can extend without rebuilding." },
];

export const bottlenecks = [
  { id: "traffic", label: "Traffic Volume", pillar: "Scalability", service: { id: "seo", label: "Global & Local SEO" } },
  { id: "lead-quality", label: "Lead Quality", pillar: "Maintainability", service: { id: "content", label: "Content & Social Strategy" } },
  { id: "ux", label: "UI/UX Friction", pillar: "Reliability", service: { id: "web-design", label: "UI/UX Web Design" } },
  { id: "roas", label: "Ad ROAS", pillar: "Scalability", service: { id: "performance", label: "Performance Marketing" } },
] as const;

export type BottleneckId = (typeof bottlenecks)[number]["id"];

export function getBottleneck(id: BottleneckId) {
  return bottlenecks.find((b) => b.id === id) ?? bottlenecks[0];
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Indicative 20–100 score: conversion rate (5% = full marks) weighs 50, traffic scale (1k→1M, log) weighs 30. */
export function healthScore(traffic: number, conversionRate: number) {
  const conv = clamp(conversionRate / 5, 0, 1);
  const scale = clamp(Math.log10(Math.max(traffic, 1) / 1000) / 3, 0, 1);
  return Math.round(20 + conv * 50 + scale * 30);
}

export function healthLabel(score: number) {
  if (score < 45) return "Fragile";
  if (score < 70) return "Leaking";
  return "Resilient";
}

/** Extra monthly revenue from lifting conversion rate by one percentage point. */
export function hiddenRevenue(traffic: number, valuePerConversion: number) {
  return Math.round(traffic * 0.01 * valuePerConversion);
}

export function formatInr(amount: number) {
  if (amount >= 1e7) return `₹${trim(amount / 1e7)}Cr`;
  if (amount >= 1e5) return `₹${trim(amount / 1e5)}L`;
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}
const trim = (n: number) => (Math.round(n * 10) / 10).toString();

export function formatCount(n: number) {
  if (n >= 1e6) return `${trim(n / 1e6)}M`;
  if (n >= 1e3) return `${trim(n / 1e3)}k`;
  return String(n);
}

export function diagnose(traffic: number, conversionRate: number, value: number, bottleneckId: BottleneckId) {
  const b = getBottleneck(bottleneckId);
  const score = healthScore(traffic, conversionRate);
  const revenue = hiddenRevenue(traffic, value);
  const next = Math.round((conversionRate + 1) * 10) / 10;
  return {
    score,
    label: healthLabel(score),
    pillar: b.pillar as Pillar,
    service: b.service,
    revenue,
    headline: `Your system lacks ${b.pillar}.`,
    detail: `A 1% increase in conversion architecture (${conversionRate.toFixed(1)}% → ${next.toFixed(1)}%) yields ${formatInr(revenue)} in hidden revenue every month.`,
  };
}

// Solution Architecture terminal
export const systemFaults = [
  { id: "high-cpa", label: "High CPA", solutions: ["Paid Media Account Restructure", "Conversion Tracking & Attribution Audit", "ROAS-Focused Creative Testing"] },
  { id: "invisible-seo", label: "Invisible SEO", solutions: ["Technical SEO Audit", "Search-Intent Content Architecture", "Local & Google Maps Visibility"] },
  { id: "poor-conversion", label: "Poor Website Conversion", solutions: ["UI/UX Overhaul", "Funnel Reliability Audit", "Landing Page Testing Framework"] },
  { id: "content-pipeline", label: "Content Pipeline", solutions: ["Content Strategy & Editorial Calendar", "Short-Form Video Production System", "Multi-Channel Distribution Plan"] },
] as const;

export type FaultId = (typeof systemFaults)[number]["id"];

export function isFault(value: unknown): value is FaultId {
  return systemFaults.some((f) => f.id === value);
}

export function solutionsFor(id: FaultId | "") {
  return systemFaults.find((f) => f.id === id)?.solutions ?? [];
}

export const timelineOptions = [
  { value: "now", label: "Immediately" },
  { value: "30-days", label: "Within 30 days" },
  { value: "quarter", label: "1–3 months" },
  { value: "exploring", label: "Just exploring" },
] as const;
