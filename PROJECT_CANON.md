# PROJECT CANON — CANTINA VIRTUAL

> Single source of truth. If code and canon disagree, **code wins**.
> Last synced: 2026-07-08 (post wing-standardization + mobile typography pass).

---

## 1. Architecture

### Framework & Routing

- **Next.js 16 App Router** with `src/app/` directory.
- Single-page architecture: `src/app/page.tsx` handles all client-side navigation
  via `useState` (no file-system routing for wings).
- Screen flow: Landing → 18+ Confirm → Hub → District (wing).
- Browser history integration via `pushState`/`popState` for real back navigation.
- Legal pages are real routes: `/contact`, `/dmca`, `/privacy`, `/terms`.

### Client Components

Every component with UI state is `'use client'`. There are no server components
rendering dynamic content — all pages are statically exported except `/api`.

### Data Layer

- **`src/data/rooms.ts`** — `RESIDENTS` record + `DISTRICTS` array.
- Residents are the offer entities (id, name, subtitle, description, image).
- Districts are the wings, each containing an `encounters[]` array of
  `{ residentId, href? }`.
- `EncounterCard` looks up `t[\`resident.${resident.id}.desc\`]` for i18n
  captions, falling back to `resident.description`.

### Internationalization

- **`src/lib/i18n.tsx`** — inline EN/ES string objects, NOT a library.
- `LangProvider` context makes `lang` and `t` available globally.
- Language toggled via `onToggleLang()` which flips `en`/`es`.
- Both `cv_age` and `cv_lang` persisted in `sessionStorage`.

---

## 2. District / Wing Inventory

| District ID | Display Name (EN) | Display Name (ES) | Scene Component | Neon Color |
|---|---|---|---|---|
| `dating` | Dates | Citas | `DatingRoom` (immersive) | amber |
| `live-cams` | Live Cams | Cámaras en Vivo | `LiveCamsRoom` (immersive) | purple |
| `ai-companions` | AI Partners | Compañeros IA | `DistrictScene` (generic) | cyan |
| `fan-sites` | Fansites | Sitios de Fans | `DistrictScene` (generic) | rose |
| `pay-sites` | Paysites | Sitios de Pago | `DistrictScene` (generic) | emerald |
| `niche` | GAY | GAY | `DistrictScene` (generic) | amber |
| `gaming` | Games | Juegos | `DistrictScene` (generic) | cyan |
| `our-mission` | TRANSGENDER | TRANSGENDER | `DistrictScene` (generic) | purple |

### Scene Component Routing (DistrictScene.tsx)

```
if district.id === 'dating'  → DatingRoom
if district.id === 'live-cams' → LiveCamsRoom
else                        → default generic DistrictScene
```

> **CANON-CODE AGREEMENT**: Verified. Only Dating and Live Cams have custom
> immersive room components. All other wings use the generic `DistrictScene`.

---

## 3. Offer Card Structure

### Reference Standard: LIVE CAMS

LIVE CAMS is the visual and structural reference. Pattern:

```
┌──────────────────────┐
│  TITLE (gold, 16px)  │  ← order: 1
├──────────────────────┤
│                      │
│   BANNER (300×250)   │  ← order: 2, aspect-ratio: 300/250
│   background-size:   │
│     contain, centered│
│                      │
├──────────────────────┤
│  CAPTION (muted)     │  ← order: 3 (if present)
└──────────────────────┘
```

Card-level: `display: grid; grid-template-rows: auto 1fr [auto]; gap: 8px;`
Border/background/hover removed from card, moved to image only.
Image uses `background-size: contain` (not `cover`), no gradient overlay (`::after { background: none }`).

### Per-District Card Status

| District | Card Pattern | CSS Scope | Status |
|---|---|---|---|
| **Live Cams** | Title → Banner (no caption) | `.livecams-encounter-card[data-cam]` | Reference. Untouched. |
| **Dating** | Custom immersive (hero offer + offer grid) | `.dating-encounter-card`, `.dating-offer-card` | Separate system. Not using EncounterCard. |
| **AI Partners** | Title → Banner → Caption | `[data-district="ai-companions"]` | Matched. `display: contents` on body. Image aspect 6/5, cyan border. |
| **Fan Sites** | Title → Banner (no caption) | `[data-district="fan-sites"]` | Matched. Image aspect 3/1 (300×100 banners), rose border. |
| **Pay Sites** | Title → Banner (no caption) | `[data-resident="bellesa-plus"]`, `[data-resident="sextpanther"]` | Matched. Per-resident selectors. Image 300/250, amber border. |
| **GAY (Niche)** | Title → Banner → Caption | `[data-district="niche"]` | Matched (added this session). Image 300/250, amber border. |
| **Gaming** | Title → Banner → Caption | `[data-resident="manga-rpg"]`, `[data-resident="comix-harem-1/2"]` | Matched. Per-resident selectors. Image 300/250, amber border. |
| **Transgender** | Title → Banner (no caption) | `[data-district="our-mission"]` | Matched (rewritten this session). Image 300/250, purple border. |

