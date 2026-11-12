export const agencyUrl = "https://team-bhadrakali-working.lovable.app";

export const trustMetrics = [
  { value: "₹65Cr+", label: "Client Revenue Generated" },
  { value: "5.8X", label: "Average ROAS" },
  { value: "85+", label: "#1 Google Rankings" },
] as const;

/** Official operational hubs supplied by the agency. */
export const operationalHubs = [
  { name: "Hyderabad HQ", locality: "Hyderabad", region: "Telangana", country: "India" },
  { name: "Warangal", locality: "Warangal", region: "Telangana", country: "India" },
] as const;

/** Paste the agency's Calendly scheduling link here (e.g. https://calendly.com/your-name/strategy-call). Empty = not connected. */
export const calendlyUrl = "";

export function isCalendlyUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" && (u.hostname === "calendly.com" || u.hostname.endsWith(".calendly.com"));
  } catch {
    return false;
  }
}

export const budgetOptions = [
  { value: "under-50k", label: "<₹50k" },
  { value: "50k-2l", label: "₹50k–₹2L" },
  { value: "2l-plus", label: "₹2L+" },
] as const;

export function isValidBudget(value: string) {
  return budgetOptions.some((option) => option.value === value);
}

export const campaigns = [
  { id: "01", sector: "SaaS", discipline: "Organic acquisition", title: "Scaled SaaS Brand SEO", summary: "3X Lead Volume in 90 Days. Reduced Cost Per Lead by 60%.", metric: "3X", metricLabel: "Lead volume", secondary: "−60%", secondaryLabel: "Cost per lead", chartTitle: "Lead volume · relative index", before: 100, after: 300, beforeLabel: "Before · 1X", afterLabel: "90 days · 3X", detail: "SEO & conversion architecture", period: "90 days" },
  { id: "02", sector: "E-commerce", discipline: "Performance marketing", title: "E-commerce Performance Marketing", summary: "Reached 4.8X Blended Ad ROAS scaling to ₹50L/Month.", metric: "4.8X", metricLabel: "Blended ad ROAS", secondary: "₹50L", secondaryLabel: "Monthly ad spend", chartTitle: "Return per ₹1 of ad spend", before: 1, after: 4.8, beforeLabel: "Ad spend · ₹1", afterLabel: "Revenue · ₹4.80", detail: "Paid media & revenue efficiency", period: "Monthly scale" },
  { id: "03", sector: "Local business", discipline: "Local search", title: "Local Business SEO", summary: "Ranked #1 on Google Maps 3-Pack, driving 190% more direct inquiries.", metric: "+190%", metricLabel: "Direct inquiries", secondary: "#1", secondaryLabel: "Google Maps 3-Pack", chartTitle: "Direct inquiries · relative index", before: 100, after: 290, beforeLabel: "Before · 100", afterLabel: "After · 290", detail: "Local SEO & Google Maps visibility", period: "Reported outcome" },
] as const;

export function agencyHead(path: string, title: string, description: string) {
  const url = `${agencyUrl}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "ProfessionalService", "@id": `${agencyUrl}/#agency`, name: "Team Bhadrakali", url: agencyUrl, description: "Remote digital marketing agency providing SEO, performance marketing, web design and content strategy.", areaServed: "Worldwide", hasOfferCatalog: { "@type": "OfferCatalog", name: "Digital growth services", itemListElement: ["Global & Local SEO", "Performance Marketing", "UI/UX Web Design", "Content & Social Media Strategy"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
          ...operationalHubs.map((hub) => ({ "@type": "LocalBusiness", "@id": `${agencyUrl}/#${hub.locality.toLowerCase()}`, name: `Team Bhadrakali — ${hub.name}`, url: agencyUrl, parentOrganization: { "@id": `${agencyUrl}/#agency` }, address: { "@type": "PostalAddress", addressLocality: hub.locality, addressRegion: hub.region, addressCountry: "IN" }, areaServed: { "@type": "City", name: hub.locality } })),
        ],
      }),
    }],
  };
}