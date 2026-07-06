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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-accent font-mono text-[13px] font-bold leading-none text-white">
            Z
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            zaimportuj.pl
          </span>
          <span className="mt-px hidden font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft lg:block">
            / sinoflow
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-[13px] font-medium text-ink-soft md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/app"
            className="hidden border border-line px-3.5 py-1.5 text-[13px] font-medium transition hover:border-ink sm:block"
          >
            Panel klienta
          </Link>
          <Link
            href="/#kalkulator"
            className="bg-accent px-3.5 py-1.5 text-[13px] font-medium text-white transition hover:bg-accent-hover"
          >
            Wyceń import
          </Link>
        </div>
      </div>
    </header>
  );
}
