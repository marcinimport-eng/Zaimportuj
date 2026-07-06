import { NextResponse } from "next/server";
import { calculateLandedCost, type CalcInput } from "@/lib/landed-cost";

/**
 * AI-1 API (MVP): przyjmuje parametry produktu i zwraca pełny breakdown
 * landed cost. W kolejnej iteracji: `link` → scraping oferty → ekstrakcja
 * przez Claude → klasyfikacja HS z bazą TARIC (pgvector).
 */
export async function POST(req: Request) {
  let body: Partial<CalcInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy JSON" }, { status: 400 });
  }

  const input: CalcInput = {
    unitPriceUsd: Number(body.unitPriceUsd) || 0,
    quantity: Math.max(1, Number(body.quantity) || 1),
    unitWeightKg: Number(body.unitWeightKg) || 0,
    unitVolumeM3: Number(body.unitVolumeM3) || 0,
    categoryId: String(body.categoryId ?? "electronics"),
    transport: (body.transport as CalcInput["transport"]) ?? "sea-lcl",
  };

  if (input.unitPriceUsd <= 0) {
    return NextResponse.json(
      { error: "unitPriceUsd musi być > 0" },
      { status: 422 },
    );
  }

  const result = calculateLandedCost(input);
  return NextResponse.json({
    input,
    result,
    disclaimer:
      "Kalkulacja szacunkowa — klasyfikacja HS wymaga potwierdzenia agenta celnego. Stan prawny: 2026-07-06.",
  });
}
