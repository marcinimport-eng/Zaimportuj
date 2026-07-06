/** Dane demo panelu klienta — w produkcji: PostgreSQL + RLS per-tenant. */

export type OrderStatus =
  | "wycena"
  | "zamówienie"
  | "produkcja"
  | "inspekcja"
  | "transport"
  | "odprawa"
  | "dostawa";

export const PIPELINE: OrderStatus[] = [
  "wycena",
  "zamówienie",
  "produkcja",
  "inspekcja",
  "transport",
  "odprawa",
  "dostawa",
];

export interface OrderEvent {
  date: string;
  title: string;
  detail: string;
  kind: "status" | "doc" | "payment" | "media" | "alert";
}

export interface OrderDoc {
  name: string;
  type: string;
  date: string;
}

export interface Order {
  id: string;
  product: string;
  supplier: string;
  status: OrderStatus;
  valueUsd: number;
  qty: number;
  eta: string;
  vessel?: string;
  progressPct: number;
  nextPayment?: { label: string; amountPln: number; due: string };
  events: OrderEvent[];
  documents: OrderDoc[];
  inspectionPhotos: number;
}

export const ORDERS: Order[] = [
  {
    id: "SF-2411",
    product: "Hulajnogi elektryczne X9 Pro — 500 szt.",
    supplier: "Shenzhen Aerlang Technology Co., Ltd.",
    status: "transport",
    valueUsd: 84500,
    qty: 500,
    eta: "2026-08-02",
    vessel: "MSC AMBITION → Gdańsk BCT",
    progressPct: 68,
    nextPayment: { label: "II transza 70% (balance)", amountPln: 217800, due: "2026-07-12" },
    events: [
      { date: "2026-07-04", title: "Kontener załadowany na statek", detail: "MSC AMBITION, wyjście z portu Yantian. ETA Gdańsk: 2 sierpnia.", kind: "status" },
      { date: "2026-07-01", title: "Bill of Lading wystawiony", detail: "B/L nr MSCUYT482911 dodany do dokumentów.", kind: "doc" },
      { date: "2026-06-27", title: "Raport inspekcji poprodukcyjnej", detail: "AQL 2.5 — wynik: PASS. 3 uwagi kosmetyczne, 48 zdjęć.", kind: "media" },
      { date: "2026-06-12", title: "Produkcja zakończona", detail: "500/500 szt. gotowe do inspekcji.", kind: "status" },
      { date: "2026-05-08", title: "Zaliczka 30% zaksięgowana", detail: "93 340 PLN — potwierdzenie przekazane dostawcy.", kind: "payment" },
    ],
    documents: [
      { name: "Proforma Invoice PI-2411", type: "PDF", date: "2026-05-06" },
      { name: "Packing List", type: "PDF", date: "2026-06-30" },
      { name: "Bill of Lading MSCUYT482911", type: "PDF", date: "2026-07-01" },
      { name: "Deklaracja zgodności CE + EN 17128", type: "PDF", date: "2026-06-20" },
      { name: "Raport inspekcji AQL (48 zdjęć)", type: "ZIP", date: "2026-06-27" },
    ],
    inspectionPhotos: 48,
  },
  {
    id: "SF-2418",
    product: "Lampki biurkowe LED z ładowarką Qi — 2 000 szt.",
    supplier: "Ningbo Brighture Lighting Co., Ltd.",
    status: "produkcja",
    valueUsd: 21400,
    qty: 2000,
    eta: "2026-09-10",
    progressPct: 35,
    nextPayment: { label: "Inspekcja poprodukcyjna", amountPln: 1180, due: "2026-07-28" },
    events: [
      { date: "2026-07-03", title: "Produkcja rozpoczęta", detail: "Deklarowany czas: 25 dni roboczych.", kind: "status" },
      { date: "2026-06-30", title: "Zaliczka 30% zaksięgowana", detail: "23 640 PLN.", kind: "payment" },
      { date: "2026-06-24", title: "Próbka zaakceptowana", detail: "Wideo z testu ładowania Qi w galerii.", kind: "media" },
    ],
    documents: [
      { name: "Proforma Invoice PI-2418", type: "PDF", date: "2026-06-28" },
      { name: "Specyfikacja techniczna + branding", type: "PDF", date: "2026-06-22" },
    ],
    inspectionPhotos: 12,
  },
  {
    id: "SF-2423",
    product: "Laser fiber 3kW z automatycznym podajnikiem",
    supplier: "Jinan Bodor CNC Machine Co., Ltd.",
    status: "wycena",
    valueUsd: 38900,
    qty: 1,
    eta: "—",
    progressPct: 8,
    events: [
      { date: "2026-07-05", title: "Oferta w przygotowaniu", detail: "Negocjujemy DAP Gdańsk z instalacją. Oferta do akceptacji w 48h.", kind: "status" },
      { date: "2026-07-04", title: "Weryfikacja dostawcy: ZIELONY (91/100)", detail: "Raport AI + audyt dokumentów rejestrowych w załączeniu.", kind: "doc" },
    ],
    documents: [
      { name: "Raport wiarygodności dostawcy", type: "PDF", date: "2026-07-04" },
    ],
    inspectionPhotos: 0,
  },
];

export const SUPPLIER_SCAN_DEMO = {
  name: "Yiwu Sunshine Import & Export Co., Ltd.",
  score: 64,
  verdict: "żółty" as const,
  signals: [
    { label: "Wiek firmy", value: "3 lata", ok: true },
    { label: "Kapitał zarejestrowany", value: "500 000 CNY", ok: true },
    { label: "Typ", value: "Trading company (nie fabryka)", ok: false },
    { label: "Certyfikaty produktowe", value: "Brak CE w publicznym rejestrze", ok: false },
    { label: "Spójność danych", value: "Adres zgodny z rejestrem AIC", ok: true },
  ],
};