> **CANON-CODE AGREEMENT**: Verified. All districts using the generic
> `EncounterCard` now follow the Title→Banner→Caption grid pattern.
> Dating has its own immersive component and is intentionally separate.

### Gold Title Standard

All offer card titles use the same gold/amber treatment:

```css
font-size: 16px;
letter-spacing: 0.22em;
text-align: center;
color: var(--amber);
text-shadow: 0 0 18px rgba(212,160,23,0.45), 0 0 36px rgba(212,160,23,0.15);
```

> **CANON-CODE AGREEMENT**: Verified in base `.encounter-card-name` and all
> district/resident overrides.

---

## 4. Banner Asset Inventory

| Resident | Banner | Dimensions | Type | Location |
|---|---|---|---|---|
| `cams-banner` | PCAM-244_DESIGN-23232 | 300×250 | GIF (affiliate) | Remote (imglnkx) |
| `jerkmate` | JM-885_DESIGN-23079 | 300×250 | JPG (affiliate) | Remote (imglnkx) |
| `camirada` | PCAM-244_DESIGN-24826 | 300×250 | GIF (affiliate) | Remote (imglnkx) |
| `myfreecams` | — | 300×250 | PNG (placeholder) | `/public/myfreecams-300x250.png` |
| `bellesa-plus` | BellesaPlus_20250307 | 300×250 | JPEG (affiliate) | Remote (imglnkx) |
| `sextpanther` | — | 300×250 | PNG (placeholder) | `/public/sext-panther-300x250.png` |
| `girlfriendgpt` | — | (non-standard) | PNG | Remote (sfile/chatglm) |
| `darlink-ai` | — | (non-standard) | PNG | Remote (imglnkx) |
| `candy-ai-male` | — | 300×250 | GIF (affiliate) | Remote (imglnkx) |
| `fanvue-amber` | AmberBanner | 300×100 | PNG (affiliate) | Remote (imglnkx) |
| `fanvue-talia` | TaliaBanner | 300×100 | PNG (affiliate) | Remote (imglnkx) |
| `fanvue-mila` | MilaBanner | 300×100 | PNG (affiliate) | Remote (imglnkx) |
| `manga-rpg` | — | 300×250 | PNG (placeholder) | `/public/manga-rpg-300x250.png` |
| `comix-harem-1` | CxH-SQ1-13 | 300×250 | GIF (affiliate) | `/public/CxH-SQ1-13_300x250_EN.gif` |
| `comix-harem-2` | 010679A_CXHR | 300×250 | GIF (affiliate) | `/public/010679A_CXHR_18_ALL_EN_71_L.gif` |
| `gay-offer` | — | (non-standard) | PNG (placeholder) | `/public/gay-offer.png` |
| `trans-offer` | — | (non-standard) | PNG (placeholder) | `/public/trans-offer.png` |
| `dating-encounter` | — | (non-standard) | PNG (placeholder) | `/public/dating-offer.png` |
| `vicky-milan-dating` | — | (non-standard) | PNG (placeholder) | `/public/vicky-milan-dating.png` |
| `xlovegay-cams` | — | 300×250 | PNG (placeholder) | `/public/xlovegay-cams-300x250.png` |

> **CANON-CODE AGREEMENT**: Verified against `rooms.ts` RESIDENTS and
> `LiveCamsRoom.tsx` inline images. MyFreeCams and Jerkmate/Camirada banners
> are referenced in `LiveCamsRoom.tsx` (not via the RESIDENTS data layer).

---

## 5. Affiliate Links

All affiliate links use the `SF_006OG000004lmDN` sub5 parameter.

