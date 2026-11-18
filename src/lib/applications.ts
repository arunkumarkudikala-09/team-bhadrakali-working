// Browser-safe validation shared by the Solution Architecture form, its server function and tests.
import { z } from "zod";

const faultIds = ["high-cpa", "invisible-seo", "poor-conversion", "content-pipeline"] as const;
const budgetIds = ["under-50k", "50k-2l", "2l-plus"] as const;
export const roleOptions = [
  { value: "founder", label: "Founder / Owner" },
  { value: "marketing-lead", label: "Marketing lead" },
  { value: "agency", label: "Agency / Consultant" },
  { value: "freelancer", label: "Freelancer" },
  { value: "other", label: "Something else" },
] as const;
const roleIds = ["founder", "marketing-lead", "agency", "freelancer", "other"] as const;

export const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
] as const;

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
  email: z.string().trim().max(255).email("Please enter a valid email address"),
  countryCode: z.string().regex(/^\+[0-9]{1,4}$/, "Please choose a country code"),
  phone: z.string().trim().regex(/^[0-9 ]{6,20}$/, "Please enter a valid phone number"),
  role: z.enum(roleIds),
  runsAds: z.boolean(),
  wantsUpdates: z.boolean().default(false),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(200).optional().default(""),
});

export type ApplicationInput = z.input<typeof applicationSchema>;
