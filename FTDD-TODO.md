# GoldRisk AI / Synorq — Eksiksiz Implementation Todo List

> **Proje durumu:** Boş repo (sadece README). Sıfırdan implementasyon gerekiyor.  
> **API Base:** `https://api.synorq.com` | **Frontend:** `app.synorq.com`  
> **Env:** `NEXT_PUBLIC_API_BASE_URL=https://api.synorq.com`

---

## Phase 0: Proje Bootstrap & Altyapı

### 0.1 Next.js + TypeScript Kurulumu

- [ ] `npx create-next-app@14` ile Next.js 14+ (App Router) başlat
- [ ] TypeScript strict: `noImplicitAny`, `strictNullChecks` aktif
- [ ] ESLint + Prettier yapılandır
- [ ] `.env.example` oluştur: `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_APP_URL`

### 0.2 UI & Styling

- [ ] TailwindCSS kurulumu ve yapılandırması
- [ ] shadcn/ui init (`npx shadcn-ui@latest init`)
- [ ] Tema/renk paleti (enterprise-friendly) ayarla
- [ ] decimal.js ekle (NUMERIC format + tutarlılık)
- [ ] day.js veya date-fns ekle (timezone-safe)

### 0.3 HTTP & State

- [ ] Axios veya fetch wrapper kur
- [ ] TanStack Query (`@tanstack/react-query`) kur
- [ ] React Hook Form + Zod kur

### 0.4 Proje Yapısı (FTDD §3)

```
src/
  app/
    (auth)/login/
    (app)/dashboard|import|transactions|inventory|alerts|reports|audit|settings/
    layout.tsx, middleware.ts
  components/{ui,layout,charts,tables,forms,import-wizard}/
  lib/{api,auth,format,validation,rbac}/
  store/
  types/
```

- [ ] Klasör yapısını oluştur
- [ ] `lib/api/client.ts` — typed HTTP client
- [ ] `lib/api/endpoints.ts` — typed endpoints
- [ ] `types/api.ts` — GramString, MoneyString, API response shapes

### 0.5 Branded Types & Formatting

- [ ] `type GramString = string`, `type MoneyString = string` tanımla
- [ ] `lib/format/money.ts` — para formatlama
- [ ] `lib/format/gram.ts` — gram formatlama
- [ ] `lib/format/date.ts` — tarih formatlama (timezone-aware)

---

## Phase 1: Auth & Layout (Sprint 1 — 1 hafta)

### 1.1 Auth Altyapısı (§4)

- [ ] `lib/auth/session.ts` — token store, refresh logic
- [ ] JWT access + refresh flow (veya cookie-based)
- [ ] `middleware.ts` — auth yoksa `/login` redirect
- [ ] `app/(auth)/login/page.tsx` — login form
- [ ] `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` entegrasyonu

### 1.2 RBAC

- [ ] `lib/rbac/permissions.ts` — role definitions (owner, manager, cashier, auditor)
- [ ] Role-based page access guard
- [ ] Cashier: tek branch; Owner/HQ: branch switch

### 1.3 Layout & Shell

- [ ] Ana layout (`app/layout.tsx`)
- [ ] Sidebar / header navigasyon
- [ ] Branch switcher bileşeni (Header’da Active Branch)
- [ ] `X-Branch-Id` header veya `branchId` query param desteği

### 1.4 Dashboard Skeleton (§6.1)

- [ ] `app/(app)/dashboard/page.tsx` boş sayfa
- [ ] `GET /metrics/daily?date=YYYY-MM-DD` API hook
- [ ] KPI kartları (skeleton): Bugünkü Kâr, Exposure Gram, Exposure TRY, Marj Sapması, 3 Kritik Uyarı
- [ ] Breakdown panel placeholder

### 1.5 Transactions Temel Liste (§6.3)

