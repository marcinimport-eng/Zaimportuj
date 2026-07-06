"use client";

import { useEffect, useRef, useState } from "react";

/** Grupowanie tysięcy spacją + przecinek dziesiętny (zapis polski). */
function formatPl(n: number, decimals: number): string {
  const [int, frac] = n.toFixed(decimals).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return frac ? `${grouped},${frac}` : grouped;
}

/**
 * Animowany licznik: parsuje pierwszą liczbę z `value` (np. "184,2 mln zł")
 * i nabija ją od zera, gdy element wejdzie w viewport. Reszta tekstu bez zmian.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const match = value.match(/\d[\d\s ]*(?:,\d+)?/);
    const el = ref.current;
    if (!match || !el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raw = match[0].replace(/[\s ]+$/, "");
    const target = parseFloat(raw.replace(/[\s ]/g, "").replace(",", "."));
    const decimals = raw.includes(",") ? raw.split(",")[1].length : 0;
    const start = match.index ?? 0;
    const prefix = value.slice(0, start);
    const suffix = value.slice(start + raw.length);
    const fmt = (n: number) => prefix + formatPl(n, decimals) + suffix;

    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setText(fmt(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        setText(fmt(0));
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{text}</span>;
}
