import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Panel klienta — SinoFlow",
};

const NAV = [
  "Pulpit",
  "Zlecenia",
  "Dostawcy",
  "Dokumenty",
  "Faktury (KSeF)",
  "Integracje",
];

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-line bg-card md:flex">
        <div className="flex h-14 items-center gap-2.5 border-b border-line px-4">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent font-mono text-[13px] font-bold leading-none text-white">Z</span>
          <div>
            <div className="text-[13px] font-semibold leading-none tracking-tight">SinoFlow</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
              panel klienta · demo
            </div>
          </div>
        </div>
        <nav className="flex-1 py-3">
          {NAV.map((label, i) => (
            <Link
              key={label}
              href="/app"
              className={`flex items-center gap-3 border-l-2 px-4 py-2.5 text-[13px] transition ${
                i === 0
                  ? "border-accent bg-accent-soft/50 font-semibold text-ink"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-line p-3">
          <div className="rounded-xl border border-line bg-paper p-3.5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Asystent AI
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
              „Kiedy dopłynie mój kontener?” — zapytaj o cokolwiek dot. Twoich zleceń.
            </p>
            <button className="btn-anim mt-3 w-full rounded-lg bg-ink py-2 text-xs font-medium text-paper hover:opacity-85">
              Otwórz czat
            </button>
          </div>
          <Link href="/" className="mt-3 block px-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft hover:text-ink">
            ← zaimportuj.pl
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-paper/85 px-4 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3 md:hidden">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent font-mono text-[13px] font-bold leading-none text-white">Z</span>
            <span className="text-[13px] font-semibold tracking-tight">SinoFlow</span>
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft md:block">
            TechTrade sp. z o.o. · plan <span className="font-semibold text-ink">Pro</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              className="btn-anim relative flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-soft transition hover:border-ink hover:text-ink"
              aria-label="Powiadomienia"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent font-mono text-[8px] font-bold text-white">3</span>
            </button>
            <ThemeToggle />
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">TT</div>
          </div>
        </header>
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
