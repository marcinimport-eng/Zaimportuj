import Link from "next/link";
import { notFound } from "next/navigation";
import { ORDERS } from "@/lib/mock-data";
import { formatPln } from "@/lib/landed-cost";
import { Pipeline } from "@/components/pipeline";

export function generateStaticParams() {
  return ORDERS.map((o) => ({ id: o.id }));
}

const EVENT_CODE: Record<string, string> = {
  status: "STA",
  doc: "DOK",
  payment: "PŁT",
  media: "FOT",
  alert: "ALR",
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
      <Link
        href="/app"
        className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft hover:text-ink"
      >
        ← Dashboard
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-semibold text-accent">{order.id}</span>
            <span className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              {order.status}
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{order.product}</h1>
          <div className="mt-1 text-sm text-ink-soft">{order.supplier}</div>
        </div>
        <div className="text-right">
          <div className="tabular font-mono text-2xl font-semibold">
            {formatPln(order.valueUsd * 3.68)}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
            {order.eta !== "—" ? `przybycie ${order.eta}` : "w wycenie"}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-line bg-card p-5">
        <Pipeline status={order.status} />
        {order.vessel && (
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.08em]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-600" />
              {order.vessel}
            </span>
            <span className="tabular text-ink-soft">trasa: {order.progressPct}%</span>
          </div>
        )}
      </div>

      {order.nextPayment && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent-soft/60 p-5">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              Najbliższa płatność
            </div>
            <div className="mt-1.5 text-sm font-semibold">{order.nextPayment.label}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              termin: {order.nextPayment.due}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="tabular font-mono text-xl font-semibold">
              {formatPln(order.nextPayment.amountPln)}
            </span>
            <button className="btn-anim rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover">
              Zapłać (P24)
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Timeline */}
        <section>
          <div className="eyebrow">Historia zlecenia</div>
          <ol className="mt-5">
            {order.events.map((e, i) => (
              <li key={e.date + e.title} className="relative flex gap-4 pb-5">
                {i < order.events.length - 1 && (
                  <span className="absolute left-[17px] top-8 h-full w-px bg-line" aria-hidden />
                )}
                <span
                  className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[9px] font-semibold ${
                    i === 0
                      ? "bg-accent text-white"
                      : "border border-line bg-card text-ink-soft"
                  }`}
                >
                  {EVENT_CODE[e.kind]}
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-line bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold tracking-tight">{e.title}</h3>
                    <time className="tabular font-mono text-[10px] text-ink-soft">{e.date}</time>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Side: dokumenty + inspekcja */}
        <aside className="space-y-8">
          <div>
            <div className="eyebrow">Dokumenty</div>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {order.documents.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium">{d.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                      {d.type} · {d.date}
                    </div>
                  </div>
                  <button className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-accent hover:underline">
                    Podgląd
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {order.inspectionPhotos > 0 && (
            <div>
              <div className="eyebrow">Media z inspekcji</div>
              <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center bg-paper font-mono text-[9px] text-ink-soft"
                  >
                    IMG_{String(i + 1).padStart(2, "0")}
                  </div>
                ))}
              </div>
              <button className="btn-anim mt-2.5 w-full rounded-lg border border-line py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft transition hover:border-ink hover:text-ink">
                Zobacz wszystkie ({order.inspectionPhotos}) ↗
              </button>
            </div>
          )}

          <div className="rounded-xl bg-ink p-4 text-paper">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
              Asystent AI
            </div>
            <p className="mt-2 text-[11px] leading-relaxed opacity-60">
              „Przelicz co się stanie, jak zwiększę zamówienie do 5000 szt.”
            </p>
            <button className="btn-anim mt-3 w-full rounded-lg bg-accent py-2 text-xs font-medium text-white hover:bg-accent-hover">
              Zapytaj o to zlecenie
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
