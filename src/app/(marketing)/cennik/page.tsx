import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cennik — pełna transparentność",
  description:
    "Prowizja progresywna od wartości zamówienia, ceny usług jednostkowych i przykładowe kalkulacje realnych produktów.",
};

const COMMISSION = [
  { range: "do 20 000 zł", rate: "8,9%", min: "min. 890 zł" },
  { range: "20 001 – 50 000 zł", rate: "6,9%", min: "—" },
  { range: "50 001 – 150 000 zł", rate: "5,4%", min: "—" },
  { range: "150 001 – 500 000 zł", rate: "4,5%", min: "—" },
  { range: "powyżej 500 000 zł", rate: "3,9%", min: "negocjowalne" },
];

const EXAMPLES = [
  {
    product: "Hulajnogi elektryczne, 500 szt.",
    goods: "311 000 zł",
    landed: "437 500 zł",
    unit: "875 zł/szt.",
    commission: "19 690 zł (4,5%)",
  },
  {
    product: "Lampki LED z Qi, 2 000 szt.",
    goods: "78 800 zł",
    landed: "112 300 zł",
    unit: "56,15 zł/szt.",
    commission: "5 440 zł (6,9%)",
  },
  {
    product: "Laser fiber 3kW, 1 szt.",
    goods: "143 200 zł",
    landed: "198 700 zł",
    unit: "—",
    commission: "7 730 zł (5,4%)",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="eyebrow">Cennik</div>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em]">
        Pełna transparentność
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        Prowizja progresywna liczona od wartości towaru, bez ukrytych opłat.
        Fracht, cło i VAT przechodzą przez nas 1:1 z faktur źródłowych —
        wszystkie dokumenty widzisz w panelu.
      </p>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        Prowizja od importu kompleksowego
      </h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[480px] bg-card text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-soft">
                Wartość zamówienia (towar)
              </th>
              <th className="px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-soft">
                Prowizja
              </th>
              <th className="px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-soft">
                Uwagi
              </th>
            </tr>
          </thead>
          <tbody>
            {COMMISSION.map((c) => (
              <tr key={c.range} className="border-b border-line last:border-0">
                <td className="px-5 py-3">{c.range}</td>
                <td className="tabular px-5 py-3 font-mono font-semibold text-accent">{c.rate}</td>
                <td className="px-5 py-3 text-ink-soft">{c.min}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Przykładowe kalkulacje</h2>
      <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {EXAMPLES.map((e) => (
          <div key={e.product} className="bg-card p-5">
            <h3 className="text-sm font-semibold tracking-tight">{e.product}</h3>
            <dl className="mt-4">
              <div className="flex justify-between border-b border-line py-2 text-[13px]">
                <dt className="text-ink-soft">Towar (cena fabryczna)</dt>
                <dd className="tabular font-mono">{e.goods}</dd>
              </div>
              <div className="flex justify-between border-b border-line py-2 text-[13px]">
                <dt className="text-ink-soft">Pełny koszt importu</dt>
                <dd className="tabular font-mono font-semibold">{e.landed}</dd>
              </div>
              <div className="flex justify-between border-b border-line py-2 text-[13px]">
                <dt className="text-ink-soft">Na sztukę</dt>
                <dd className="tabular font-mono">{e.unit}</dd>
              </div>
              <div className="flex justify-between py-2 text-[13px]">
                <dt className="text-ink-soft">Nasza prowizja</dt>
                <dd className="tabular font-mono font-semibold text-accent">{e.commission}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
        Kalkulacje przykładowe wg kursów i stawek z 06.07.2026 · dokładną wycenę
        policzysz kalkulatorem na stronie głównej
      </p>
    </div>
  );
}
