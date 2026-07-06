"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SUPPLIER_SCAN_DEMO } from "@/lib/mock-data";

export function SupplierScanner() {
  const [scanned, setScanned] = useState(false);
  const s = SUPPLIER_SCAN_DEMO;

  return (
    <div className="rounded-2xl border border-line bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-6 items-center rounded-full bg-accent-soft px-2.5 font-mono text-[11px] font-semibold text-accent">
          AI-2
        </span>
        <h3 className="text-lg font-semibold tracking-tight">
          Skaner wiarygodności dostawcy
        </h3>
      </div>
      <p className="mt-2 text-sm text-ink-soft">
        Wklej nazwę firmy lub link do profilu Alibaba/1688 — AI zagreguje sygnały
        ryzyka i wystawi scoring 0–100.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          defaultValue={scanned ? s.name : ""}
          placeholder="np. Yiwu Sunshine Import & Export Co., Ltd."
          className="h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={() => setScanned(true)}
          className="h-11 shrink-0 rounded-lg bg-ink px-4 text-sm font-medium text-paper transition hover:opacity-85"
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
          <div className="mt-5 flex items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-line" />
                <motion.circle
                  cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6"
                  strokeLinecap="round" className="text-amber-500"
                  initial={{ strokeDasharray: "0 176" }}
                  animate={{ strokeDasharray: `${(s.score / 100) * 176} 176` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <span className="tabular absolute font-mono text-lg font-bold">{s.score}</span>
            </div>
            <div>
              <div className="text-sm font-semibold">
                Ryzyko umiarkowane —{" "}
                <span className="uppercase text-amber-600 dark:text-amber-400">status żółty</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Firma handlowa (nie producent), brak certyfikatów CE w rejestrach.
                Rekomendujemy pełną weryfikację przed wpłatą zaliczki.
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {s.signals.map((sig) => (
              <li key={sig.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-soft">
                  <span className={sig.ok ? "text-emerald-500" : "text-amber-500"}>
                    {sig.ok ? "✓" : "!"}
                  </span>
                  {sig.label}
                </span>
                <span className="font-medium">{sig.value}</span>
              </li>
            ))}
          </ul>

          <button className="mt-5 h-11 w-full rounded-lg bg-accent text-sm font-semibold text-white transition hover:bg-accent-hover">
            Zamów pełną weryfikację przez człowieka w 48h — 499 zł
          </button>
        </motion.div>
      )}
    </div>
  );
}
