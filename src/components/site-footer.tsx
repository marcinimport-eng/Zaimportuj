import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-white">Z</span>
            <span className="font-semibold tracking-tight">zaimportuj.pl</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            AI-native platforma importu z Chin. Biuro w Warszawie, zespół
            inspekcyjny w Shenzhen i Yiwu.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Usługi</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/uslugi" className="hover:text-accent">Kompleksowy import</Link></li>
            <li><Link href="/uslugi" className="hover:text-accent">Weryfikacja dostawcy 48h</Link></li>
            <li><Link href="/uslugi" className="hover:text-accent">Inspekcja fabryki</Link></li>
            <li><Link href="/uslugi" className="hover:text-accent">Import maszyn + leasing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Narzędzia</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/#kalkulator" className="hover:text-accent">Kalkulator landed cost</Link></li>
            <li><Link href="/baza-wiedzy" className="hover:text-accent">Baza wiedzy / Akademia</Link></li>
            <li><Link href="/baza-wiedzy" className="hover:text-accent">Konwerter CBM</Link></li>
            <li><Link href="/baza-wiedzy" className="hover:text-accent">Wizard Incoterms</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Firma</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/o-nas" className="hover:text-accent">O nas</Link></li>
            <li><Link href="/cennik" className="hover:text-accent">Cennik</Link></li>
            <li><Link href="/o-nas" className="hover:text-accent">Bezpieczeństwo</Link></li>
            <li><a href="mailto:office@xtn.pl" className="hover:text-accent">Kontakt</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-ink-soft">
        © 2026 SinoFlow sp. z o.o. · Kalkulacje mają charakter szacunkowy i wymagają
        potwierdzenia agenta celnego. Stan prawny: lipiec 2026.
      </div>
    </footer>
  );
}
