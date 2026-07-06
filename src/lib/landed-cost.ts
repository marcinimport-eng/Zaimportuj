/**
 * AI-1: Kalkulator Landed Cost — silnik obliczeń (MVP).
 *
 * W wersji produkcyjnej klasyfikacja HS i stawki celne pochodzą z pipeline'u
 * Claude + baza TARIC (embeddings/pgvector), a stawki frachtu z tabeli
 * aktualizowanej tygodniowo. Tutaj: reprezentatywne stawki demo (stan: 2026-07).
 */

export type TransportMode = "sea-lcl" | "sea-fcl" | "rail" | "air";

export interface ProductCategory {
  id: string;
  label: string;
  hsCode: string;
  hsLabel: string;
  dutyRate: number; // stawka cła erga omnes
  requiresCE: boolean;
  antiDumping: boolean;
  confidence: number; // pewność klasyfikacji AI (0-1)
}

export const CATEGORIES: ProductCategory[] = [
  { id: "electronics", label: "Elektronika użytkowa", hsCode: "8517.62", hsLabel: "Urządzenia do transmisji danych", dutyRate: 0.0, requiresCE: true, antiDumping: false, confidence: 0.92 },
  { id: "toys", label: "Zabawki", hsCode: "9503.00", hsLabel: "Zabawki pozostałe", dutyRate: 0.047, requiresCE: true, antiDumping: false, confidence: 0.95 },
  { id: "furniture", label: "Meble", hsCode: "9403.60", hsLabel: "Meble drewniane pozostałe", dutyRate: 0.0, requiresCE: false, antiDumping: false, confidence: 0.9 },
  { id: "textiles", label: "Tekstylia / odzież", hsCode: "6109.10", hsLabel: "T-shirty z bawełny", dutyRate: 0.12, requiresCE: false, antiDumping: false, confidence: 0.93 },
  { id: "bikes", label: "Rowery i e-mobilność", hsCode: "8712.00", hsLabel: "Rowery dwukołowe", dutyRate: 0.14, requiresCE: true, antiDumping: true, confidence: 0.88 },
  { id: "machines", label: "Maszyny CNC / przemysłowe", hsCode: "8458.11", hsLabel: "Tokarki sterowane numerycznie", dutyRate: 0.027, requiresCE: true, antiDumping: false, confidence: 0.86 },
  { id: "kitchen", label: "AGD / kuchnia", hsCode: "8516.60", hsLabel: "Kuchenki i piekarniki elektryczne", dutyRate: 0.027, requiresCE: true, antiDumping: false, confidence: 0.91 },
];

/** Stawki frachtu demo — w produkcji tabela freight_rates aktualizowana tygodniowo. */
export const FREIGHT_RATES = {
  "sea-lcl": { perCbm: 52, min: 180, transitDays: 42, label: "Morski LCL (drobnica)" },
  "sea-fcl": { perCbm: 34, min: 2900, transitDays: 40, label: "Morski FCL (kontener 40')" },
  rail: { perCbm: 92, min: 260, transitDays: 22, label: "Kolejowy (Chengdu–Małaszewicze)" },
  air: { perKg: 4.6, min: 320, transitDays: 7, label: "Lotniczy (PVG–WAW)" },
} as const;

export const USD_PLN = 3.68; // kurs demo; w produkcji: NBP tabela A z dnia wyceny
export const VAT_RATE = 0.23;
export const INSURANCE_RATE = 0.003;
export const CUSTOMS_AGENCY_FEE_PLN = 350;
export const ANTI_DUMPING_RATE = 0.485; // przykładowa stawka (rowery z CN)

export interface CalcInput {
  unitPriceUsd: number;
  quantity: number;
  unitWeightKg: number;
  unitVolumeM3: number;
  categoryId: string;
  transport: TransportMode;
}

export interface CalcResult {
  category: ProductCategory;
  goodsUsd: number;
  freightUsd: number;
  insuranceUsd: number;
  customsValueUsd: number;
  dutyUsd: number;
  antiDumpingUsd: number;
  vatUsd: number;
  agencyFeeUsd: number;
  totalUsd: number;
  totalPln: number;
  unitLandedPln: number;
  suggestedRetailPln: number;
  marginPct: number;
  transitDays: number;
  totalVolumeM3: number;
  totalWeightKg: number;
}

export function calculateLandedCost(input: CalcInput): CalcResult {
  const category =
    CATEGORIES.find((c) => c.id === input.categoryId) ?? CATEGORIES[0];

  const goodsUsd = input.unitPriceUsd * input.quantity;
  const totalVolumeM3 = input.unitVolumeM3 * input.quantity;
  const totalWeightKg = input.unitWeightKg * input.quantity;

  const rate = FREIGHT_RATES[input.transport];
  const freightUsd =
    input.transport === "air"
      ? Math.max(FREIGHT_RATES.air.perKg * totalWeightKg, rate.min)
      : Math.max(
          (rate as { perCbm: number }).perCbm * totalVolumeM3,
          rate.min,
        );

  const insuranceUsd = goodsUsd * INSURANCE_RATE;
  // wartość celna = CIF (towar + fracht + ubezpieczenie)
  const customsValueUsd = goodsUsd + freightUsd + insuranceUsd;
  const dutyUsd = customsValueUsd * category.dutyRate;
  const antiDumpingUsd = category.antiDumping
    ? customsValueUsd * ANTI_DUMPING_RATE
    : 0;
  const vatBaseUsd = customsValueUsd + dutyUsd + antiDumpingUsd;
  const vatUsd = vatBaseUsd * VAT_RATE;
  const agencyFeeUsd = CUSTOMS_AGENCY_FEE_PLN / USD_PLN;

  const totalUsd =
    customsValueUsd + dutyUsd + antiDumpingUsd + vatUsd + agencyFeeUsd;
  const totalPln = totalUsd * USD_PLN;
  const unitLandedPln = totalPln / Math.max(input.quantity, 1);
  const suggestedRetailPln = Math.ceil((unitLandedPln * 2.6) / 0.5) * 0.5;
  const marginPct =
    ((suggestedRetailPln - unitLandedPln) / suggestedRetailPln) * 100;

  return {
    category,
    goodsUsd,
    freightUsd,
    insuranceUsd,
    customsValueUsd,
    dutyUsd,
    antiDumpingUsd,
    vatUsd,
    agencyFeeUsd,
    totalUsd,
    totalPln,
    unitLandedPln,
    suggestedRetailPln,
    marginPct,
    transitDays: rate.transitDays,
    totalVolumeM3,
    totalWeightKg,
  };
}

export function formatPln(value: number, digits = 0): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatUsd(value: number, digits = 0): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}