- [ ] `app/(app)/transactions/page.tsx`
- [ ] `GET /transactions?from=&to=&type=&q=&page=` entegrasyonu
- [ ] Tablo: created_at, type, quantity_g, unit_price_g, total_amount
- [ ] Basit filtreler (date range, type)

---

## Phase 2: Import Wizard (Sprint 2 — 1 hafta)

### 2.1 Import Center Altyapısı

- [ ] `app/(app)/import/page.tsx` — wizard container
- [ ] `components/import-wizard/` klasörü

### 2.2 Step 1 — Dosya Seçimi (§6.2)

- [ ] Dosya türü seçici: sales, purchases, bozdurma/return, stock_snapshot
- [ ] Template indirme linkleri (senaryo CSV şablonları)
- [ ] `POST /imports/presign` veya `POST /imports/upload` entegrasyonu

### 2.3 Step 2 — Kolon Mapping

- [ ] Header similarity ile otomatik eşleştirme
- [ ] Manuel override UI (dropdown per kolon)
- [ ] Zod schema ile mapping validation

### 2.4 Step 3 — Preview & Validation

- [ ] İlk 50 satır preview tablosu
- [ ] Uyarı gösterimi: gram parse fail, fiyat eksik, tarih formatı, duplicate satır
- [ ] `POST /imports/validate` entegrasyonu

### 2.5 Step 4 — Commit

- [ ] `POST /imports/commit` → job id
- [ ] Progress bar (2s polling ile `GET /imports/:id/status`)

### 2.6 Step 5 — Sonuç

- [ ] Başarılı / hatalı satır özeti
- [ ] Hatalı satırlar için downloadable error CSV
- [ ] Import session id + audit link

---

## Phase 3: Alerts, Reports, Inventory (Sprint 3 — 1 hafta)

### 3.1 Alerts (§6.5)

- [ ] `app/(app)/alerts/page.tsx`
- [ ] `GET /alerts?from=&to=&status=` entegrasyonu
- [ ] 3 kritik alarm: Marj düşüşü, Exposure sıçraması, Bozdurma anomali
- [ ] Alert list (status: open/ack/closed)
- [ ] Alert detay: neden, kaynak transaction listesi, önerilen aksiyon

### 3.2 Reports (§6.6)

- [ ] `app/(app)/reports/page.tsx`
- [ ] Gün seç → rapor oluştur
- [ ] `POST /reports/daily` (async PDF)
- [ ] `GET /reports/:id/download` — indir
- [ ] WhatsApp-ready paylaşım formatı
- [ ] Rapor içeriği: KPI, exposure, top 5 anomali, veri kalite badge, audit trace id footer

### 3.3 Inventory / Ledger (§6.4)

- [ ] `app/(app)/inventory/page.tsx`
- [ ] `GET /ledger/balance?date=&productId=`
- [ ] `GET /ledger/entries?from=&to=&productId=&page=`
- [ ] Balance görünümü (branch + product)
- [ ] Entries görünümü (debit/credit timeline)
- [ ] Negatif bakiye / sıçrama → "reconciliation needed" kırmızı flag

### 3.4 Dashboard Tamamlanması

- [ ] KPI kartları gerçek veri ile
- [ ] Breakdown panel: satış/alış toplamı, işçilik, fire, iade/bozdurma
- [ ] Drill-down: her KPI → transaction filtreli listeye link
- [ ] **Data Quality Badge:** Verified / Partial / Conflict
- [ ] Veri güveni göstergesi UI

### 3.5 Transaction Detay

- [ ] `app/(app)/transactions/[id]/page.tsx`
- [ ] Price lock bilgisi
- [ ] Parent transaction link (iade/bozdurma)
- [ ] İlişkili ledger entries

---

## Phase 4: Audit & Hardening (Sprint 4 — 1 hafta)

### 4.1 Audit Viewer (§6.7)

