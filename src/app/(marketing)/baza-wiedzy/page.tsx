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
    title: "Bill of Lading, packing list, SAD — słownik dokumentów importera",
    updated: "2026-04-18",
    author: "Piotr Zieliński, spedytor",
    time: "11 min",
  },
];

const TOOLS = [
  { name: "Kalkulator cła i VAT", desc: "Stawka dla Twojego kodu HS", href: "/#kalkulator" },
  { name: "Konwerter CBM", desc: "Kartony → metry sześcienne → koszt frachtu", href: "#" },
  { name: "Wizard Incoterms", desc: "EXW, FOB czy CIF? 5 pytań i wiesz", href: "#" },
  { name: "Słownik importera", desc: "120 pojęć z celno-logistycznego żargonu", href: "#" },
];

export default function KnowledgeBasePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Baza wiedzy</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Artykuły pisane przez praktyków, z datą aktualizacji i wersjonowaniem
        przepisów. Gdy zmienia się TARIC, nasz monitoring AI flaguje artykuły
        do aktualizacji — i powiadamia klientów, których to dotyczy.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t) => (
          <a key={t.name} href={t.href} className="group rounded-2xl border border-line bg-card p-5 transition hover:border-accent">
            <h3 className="font-semibold group-hover:text-accent">{t.name}</h3>
            <p className="mt-1.5 text-xs text-ink-soft">{t.desc}</p>
          </a>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-semibold">Najnowsze artykuły</h2>
      <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-card">
        {ARTICLES.map((a) => (
          <article key={a.title} className="group flex cursor-pointer flex-col gap-1.5 px-6 py-5 transition hover:bg-paper/60">
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-semibold text-accent">{a.cluster}</span>
              <span className="text-ink-soft">aktualizacja: {a.updated} · {a.time} czytania</span>
            </div>
            <h3 className="text-[15px] font-semibold group-hover:text-accent">{a.title}</h3>
            <div className="text-xs text-ink-soft">{a.author}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
