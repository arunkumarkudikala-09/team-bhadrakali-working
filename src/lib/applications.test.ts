import { describe, expect, it } from "vitest";
import { applicationSchema } from "./applications";

const valid = { name: "Asha", website: "https://example.in", fault: "poor-conversion", budget: "50k-2l", goal: "More qualified leads", timeline: "now", email: "asha@example.in", countryCode: "+91", phone: "98765 43210", role: "founder", runsAds: true };

describe("partnership application validation", () => {
  it("accepts a complete application", () => {
    expect(applicationSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects a budget outside the three supplied ranges", () => {
    expect(applicationSchema.safeParse({ ...valid, budget: "10l" }).success).toBe(false);
  });
  it("rejects a website that is not http or https", () => {
    expect(applicationSchema.safeParse({ ...valid, website: "javascript:alert(1)" }).success).toBe(false);
  });
  it("rejects a goal longer than 1000 characters", () => {
    expect(applicationSchema.safeParse({ ...valid, goal: "a".repeat(1001) }).success).toBe(false);
  });
  it("rejects an invalid email", () => {
    expect(applicationSchema.safeParse({ ...valid, email: "asha@" }).success).toBe(false);
  });
  it("rejects a phone number with letters", () => {
    expect(applicationSchema.safeParse({ ...valid, phone: "98abc43210" }).success).toBe(false);
  });
});
