# SinoFlow — AI-native platforma importu z Chin

Monorepo aplikacji **zaimportuj.pl** (public site) i **SinoFlow** (panel klienta, docelowo `app.zaimportuj.pl`).

## Stack

- **Next.js 15** (App Router, RSC) + TypeScript strict
- **Tailwind CSS v4** (theme CSS-first, dark mode klasą `.dark`)
- **Framer Motion** — mikrointerakcje (animowane liczby, scoring dostawcy)
- Fonty: Geist Sans + Geist Mono (liczby zawsze mono + tabular-nums)

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produkcyjny build + typecheck
```

## Struktura

```
src/
  app/
    (marketing)/          # zaimportuj.pl — landing, usługi, cennik, baza wiedzy, o nas
      page.tsx            #   hero z INTERAKTYWNYM kalkulatorem landed cost (AI-1)
    app/                  # SinoFlow — panel klienta (demo, dane mock)
      page.tsx            #   dashboard: KPI, pipeline zleceń, alert re-orderu
      zlecenia/[id]/      #   widok zlecenia: timeline, dokumenty, media, płatność
    api/calculate/        # endpoint kalkulatora (POST)
  components/             # kalkulator, skaner dostawcy (AI-2 teaser), pipeline, header/footer
  lib/
    landed-cost.ts        # silnik kalkulacji: HS/cło/VAT/fracht/antydumping
    mock-data.ts          # dane demo panelu (orders, events, documents)
```

## Status implementacji (Faza 1 / MVP — szkielet)

| Moduł | Stan |
|---|---|
| Landing z kalkulatorem AI-1 (interaktywny, live breakdown) | ✅ działa na stawkach demo |
| Skaner wiarygodności dostawcy AI-2 (teaser) | ✅ mock scoringu |
| Usługi jako produkty (cena/zakres/SLA) | ✅ |
| Cennik z prowizją progresywną + przykładowe kalkulacje | ✅ |
| Baza wiedzy (lista artykułów + narzędzia) | ✅ statyczna, docelowo MDX |
| Panel klienta read-only (dashboard, zlecenie, timeline, dokumenty) | ✅ dane mock |
| Dark mode, PL, responsywność (mobile/iPad/desktop) | ✅ |
| API `/api/calculate` | ✅ walidacja + breakdown |

### Kolejne kroki (wg specyfikacji)

1. Scraping ofert Alibaba/1688 + ekstrakcja przez Claude (AI-1 pełny pipeline)
2. Baza TARIC + pgvector do klasyfikacji HS z pewnością
3. Auth (Supabase) + PostgreSQL z RLS per-tenant, model danych z spec
4. Copilot AI-3 (tool use na danych zlecenia), płatności Stripe/P24, KSeF
5. i18n (PL/EN/ZH), programmatic SEO `/import-z-chin/[kategoria]`

> Wszystkie stawki celne, frachtowe i kursy w kodzie to dane demonstracyjne
> (stan: 2026-07). Kalkulacje wymagają potwierdzenia agenta celnego.
