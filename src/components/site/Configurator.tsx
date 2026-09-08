import { useMemo, useState } from "react";
import {
  calculateQuote,
  disciplines,
  euro,
  HOURS_PER_DAY,
  HOURS_PER_MONTH,
  modes,
  MONTHLY_COMMITMENT_DISCOUNT,
  seniorities,
  VAT_RATE,
  type DisciplineId,
  type ModeId,
  type SeniorityId,
} from "@/lib/pricing";

function OptionButton({
  active,
  onClick,
  title,
  note,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  note: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl px-4 py-3 text-left transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-lift"
          : "bg-surface-raised text-foreground ring-1 ring-border hover:-translate-y-0.5 hover:ring-primary/50"
      }`}
    >
      <span className="block text-sm font-semibold">{title}</span>
      <span
        className={`mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] ${
          active ? "opacity-80" : "text-muted-foreground"
        }`}
      >
        {note}
      </span>
    </button>
  );
}

export function Configurator() {
  const [disciplineId, setDisciplineId] = useState<DisciplineId>("data");
  const [seniorityId, setSeniorityId] = useState<SeniorityId>("senior");
  const [modeId, setModeId] = useState<ModeId>("placement");
  const [people, setPeople] = useState(2);

  const discipline = disciplines.find((d) => d.id === disciplineId)!;
  const seniority = seniorities.find((s) => s.id === seniorityId)!;
  const mode = modes.find((m) => m.id === modeId)!;

  const quote = useMemo(
    () =>
      calculateQuote({
        discipline,
        seniorityFactor: seniority.factor,
        modeFactor: mode.factor,
        people,
      }),
    [discipline, seniority.factor, mode.factor, people],
  );

  const tickKey = `${disciplineId}-${seniorityId}-${modeId}-${people}`;

  return (
    <section id="configure" className="border-t border-border py-20 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-primary">Rate configurator</p>
          <h2 className="mt-4 max-w-[18ch] text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Your price, before you ever email us.
          </h2>
        </div>
        <p className="max-w-[38ch] text-pretty text-sm text-muted-foreground">
          Pick a discipline, set seniority and headcount, and choose whether you want the
          people or the finished work. Numbers update live.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="rounded-2xl bg-surface p-6 ring-1 ring-border shadow-panel">
          <p className="eyebrow text-muted-foreground">Step 01 — Discipline</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {disciplines.map((d) => (
              <OptionButton
                key={d.id}
                active={d.id === disciplineId}
                onClick={() => setDisciplineId(d.id)}
                title={d.name}
                note={`base ${euro(d.hourly)} / h`}
              />
            ))}
          </div>

          <p className="eyebrow mt-8 text-muted-foreground">Step 02 — Seniority</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {seniorities.map((s) => (
              <OptionButton
                key={s.id}
                active={s.id === seniorityId}
                onClick={() => setSeniorityId(s.id)}
                title={s.name}
                note={s.note}
              />
            ))}
          </div>

          <p className="eyebrow mt-8 text-muted-foreground">Step 03 — People</p>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-background px-4 py-3 ring-1 ring-border">
            <div>
              <span className="block text-sm font-semibold">
                {people} {people === 1 ? "consultant" : "consultants"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {quote.discount > 0
                  ? `${Math.round(quote.discount * 100)}% team discount applied`
                  : "2+ people unlocks a team discount"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Remove one consultant"
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                className="grid size-9 place-items-center rounded-lg bg-surface-raised text-lg ring-1 ring-border transition-colors hover:bg-secondary"
              >
                −
              </button>
              <span className="w-8 text-center font-mono text-xl">{people}</span>
              <button
                type="button"
                aria-label="Add one consultant"
                onClick={() => setPeople((p) => Math.min(20, p + 1))}
                className="grid size-9 place-items-center rounded-lg bg-surface-raised text-lg ring-1 ring-border transition-colors hover:bg-secondary"
              >
                +
              </button>
            </div>
          </div>

          <p className="eyebrow mt-8 text-muted-foreground">Step 04 — Engagement</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {modes.map((m) => (
              <OptionButton
                key={m.id}
                active={m.id === modeId}
                onClick={() => setModeId(m.id)}
                title={m.name}
                note={m.note}
              />
            ))}
          </div>
        </div>

        <aside className="rounded-2xl bg-surface p-6 ring-1 ring-primary/25 shadow-panel lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-primary">Live rate</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              EUR · excl. VAT
            </span>
          </div>

          <p className="mt-4 font-display text-lg font-semibold leading-snug">
            {people} × {seniority.name} {discipline.name.toLowerCase()}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{mode.name}</p>

          <dl key={tickKey} className="mt-6 space-y-3">
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <dt className="text-sm text-muted-foreground">
                Hourly{" "}
                <span className="font-mono text-[10px]">
                  ({euro(quote.unitHourly)} / person)
                </span>
              </dt>
              <dd className="animate-tick font-mono text-2xl tracking-tight">
                {euro(quote.hourly)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <dt className="text-sm text-muted-foreground">
                Daily <span className="font-mono text-[10px]">({HOURS_PER_DAY} h)</span>
              </dt>
              <dd className="animate-tick font-mono text-2xl tracking-tight">
                {euro(quote.daily)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <dt className="text-sm text-muted-foreground">
                Monthly{" "}
                <span className="font-mono text-[10px]">({HOURS_PER_MONTH} h)</span>
              </dt>
              <dd className="animate-tick font-mono text-3xl tracking-tight text-primary">
                {euro(quote.monthly)}
              </dd>
            </div>
          </dl>

          <div className="mt-5 rounded-xl bg-background p-4 ring-1 ring-border">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
              + VAT (ALV {(VAT_RATE * 100).toFixed(1)} %)
            </p>
            <div className="mt-2 flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">VAT on monthly</span>
              <span className="font-mono">{euro(quote.monthlyVat)}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Monthly incl. VAT</span>
              <span className="font-mono">{euro(quote.monthlyGross)}</span>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Monthly rate includes a {Math.round(MONTHLY_COMMITMENT_DISCOUNT * 100)} %
            commitment discount. Indicative pricing — confirmed in writing before any work
            starts. VAT 0 % applies to valid EU reverse-charge customers outside Finland.
          </p>

          <a
            href="mailto:info@nordwayconsult.fi?subject=Rate%20enquiry%20—%20Nordway%20Consult"
            className="mt-5 block rounded-full bg-aurora py-3.5 text-center text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Send this configuration
          </a>
        </aside>
      </div>
    </section>
  );
}
