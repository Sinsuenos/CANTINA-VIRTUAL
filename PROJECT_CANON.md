# PROJECT CANON — CANTINA VIRTUAL

> Single source of truth. If code and canon disagree, **code wins**.
> Last synced: 2026-07-09 (post Live Cams migration, Trans block-layout fix, i18n updates).

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
- `EncounterCard` looks up `t[\`resident.${resident.id}.name\`]` for i18n
  card names, falling back to `resident.name`.
- `EncounterCard` looks up `t[\`resident.${resident.id}.desc\`]` for i18n
  captions, falling back to `resident.description`.

### Internationalization

- **`src/lib/i18n.tsx`** — inline EN/ES string objects, NOT a library.
- `LangProvider` context makes `lang` and `t` available globally.
- Language toggled via `onToggleLang()` which flips `en`/`es`.
- Both `cv_age` and `cv_lang` persisted in `sessionStorage`.
- **Mixed indentation warning**: `i18n.tsx` uses inconsistent spaces/tabs. Edits must preserve the exact whitespace of surrounding lines or risk silent parse failures.

---

## 2. District / Wing Inventory

| District ID | Display Name (EN) | Display Name (ES) | Scene Component | Cards | Neon Color |
|---|---|---|---|---|---|
| `dating` | Dates | Citas | `DatingRoom` (immersive) | 4 | amber |
| `live-cams` | Live Cams | Cámaras en Vivo | `DistrictScene` (generic) | 3 | purple |
| `ai-companions` | AI Partners | Compañeros IA | `DistrictScene` (generic) | 3 | cyan |
| `fan-sites` | Fansites | Sitios de Fans | `DistrictScene` (generic) | 3 | rose |
| `pay-sites` | Paysites | Sitios de Pago | `DistrictScene` (generic) | 2 | emerald |
| `niche` | GAY | GAY | `DistrictScene` (generic) | 2 | amber |
| `gaming` | Games | Juegos | `DistrictScene` (generic) | 3 | cyan |
| `our-mission` | TRANSGENDER | TRANSGENDER | `DistrictScene` (generic) | 3 | purple |

**Total: 23 active affiliate cards across 8 wings.**

### Scene Component Routing (DistrictScene.tsx)

```
if district.id === 'dating'  → DatingRoom
else                        → default generic DistrictScene
```

> **CANON-CODE AGREEMENT**: Live Cams NO LONGER has a custom renderer.
> `LiveCamsRoom.tsx` is dead code (still on disk, no longer imported).
> The `if (district.id === 'live-cams')` special-case was removed from
> `DistrictScene.tsx`. All non-dating wings now use the generic path.

---

## 3. Offer Card Structure

### Standard Pattern (most wings)

```
┌──────────────────────┐
│  TITLE (gold, 16px)  │  ← name, order: 1
├──────────────────────┤
│                      │
│   BANNER (300×250)   │  ← image, order: 2
│   background-size:   │
│     cover, centered  │
│                      │
├──────────────────────┤
│  CAPTION (gold)      │  ← desc, order: 3 (if present)
└──────────────────────┘
```

Card-level: `display: grid; grid-template-rows: auto 1fr auto; gap: 8px;`
Title uses `display: contents` on `.encounter-card-body` so name/image/desc
become direct grid children.

### Transgender Wing — EXCEPTION (block layout)

Trans wing cards (`trans-offer`, `jermate-trans`, `soda-offer`) use
**`display: block`** instead of grid/flex. This is intentional.

**Reason**: A confirmed Chromium subpixel rounding bug causes `display: flex`
and `display: grid` to render one card's image 2px offset from the others,
even with identical CSS, identical computed styles, and identical DOM
structure. The bug manifests specifically when cards have different text
content lengths in the name element (one-line vs two-line names).

`display: block` with explicit `margin-top: 8px` eliminates this entirely.
**Do NOT "fix" these back to grid/flex.**

Additionally, `EncounterCard.tsx` renders these 3 residents with a flat
DOM (name/image/desc as direct children of the `<a>` tag, no
`.encounter-card-body` wrapper) via a `FLAT_LAYOUT_RESIDENTS` set.

### Per-District Card Status