| Wing | Offer | URL (truncated) |
|---|---|---|
| DATING | dating-encounter | `t.acust-7.com/.../3785/0?...&aff_sub5=SF_006OG000004lmDN` |
| DATING | vicky-milan-dating | `t.crdtg3.com/.../4593/40617?...&aff_sub5=SF_006OG000004lmDN` |
| LIVE CAMS | cams-banner (hero) | `t.camsk1.com/.../9776/37445?...&aff_sub5=SF_006OG000004lmDN` |
| LIVE CAMS | camirada | `t.camsk1.com/.../9776/37445?...&aff_sub5=SF_006OG000004lmDN` |
| LIVE CAMS | jerkmate | `t.mbjrkmms.com/.../8780/0?...&aff_sub5=SF_006OG000004lmDN` |
| LIVE CAMS | myfreecams | `t.amyfc.link/.../779/0?...&aff_sub5=SF_006OG000004lmDN` |
| AI PARTNERS | girlfriendgpt | `t.vlmai-1.com/.../10046/38605?...&aff_sub5=SF_006OG000004lmDN` |
| AI PARTNERS | darlink-ai | `t.vlmai-1.com/.../10345/0?...&aff_sub5=SF_006OG000004lmDN` |
| AI PARTNERS | candy-ai-male | `t.vlmai-1.com/.../10022/37968?...&aff_sub5=SF_006OG000004lmDN` |
| FAN SITES | fanvue-amber | `t.acust-9.com/.../10394/0?...&aff_sub5=SF_006OG000004lmDN` |
| FAN SITES | fanvue-talia | `t.acust-9.com/.../10398/0?...&aff_sub5=SF_006OG000004lmDN` |
| FAN SITES | fanvue-mila | `t.acust-9.com/.../10395/0?...&aff_sub5=SF_006OG000004lmDN` |
| PAY SITES | bellesa-plus | `t.bbwafx.com/.../7378?...&aff_sub5=SF_006OG000004lmDN` |
| PAY SITES | sextpanther | `t.acust-9.com/.../9927/38131?...&aff_sub5=SF_006OG000004lmDN` |
| GAY | gay-offer | `t.acust-7.com/.../4080/0?...&aff_sub5=SF_006OG000004lmDN` |
| GAY | xlovegay-cams | `t.camsk1.com/.../2494/0?...&aff_sub5=SF_006OG000004lmDN` |
| GAMING | manga-rpg | `t.acust-9.com/.../6621?...&aff_sub5=SF_006OG000004lmDN` |
| GAMING | comix-harem-1 | `t.aagm.link/.../7930/27132?...&aff_sub5=SF_006OG000004lmDN` |
| GAMING | comix-harem-2 | `t.aagm.link/.../7930/27128?...&aff_sub5=SF_006OG000004lmDN` |
| TRANSGENDER | trans-offer | `t.mbagm.link/.../8663/0?...&aff_sub5=SF_006OG000004lmDN` |

> **CANON-CODE AGREEMENT**: Verified against `rooms.ts` DISTRICTS encounters
> and `LiveCamsRoom.tsx` inline links. Note: Live Cams has 4 links (hero + 3
> encounter cards) — the hero cams-banner link differs from the one in
> `rooms.ts` (different `po` param).

---

## 6. Localization (i18n)

### Architecture

- Single file: `src/lib/i18n.tsx`.
- Two language objects: `T.en` and `T.es`.
- Accessed via `useLang()` hook returning `{ lang, t, onToggleLang }`.

### Current String Coverage

