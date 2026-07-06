import Link from "next/link";

const COLS = [
  {
    h: "Usługi",
    items: [
      ["Kompleksowy import", "/uslugi"],
      ["Weryfikacja dostawcy 48h", "/uslugi"],
      ["Inspekcja fabryki", "/uslugi"],
      ["Import maszyn + leasing", "/uslugi"],
    ],
  },
  {
    h: "Narzędzia",
    items: [
      ["Kalkulator kosztu importu", "/#kalkulator"],
      ["Baza wiedzy / Akademia", "/baza-wiedzy"],
      ["Konwerter CBM", "/baza-wiedzy"],
      ["Kreator Incoterms", "/baza-wiedzy"],
    ],
  },
  {
    h: "Firma",
    items: [
      ["O nas", "/o-nas"],
      ["Cennik", "/cennik"],
      ["Bezpieczeństwo", "/o-nas"],
      ["Panel klienta", "/app"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent font-mono text-[13px] font-bold leading-none text-white">Z</span>
            <span className="text-[15px] font-semibold tracking-tight">zaimportuj.pl</span>
          </div>
          <p className="mt-4 max-w-[26ch] text-[13px] leading-relaxed text-ink-soft">
            AI-native platforma importu z Chin. Biuro w Warszawie, zespół
            inspekcyjny w Shenzhen i Yiwu.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.h}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {col.h}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {col.items.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-ink-soft transition hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft sm:px-6">
          <span>© 2026 SinoFlow sp. z o.o. · WAW 52.23°N · SZX 22.54°N</span>
          <span>Kalkulacje szacunkowe · wymagają potwierdzenia agenta celnego · stan prawny: lipiec 2026</span>
        </div>
      </div>
    </footer>
  );
}