| District | Card Pattern | CSS Scope | Status |
|---|---|---|---|
| **Live Cams** | Title → Banner → Caption | `[data-resident="camirada"]`, `[data-resident="jerkmate-cams"]`, `[data-resident="myfreecams"]` | Data-driven (migrated from LiveCamsRoom). |
| **Dating** | Custom immersive (hero + offer grid) | `.dating-encounter-card`, `.dating-offer-card` | Separate system. Not using EncounterCard. |
| **AI Partners** | Title → Banner → Caption | `[data-district="ai-companions"]` | Standard grid. Image aspect 6/5, cyan border. |
| **Fan Sites** | Title → Banner (no caption) | `[data-district="fan-sites"]` | Standard grid. Image aspect 3/1 (300×100), rose border. |
| **Pay Sites** | Title → Banner (no caption) | `[data-resident="bellesa-plus"]`, `[data-resident="sextpanther"]` | Standard grid. Image 300/250, amber border. |
| **GAY (Niche)** | Title → Banner → Caption | `[data-resident="gay-offer"]`, `[data-resident="xlovegay-cams"]` | Standard grid. Image 300/250, amber border. |
| **Gaming** | Title → Banner → Caption | `[data-resident="manga-rpg"]`, `[data-resident="comix-harem-1/2"]` | Standard grid. Image 300/250, amber border. |
| **Transgender** | Title → Banner → Caption | `[data-resident="trans-offer/jermate-trans/soda-offer"]` | **`display: block`** (not grid). Image 300/270, amber border. |

### Gold Title Standard

All offer card titles use the same gold/amber treatment:

```css
font-size: 16px;
letter-spacing: 0.22em;
text-align: center;
color: var(--amber);
text-shadow: 0 0 18px rgba(212,160,23,0.45), 0 0 36px rgba(212,160,23,0.15);
```

---

## 4. Banner Asset Inventory

| Resident | Banner | Dimensions | Type | Location |
|---|---|---|---|---|
| `camirada` | PCAM-244_DESIGN-24826 | 300×250 | GIF | Remote (imglnkx) |
| `jerkmate-cams` | JM-885_DESIGN-23079 | 300×250 | JPG | Remote (imglnkx) |
| `myfreecams` | — | 300×250 | PNG | `/public/myfreecams-300x250.png` |
| `bellesa-plus` | BellesaPlus_20250307 | 300×250 | JPEG | Remote (imglnkx) |
| `sextpanther` | — | 300×250 | PNG | `/public/sext-panther-300x250.png` |
| `girlfriendgpt` | — | (non-standard) | PNG | Remote (sfile/chatglm) |
| `darlink-ai` | — | (non-standard) | PNG | Remote (imglnkx) |
| `candy-ai-male` | — | 300×250 | GIF | Remote (imglnkx) |
| `fanvue-amber` | AmberBanner | 300×100 | PNG | Remote (imglnkx) |
| `fanvue-talia` | TaliaBanner | 300×100 | PNG | Remote (imglnkx) |
| `fanvue-mila` | MilaBanner | 300×100 | PNG | Remote (imglnkx) |
| `manga-rpg` | — | 300×250 | PNG | `/public/manga-rpg-300x250.png` |
| `comix-harem-1` | CxH-SQ1-13 | 300×250 | GIF | `/public/CxH-SQ1-13_300x250_EN.gif` |
| `comix-harem-2` | 010679A_CXHR | 300×250 | GIF | `/public/010679A_CXHR_18_ALL_EN_71_L.gif` |
| `gay-offer` | — | (non-standard) | PNG | `/public/gay-offer.png` |
| `xlovegay-cams` | — | 300×250 | PNG | `/public/xlovegay-cams-300x250.png` |
| `trans-offer` | — | (non-standard) | PNG | `/public/trans-offer-banner-v2.png` |
| `jermate-trans` | — | 300×250 | GIF | `/public/jermate-trans-300x250.gif` |
| `soda-offer` | — | 300×250 | JPG | `/public/soda-offer-300x250.jpg` |
| `dating-encounter` | — | (non-standard) | PNG | `/public/dating-real-connections-banner-v2.jpg` |
| `vicky-milan-dating` | — | (non-standard) | PNG | `/public/vicky-milan-dating.png` |
| `date-player-two` | — | (non-standard) | — | Remote URL |
| `hometown-flirt` | — | 300×250 | PNG | `/public/hometown-flirt-banner.png` |