| Key | EN | ES | Used In |
|---|---|---|---|
| Landing copy | ✅ | ✅ | `AgeGate` |
| Hub strings | ✅ | ✅ | `HubScreen` |
| Sidebar footer | ✅ | ✅ | `SidebarHub` |
| Back to Hub | ✅ | ✅ | `SidebarHub` |
| District names (8) | ✅ | ✅ | `HubScreen`, `SidebarHub`, `DistrictScene` |
| District descriptions (8) | ✅ | ✅ | `DistrictScene` |
| `resident.girlfriendgpt.desc` | ✅ | ✅ | `EncounterCard` |
| `resident.darlink-ai.desc` | ✅ | ✅ | `EncounterCard` |
| `resident.candy-ai-male.desc` | ✅ | ✅ | `EncounterCard` |
| `resident.dating-encounter.desc` | ✅ | ✅ | `EncounterCard` / `DatingRoom` |
| `resident.cams-banner.desc` | ✅ | ✅ | (not rendered — LiveCamsRoom doesn't show captions) |
| `resident.manga-rpg.desc` | ✅ | ✅ | `EncounterCard` |
| `resident.comix-harem-1.desc` | ✅ | ✅ | `EncounterCard` |
| `resident.comix-harem-2.desc` | ✅ | ✅ | `EncounterCard` |
| `resident.xlovegay-cams.desc` | ✅ | ✅ | `EncounterCard` |
| Nectar title/coming soon | ✅ | ✅ | `NectarHUD`, nectar teaser |
| Nectar future intro/list | ✅ | ✅ | nectar teaser |
| Compliance footer | ✅ | ✅ | `Cantina` footer |

### Residents WITHOUT i18n description keys

These residents have `description: ''` in `rooms.ts` and no i18n key —
they display as title-only (banner below, no caption):

- `bellesa-plus` — no desc key, no description text. ✅ Correct (banner is self-explanatory).
- `sextpanther` — no desc key, no description text. ✅ Correct.
- `fanvue-amber` / `fanvue-talia` / `fanvue-mila` — no desc keys, no descriptions. ✅ Correct (300×100 fan banners).
- `trans-offer` — no desc key, no description text. ✅ Correct.
- `gay-offer` — no desc key, no description text. ✅ Correct.
- `vicky-milan-dating` — no desc key, no description text. ✅ Correct.

> **CANON-CODE AGREEMENT**: Verified. The `EncounterCard` conditionally renders
> the desc paragraph only when `t[...] \|\| resident.description` is truthy,
> so empty-description residents correctly show no caption.

---

## 7. Nectar Program

### Current State: Teaser Only

The Nectar program is **not implemented** — it displays a "COMING SOON" teaser
block at the bottom of every district scene.

### Copy (Current)

EN:
- Title: `NECTAR PROGRAM`
- Badge: `COMING SOON`
- Intro: `Future Nectar opportunities may include:`
- List: `Socializing / Conversations / Participation / Supporting creators / Discovering offers / Events`

ES:
- Title: `PROGRAMA NÉCTAR`
- Badge: `PRÓXIMAMENTE`
- Intro: `Las futuras oportunidades de Néctar pueden incluir:`
- List: `Socializar / Conversaciones / Participación / Apoyar a creadores / Descubrir ofertas / Eventos`

### Sidebar Widget

`NectarHUD` component renders a small widget in the sidebar:
- 🍯 icon + `NECTAR PROGRAM` label + `COMING SOON` count.
- Hidden on mobile (`display: none` in `@media max-width: 768px`).

> **CANON-CODE AGREEMENT**: Verified. The old copy "Earn Nectar. Spend it. Come
> back for more." was replaced in a prior session. Current copy is the
> bullet-point teaser shown above.

---

## 8. CSS Design System

### Color Variables

```css
:root {
  --bg-deep: #0a0e17;
  --bg-card: #0f1520;
  --bg-card-hover: #151d2e;
  --amber: #dab12a;
  --amber-dim: #b08a1a;
  --purple: #7b2d8e;
  --purple-dim: #5a1f6a;
  --cyan: #00f5ff;
  --cyan-dim: #00b8bf;
  --text-primary: #e8e0d4;
  --text-muted: #9a9385;
  --text-dim: #7a7570;
  --emerald: #00ff88;
  --emerald-dim: #00b860;
  --rose: #e91e8c;
  --rose-dim: #b0156a;
  --card-radius: 4px;
}
```

### District Color Assignments

| District | Primary | Border/Hover |
|---|---|---|
| Dating | `--amber` | `rgba(212,160,23,...)` |
| Live Cams | `--purple` | `rgba(123,45,142,...)` |
| AI Partners | `--cyan` | `rgba(0,245,255,...)` |
| Fan Sites | `--rose` | `rgba(233,30,140,...)` |
| Pay Sites | `--emerald` | `rgba(0,255,136,...)` |
| GAY (Niche) | `--amber` | `rgba(212,160,23,...)` |
| Gaming | `--cyan` | `rgba(0,245,255,...)` |
| Transgender | `--purple` | `rgba(123,45,142,...)` |

> **CANON-CODE AGREEMENT**: Verified. No rotating colors. Each district has a
> fixed identity color.

### Mobile Typography (current sizes at ≤768px)

| Element | Desktop | Mobile | Notes |
|---|---|---|---|
| District title | 28px | 20px | Main title — not touched |
| District description | 13px | **14px** | Bumped this session |
| Dating/LiveCams prose | 13px | **14px** | Bumped this session |
| Nectar teaser title | 11px | **13px** | Bumped this session |
| Nectar teaser "soon" | 9px | **11px** | Bumped this session |
| Nectar teaser intro/list | 10px | **12px** | Bumped this session |
| Footer brand | 9px | **11px** | Bumped this session |
| Footer links | 9px | **11px** | Bumped this session |
| Gold offer headings | 16px | 16px | Not touched |
| Sidebar nav labels | 16.5px | 12.1px | Not touched |
| Offer captions | 12px | 12px | Not touched |
| Sidebar brand name | 14px | hidden | `display: none` on mobile |
| Sidebar nectar widget | 8px | hidden | `display: none` on mobile |
| Sidebar footer text | 12px | hidden | `display: none` on mobile |

> **CANON-CODE AGREEMENT**: Verified against `globals.css` mobile media query.

### Sidebar (Desktop)

- Fixed left, 220px wide.
- Contains: NectarHUD widget → Brand → Divider → Back to Hub → Divider → Nav list → Divider → Footer text.
- Footer text: EN "Pacific coast. After dark." / ES "Costa del Pacífico. Después del anochecer."

### Sidebar (Mobile ≤768px)

- Fixed bottom, full-width horizontal bar.
- Brand, dividers, footer, back-to-hub button, nectar widget all hidden.
- Nav items displayed horizontally with scrollable overflow.
- Safe area padding: `env(safe-area-inset-bottom, 8px)`.
- Floating back-to-hub button (circle, top-left) appears instead.

> **CANON-CODE AGREEMENT**: Verified.

---

## 9. Age Gate

- Two-step: Landing screen → Confirmation question ("Are you 18 or older?").
- Persisted via `sessionStorage.setItem('cv_age', '1')` in `useEffect`.
- On page load, if `cv_age === '1'`, skips straight to Hub.
- SSR-safe: `useState(false)` initial value + `useEffect` check.

> **CANON-CODE AGREEMENT**: Verified in `page.tsx`.

---

## 10. Legal Pages

| Route | Component | EN/ES Toggle |
|---|---|---|
| `/contact` | `LegalPage` | ✅ |
| `/dmca` | `LegalPage` | ✅ |
| `/privacy` | `LegalPage` | ✅ |
| `/terms` | `LegalPage` | ✅ |

All use a shared `LegalPage` component with inline content for each page.
Language toggle renders both EN and ES versions with a toggle button.

> **CANON-CODE AGREEMENT**: Verified. Footer links in `page.tsx` wire to these routes.

---

## 11. Placeholder Banners

Placeholder banners follow a consistent pattern:

- 300×250 dimensions.
- Dark background (`#0a0a0a`).
- Gold text (`#D4A017`).
- Subtle border (`#3c3c3c`).
- Generated via matplotlib pipeline (not PIL — FreeType issues).
- Currently used by: `myfreecams`, `sextpanther`, `manga-rpg`, `xlovegay-cams`.
- Other placeholder PNGs (`dating-offer`, `gay-offer`, `trans-offer`, `vicky-milan-dating`) exist from earlier sessions but may not follow this exact pattern.

> **⚠️ DISAGREEMENT FLAG**: The `dating-offer.png`, `gay-offer.png`,
> `trans-offer.png`, and `vicky-milan-dating.png` were created in earlier
> sessions and may use different sizing/color conventions. They aren't
> 300×250 standard. Not verified this session — cannot confirm visual
> consistency without re-reading the image files.

---

## 12. Git / Deploy

- **Repo**: `Sinsuenos/CANTINA-VIRTUAL` on GitHub.
- **Branch**: `main` (only branch).
- **Deploy**: Vercel, auto-deploy from `main`.
- **Production URL**: `https://cantina-virtual.vercel.app/`
- **Auth**: GitHub PAT stored in session context.

---

## 13. Known Constraints

1. **No fake affiliate banners** — never invent or recreate third-party branding.
2. **Patch-only workflow** — fix root causes, never redesign.
3. **Monospace font stack** — `'Courier New', 'Lucida Console', monospace`.
4. **No rotating colors** — each district has a fixed identity color.
5. **Live Cams is the reference** — offer card changes must match its structure; do not modify Live Cams itself.
6. **Banner standards** — 300×250 for offers, 300×100 for fan site banners.
7. **`data-district` attributes** — used for wing-specific CSS scoping on the generic `DistrictScene`.
8. **`data-resident` attributes** — used for per-offer CSS overrides (pay-sites, gaming).