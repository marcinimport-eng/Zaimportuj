"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CATEGORIES,
  FREIGHT_RATES,
  calculateLandedCost,
  formatPln,
  formatUsd,
  type TransportMode,
} from "@/lib/landed-cost";

const TRANSPORTS: { id: TransportMode; label: string; code: string }[] = [
  { id: "sea-lcl", label: "Morze LCL", code: "MORZE·LCL" },
  { id: "sea-fcl", label: "Morze FCL", code: "MORZE·FCL" },
  { id: "rail", label: "Kolej", code: "KOLEJ" },
  { id: "air", label: "Lotniczy", code: "LOT" },
];

const inputCls =
  "tabular mt-1.5 h-10 w-full border border-line bg-paper px-3 font-mono text-sm outline-none transition focus:border-ink";

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 text-[13px] text-ink-soft last:border-0">
      <span>{label}</span>
      <span className={`tabular font-mono ${accent ? "font-semibold text-accent" : "text-ink"}`}>
        {value}
      </span>
    </div>
  );
}

export function Calculator() {
  const [link, setLink] = useState("");
  const [price, setPrice] = useState(11.8);
  const [qty, setQty] = useState(1000);
  const [weight, setWeight] = useState(0.9);
  const [volume, setVolume] = useState(0.004);
  const [categoryId, setCategoryId] = useState("electronics");
  const [transport, setTransport] = useState<TransportMode>("sea-lcl");
  const [emailGate, setEmailGate] = useState(false);

  const result = useMemo(
    () =>
      calculateLandedCost({
        unitPriceUsd: price,
        quantity: qty,
        unitWeightKg: weight,
        unitVolumeM3: volume,
        categoryId,
        transport,
      }),
    [price, qty, weight, volume, categoryId, transport],
  );

  const breakdown = [
    { label: "Towar", value: result.goodsUsd, color: "bg-accent" },
    { label: "Fracht", value: result.freightUsd, color: "bg-sky-600" },
    { label: "Cło", value: result.dutyUsd + result.antiDumpingUsd, color: "bg-amber-500" },
    { label: "VAT 23%", value: result.vatUsd, color: "bg-violet-500" },
    { label: "Opłaty", value: result.insuranceUsd + result.agencyFeeUsd, color: "bg-emerald-600" },
  ];
  const sum = breakdown.reduce((a, b) => a + b.value, 0);

  return (
    <div
      id="kalkulator"
      className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_28px_64px_-24px_rgba(0,0,0,0.18)]"
    >
      <div className="grid lg:grid-cols-[1fr_400px]">
        {/* ── Wejście ── */}
        <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <label className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Link do produktu (Alibaba / 1688 / made-in-china) — AI uzupełni dane
          </label>
          <div className="mt-2 flex gap-2">
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.alibaba.com/product-detail/…"
              className="h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none transition focus:border-ink"
            />
            <button className="btn-anim h-10 shrink-0 rounded-lg bg-ink px-4 text-sm font-medium text-paper hover:opacity-85">
              Analizuj
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                Cena szt. (USD)
              </label>
              <input type="number" step="0.1" min="0" value={price}
                onChange={(e) => setPrice(+e.target.value || 0)} className={inputCls} />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                Ilość (szt.)
              </label>
              <input type="number" min="1" value={qty}
                onChange={(e) => setQty(+e.target.value || 1)} className={inputCls} />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                Waga szt. (kg)
              </label>
              <input type="number" step="0.1" min="0" value={weight}
                onChange={(e) => setWeight(+e.target.value || 0)} className={inputCls} />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                Objętość szt. (m³)
              </label>
              <input type="number" step="0.001" min="0" value={volume}
                onChange={(e) => setVolume(+e.target.value || 0)} className={inputCls} />
            </div>
          </div>

          <label className="mt-6 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Kategoria produktu
          </label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                className={`btn-anim rounded-md border px-3 py-1.5 text-xs font-medium ${
                  categoryId === c.id
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <label className="mt-6 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Transport
          </label>
          <div className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {TRANSPORTS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTransport(t.id)}
                className={`px-3 py-2.5 text-left transition ${
                  transport === t.id ? "bg-ink text-paper" : "bg-card hover:bg-paper"
                }`}
              >
                <div className="text-xs font-semibold">{t.label}</div>
                <div className={`tabular mt-0.5 font-mono text-[10px] ${transport === t.id ? "text-paper/60" : "text-ink-soft"}`}>
                  {t.code} · ~{FREIGHT_RATES[t.id].transitDays} dni
                </div>
              </button>
            ))}
          </div>

          {/* Klasyfikacja HS */}
          <div className="mt-7 border-t border-line pt-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  Klasyfikacja AI / taryfa celna UE · pewność{" "}
                  {(result.category.confidence * 100).toFixed(0)}%
                </div>
                <div className="mt-1.5 font-mono text-sm font-semibold">
                  HS {result.category.hsCode}
                  <span className="ml-2 font-sans font-normal text-ink-soft">
                    {result.category.hsLabel} · cło{" "}
                    {(result.category.dutyRate * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {result.category.requiresCE && (
                  <span className="rounded-md border border-amber-600/40 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    CE
                  </span>
                )}
                {result.category.antiDumping && (
                  <span className="rounded-md border border-accent/50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">
                    ANTYDUMPING
                  </span>
                )}
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
              Klasyfikacja wymaga potwierdzenia agenta celnego. Stan prawny
              06.07.2026 · 1 USD = 3,68 PLN (NBP).
            </p>
          </div>
        </div>

        {/* ── Wynik ── */}
        <div className="flex flex-col bg-paper p-6 sm:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            Pełny koszt importu (z dostawą)
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={Math.round(result.totalPln)}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="tabular mt-2 font-mono text-[40px] font-semibold leading-none tracking-tight"
            >
              {formatPln(result.totalPln)}
            </motion.div>
          </AnimatePresence>
          <div className="tabular mt-2 font-mono text-xs text-ink-soft">
            = {formatUsd(result.totalUsd)} · {result.transitDays} dni ·{" "}
            {result.totalVolumeM3.toFixed(1)} m³ / {Math.round(result.totalWeightKg)} kg
          </div>

          {/* struktura kosztów */}
          <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full">
            {breakdown.map((b) => (
              <motion.div
                key={b.label}
                animate={{ width: `${(b.value / sum) * 100}%` }}
                transition={{ duration: 0.35 }}
                className={b.color}
              />
            ))}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1">
            {breakdown.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                <span className={`h-2 w-2 ${b.color}`} />
                {b.label}
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-line">
            <Row label={`Towar (${qty.toLocaleString("pl-PL")} szt.)`} value={formatUsd(result.goodsUsd)} />
            <Row label="Fracht" value={formatUsd(result.freightUsd)} />
            <Row label="Ubezpieczenie 0,3%" value={formatUsd(result.insuranceUsd)} />
            <Row label={`Cło ${(result.category.dutyRate * 100).toFixed(1)}%`} value={formatUsd(result.dutyUsd)} />
            {result.antiDumpingUsd > 0 && (
              <Row label="Cło antydumpingowe 48,5%" value={formatUsd(result.antiDumpingUsd)} accent />
            )}
            <Row label="VAT 23% (do odliczenia)" value={formatUsd(result.vatUsd)} />
            <Row label="Agencja celna + SAD" value={formatUsd(result.agencyFeeUsd)} />
          </div>

          <div className="mt-5 rounded-xl bg-ink p-4 text-paper">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-60">
                Koszt jednostkowy
              </span>
              <span className="tabular font-mono text-lg font-semibold">
                {formatPln(result.unitLandedPln, 2)}
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-60">
                Sugerowana cena detaliczna
              </span>
              <span className="tabular font-mono text-sm">
                {formatPln(result.suggestedRetailPln, 2)}
                <span className="ml-1.5 text-emerald-400">
                  +{result.marginPct.toFixed(0)}%
                </span>
              </span>
            </div>
          </div>

          <div className="mt-auto pt-5">
            {emailGate ? (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="twoj@email.pl"
                  className="h-10 w-full rounded-lg border border-line bg-card px-3 text-sm outline-none focus:border-ink"
                />
                <button className="btn-anim h-10 shrink-0 rounded-lg bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover">
                  Wyślij PDF
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEmailGate(true)}
                className="btn-anim sheen h-10 w-full rounded-lg bg-accent text-sm font-medium text-white hover:bg-accent-hover"
              >
                Pobierz pełny raport PDF ↗
              </button>
            )}
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              Raport: minimalne zamówienie · ryzyka · lista certyfikacji
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
