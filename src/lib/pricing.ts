export const VAT_RATE = 0.255; // Finnish ALV 25.5%

export const HOURS_PER_DAY = 8;
export const HOURS_PER_MONTH = 160;

export type DisciplineId =
  | "frontend"
  | "backend"
  | "cloud"
  | "data"
  | "architecture";

export type Discipline = {
  id: DisciplineId;
  index: string;
  name: string;
  blurb: string;
  hourly: number;
  tech: string[];
};

export const disciplines: Discipline[] = [
  {
    id: "frontend",
    index: "01",
    name: "Frontend engineering",
    blurb:
      "Product interfaces and design systems in any modern JavaScript framework, built to stay maintainable.",
    hourly: 55,
    tech: ["React", "Next.js", "Vue / Nuxt", "Angular", "Svelte", "TypeScript"],
  },
  {
    id: "backend",
    index: "02",
    name: "Backend & APIs",
    blurb:
      "Services, integrations and domain logic across five ecosystems — chosen to fit your team, not our habits.",
    hourly: 60,
    tech: ["Python", "Node.js", "TypeScript", ".NET", "Java", "PostgreSQL"],
  },
  {
    id: "cloud",
    index: "03",
    name: "Cloud & CI/CD",
    blurb:
      "Infrastructure as code, delivery pipelines and platform hardening on the cloud you already run.",
    hourly: 65,
    tech: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    id: "data",
    index: "04",
    name: "Data engineering",
    blurb:
      "Lakehouse architecture, orchestration and analytics pipelines that survive contact with real data.",
    hourly: 70,
    tech: ["Databricks", "Microsoft Fabric", "Airflow", "dbt", "Delta Lake", "Kafka"],
  },
  {
    id: "architecture",
    index: "05",
    name: "Solution architecture",
    blurb:
      "Technical due diligence, modernisation roadmaps and architecture ownership for programmes in motion.",
    hourly: 80,
    tech: ["Discovery", "Audits", "Migration plans", "Governance", "Security review"],
  },
];

export type SeniorityId = "mid" | "senior" | "lead";

export const seniorities: { id: SeniorityId; name: string; note: string; factor: number }[] = [
  { id: "mid", name: "Mid", note: "3–5 yrs", factor: 0.73 },
  { id: "senior", name: "Senior", note: "6–10 yrs", factor: 1 },
  { id: "lead", name: "Lead", note: "10+ yrs", factor: 1.27 },
];

export type ModeId = "placement" | "delivery";

export const modes: { id: ModeId; name: string; note: string; factor: number }[] = [
  {
    id: "placement",
    name: "Consultants to your team",
    note: "You lead. We embed the people.",
    factor: 1,
  },
  {
    id: "delivery",
    name: "We deliver the work",
    note: "We lead. Project management, QA and delivery risk included.",
    factor: 1.18,
  },
];

export type Quote = {
  unitHourly: number;
  hourly: number;
  daily: number;
  monthly: number;
  monthlyVat: number;
  monthlyGross: number;
};

export function calculateQuote(input: {
  discipline: Discipline;
  seniorityFactor: number;
  modeFactor: number;
  people: number;
}): Quote {
  const { discipline, seniorityFactor, modeFactor, people } = input;
  const unitHourly = discipline.hourly * seniorityFactor * modeFactor;
  const hourly = unitHourly * people;
  const daily = hourly * HOURS_PER_DAY;
  const monthly = hourly * HOURS_PER_MONTH;
  const monthlyVat = monthly * VAT_RATE;

  return {
    unitHourly: Math.round(unitHourly),
    hourly: Math.round(hourly),
    daily: Math.round(daily),
    monthly: Math.round(monthly),
    monthlyVat: Math.round(monthlyVat),
    monthlyGross: Math.round(monthly + monthlyVat),
  };
}

const formatter = new Intl.NumberFormat("fi-FI", {
  maximumFractionDigits: 0,
});

export function euro(value: number): string {
  return `€${formatter.format(value).replace(/\u00A0/g, " ")}`;
}
