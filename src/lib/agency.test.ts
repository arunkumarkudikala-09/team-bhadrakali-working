import { describe, expect, it } from "vitest";
import { budgetOptions, isValidBudget, campaigns, trustMetrics, operationalHubs, isCalendlyUrl } from "./agency";

describe("agency brief business values", () => {
  it("offers only the three supplied rupee budget ranges", () => {
    expect(budgetOptions.map((option) => option.label)).toEqual(["<₹50k", "₹50k–₹2L", "₹2L+"]);
    expect(isValidBudget("under-50k")).toBe(true);
    expect(isValidBudget("50k-2l")).toBe(true);
    expect(isValidBudget("2l-plus")).toBe(true);
    expect(isValidBudget("lt1k")).toBe(false);
    expect(isValidBudget("")).toBe(false);
  });
  it("uses the supplied trust metrics", () => {
    expect(trustMetrics.map((metric) => metric.value)).toEqual(["₹65Cr+", "5.8X", "85+"]);
  });
  it("represents SaaS leads at three times baseline with 60% lower CPL", () => {
    expect(campaigns[0].after / campaigns[0].before).toBe(3);
    expect(campaigns[0].secondary).toBe("−60%");
    expect(campaigns[0].period).toBe("90 days");
  });
  it("represents 4.8X ecommerce return at 50 lakh monthly spend", () => {
    expect(campaigns[1].after / campaigns[1].before).toBe(4.8);
    expect(campaigns[1].secondary).toBe("₹50L");
  });
  it("represents 190% more local inquiries, not 190% of baseline", () => {
    expect(campaigns[2].after - campaigns[2].before).toBe(190);
    expect(campaigns[2].secondary).toBe("#1");
  });
  it("lists Hyderabad HQ and Warangal, Telangana as the operational hubs", () => {
    expect(operationalHubs.map((h) => `${h.name}, ${h.region}, ${h.country}`)).toEqual(["Hyderabad HQ, Telangana, India", "Warangal, Telangana, India"]);
  });
  it("only embeds https Calendly links", () => {
    expect(isCalendlyUrl("https://calendly.com/team-bhadrakali/strategy-call")).toBe(true);
    expect(isCalendlyUrl("http://calendly.com/x")).toBe(false);
    expect(isCalendlyUrl("https://evil.example/calendly.com")).toBe(false);
    expect(isCalendlyUrl("[YOUR_CALENDLY_LINK_HERE]")).toBe(false);
  });
});
