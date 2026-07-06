import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas — zespół w Polsce i Chinach",
  description:
    "Zespół zaimportuj.pl: eksperci celni w Warszawie, inspektorzy w Shenzhen i Yiwu. Licencje, biuro, magazyn konsolidacyjny.",
};

const TEAM = [
  { name: "Michał Krawczyk", role: "CEO, 12 lat w imporcie", loc: "WAW", initials: "MK" },
  { name: "Anna Wójcik", role: "Agent celny (licencja MF)", loc: "WAW", initials: "AW" },
  { name: "Li Wei 李伟", role: "Head of Sourcing", loc: "SZX", initials: "LW" },
  { name: "Zhang Min 张敏", role: "QC / inspekcje", loc: "YIW", initials: "ZM" },
  { name: "Piotr Zieliński", role: "Spedycja i logistyka", loc: "GDN", initials: "PZ" },
  { name: "Katarzyna Nowak", role: "Rozliczenia, KSeF", loc: "WAW", initials: "KN" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="eyebrow">O nas</div>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">
        Firma technologiczna z licencją agencji celnej
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
        Zespół sourcingowy i inspekcyjny pracuje na miejscu w Shenzhen i Yiwu,
        gdzie prowadzimy magazyn konsolidacyjny 1 200 m². W Polsce: biuro
        w Warszawie i własna odprawa w Gdańsku.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((t) => (
          <div key={t.name} className="flex items-center gap-4 bg-card p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent-soft font-mono text-xs font-semibold text-accent">
              {t.initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">{t.name}</div>
              <div className="mt-0.5 text-xs text-ink-soft">
                {t.role} · <span className="font-mono">{t.loc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {[
          { title: "Licencja agencji celnej", desc: "Wpis do rejestru przedstawicieli celnych, gwarancja generalna." },
          { title: "Rachunek powierniczy", desc: "Opcja escrow: dostawca dostaje pieniądze po pozytywnej inspekcji." },
          { title: "RODO + szyfrowanie", desc: "Dokumenty szyfrowane at-rest, RLS per-tenant, audit log w panelu." },
        ].map((b) => (
          <div key={b.title} className="bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid items-center gap-8 bg-ink px-6 py-10 text-paper sm:px-10 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            Umów bezpłatną konsultację 30 min
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/60">
            Porozmawiaj z ekspertem o swoim produkcie — bez zobowiązań.
          </p>
        </div>
        <a
          href="mailto:office@xtn.pl"
          className="bg-accent px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-accent-hover"
        >
          Wybierz termin ↗
        </a>
      </div>
    </div>
  );
}