- [ ] `app/(app)/audit/page.tsx`
- [ ] `GET /audit?entityType=&from=&to=&userId=&page=`
- [ ] Filtreler: entityType, user, date range, action
- [ ] old_value/new_value diff görünümü
- [ ] ip/user_agent hash (read-only)
- [ ] Export CSV (export aksiyonu da audit’lenmeli)

### 4.2 Settings & Branch

- [ ] `app/(app)/settings/page.tsx` (opsiyonel temel ayarlar)
- [ ] Branch switcher tam entegrasyonu

### 4.3 Hata Yönetimi (§5.2, §10)

- [ ] Backend error shape: `{ code, message, details?, traceId? }`
- [ ] UI error toast’unda `traceId` gösterimi + kopyala butonu
- [ ] Error boundary (global)
- [ ] VALIDATION_ERROR, RBAC_DENIED, CONFLICT, RATE_LIMIT handling

### 4.4 UX Polish

- [ ] Empty states (boş liste, import yok)
- [ ] Loading skeletons (tablo, kart, wizard)
- [ ] Responsive layout (mobil/tablet)
- [ ] PII mask (müşteri bilgisi varsa kısmi maskeleme)

### 4.5 Güvenlik (§9)

- [ ] CSP ve secure headers (next.config)
- [ ] Token sızıntısı önlemleri (refresh httpOnly cookie tercih)
- [ ] RBAC UI + backend enforcement kontrolü

### 4.6 Observability (§10)

- [ ] API traceId capture (toast + kopyala)
- [ ] Sentry/LogRocket (opsiyonel)
- [ ] Import wizard analytics (drop-off step, mapping fail) — opsiyonel

---

## Phase 5: API Entegrasyon Kontratları

### 5.1 Tüm Endpoint’ler

| Endpoint                          | Kullanım yeri      | Durum |
| --------------------------------- | ------------------ | ----- |
| POST /auth/login                  | Login              |       |
| POST /auth/refresh                | Session            |       |
| POST /auth/logout                 | Logout             |       |
| GET /prices/latest                | Fiyat gösterimi    |       |
| GET /prices/range                 | Charts             |       |
| POST /imports/presign veya upload | Import Step 1      |       |
| POST /imports/validate            | Import Step 3      |       |
| POST /imports/commit              | Import Step 4      |       |
| GET /imports/:id/status           | Import Step 4–5    |       |
| GET /metrics/daily                | Dashboard          |       |
| GET /alerts                       | Alerts, Dashboard  |       |
| GET /transactions                 | Transactions list  |       |
| GET /transactions/:id             | Transaction detail |       |
| GET /ledger/balance               | Inventory          |       |
| GET /ledger/entries               | Inventory          |       |
| POST /reports/daily               | Reports            |       |
| GET /reports/:id/download         | Reports            |       |
| GET /audit                        | Audit Viewer       |       |

### 5.2 Validation & Schemas

- [ ] `lib/validation/zodSchemas.ts` — tüm API request/response şemaları
- [ ] NUMERIC string → Decimal dönüşümleri (UI format only)

---

## Done Criteria (Acceptance) (§12)

- [ ] CSV import ile 1 gün veri yüklendiğinde:
  - [ ] Dashboard KPI’ları doluyor
  - [ ] 3 alarm çalışıyor
  - [ ] PDF rapor iniyor
  - [ ] Transaction drill-down + price lock görünür
  - [ ] Audit kayıtları görülebilir
- [ ] Negatif stok / eksik dosya durumunda UI:
  - [ ] Veri kalite badge ile uyarıyor
  - [ ] Kullanıcıyı import ekranına yönlendiriyor

---

## Ek Notlar

- **Charts:** recharts (FTDD §2.1) — dashboard breakdown / exposure trend için
- **Query Keys:** `['metrics','daily', branchId, date]`, `['transactions', branchId, filters]`, `['alerts', branchId, filters]`
- **Real-time:** MVP’de polling; v2 için SSE/WebSocket opsiyonel
- **Deployment:** Vercel/Cloudflare Pages → `app.synorq.com`
