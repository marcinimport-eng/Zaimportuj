import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baza wiedzy — Akademia Importera",
  description:
    "Artykuły eksperckie o cle, VAT, certyfikacji i transporcie z Chin. Kalkulatory tematyczne i wizard Incoterms.",
};

const ARTICLES = [
  {
    cluster: "Cło i podatki",
    title: "Cło antydumpingowe na rowery i e-hulajnogi z Chin — stan na 2026",
    updated: "2026-06-28",
    author: "Anna Wójcik, agent celny",
    time: "9 min",
  },
  {
    cluster: "Certyfikacja",
    title: "Certyfikat CE na zabawki: EN 71 krok po kroku (z checklistą)",
    updated: "2026-06-15",
    author: "Marek Lis, ekspert compliance",
    time: "12 min",
  },
  {
    cluster: "Transport",
    title: "LCL czy FCL? Kiedy własny kontener zaczyna się opłacać",
    updated: "2026-07-01",
    author: "Piotr Zieliński, spedytor",
    time: "7 min",
  },
  {
    cluster: "Płatności",
    title: "DDP-pułapka: dlaczego „wszystko w cenie” bywa najdroższą opcją",
    updated: "2026-05-30",
    author: "Anna Wójcik, agent celny",
    time: "8 min",
  },
  {
    cluster: "Prawo",
    title: "KSeF dla importerów: jak rozliczać faktury od pośrednika",
    updated: "2026-06-20",
    author: "Katarzyna Nowak, doradca podatkowy",
    time: "10 min",
  },
  {
    cluster: "Dokumenty",
    title: "Konosament, lista pakowa, SAD — słownik dokumentów importera",
    updated: "2026-04-18",
    author: "Piotr Zieliński, spedytor",
    time: "11 min",
  },
];

const TOOLS = [
  { name: "Kalkulator cła i VAT", desc: "Stawka dla Twojego kodu HS", href: "/#kalkulator" },
  { name: "Konwerter CBM", desc: "Kartony → m³ → koszt frachtu", href: "#" },
  { name: "Kreator Incoterms", desc: "EXW, FOB czy CIF? 5 pytań i wiesz", href: "#" },
  { name: "Słownik importera", desc: "120 pojęć celno-logistycznych", href: "#" },
];

export default function KnowledgeBasePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="eyebrow">Baza wiedzy</div>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">
        Akademia Importera
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        Artykuły pisane przez praktyków, z datą aktualizacji i wersjonowaniem
        przepisów. Gdy zmienia się TARIC, monitoring AI flaguje artykuły do
        aktualizacji — i powiadamia klientów, których to dotyczy.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t) => (
          <a key={t.name} href={t.href} className="group bg-card p-5 transition hover:bg-accent-soft/40">
            <h3 className="text-sm font-semibold tracking-tight group-hover:text-accent">
              {t.name}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{t.desc}</p>
          </a>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Najnowsze artykuły</h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {ARTICLES.map((a) => (
          <article key={a.title} className="group grid cursor-pointer gap-1 py-5 transition sm:grid-cols-[140px_1fr_auto] sm:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
              {a.cluster}
            </span>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight group-hover:text-accent">
                {a.title}
              </h3>
              <div className="mt-1 text-xs text-ink-soft">{a.author}</div>
            </div>
            <span className="tabular font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              {a.updated} · {a.time}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