> **CANON-CODE AGREEMENT**: Verified against `rooms.ts` RESIDENTS. All
> banners are referenced via the standard data layer. The old `cams-banner`
> resident and `LiveCamsRoom.tsx` hardcoded approach have been removed.

---

## 5. Affiliate Links

All affiliate links use the `SF_006OG000004lmDN` sub5 parameter.

| Wing | Offer | Tracking Network |
|---|---|---|
| DATING | dating-encounter, vicky-milan-dating, date-player-two, hometown-flirt | acust-7, crdtg3, mbjrkmms |
| LIVE CAMS | camirada, jerkmate-cams, myfreecams | camsk1, mbjrkmms, amyfc |
| AI PARTNERS | girlfriendgpt, darlink-ai, candy-ai-male | vlmai-1 |
| FAN SITES | fanvue-amber, fanvue-talia, fanvue-mila | acust-9 |
| PAY SITES | bellesa-plus, sextpanther | bbwafx, acust-9 |
| GAY | gay-offer, xlovegay-cams | acust-7, camsk1 |
| GAMING | manga-rpg, comix-harem-1, comix-harem-2 | acust-9, aagm |
| TRANSGENDER | trans-offer, jermate-trans, soda-offer | mbagm |

> **CANON-CODE AGREEMENT**: Verified against `rooms.ts` DISTRICTS encounters.
> All links now flow through the standard data layer — no hardcoded URLs
> in components (LiveCamsRoom migration complete).

---

## 6. Localization (i18n)

### Architecture

- Single file: `src/lib/i18n.tsx`.
- Two language objects: `T.en` and `T.es`.
- Accessed via `useLang()` hook returning `{ lang, t, onToggleLang }`.

### Name i18n Override Pattern

`EncounterCard.tsx` uses `t[\`resident.${resident.id}.name\`] || resident.name`
to allow i18n display names that differ from the data-layer name.
**Watch for**: Any hardcoded component that bypasses `EncounterCard` and
renders `resident.name` directly will skip i18n. `DatingRoom.tsx` had this
bug (now fixed — uses the i18n lookup pattern).

### Current Translation Status

**Fully translated**: All 8 district names + descriptions, hub strings, landing
copy, legal footer, nectar teaser, compliance links.

**Partially translated (name overrides exist, some missing)**:
- Dating: `vicky-milan-dating` ✅, `dating-encounter` ✅, `date-player-two` ✅, `hometown-flirt` ✅
- AI: `girlfriendgpt` ✅, `candy-ai-male` ✅, `darlink-ai` ✅
- Fan Sites: all 3 names unchanged in ES (brand names, correct)
- Pay Sites: `bellesa-plus` ✅, `sextpanther` ✅
- Games: brand names unchanged (correct)
- Trans: brand names unchanged (correct)

**Intentionally no description**: Residents with `description: ''` in rooms.ts
correctly render title+banner only (no caption `<p>`).

---

## 7. Nectar Program

### Current State: Teaser Only

The Nectar program is **not implemented** — it displays a "COMING SOON" teaser
block at the bottom of every district scene.

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
  --cyan: #00f5ff;
  --text-primary: #e8e0d4;
  --text-muted: #9a9385;
  --emerald: #00ff88;
  --rose: #e91e8c;
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
| Transgender | `--amber` | `rgba(212,160,23,...)` |

> Note: Transgender district description uses amber styling (not purple).
> Card borders use amber. The `neonClass` is `neon-purple` but the visual
> identity is amber for card elements.

### Mobile Typography (≤768px)

| Element | Desktop | Mobile |
|---|---|---|
| District title | 28px | 20px |
| District description | 15px | 14px |
| Gold offer headings | 16px | 16px |
| Offer captions | 13px | 13px |
| Sidebar nav labels | 16.5px | 12.1px |

---

## 9. Age Gate

- Two-step: Landing → "Are you 18 or older?" confirmation.
- Persisted via `sessionStorage.setItem('cv_age', '1')`.
- SSR-safe: `useState(false)` initial + `useEffect` check.

---

## 10. Legal Pages

| Route | Component | EN/ES Toggle |
|---|---|---|
| `/contact` | `LegalPage` | ✅ |
| `/dmca` | `LegalPage` | ✅ |
| `/privacy` | `LegalPage` | ✅ |
| `/terms` | `LegalPage` | ✅ |

