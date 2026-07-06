import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usługi — każda z ceną, zakresem i SLA",
  description:
    "Kompleksowy import, import z 1688, weryfikacja dostawcy 48h, inspekcje, certyfikacja CE, transport i odprawa, import maszyn z leasingiem.",
};

const SERVICES = [
  {
    name: "Kompleksowy import",
    price: "prowizja od 3,9%",
    sla: "oferta w 48h",
    scope:
      "Sourcing, negocjacje, kontrakt, kontrola produkcji, inspekcja, transport, odprawa i dostawa pod drzwi. Jedna umowa, jedna faktura VAT.",
    badge: "bestseller",
  },
  {
    name: "Import z 1688.com",
    price: "prowizja od 5%",
    sla: "wycena koszyka w 24h",
    scope:
      "Zakupy na chińskim rynku hurtowym bez konta i znajomości języka: konsolidacja w naszym magazynie w Yiwu, kontrola jakości, wysyłka zbiorcza.",
  },
  {
    name: "Weryfikacja dostawcy 48h",
    price: "499 zł",
    sla: "raport w 48h",
    scope:
      "Dokumenty rejestrowe AIC, licencja eksportowa, kapitał, sprawy sądowe, referencje, rozmowa telefoniczna po chińsku. Scoring + rekomendacja.",
  },
  {
    name: "Inspekcja fabryki",
    price: "od 1 480 zł",
    sla: "wizyta w 5 dni roboczych",
    scope:
      "Audyt na miejscu: linie produkcyjne, certyfikaty, warunki pracy, realna moc produkcyjna. Raport z 60+ zdjęciami i wideo.",
  },
  {
    name: "Inspekcja poprodukcyjna (AQL)",
    price: "od 1 180 zł",
    sla: "raport w 24h od wizyty",
    scope:
      "Kontrola partii wg AQL 2.5 przed wysyłką: wymiary, funkcje, opakowania, oznakowanie CE. Decyzja PASS/FAIL zanim zapłacisz balance.",
  },
  {
    name: "Certyfikacja CE / badania",
    price: "wycena w 24h",
    sla: "zależnie od dyrektywy",
    scope:
      "Analiza wymogów (LVD, EMC, RED, zabawki EN 71), organizacja badań w akredytowanych laboratoriach, kompletacja dokumentacji technicznej.",
  },
  {
    name: "Transport + odprawa",
    price: "od 52 USD/m³",
    sla: "booking w 24h",
    scope:
      "Morze LCL/FCL, kolej, lotniczy. Odprawa we własnej agencji celnej, procedura 4200, składy celne. Tracking kontenera w panelu.",
  },
  {
    name: "Import maszyn + leasing",
    price: "wycena indywidualna",
    sla: "konsultacja 30 min gratis",
    scope:
      "CNC, lasery, linie produkcyjne: audyt techniczny przed zakupem, FAT/SAT, transport ponadgabarytowy, finansowanie leasingiem od partnerów.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="eyebrow">Usługi</div>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">
        Cena, zakres i SLA z góry
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        Każda usługa to produkt: znasz cenę, zakres i termin zanim zamówisz.
        Zamawiasz online, status śledzisz w panelu.
      </p>
      <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.name} className="relative bg-card p-6">
            {s.badge && (
              <span className="absolute right-6 top-6 border border-accent/50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                {s.badge}
              </span>
            )}
            <h2 className="text-[17px] font-semibold tracking-tight">{s.name}</h2>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="tabular font-mono text-lg font-semibold text-accent">{s.price}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                SLA: {s.sla}
              </span>
            </div>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft">{s.scope}</p>
            <button className="mt-5 bg-ink px-4 py-2 text-[13px] font-medium text-paper transition hover:opacity-85">
              Zamów ↗
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
