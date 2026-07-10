# CANTINA VIRTUAL — PROJECT STATUS

> Last updated: 2026-07-08
> This file reflects the exact production state. Update after every deploy.

---

## REPOSITORY

| Item | Value |
|------|-------|
| Repository | `Sinsuenos/CANTINA-VIRTUAL` on GitHub |
| Branch | `main` (single branch) |
| Workspace | `/home/z/my-project/` |
| Production URL | `https://cantina-virtual.vercel.app/` |
| Framework | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Deploy trigger | Git push to `main` auto-deploys via Vercel |
| Build command | `npm run build` (Turbopack) |

---

## LATEST COMMITS

| Commit ID | Description |
|-----------|-------------|
| `86a0945` | patch: Leave->Exit, 10% text size increase across landing/hub/sidebar |
| `cd56322` | asset: add MYFREECAMS 300x250 banner |
| `129358b` | feat: add MYFREECAMS card to Live Cams wing |
| `019018d` | fix: rename College x Harem -> Comix Harem, fix EN/ES i18n cross-contamination |
| `1596e53` | feat: add College x Harem cards + MANGA RPG banner to Games wing |
| `56cdac9` | feat: rename Video Games -> Games, scaffold MANGA RPG offer |
| `e4686f6` | feat: add Sext Panther as second offer in Paysites wing |
| `8cbc86c` | feat: replace first Fan Sites creator and standardize creator titles |
| `b7ac161` | fix: separate AI partner captions by locale |
| `bbfeba4` | fix: move AI partner titles above cards and captions below |
| `e443da0` | feat: add Candy AI male partner offer |
| `f6afaae` | feat: add Darlink AI Partners offer |
| `6671605` | fix: restore gay and transgender wing persistence and localization |
| `9c31de4` | feat(dating): add Vicky Milan dating offer card |
| `50db787` | fix: eliminate arrival horizontal shimmy |

---

## VERCEL PRODUCTION STATUS

- **Status:** Live (HTTP 200)
- **Last verified:** 2026-07-08
- **Deploy latency:** ~45-50 seconds from push to live

---

## WING STRUCTURE — CURRENT STATE

### 1. DATING (`dating`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | Real Connections | `/dating-offer.png` | Default | `t.acust-7.com/.../3785/0?...` | EN + ES |
| 2 | ENJOY A DISCREET DATE | `/vicky-milan-dating.png` | Default | `t.crdtg3.com/.../4593/40617?...` | Title only (no desc) |

**Renderer:** `DatingRoom.tsx` (custom immersive)
**Background:** `/dating-room.jpg`
**Translation status:** Complete

### 2. LIVE CAMS (`live-cams`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | (Camarada) | imglnkx GIF (hardcoded) | 3/2 | `t.camsk1.com/.../37445?...` | Banner only |
| 2 | (Jerkmate) | imglnkx JPG (hardcoded) | 3/2 | `t.mbjrkmms.com/.../8780/0?...` | Banner only |
| 3 | MYFREECAMS | `/myfreecams-300x250.png` | 300x250 | `t.amyfc.link/.../779/0?...` | Brand name (untranslated) |

**Renderer:** `LiveCamsRoom.tsx` (custom immersive, all 3 cards hardcoded)
**Background:** `/livecams-room.png`
**Translation status:** Complete (brand name never translated)
**Note:** Cards 1 and 2 are legacy 3/2 ratio. Card 3 is 300x250 with gold heading.

### 3. AI PARTNERS (`ai-companions`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | GIRLFRIEND GPT | chatglm PNG | Default | `t.vlmai-1.com/.../10046/38605?...` | EN + ES |
| 2 | DARLINK AI | imglnkx PNG | 300x250 | `t.vlmai-1.com/.../10345/0?...` | EN + ES captions |
| 3 | CANDY AI MALE | imglnkx GIF | 300x250 | `t.vlmai-1.com/.../10022/37968?...` | EN + ES captions |

**Renderer:** `DistrictScene.tsx` generic with `[data-district="ai-companions"]` CSS overrides
**Background:** `/ai-partners-bg.png`
**Translation status:** Complete

### 4. FAN SITES (`fan-sites`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | AMBER SANTORI | imglnkx PNG | 300x100 | `t.acust-9.com/.../10394/0?...` | Brand name only |
| 2 | TALIA ROSE | imglnkx PNG | 300x100 | `t.acust-9.com/.../10398/0?...` | Brand name only |
| 3 | MILA LERUE | imglnkx PNG | 300x100 | `t.acust-9.com/.../10395/0?...` | Brand name only |

**Renderer:** `DistrictScene.tsx` generic with `[data-district="fan-sites"]` CSS overrides
**Background:** `/fan-sites-bg.png`
**Translation status:** Complete (brand names never translated)
**Note:** 300x100 banners. Title above, no description.

### 5. PAY SITES (`pay-sites`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | BELLESA PLUS | imglnkx JPEG | 300x250 | `t.bbwafx.com/.../7378?...` | Title only (no desc) |
| 2 | SEXT PANTHER | `/sext-panther-300x250.png` | 300x250 | `t.acust-9.com/.../9927/38131?...` | Brand name (untranslated) |