---

## 11. Git / Deploy

- **Repo**: `Sinsuenos/CANTINA-VIRTUAL` on GitHub.
- **Branch**: `main` (only branch).
- **Deploy**: Vercel, auto-deploy from `main`.
- **Production URL**: `https://cantina-virtual.vercel.app/`

---

## 12. Known Issues (unfixed)

1. **Favicon/Open Graph image** — Still shows a lantern icon, not the butterfly brand asset.
2. **Landing page bounce animation** — Needs polish (EN+ES).
3. **ES language toggle** — Needs gold/amber color and slightly larger sizing.
4. **Fan Sites** — Banner uniformity check needed (3 different creator banners).
5. **GAY wing** — Only 2 offers; needs 1 more.
6. **Pay Sites** — Only 2 offers; needs 1 more.
7. **Background images behind offers** — Too light, need contrast adjustment on some wings.
8. **Pay Sites background** — Needs replacing with a more appropriate image.
9. **Trans card placeholders** — `jermate-trans` and `soda-offer` have `href: '#'`
   (placeholder links). Need real affiliate tracking URLs.
10. ~~**Trans card captions**~~ — FIXED. Descriptions added for both cards.
11. ~~**Dead code**~~ — FIXED. `LiveCamsRoom.tsx` already deleted from disk.
    Orphaned `.livecams-*` CSS (467 lines) removed from `globals.css`.
    `FanvueCard.tsx` already deleted from disk.

---

## 13. Known Constraints

1. **No fake affiliate banners** — never invent or recreate third-party branding.
2. **Patch-only workflow** — fix root causes, never redesign.
3. **Monospace font stack** — `'Courier New', 'Lucida Console', monospace`.
4. **No rotating colors** — each district has a fixed identity color.
5. **Banner standards** — 300×250 for offers, 300×100 for fan site banners.
6. **`data-district` attributes** — used for wing-specific CSS scoping.
7. **`data-resident` attributes** — used for per-offer CSS overrides.
8. **Trans wing district ID is `our-mission`** (legacy), not `transgender`.
9. **Trans wing cards MUST use `display: block`** — do not convert to grid/flex.
10. **VLMs hallucinate on adult content** — always verify via DOM `textContent`.
11. **Every new resident/offer card added to a wing MUST include its own per-resident CSS block** matching the existing pattern (strips default card chrome — `border: none`, `overflow: visible`, `border-radius: 0`, `padding: 0` — switches to `display: grid` with `gap: 8px`, uses `display: contents` on `.encounter-card-body`, and sets `order: 1/2/3` for title/banner/caption). A card added without this block will render with broken default styling (visible border, wrong layout, no title/caption reordering) even though the data entry itself is correct. **Check for this FIRST before assuming a new card issue is a data problem, aspect-ratio problem, or grid problem.** This has caused repeated bugs.

---

## 14. Pre-Flight Checklist for Adding a New Resident/Offer

When adding a new resident card to any wing, **all five items** below are mandatory:

| # | Step | File | What to add |
|---|------|------|-------------|
| 1 | Resident data | `src/data/rooms.ts` | Entry in `RESIDENTS` record (id, name, subtitle, description, image) |
| 2 | Encounter mapping | `src/data/rooms.ts` | Entry in the target district's `encounters[]` array (residentId, href) |
| 3 | EN translation | `src/lib/i18n.tsx` | `resident.<id>.name` and `resident.<id>.desc` in `T.en` |
| 4 | ES translation | `src/lib/i18n.tsx` | `resident.<id>.name` and `resident.<id>.desc` in `T.es` |
| 5 | **Per-resident CSS block** | `src/app/globals.css` | `[data-resident="<id>"]` block stripping default chrome, applying grid layout with `order: 1/2/3` (see §13 constraint #11) |

**⚠️ Step 5 is the most frequently missed.** The CSS block is NOT auto-generated by the data layer. Omitting it causes the card to render with default `.encounter-card` styling (visible border, wrong padding, no title-above/caption-below reordering) while the data, translations, and image are all correct. **Always grep for `[data-resident="<new-id>"]` in globals.css after adding a new resident to confirm the block exists.**