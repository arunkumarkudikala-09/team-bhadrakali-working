import { describe, expect, it } from "vitest";
import { baselineRevenue, bottlenecks, diagnose, formatInr, getBottleneck, healthScore, healthTier, hiddenRevenue, solutionsFor, systemFaults } from "./growth-system";

describe("growth architecture analyzer", () => {
  it("computes baseline revenue as traffic × (conversion rate / 100) × customer value", () => {
    expect(baselineRevenue(10000, 2, 5000)).toBe(1000000);
    expect(baselineRevenue(50000, 1.5, 2500)).toBe(1875000);
  });
  it("prices a 1% conversion lift as traffic × 1% × customer value", () => {
    expect(hiddenRevenue(10000, 10000)).toBe(1000000);
    expect(formatInr(hiddenRevenue(10000, 10000))).toBe("₹10L");
  });
  it("rates conversion below 2% as Critical", () => {
    expect(healthTier(1.9)).toBe("critical");
    expect(diagnose(10000, 1.5, 5000, "ux").label).toBe("Critical");
  });
  it("rates conversion from 2% to 4% as Stable", () => {
    expect(healthTier(2)).toBe("stable");
    expect(healthTier(4)).toBe("stable");
  });
  it("rates conversion above 4% as Robust", () => {
    expect(healthTier(4.1)).toBe("robust");
  });
  it("scores 20 points per 1% of conversion, capped at 100", () => {
    expect(healthScore(2)).toBe(40);
    expect(healthScore(4)).toBe(80);
    expect(healthScore(10)).toBe(100);
  });
  it("reports the recovered revenue in the telemetry line", () => {
    expect(diagnose(10000, 2, 5000, "ux").headline).toBe("A 1% conversion increase yields ₹5L in recovered hidden revenue.");
  });
  it("offers the four supplied bottlenecks", () => {
    expect(bottlenecks.map((b) => b.label)).toEqual(["Traffic Volume", "Lead Quality", "UI/UX Friction", "Ad ROAS"]);
  });
  it("routes UI/UX friction to web design as a reliability fault", () => {
    expect(getBottleneck("ux").service.id).toBe("web-design");
    expect(diagnose(10000, 2, 5000, "ux").pillar).toBe("Reliability");
  });
});

describe("solution architecture terminal", () => {
  it("offers the four supplied system faults", () => {
    expect(systemFaults.map((f) => f.label)).toEqual(["High CPA", "Invisible SEO", "Poor Website Conversion", "Content Pipeline"]);
  });
  it("shows UI/UX Overhaul and Funnel Reliability Audit for poor website conversion", () => {
    expect(solutionsFor("poor-conversion")).toEqual(expect.arrayContaining(["UI/UX Overhaul", "Funnel Reliability Audit"]));
  });
  it("shows no solutions before a fault is chosen", () => {
    expect(solutionsFor("")).toEqual([]);
  });
});
