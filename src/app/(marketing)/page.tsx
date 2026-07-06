import Link from "next/link";
import { Calculator } from "@/components/calculator";
import { SupplierScanner } from "@/components/supplier-scanner";

const MANIFEST = [
  { k: "Zrealizowane importy", v: "2 412" },
  { k: "Wartość towaru / rok", v: "184,2 mln zł" },
  { k: "Weryfikacja dostawcy", v: "48 h" },
  { k: "Prowizja", v: "od 3,9%" },
  { k: "Zespół w Chinach", v: "Shenzhen · Yiwu" },
];

const STEPS = [
  {
    n: "01",
    title: "Wklej link, AI liczy",
    desc: "Kalkulator analizuje ofertę z Alibaba/1688, klasyfikuje kod HS i liczy pełny landed cost w mniej niż 60 sekund.",
  },
  {
    n: "02",
    title: "Weryfikujemy i negocjujemy",
    desc: "AI skanuje wiarygodność dostawcy, a nasz zespół w Chinach negocjuje cenę, warunki i pilnuje jakości na miejscu.",
  },
  {
    n: "03",
    title: "Śledzisz wszystko w panelu",
    desc: "Statusy, zdjęcia z inspekcji, dokumenty celne, pozycja kontenera i płatności etapowe — w jednym miejscu, na żywo.",
  },
];

const SERVICES = [
  { name: "Kompleksowy import", price: "prowizja od 3,9%", sla: "oferta w 48h" },
  { name: "Weryfikacja dostawcy", price: "499 zł", sla: "raport w 48h" },
  { name: "Inspekcja poprodukcyjna", price: "od 1 180 zł", sla: "raport w 24h od wizyty" },
  { name: "Import maszyn + leasing", price: "wycena indywidualna", sla: "konsultacja 30 min gratis" },
];

export default function HomePage() {
  return (
    <>
      {/* ── pasek trasy ── */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-2 sm:px-6">
          <div className="route w-full">
            <span>Yantian 22.58°N</span>
            <span className="route-line" />
            <span className="hidden sm:inline">Małaszewicze</span>
            <span className="route-line hidden sm:block" />
            <span>Gdańsk BCT 54.35°N</span>
            <span className="ml-4 hidden text-accent md:inline">■ 3 kontenery w drodze</span>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="eyebrow">Platforma SinoFlow</div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[56px]">
              Import z Chin policzony co&nbsp;do złotówki.
              <span className="text-ink-soft"> Zanim wydasz pierwszego dolara.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Wklej link z Alibaba lub 1688 — AI policzy cło, VAT, fracht i realny
              koszt na sztuce w 60 sekund. Potem przejmujemy negocjacje, inspekcję
              i transport, a Ty śledzisz wszystko w panelu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#kalkulator"
                className="bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-hover"
              >
                Wyceń produkt teraz
              </a>
              <a
                href="#skaner"
                className="border border-ink/25 px-5 py-2.5 text-sm font-medium transition hover:border-ink"
              >
                Zweryfikuj dostawcę
              </a>
              <Link
                href="/o-nas"
                className="px-1 py-2.5 text-sm font-medium text-ink-soft transition hover:text-ink"
              >
                Konsultacja 30 min ↗
              </Link>
            </div>
          </div>

          {/* manifest danych */}
          <div className="lg:col-span-5">
            <div className="border border-line bg-card">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  Manifest / 2026-07
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  live
                </span>
              </div>
              <dl>
                {MANIFEST.map((m) => (
                  <div
                    key={m.k}
                    className="flex items-baseline justify-between border-b border-line px-5 py-3.5 last:border-0"
                  >
                    <dt className="text-[13px] text-ink-soft">{m.k}</dt>
                    <dd className="tabular font-mono text-[15px] font-semibold">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
              MSC AMBITION · MSCUYT482911 · ETA GDN 02.08
            </p>
          </div>
        </div>
      </section>

      {/* ── KALKULATOR ── */}
      <section className="border-b border-line bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="eyebrow">01 / Kalkulator landed cost</div>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            Pełny koszt importu, nie cena z Alibaby
          </h2>
          <div className="mt-8">
            <Calculator />
          </div>
        </div>
      </section>

      {/* ── PROCES ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="eyebrow">02 / Proces</div>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            80% robisz samoobsługowo.
            <span className="text-ink-soft"> Człowiek wchodzi tam, gdzie tworzy wartość.</span>
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-card p-6">
                <div className="font-mono text-xs font-semibold text-accent">{s.n}</div>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKANER ── */}
      <section id="skaner" className="border-b border-line bg-card/40">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="eyebrow">03 / Weryfikacja dostawcy</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              Zanim wpłacisz zaliczkę, sprawdź komu płacisz
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-ink-soft">
              Co czwarty problem naszych klientów zaczynał się od niezweryfikowanego
              dostawcy. Skaner AI agreguje wiek firmy, kapitał, certyfikaty
              i spójność danych rejestrowych; scoring 0–100 mówi wprost: zielony,
              żółty czy czerwony. Pełną weryfikację robi człowiek w 48 godzin.
            </p>
            <ul className="mt-7 max-w-lg divide-y divide-line border-y border-line">
              {[
                ["Skan AI", "30 s", "gratis"],
                ["Pełny raport z rekomendacją", "48 h", "499 zł"],
                ["Inspekcja fabryki na miejscu", "5 dni", "od 1 480 zł"],
              ].map(([name, time, price]) => (
                <li key={name} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                  <span>{name}</span>
                  <span className="tabular ml-auto font-mono text-xs text-ink-soft">{time}</span>
                  <span className="tabular font-mono font-semibold">{price}</span>
                </li>
              ))}
            </ul>
          </div>
          <SupplierScanner />
        </div>
      </section>

      {/* ── USŁUGI ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">04 / Usługi</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                Cena, zakres i SLA z góry
              </h2>
            </div>
            <Link href="/cennik" className="text-sm font-medium text-accent hover:underline">
              Pełny cennik ↗
            </Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link key={s.name} href="/uslugi" className="group bg-card p-5 transition hover:bg-accent-soft/40">
                <h3 className="text-[15px] font-semibold tracking-tight">{s.name}</h3>
                <div className="tabular mt-4 font-mono text-[15px] font-semibold text-accent">
                  {s.price}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                  {s.sla}
                </div>
                <div className="mt-5 text-[13px] font-medium text-ink-soft transition group-hover:text-accent">
                  Zamów ↗
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PANEL ── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid items-center gap-8 bg-ink px-6 py-10 text-paper sm:px-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/50">
                app.zaimportuj.pl
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
                Zobacz panel klienta w akcji
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/60">
                Pipeline zleceń, zdjęcia z inspekcji, dokumenty celne, pozycja
                kontenera i copilot AI, który odpowie „kiedy dopłynie mój kontener”.
              </p>
            </div>
            <Link
              href="/app"
              className="bg-accent px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-accent-hover"
            >
              Otwórz demo panelu ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
