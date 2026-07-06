import Link from "next/link";
import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Panel klienta — SinoFlow",
};

const NAV = [
  { href: "/app", label: "Dashboard", icon: "▦" },
  { href: "/app", label: "Zlecenia", icon: "⬡" },
  { href: "/app", label: "Dostawcy", icon: "◈" },
  { href: "/app", label: "Dokumenty", icon: "▤" },
  { href: "/app", label: "Faktury (KSeF)", icon: "◧" },
  { href: "/app", label: "Integracje", icon: "⇄" },
];

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-card md:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-line px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-white">Z</span>
          <div>
            <div className="text-sm font-semibold leading-none">SinoFlow</div>
            <div className="mt-0.5 text-[10px] text-ink-soft">panel klienta · demo</div>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                i === 0
                  ? "bg-accent-soft font-semibold text-accent"
                  : "text-ink-soft hover:bg-paper hover:text-ink"
              }`}
            >
              <span className="w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-line p-3">
          <div className="rounded-xl bg-paper p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Copilot AI
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">
              „Kiedy dopłynie mój kontener?” — zapytaj o cokolwiek dot. Twoich zleceń.
            </p>
            <button className="mt-2.5 w-full rounded-lg bg-ink py-2 text-xs font-medium text-paper transition hover:opacity-85">
              Otwórz czat
            </button>
          </div>
          <Link href="/" className="mt-3 block px-3 text-xs text-ink-soft hover:text-accent">
            ← wróć na zaimportuj.pl
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-paper/80 px-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3 md:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-white">Z</span>
            <span className="text-sm font-semibold">SinoFlow</span>
          </div>
          <div className="hidden text-sm text-ink-soft md:block">
            TechTrade sp. z o.o. · plan <span className="font-semibold text-ink">Pro</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-accent hover:text-accent" aria-label="Powiadomienia">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">3</span>
            </button>
            <ThemeToggle />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-bold text-accent">TT</div>
          </div>
        </header>
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
