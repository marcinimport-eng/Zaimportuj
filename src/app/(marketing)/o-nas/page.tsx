import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas — zespół w Polsce i Chinach",
  description:
    "Zespół zaimportuj.pl: eksperci celni w Warszawie, inspektorzy w Shenzhen i Yiwu. Licencje, biuro, magazyn konsolidacyjny.",
};

const TEAM = [
  { name: "Michał Krawczyk", role: "CEO, 12 lat w imporcie", loc: "Warszawa", initials: "MK" },
  { name: "Anna Wójcik", role: "Agent celny (licencja MF)", loc: "Warszawa", initials: "AW" },
  { name: "Li Wei 李伟", role: "Head of Sourcing", loc: "Shenzhen", initials: "LW" },
  { name: "Zhang Min 张敏", role: "QC / inspekcje", loc: "Yiwu", initials: "ZM" },
  { name: "Piotr Zieliński", role: "Spedycja i logistyka", loc: "Gdańsk", initials: "PZ" },
  { name: "Katarzyna Nowak", role: "Rozliczenia, KSeF", loc: "Warszawa", initials: "KN" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">O nas</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
        Jesteśmy firmą technologiczną z licencją agencji celnej. Zespół sourcingowy
        i inspekcyjny pracuje na miejscu w Shenzhen i Yiwu, gdzie prowadzimy magazyn
        konsolidacyjny 1 200 m². W Polsce: biuro w Warszawie i własna odprawa w Gdańsku.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((t) => (
          <div key={t.name} className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-bold text-accent">
              {t.initials}
            </div>
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-ink-soft">{t.role} · {t.loc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { title: "Licencja agencji celnej", desc: "Wpis do rejestru przedstawicieli celnych, gwarancja generalna." },
          { title: "Rachunek powierniczy", desc: "Opcja escrow: dostawca dostaje pieniądze po pozytywnej inspekcji." },
          { title: "RODO + szyfrowanie", desc: "Dokumenty szyfrowane at-rest, RLS per-tenant, audit log w panelu." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-ink p-8 text-center text-paper sm:p-12">
        <h2 className="text-2xl font-bold">Umów bezpłatną konsultację 30 min</h2>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-70">
          Porozmawiaj z ekspertem o swoim produkcie — bez zobowiązań.
        </p>
        <a
          href="mailto:office@xtn.pl"
          className="mt-6 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
        >
          Wybierz termin →
        </a>
      </div>
    </div>
  );
}
