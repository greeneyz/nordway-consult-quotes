import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site/SiteHeader";
import { Configurator } from "@/components/site/Configurator";
import { disciplines, euro, seniorities } from "@/lib/pricing";
import mark from "@/assets/nordway-mark.png";

const minSeniorityFactor = Math.min(...seniorities.map((s) => s.factor));
const minRate = Math.min(...disciplines.map((d) => d.hourly * minSeniorityFactor));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nordway Consult — Software & Data Engineering Consultancy, Finland",
      },
      {
        name: "description",
        content:
          "Finnish software development and data engineering consultancy with open pricing. Configure discipline, seniority and team size to see hourly, daily and monthly rates plus VAT.",
      },
      {
        property: "og:title",
        content: "Nordway Consult — Software & Data Engineering, Finland",
      },
      {
        property: "og:description",
        content:
          "Senior consultants in frontend, backend, cloud and data engineering. Transparent hourly, daily and monthly rates, always shown plus VAT.",
      },
    ],
  }),
  component: Home,
});

const stack = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue / Nuxt", "Angular", "Svelte", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Python", "Node.js", "TypeScript", ".NET", "Java", "PostgreSQL"],
  },
  {
    label: "Cloud & CI/CD",
    items: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    label: "Data engineering",
    items: ["Databricks", "Microsoft Fabric", "Airflow", "dbt", "Delta Lake", "Kafka"],
  },
];

const method = [
  {
    n: "01",
    title: "Calibrate",
    body: "A 45-minute call to map the problem, the stack and the team shape. No sales deck.",
  },
  {
    n: "02",
    title: "Quote in writing",
    body: "The rate you configured, fixed in a written offer with scope, VAT and notice period.",
  },
  {
    n: "03",
    title: "Start in weeks",
    body: "Consultants embedded in your team, or a delivery squad running the work end to end.",
  },
  {
    n: "04",
    title: "Hand back",
    body: "Documented, tested and transferable. We are meant to become unnecessary.",
  },
];

const faqs = [
  {
    q: "Are the prices on this site final?",
    a: "They are indicative and exclude VAT. Once we agree scope, the same numbers are confirmed in a written offer — we do not mark up after the fact.",
  },
  {
    q: "What does 'plus VAT' mean for me?",
    a: "Finnish VAT (ALV) of 25.5 % is added to all invoices for Finnish customers. VAT-registered business customers elsewhere in the EU are invoiced at 0 % under reverse charge.",
  },
  {
    q: "Can we hire a consultant permanently later?",
    a: "Yes. After six months of continuous assignment, transfer to your payroll is free of charge.",
  },
  {
    q: "What if we only need the work done, not the people?",
    a: "Choose 'We deliver the work' in the configurator. You get the same rates with project management, QA and delivery risk carried by us.",
  },
];