**Renderer:** `DistrictScene.tsx` generic with per-resident CSS (`[data-resident="sextpanther"]`)
**Background:** chatglm.cn hosted image
**Translation status:** Complete

### 6. GAY (`niche`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | PREMIUM GAY ENTERTAINMENT | `/gay-offer.png` | Default | `t.acust-7.com/.../4080/0?...` | Title only (no desc) |

**Renderer:** `DistrictScene.tsx` generic
**Background:** `/gay-bg.png`
**Translation status:** Complete

### 7. GAMES (`gaming`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | MANGA RPG | `/manga-rpg-300x250.png` | 300x250 | `t.acust-9.com/.../6621?...` | EN + ES desc |
| 2 | COMIX HAREM | `/CxH-SQ1-13_300x250_EN.gif` | 300x250 | `t.aagm.link/.../7930/27132?...` | EN + ES desc |
| 3 | COMIX HAREM | `/010679A_CXHR_18_ALL_EN_71_L.gif` | 300x250 | `t.aagm.link/.../7930/27132?...` | EN + ES desc |

**Renderer:** `DistrictScene.tsx` generic with per-resident CSS (`[data-resident="manga-rpg"]`, `[data-resident="comix-harem-1"]`, `[data-resident="comix-harem-2"]`)
**Background:** chatglm.cn hosted image
**Translation status:** Complete
**Pending:** Banner GIFs for Comix Harem cards 2 and 3 not yet uploaded to `/public/`.
**Note:** Cards 2 and 3 are the same affiliate offer with different creative variants.

### 8. TRANSGENDER (`our-mission`)

| # | Offer | Banner | Size | Affiliate URL | i18n |
|---|-------|--------|------|---------------|------|
| 1 | TRANS PORNSTAR HAREM | `/trans-offer.png` | Default | `t.mbagm.link/.../8663/0?...` | Title only (no desc) |

**Renderer:** `DistrictScene.tsx` generic
**Background:** `/trans-bg.jpg`
**Translation status:** Complete

---

## TOTAL AFFILIATE INVENTORY

| Wing | Active Offers |
|------|--------------|
| Dating | 2 |
| Live Cams | 3 |
| AI Partners | 3 |
| Fan Sites | 3 |
| Pay Sites | 2 |
| GAY | 1 |
| Games | 3 |
| TRANSGENDER | 1 |
| **Total** | **18** |

---

## ENGINEERING DECISIONS

1. **Per-resident CSS via `data-resident` attribute** — Added to `EncounterCard.tsx` to allow per-card styling without per-district overrides. Used for SEXT PANTHER, MANGA RPG, COMIX HAREM.

2. **LiveCamsRoom remains hardcoded** — Cards are not data-driven. New cards added directly in JSX. MYFREECAMS uses `data-cam` attribute for CSS targeting.

3. **Empty descriptions hidden at component level** — `EncounterCard.tsx` conditionally renders description only when content exists.

4. **i18n cross-contamination fix** — Root cause was Spanish strings placed in EN block while ES block had no keys. Fixed by ensuring EN and ES blocks each have correct-language values for every key.

5. **"Video Games" renamed to "Games"** — Updated in `rooms.ts` (data), `i18n.tsx` (EN: "Games", ES: "Juegos"). All references eliminated.

6. **Fan Sites use 300x100 banners** — Exception to the 300x250 standard. Titled above, no body.

---

## KNOWN ISSUES / REMAINING WORK

1. **Sidebar spacing below TRANSGENDER icon** — Visual alignment issue in sidebar.
2. **CONTACT footer should email Christopher** — Compliance footer "Contact" link needs mailto.
3. **PRIVACY requests should email Christopher** — Privacy link needs mailto or page.
4. **DMCA requests should email Christopher** — No DMCA process exists yet.
5. **Copyright removal requests should email Christopher** — No process exists yet.
6. **Continue replacing remaining white offer headings with gold/amber** — Some older cards may still use default white text.
7. **Continue alternating bug fixes with new affiliate offers** — Cadence: fix, offer, fix, offer.
8. **Games wing: Comix Harem banner GIFs not uploaded** — `/CxH-SQ1-13_300x250_EN.gif` and `/010679A_CXHR_18_ALL_EN_71_L.gif` are missing from `/public/`.
9. **Prepare future CrakRevenue LiveCam API integration** — Pending approval.
10. **"BANG OTHER SUPERHER-HOES!"** — Potential future superhero-themed offer tagline. Status: Backlog only.

---

## PUBLIC ASSETS

```
public/
  ai-partners-bg.png
  cantina-arrival.png
  dating-offer.png
  dating-room.jpg
  fan-sites-bg.png
  gay-bg.png
  gay-offer.png
  hub-bg.png
  livecams-room.png
  logo.svg
  manga-rpg-300x250.png
  myfreecams-300x250.png
  robots.txt
  sext-panther-300x250.png
  trans-bg.jpg
  trans-offer.png
  vicky-milan-dating.png
```