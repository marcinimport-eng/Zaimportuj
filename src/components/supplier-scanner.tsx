"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SUPPLIER_SCAN_DEMO } from "@/lib/mock-data";

export function SupplierScanner() {
  const [scanned, setScanned] = useState(false);
  const s = SUPPLIER_SCAN_DEMO;

  return (
    <div className="border border-line bg-card shadow-[0_28px_64px_-24px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          AI-2 / Skaner wiarygodności
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          scoring 0–100
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-ink-soft">
          Wklej nazwę firmy lub link do profilu Alibaba/1688 — AI zagreguje
          sygnały ryzyka.
        </p>

        <div className="mt-4 flex gap-2">
          <input
            defaultValue={scanned ? s.name : ""}
            placeholder="np. Yiwu Sunshine Import & Export Co., Ltd."
            className="h-10 w-full border border-line bg-paper px-3 text-sm outline-none focus:border-ink"
          />
          <button
            onClick={() => setScanned(true)}
            className="h-10 shrink-0 bg-ink px-4 text-sm font-medium text-paper transition hover:opacity-85"
          >
            Skanuj
          </button>
        </div>

        {scanned && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="mt-5 flex items-center gap-4 border border-amber-600/30 bg-amber-500/10 p-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="5" className="text-line" />
                  <motion.circle
                    cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="5"
                    className="text-amber-500"
                    initial={{ strokeDasharray: "0 176" }}
                    animate={{ strokeDasharray: `${(s.score / 100) * 176} 176` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <span className="tabular absolute font-mono text-lg font-semibold">{s.score}</span>
              </div>
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-700 dark:text-amber-400">
                  Ryzyko umiarkowane / status żółty
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  Firma handlowa (nie producent), brak certyfikatów CE
                  w rejestrach. Rekomendujemy pełną weryfikację przed wpłatą
                  zaliczki.
                </p>
              </div>
            </div>

            <ul className="mt-4 divide-y divide-line border-y border-line">
              {s.signals.map((sig) => (
                <li key={sig.label} className="flex items-center justify-between py-2.5 text-[13px]">
                  <span className="flex items-center gap-2.5 text-ink-soft">
                    <span className={`font-mono ${sig.ok ? "text-emerald-600" : "text-amber-600 dark:text-amber-400"}`}>
                      {sig.ok ? "OK" : "!!"}
                    </span>
                    {sig.label}
                  </span>
                  <span className="font-medium">{sig.value}</span>
                </li>
              ))}
            </ul>

            <button className="mt-5 h-10 w-full bg-accent text-sm font-medium text-white transition hover:bg-accent-hover">
              Zamów pełną weryfikację w 48h — 499 zł
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
