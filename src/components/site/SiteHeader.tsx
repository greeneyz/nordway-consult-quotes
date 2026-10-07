import mark from "@/assets/nordway-mark.png";

const links = [
  { href: "#configure", label: "Pricing" },
  { href: "#services", label: "Services" },
  { href: "#stack", label: "Stack" },
  { href: "#method", label: "Method" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={mark}
            alt="Nordway Consult logo"
            width={1024}
            height={1024}
            className="size-9"
          />
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-semibold tracking-tight">
              Nordway Consult
            </span>
            <span className="eyebrow block text-muted-foreground">Espoo · Finland</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:info@nordwayconsult.fi"
          className="rounded-full bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Email us
        </a>
      </div>
    </header>
  );
}