function Home() {
  return (
    <div id="top" className="min-h-screen bg-background bg-veil">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="grid animate-rise gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-primary">Software development · Data engineering</p>
            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
              Consulting with the <span className="text-aurora">price tag facing out</span>.
            </h1>
            <p className="mt-6 max-w-[52ch] text-pretty text-lg text-muted-foreground">
              Nordway Consult is a Finnish engineering consultancy. Most firms hide their
              rates behind a form. We put a configurator on the front page: choose the
              discipline, the seniority and how many people you need, and see the hourly,
              daily and monthly price — always plus VAT.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#configure"
                className="rounded-full bg-aurora px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Configure your rate
              </a>
              <a
                href="mailto:info@nordwayconsult.fi"
                className="font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                info@nordwayconsult.fi
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <dt className="eyebrow text-muted-foreground">From</dt>
                <dd className="mt-1 font-mono text-xl">{euro(78)} / h</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">VAT</dt>
                <dd className="mt-1 font-mono text-xl">25.5 %</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Notice</dt>
                <dd className="mt-1 font-mono text-xl">30 days</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="grid-lines absolute inset-0 -z-10 rounded-3xl opacity-40" />
            <div className="rounded-3xl bg-surface/70 p-10 ring-1 ring-border shadow-panel backdrop-blur-sm">
              <img
                src={mark}
                alt="Nordway Consult mark"
                width={1024}
                height={1024}
                className="mx-auto w-40 md:w-52"
              />
              <p className="mt-8 text-center font-display text-2xl font-semibold tracking-tight">
                Nordway Consult Oy
              </p>
              <p className="eyebrow mt-2 text-center text-muted-foreground">
                Helsinki · Registered in Finland
              </p>
            </div>
          </div>
        </section>

        {/* Configurator */}
        <Configurator />

        {/* Services */}
        <section id="services" className="border-t border-border py-20 md:py-24">
          <p className="eyebrow text-primary">Services</p>
          <h2 className="mt-4 max-w-[20ch] text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Five disciplines. One accountable partner.
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((d) => (
              <article
                key={d.id}
                className="flex flex-col rounded-2xl bg-surface p-6 ring-1 ring-border transition-transform hover:-translate-y-1"
              >
                <span className="font-mono text-[11px] text-muted-foreground">{d.index}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{d.name}</h3>
                <p className="mt-3 flex-1 text-pretty text-sm text-muted-foreground">
                  {d.blurb}
                </p>
                <p className="mt-5 border-t border-border pt-4 font-mono text-sm text-primary">
                  from {euro(d.hourly)} / h <span className="text-muted-foreground">+ VAT</span>
                </p>
              </article>
            ))}
            <article className="flex flex-col justify-between rounded-2xl bg-surface-raised p-6 ring-1 ring-primary/30">
              <div>
                <span className="font-mono text-[11px] text-muted-foreground">06</span>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  Something in between?
                </h3>
                <p className="mt-3 text-pretty text-sm text-muted-foreground">
                  Mixed squads, short audits, fractional leadership. Tell us the shape and we
                  will price it the same transparent way.
                </p>
              </div>
              <a
                href="mailto:info@nordwayconsult.fi"
                className="mt-5 border-t border-border pt-4 font-mono text-sm text-primary hover:underline"
              >
                info@nordwayconsult.fi
              </a>
            </article>
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="border-t border-border py-20 md:py-24">
          <p className="eyebrow text-primary">Stack</p>
          <h2 className="mt-4 max-w-[24ch] text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
            We work in your stack, not ours.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <div key={group.label}>
                <p className="eyebrow text-muted-foreground">{group.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Method */}
        <section id="method" className="border-t border-border py-20 md:py-24">
          <p className="eyebrow text-primary">Method</p>
          <h2 className="mt-4 max-w-[22ch] text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
            From first call to hand-off.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {method.map((step) => (
              <li key={step.n} className="border-t border-border pt-5">
                <span className="font-display text-3xl font-semibold text-primary">
                  {step.n}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-pretty text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-20 md:py-24">
          <p className="eyebrow text-primary">Straight answers</p>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl bg-surface p-6 ring-1 ring-border">
                <h3 className="font-display text-lg font-semibold">{f.q}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border py-20 md:py-24">
          <div className="rounded-3xl bg-surface p-10 text-center ring-1 ring-border shadow-panel md:p-16">
            <p className="eyebrow text-primary">Contact</p>
            <h2 className="mx-auto mt-5 max-w-[18ch] text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
              No forms. Just write to us.
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-pretty text-muted-foreground">
              Send the configuration you built, or a rough description of the problem. You
              get a named engineer's reply, usually within one working day.
            </p>
            <a
              href="mailto:info@nordwayconsult.fi"
              className="mt-8 inline-block rounded-full bg-aurora px-8 py-4 font-mono text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              info@nordwayconsult.fi
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={mark}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="size-7"
            />
            <p className="font-display text-sm font-semibold">Nordway Consult Oy</p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Helsinki, Finland · All rates excl. VAT (ALV 25.5 %)
          </p>
          <a
            href="mailto:info@nordwayconsult.fi"
            className="font-mono text-sm text-primary hover:underline"
          >
            info@nordwayconsult.fi
          </a>
        </div>
      </footer>
    </div>
  );
}
