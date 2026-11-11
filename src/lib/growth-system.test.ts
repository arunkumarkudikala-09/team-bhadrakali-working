import { describe, expect, it } from "vitest";
import { diagnose, formatInr, getBottleneck, healthScore, hiddenRevenue, solutionsFor, systemFaults, bottlenecks } from "./growth-system";

describe("growth architecture analyzer", () => {
  it("prices a 1% conversion lift as traffic × 1% × value per conversion", () => {
    expect(hiddenRevenue(10000, 10000)).toBe(1000000);
    expect(formatInr(hiddenRevenue(10000, 10000))).toBe("₹10L");
  });
  it("scores health between 20 and 100", () => {
    expect(healthScore(1000, 0)).toBe(20);
    expect(healthScore(1000000, 10)).toBe(100);
  });
  it("offers the four supplied bottlenecks", () => {
    expect(bottlenecks.map((b) => b.label)).toEqual(["Traffic Volume", "Lead Quality", "UI/UX Friction", "Ad ROAS"]);
  });
  it("routes UI/UX friction to web design as a reliability fault", () => {
    expect(getBottleneck("ux").service.id).toBe("web-design");
    expect(diagnose(10000, 2, 5000, "ux").headline).toBe("Your system lacks Reliability.");
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
