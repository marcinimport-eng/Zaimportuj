import Link from "next/link";
import { notFound } from "next/navigation";
import { ORDERS } from "@/lib/mock-data";
import { formatPln } from "@/lib/landed-cost";
import { Pipeline } from "@/components/pipeline";

export function generateStaticParams() {
  return ORDERS.map((o) => ({ id: o.id }));
}

const EVENT_ICON: Record<string, string> = {
  status: "●",
  doc: "▤",
  payment: "◧",
  media: "▣",
  alert: "⚠",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = ORDERS.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/app" className="text-xs text-ink-soft hover:text-accent">
        ← Dashboard
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-bold text-accent">{order.id}</span>
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold capitalize text-accent">
              {order.status}
            </span>
          </div>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight">{order.product}</h1>
          <div className="mt-1 text-sm text-ink-soft">{order.supplier}</div>
        </div>
        <div className="text-right">
          <div className="tabular font-mono text-2xl font-bold">
            {formatPln(order.valueUsd * 3.68)}
          </div>
          <div className="text-xs text-ink-soft">
            {order.eta !== "—" ? `ETA ${order.eta}` : "w wycenie"}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-card p-5">
        <Pipeline status={order.status} />
        {order.vessel && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-paper p-3.5 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
              <span className="font-medium">{order.vessel}</span>
            </span>
            <span className="tabular font-mono text-xs text-ink-soft">
              postęp trasy: {order.progressPct}%
            </span>
          </div>
        )}
      </div>

      {order.nextPayment && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/40 bg-accent-soft p-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-accent">
              Najbliższa płatność
            </div>
            <div className="mt-1 font-semibold">{order.nextPayment.label}</div>
            <div className="text-xs text-ink-soft">termin: {order.nextPayment.due}</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="tabular font-mono text-xl font-bold">
              {formatPln(order.nextPayment.amountPln)}
            </span>
            <button className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover">
              Zapłać (P24)
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Timeline */}
        <section>
          <h2 className="text-lg font-semibold">Historia zlecenia</h2>
          <ol className="mt-4 space-y-0">
            {order.events.map((e, i) => (
              <li key={e.date + e.title} className="relative flex gap-4 pb-6">
                {i < order.events.length - 1 && (
                  <span className="absolute left-[11px] top-7 h-full w-px bg-line" aria-hidden />
                )}
                <span
                  className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                    i === 0
                      ? "bg-accent text-white"
                      : "border border-line bg-card text-ink-soft"
                  }`}
                >
                  {EVENT_ICON[e.kind]}
                </span>
                <div className="min-w-0 rounded-xl border border-line bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold">{e.title}</h3>
                    <time className="tabular font-mono text-[11px] text-ink-soft">{e.date}</time>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Side: dokumenty + inspekcja */}
        <aside className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Dokumenty</h2>
            <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-card">
              {order.documents.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{d.name}</div>
                    <div className="text-[11px] text-ink-soft">{d.type} · {d.date}</div>
                  </div>
                  <button className="shrink-0 text-xs font-semibold text-accent hover:underline">
                    Podgląd
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {order.inspectionPhotos > 0 && (
            <div>
              <h2 className="text-lg font-semibold">Media z inspekcji</h2>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-line to-paper text-[10px] text-ink-soft"
                  >
                    IMG_{String(i + 1).padStart(2, "0")}
                  </div>
                ))}
              </div>
              <button className="mt-2.5 w-full rounded-lg border border-line py-2 text-xs font-medium text-ink-soft transition hover:border-accent hover:text-accent">
                Zobacz wszystkie ({order.inspectionPhotos}) →
              </button>
            </div>
          )}

          <div className="rounded-2xl bg-ink p-4 text-paper">
            <div className="text-xs font-semibold">Copilot AI</div>
            <p className="mt-1.5 text-[11px] leading-relaxed opacity-70">
              „Przelicz co się stanie, jak zwiększę zamówienie do 5000 szt.”
            </p>
            <button className="mt-3 w-full rounded-lg bg-accent py-2 text-xs font-semibold text-white transition hover:bg-accent-hover">
              Zapytaj o to zlecenie
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
