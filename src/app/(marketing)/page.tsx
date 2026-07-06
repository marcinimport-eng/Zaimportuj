import Link from "next/link";
import { Calculator } from "@/components/calculator";
import { SupplierScanner } from "@/components/supplier-scanner";
import { CountUp } from "@/components/count-up";

const MANIFEST = [
  { k: "Zrealizowane importy", v: "2 412", count: true },
  { k: "Wartość towaru / rok", v: "184,2 mln zł", count: true },
  { k: "Weryfikacja dostawcy", v: "48 h", count: true },
  { k: "Prowizja", v: "od 3,9%", count: true },
  { k: "Zespół w Chinach", v: "Shenzhen · Yiwu", count: false },
];

const STEPS = [
  {
    n: "01",
    title: "Wklejasz link, AI liczy",
    desc: "Kalkulator analizuje ofertę z Alibaba/1688, klasyfikuje kod taryfowy i liczy pełny koszt importu w mniej niż 60 sekund.",
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
  { name: "Kompleksowy import", price: "prowizja od 3,9%", sla: "oferta w 48 h" },
  { name: "Weryfikacja dostawcy", price: "499 zł", sla: "raport w 48 h" },
  { name: "Inspekcja poprodukcyjna", price: "od 1 180 zł", sla: "raport w 24 h od wizyty" },
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
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[560px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent)]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="eyebrow hero-in">Platforma SinoFlow</div>
            <h1 className="hero-in d1 mt-5 text-4xl font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[56px]">
              Import z Chin policzony co&nbsp;do złotówki.
              <span className="text-ink-soft"> Zanim wydasz pierwszego dolara.</span>
            </h1>
            <p className="hero-in d2 mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Wklej link z Alibaba lub 1688 — AI policzy cło, VAT, fracht i realny
              koszt na sztuce w 60 sekund. Potem przejmujemy negocjacje, inspekcję
              i transport, a Ty śledzisz wszystko w panelu.
            </p>
            <div className="hero-in d3 mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#kalkulator"
                className="btn-anim sheen rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
              >
                Wyceń produkt teraz
              </a>
              <a
                href="#skaner"
                className="btn-anim rounded-lg border border-ink/25 px-5 py-2.5 text-sm font-medium hover:border-ink"
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
          <div className="hero-in d4 lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-line bg-card">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  Manifest / 2026-07
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500" />
                  na żywo
                </span>
              </div>
              <dl>
                {MANIFEST.map((m) => (
                  <div
                    key={m.k}
                    className="flex items-baseline justify-between border-b border-line px-5 py-3.5 last:border-0"
                  >
                    <dt className="text-[13px] text-ink-soft">{m.k}</dt>
                    <dd className="tabular font-mono text-[15px] font-semibold">
                      {m.count ? <CountUp value={m.v} /> : m.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="hero-in d5 mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
              MSC AMBITION · konosament MSCUYT482911 · Gdańsk 02.08
            </p>
          </div>
        </div>
      </section>

      {/* ── KALKULATOR ── */}
      <section className="border-b border-line bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="eyebrow" data-reveal>01 / Kalkulator kosztu importu</div>
          <h2
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
            data-reveal
            style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
          >
            Pełny koszt importu, nie cena z Alibaby
          </h2>
          <div className="mt-8" data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
            <Calculator />
          </div>
        </div>
      </section>

      {/* ── PROCES ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="eyebrow" data-reveal>02 / Proces</div>
          <h2
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
            data-reveal
            style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
          >
            80% robisz samoobsługowo.
            <span className="text-ink-soft"> Człowiek wchodzi tam, gdzie tworzy wartość.</span>
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="bg-card p-6"
                data-reveal
                style={{ "--reveal-delay": `${0.1 + i * 0.1}s` } as React.CSSProperties}
              >
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
            <div className="eyebrow" data-reveal>03 / Weryfikacja dostawcy</div>
            <h2
              className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
              data-reveal
              style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
            >
              Zanim wpłacisz zaliczkę, sprawdź komu płacisz
            </h2>
            <p
              className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-ink-soft"
              data-reveal
              style={{ "--reveal-delay": "0.14s" } as React.CSSProperties}
            >
              Co czwarty problem naszych klientów zaczynał się od niezweryfikowanego
              dostawcy. Skaner AI agreguje wiek firmy, kapitał, certyfikaty
              i spójność danych rejestrowych; ocena 0–100 mówi wprost: zielony,
              żółty czy czerwony. Pełną weryfikację robi człowiek w 48 godzin.
            </p>
            <ul
              className="mt-7 max-w-lg divide-y divide-line border-y border-line"
              data-reveal
              style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
            >
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
          <div data-reveal style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}>
            <SupplierScanner />
          </div>
        </div>
      </section>

      {/* ── USŁUGI ── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow" data-reveal>04 / Usługi</div>
              <h2
                className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
                data-reveal
                style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
              >
                Cena, zakres i termin z góry
              </h2>
            </div>
            <Link href="/cennik" className="text-sm font-medium text-accent hover:underline">
              Pełny cennik ↗
            </Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Link
                key={s.name}
                href="/uslugi"
                className="group bg-card p-5 transition hover:bg-accent-soft/40"
                data-reveal
                style={{ "--reveal-delay": `${0.08 + i * 0.08}s` } as React.CSSProperties}
              >
                <h3 className="text-[15px] font-semibold tracking-tight">{s.name}</h3>
                <div className="tabular mt-4 font-mono text-[15px] font-semibold text-accent">
                  {s.price}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                  {s.sla}
                </div>
                <div className="mt-5 text-[13px] font-medium text-ink-soft transition group-hover:translate-x-1 group-hover:text-accent">
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
          <div
            className="grid items-center gap-8 rounded-2xl bg-ink px-6 py-10 text-paper sm:px-10 lg:grid-cols-[1fr_auto]"
            data-reveal
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/50">
                app.zaimportuj.pl
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
                Zobacz panel klienta w akcji
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/60">
                Etapy zleceń, zdjęcia z inspekcji, dokumenty celne, pozycja
                kontenera i asystent AI, który odpowie „kiedy dopłynie mój kontener”.
              </p>
            </div>
            <Link
              href="/app"
              className="btn-anim sheen rounded-lg bg-accent px-6 py-3 text-center text-sm font-medium text-white hover:bg-accent-hover"
            >
              Otwórz demo panelu ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
