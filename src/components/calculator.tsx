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

const TRANSPORTS: { id: TransportMode; label: string; icon: string }[] = [
  { id: "sea-lcl", label: "Morze LCL", icon: "🚢" },
  { id: "sea-fcl", label: "Morze FCL", icon: "🚢" },
  { id: "rail", label: "Kolej", icon: "🚆" },
  { id: "air", label: "Lotniczy", icon: "✈️" },
];

function Row({
  label,
  value,
  strong,
  accent,
}: {
  label: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-1.5 ${
        strong ? "text-[15px] font-semibold" : "text-sm text-ink-soft"
      }`}
    >
      <span>{label}</span>
      <span
        className={`tabular font-mono ${accent ? "text-accent" : strong ? "text-ink" : ""}`}
      >
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
    { label: "Fracht", value: result.freightUsd, color: "bg-sky-500" },
    { label: "Cło", value: result.dutyUsd + result.antiDumpingUsd, color: "bg-amber-500" },
    { label: "VAT 23%", value: result.vatUsd, color: "bg-violet-500" },
    { label: "Opłaty", value: result.insuranceUsd + result.agencyFeeUsd, color: "bg-emerald-500" },
  ];
  const sum = breakdown.reduce((a, b) => a + b.value, 0);

  return (
    <div
      id="kalkulator"
      className="overflow-hidden rounded-2xl border border-line bg-card shadow-xl shadow-black/5"
    >
      <div className="grid lg:grid-cols-[1fr_380px]">
        {/* ── Wejście ── */}
        <div className="border-b border-line p-6 lg:border-b-0 lg:border-r sm:p-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center rounded-full bg-accent-soft px-2.5 font-mono text-[11px] font-semibold text-accent">
              AI-1
            </span>
            <h2 className="text-lg font-semibold tracking-tight">
              Kalkulator landed cost
            </h2>
          </div>

          <label className="mt-5 block text-xs font-medium text-ink-soft">
            Link do produktu (Alibaba / 1688 / made-in-china) — AI uzupełni dane
          </label>
          <div className="mt-1.5 flex gap-2">
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.alibaba.com/product-detail/…"
              className="h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none transition focus:border-accent"
            />
            <button className="h-11 shrink-0 rounded-lg bg-ink px-4 text-sm font-medium text-paper transition hover:opacity-85">
              Analizuj
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ink-soft">
                Cena jednostkowa (USD)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={price}
                onChange={(e) => setPrice(+e.target.value || 0)}
                className="tabular mt-1.5 h-11 w-full rounded-lg border border-line bg-paper px-3 font-mono text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-soft">Ilość (szt.)</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(+e.target.value || 1)}
                className="tabular mt-1.5 h-11 w-full rounded-lg border border-line bg-paper px-3 font-mono text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-soft">Waga szt. (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(+e.target.value || 0)}
                className="tabular mt-1.5 h-11 w-full rounded-lg border border-line bg-paper px-3 font-mono text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-soft">
                Objętość szt. (m³)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                value={volume}
                onChange={(e) => setVolume(+e.target.value || 0)}
                className="tabular mt-1.5 h-11 w-full rounded-lg border border-line bg-paper px-3 font-mono text-sm outline-none focus:border-accent"
              />
            </div>
          </div>

          <label className="mt-5 block text-xs font-medium text-ink-soft">
            Kategoria produktu
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  categoryId === c.id
                    ? "border-accent bg-accent text-white"
                    : "border-line text-ink-soft hover:border-accent hover:text-accent"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-xs font-medium text-ink-soft">Transport</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TRANSPORTS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTransport(t.id)}
                className={`rounded-lg border px-3 py-2.5 text-left transition ${
                  transport === t.id
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-accent/50"
                }`}
              >
                <div className="text-xs font-semibold">
                  {t.icon} {t.label}
                </div>
                <div className="tabular mt-0.5 font-mono text-[11px] text-ink-soft">
                  ~{FREIGHT_RATES[t.id].transitDays} dni
                </div>
              </button>
            ))}
          </div>

          {/* Klasyfikacja HS */}
          <div className="mt-6 rounded-xl border border-dashed border-line bg-paper p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs text-ink-soft">
                  Klasyfikacja AI (TARIC) —{" "}
                  <span className="font-medium text-ink">
                    pewność {(result.category.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-1 font-mono text-sm font-semibold">
                  HS {result.category.hsCode}{" "}
                  <span className="font-sans font-normal text-ink-soft">
                    · {result.category.hsLabel} · cło{" "}
                    {(result.category.dutyRate * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {result.category.requiresCE && (
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    wymaga CE
                  </span>
                )}
                {result.category.antiDumping && (
                  <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-semibold text-red-600 dark:text-red-400">
                    antydumping 48,5%
                  </span>
                )}
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
              Klasyfikacja wymaga potwierdzenia agenta celnego. Stawki: stan prawny
              06.07.2026, kurs 1 USD = 3,68 PLN (NBP).
            </p>
          </div>
        </div>

        {/* ── Wynik ── */}
        <div className="flex flex-col bg-paper/50 p-6 sm:p-8">
          <div className="text-xs font-medium uppercase tracking-wider text-ink-soft">
            Pełny koszt importu (landed)
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={Math.round(result.totalPln)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="tabular mt-1 font-mono text-4xl font-bold tracking-tight text-accent"
            >
              {formatPln(result.totalPln)}
            </motion.div>
          </AnimatePresence>
          <div className="tabular mt-1 font-mono text-sm text-ink-soft">
            = {formatUsd(result.totalUsd)} · {result.transitDays} dni transportu
          </div>

          {/* pasek struktury kosztów */}
          <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full">
            {breakdown.map((b) => (
              <motion.div
                key={b.label}
                animate={{ width: `${(b.value / sum) * 100}%` }}
                transition={{ duration: 0.4 }}
                className={b.color}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {breakdown.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 text-[11px] text-ink-soft">
                <span className={`h-2 w-2 rounded-full ${b.color}`} />
                {b.label}
              </span>
            ))}
          </div>

          <div className="mt-5 divide-y divide-line border-t border-line">
            <Row label={`Towar (${qty.toLocaleString("pl-PL")} szt.)`} value={formatUsd(result.goodsUsd)} />
            <Row label={`Fracht ${result.totalVolumeM3.toFixed(1)} m³ / ${Math.round(result.totalWeightKg)} kg`} value={formatUsd(result.freightUsd)} />
            <Row label="Ubezpieczenie 0,3%" value={formatUsd(result.insuranceUsd)} />
            <Row label={`Cło ${(result.category.dutyRate * 100).toFixed(1)}%`} value={formatUsd(result.dutyUsd)} />
            {result.antiDumpingUsd > 0 && (
              <Row label="Cło antydumpingowe 48,5%" value={formatUsd(result.antiDumpingUsd)} accent />
            )}
            <Row label="VAT 23% (do odliczenia)" value={formatUsd(result.vatUsd)} />
            <Row label="Agencja celna + SAD" value={formatUsd(result.agencyFeeUsd)} />
          </div>

          <div className="mt-4 rounded-xl bg-ink p-4 text-paper">
            <div className="flex items-baseline justify-between">
              <span className="text-xs opacity-70">Koszt jednostkowy landed</span>
              <span className="tabular font-mono text-lg font-bold">
                {formatPln(result.unitLandedPln, 2)}
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="text-xs opacity-70">Sugerowana cena detaliczna</span>
              <span className="tabular font-mono text-sm">
                {formatPln(result.suggestedRetailPln, 2)}{" "}
                <span className="text-emerald-400">
                  (marża {result.marginPct.toFixed(0)}%)
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
                  className="h-11 w-full rounded-lg border border-line bg-card px-3 text-sm outline-none focus:border-accent"
                />
                <button className="h-11 shrink-0 rounded-lg bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover">
                  Wyślij PDF
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEmailGate(true)}
                className="h-11 w-full rounded-lg bg-accent text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover"
              >
                Pobierz pełny raport PDF →
              </button>
            )}
            <p className="mt-2 text-center text-[11px] text-ink-soft">
              Raport zawiera analizę MOQ, ryzyk i checklistę certyfikacji.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
