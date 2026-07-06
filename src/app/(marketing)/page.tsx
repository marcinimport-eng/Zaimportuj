import Link from "next/link";
import { Calculator } from "@/components/calculator";
import { SupplierScanner } from "@/components/supplier-scanner";

const STATS = [
  { value: "2 400+", label: "zrealizowanych importów" },
  { value: "184 mln zł", label: "wartości towaru rocznie" },
  { value: "48 h", label: "weryfikacja dostawcy" },
  { value: "od 3,9%", label: "przejrzysta prowizja" },
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
  { name: "Kompleksowy import", price: "prowizja od 3,9%", sla: "oferta w 48h", href: "/uslugi" },
  { name: "Weryfikacja dostawcy", price: "499 zł", sla: "raport w 48h", href: "/uslugi" },
  { name: "Inspekcja poprodukcyjna", price: "od 1 180 zł", sla: "raport w 24h od wizyty", href: "/uslugi" },
  { name: "Import maszyn + leasing", price: "wycena indywidualna", sla: "konsultacja 30 min gratis", href: "/uslugi" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(232,68,46,0.10),transparent)]"
        />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Platforma SinoFlow · AI + eksperci na miejscu w Chinach
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Import z Chin policzony{" "}
              <span className="text-accent">co do złotówki</span>, zanim
              wydasz pierwszego dolara
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              Wklej link z Alibaba lub 1688 — nasza AI policzy cło, VAT, fracht
              i realny koszt na sztuce w 60 sekund. Potem przejmujemy negocjacje,
              inspekcję i transport, a Ty śledzisz wszystko w panelu.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#kalkulator" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover">
                Wyceń produkt teraz
              </a>
              <a href="#skaner" className="rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent">
                Zweryfikuj dostawcę
              </a>
              <Link href="/o-nas" className="px-2 py-3 text-sm font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                Umów konsultację 30 min →
              </Link>
            </div>
          </div>

          {/* Kalkulator w hero */}
          <div className="mt-12">
            <Calculator />
          </div>

          {/* Social proof */}
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="tabular font-mono text-2xl font-bold tracking-tight sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs text-ink-soft sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── JAK TO DZIAŁA ── */}
      <section className="border-t border-line bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            80% procesu robisz samoobsługowo.
            <br className="hidden sm:block" />
            <span className="text-ink-soft"> Człowiek wchodzi tam, gdzie tworzy wartość.</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-card p-6">
                <div className="font-mono text-sm font-bold text-accent">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKANER ── */}
      <section id="skaner" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Zanim wpłacisz zaliczkę,{" "}
              <span className="text-accent">sprawdź komu płacisz</span>
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-ink-soft">
              Co czwarty problem naszych klientów zaczynał się od niezweryfikowanego
              dostawcy. Skaner AI agreguje wiek firmy, kapitał, certyfikaty
              i spójność danych rejestrowych, a scoring 0–100 mówi wprost:
              zielony, żółty czy czerwony. Pełną weryfikację — z telefonami,
              dokumentami rejestrowymi i wizytą — robi człowiek w 48 godzin.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Darmowy skan AI w 30 sekund",
                "Pełny raport z rekomendacją w 48h — 499 zł",
                "Inspekcja fabryki na miejscu — od 1 480 zł",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <SupplierScanner />
        </div>
      </section>

      {/* ── USŁUGI ── */}
      <section className="border-t border-line bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Usługi z ceną i SLA.
              <span className="text-ink-soft"> Zero „zadzwoń, to pogadamy”.</span>
            </h2>
            <Link href="/cennik" className="text-sm font-medium text-accent hover:underline">
              Pełny cennik →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="group rounded-2xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
              >
                <h3 className="font-semibold">{s.name}</h3>
                <div className="tabular mt-3 font-mono text-lg font-bold text-accent">{s.price}</div>
                <div className="mt-1 text-xs text-ink-soft">{s.sla}</div>
                <div className="mt-4 text-sm font-medium text-ink-soft transition group-hover:text-accent">
                  Zamów →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PANEL ── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-paper sm:px-12">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Zobacz panel klienta w akcji
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed opacity-70 sm:text-base">
              Pipeline zleceń, zdjęcia z inspekcji, dokumenty celne, pozycja
              kontenera i copilot AI, który odpowie „kiedy dopłynie mój kontener”.
            </p>
            <Link
              href="/app"
              className="mt-7 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-hover"
            >
              Otwórz demo panelu →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
