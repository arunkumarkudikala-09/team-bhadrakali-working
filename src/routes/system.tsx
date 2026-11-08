import { createFileRoute, redirect } from "@tanstack/react-router";
import { agencyHead } from "@/lib/agency";

export const Route = createFileRoute("/system")({
  head: () => agencyHead("/system", "The Growth System — Team Bhadrakali", "Explore Team Bhadrakali’s systems-driven growth workflow."),
  beforeLoad: () => { throw redirect({ to: "/about", statusCode: 301 }); },
});
