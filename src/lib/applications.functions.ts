import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { applicationSchema } from "./applications";

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    // Bots that fill the hidden field are dropped without storing anything.
    if (data.company) return { ok: true as const };

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      console.error("submitApplication: backend configuration missing");
      return { ok: false as const };
    }
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await client.from("partnership_applications").insert({
      name: data.name,
      website: data.website,
      fault: data.fault,
      budget: data.budget,
      goal: data.goal,
      timeline: data.timeline,
    });
    if (error) {
      console.error("submitApplication insert failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
