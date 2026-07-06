import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zaimportuj.pl — Import z Chin bez ryzyka | SinoFlow",
    template: "%s | Zaimportuj.pl",
  },
  description:
    "AI-native platforma importu z Chin. Policz pełny landed cost w 60 sekund, zweryfikuj dostawcę, śledź kontener w panelu klienta. Prowizja od 3,9%.",
  keywords: ["import z chin", "landed cost", "cło", "weryfikacja dostawcy", "1688", "alibaba"],
  openGraph: {
    title: "Zaimportuj.pl — Import z Chin bez ryzyka",
    description: "Policz pełny koszt importu w 60 sekund. AI + eksperci na miejscu w Chinach.",
    locale: "pl_PL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
  ],
};

const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
