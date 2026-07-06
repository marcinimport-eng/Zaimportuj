import { PIPELINE, type OrderStatus } from "@/lib/mock-data";

export function Pipeline({ status }: { status: OrderStatus }) {
  const activeIdx = PIPELINE.indexOf(status);
  return (
    <div className="flex items-center gap-1">
      {PIPELINE.map((step, i) => (
        <div key={step} className="flex flex-1 flex-col gap-1.5">
          <div
            className={`h-1.5 rounded-full ${
              i < activeIdx
                ? "bg-emerald-500"
                : i === activeIdx
                  ? "bg-accent"
                  : "bg-line"
            }`}
          />
          <span
            className={`hidden text-[10px] capitalize lg:block ${
              i === activeIdx ? "font-semibold text-accent" : "text-ink-soft"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
