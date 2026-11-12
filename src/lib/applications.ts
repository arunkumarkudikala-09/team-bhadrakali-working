// Browser-safe validation shared by the Solution Architecture form, its server function and tests.
import { z } from "zod";

const faultIds = ["high-cpa", "invisible-seo", "poor-conversion", "content-pipeline"] as const;
const budgetIds = ["under-50k", "50k-2l", "2l-plus"] as const;
const timelineIds = ["now", "30-days", "quarter", "exploring"] as const;

export const applicationSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(200),
  website: z
    .string()
    .trim()
    .max(200)
    .url("Please enter a valid website address")
    .refine((v) => /^https?:\/\//i.test(v), "Website must start with http:// or https://"),
  fault: z.enum(faultIds),
  budget: z.enum(budgetIds),
  goal: z.string().trim().min(1, "Please describe your goal").max(1000),
  timeline: z.enum(timelineIds),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(200).optional().default(""),
});

export type ApplicationInput = z.input<typeof applicationSchema>;
