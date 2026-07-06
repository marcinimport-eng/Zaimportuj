import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/cennik", label: "Cennik" },
  { href: "/baza-wiedzy", label: "Baza wiedzy" },
  { href: "/o-nas", label: "O nas" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-white">Z</span>
          <span className="text-[17px] font-semibold tracking-tight">
            zaimportuj<span className="text-accent">.pl</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/app"
            className="hidden rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent sm:block"
          >
            Panel klienta
          </Link>
          <Link
            href="/#kalkulator"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-accent-hover"
          >
            Wyceń import
          </Link>
        </div>
      </div>
    </header>
  );
}
