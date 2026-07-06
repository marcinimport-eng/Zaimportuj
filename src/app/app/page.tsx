import Link from "next/link";
import { ORDERS } from "@/lib/mock-data";
import { formatPln } from "@/lib/landed-cost";
import { Pipeline } from "@/components/pipeline";

const KPIS = [
  { label: "Aktywne zlecenia", value: "3", sub: "1 w transporcie" },
  { label: "Towar w drodze", value: "311 tys. zł", sub: "ETA Gdańsk: 2 sie" },
  { label: "Najbliższa płatność", value: "217,8 tys. zł", sub: "II transza · 12 lip" },
  { label: "Alerty", value: "1", sub: "zapas X9 Pro na 21 dni" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dzień dobry 👋</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Kontener SF-2411 wypłynął z Yantian. Wszystko idzie zgodnie z planem.
          </p>
        </div>
        <Link
          href="/app"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover"
        >
          + Nowe zlecenie
        </Link>
      </div>

      {/* KPI */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-2xl border border-line bg-card p-4">
            <div className="text-xs text-ink-soft">{k.label}</div>
            <div className="tabular mt-1.5 font-mono text-xl font-bold tracking-tight">{k.value}</div>
            <div className="mt-0.5 text-[11px] text-ink-soft">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Alert re-order (integracja Allegro) */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
        <span className="mt-0.5 text-amber-500">⚠</span>
        <div className="text-sm">
          <span className="font-semibold">Sugestia re-orderu (Allegro):</span>{" "}
          przy obecnym tempie sprzedaży zapas hulajnóg X9 Pro skończy się za{" "}
          <span className="tabular font-mono font-semibold">21 dni</span>, a produkcja +
          transport trwa <span className="tabular font-mono font-semibold">45 dni</span> —
          zamów dziś, żeby uniknąć przerwy w sprzedaży.{" "}
          <Link href="/app" className="font-semibold text-accent hover:underline">
            Przygotuj zamówienie →
          </Link>
        </div>
      </div>

      {/* Zlecenia */}
      <h2 className="mt-8 text-lg font-semibold">Aktywne zlecenia</h2>
      <div className="mt-3 space-y-3">
        {ORDERS.map((o) => (
          <Link
            key={o.id}
            href={`/app/zlecenia/${o.id}`}
            className="block rounded-2xl border border-line bg-card p-5 transition hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-accent">{o.id}</span>
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold capitalize text-accent">
                    {o.status}
                  </span>
                </div>
                <h3 className="mt-1.5 truncate font-semibold">{o.product}</h3>
                <div className="mt-0.5 truncate text-xs text-ink-soft">{o.supplier}</div>
              </div>
              <div className="text-right">
                <div className="tabular font-mono text-lg font-bold">
                  {formatPln(o.valueUsd * 3.68)}
                </div>
                <div className="text-xs text-ink-soft">
                  {o.eta !== "—" ? `ETA ${o.eta}` : "oferta w przygotowaniu"}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Pipeline status={o.status} />
            </div>
            {o.vessel && (
              <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
                {o.vessel} · pozycja aktualizowana co 6h
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
