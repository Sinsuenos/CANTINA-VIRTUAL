# CANTINA VIRTUAL — AI HANDOFF

> **Read this file first. It contains everything a new AI session needs to continue immediately.**
> Do not reconstruct history from chat logs or git diffs.

---

## 1. CURRENT ARCHITECTURE

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui
**Repo:** `Sinsuenos/CANTINA-VIRTUAL` on GitHub, branch `main`
**Workspace:** `/home/z/my-project/`
**Production:** `https://cantina-virtual.vercel.app/` (auto-deploy on push to `main`)

### Directory Structure
```
src/
  app/
    page.tsx          — Single-page app. States: Landing -> AgeGate -> Hub -> Wing
    layout.tsx        — Root layout
    globals.css       — ALL styling (~3050 lines). Per-wing overrides use [data-district="<id>"]
    api/route.ts      — Exists, not actively used
  components/
    cantina/
      DistrictScene.tsx   — Generic wing renderer. Routes to DatingRoom for dating only.
      EncounterCard.tsx   — Default offer card. Has FLAT_LAYOUT_RESIDENTS set for Trans cards.
      LiveCamsRoom.tsx    — DEAD CODE. No longer imported. Was removed from DistrictScene routing.
      DatingRoom.tsx      — Custom renderer for dating wing. Uses i18n name lookup (bug fixed).
      SidebarHub.tsx      — Left sidebar navigation.
      NectarHUD.tsx       — Nectar points display.
      (SmokeParticles, MariposaCenterpiece, FanvueCard, OfferButton, RoomCard, SaleTier — UNUSED)
    ui/               — shadcn/ui (do not modify)
  data/
    rooms.ts          — CANONICAL DATA: all RESIDENTS + DISTRICTS + affiliate URLs
  lib/
    i18n.tsx          — EN/ES translations. Mixed indentation (spaces/tabs) — preserve surrounding whitespace on edits.
    db.ts             — Prisma (exists, not actively used)
    utils.ts          — shadcn utils
  hooks/
    use-mobile.ts, useReveal.ts, use-toast.ts
public/               — Static assets (banners, backgrounds, logo, robots.txt)
```

### Data Flow
1. `rooms.ts` — single source of truth for wing data, resident data, affiliate URLs.
2. `i18n.tsx` — single source of truth for all display strings (EN + ES).
3. `DistrictScene.tsx` — routes to `DatingRoom` for dating; uses `EncounterCard` for all others.
4. `EncounterCard.tsx` — standard card renderer. For 3 Trans residents (`trans-offer`, `jermate-trans`, `soda-offer`), renders flat DOM (no `.encounter-card-body` wrapper).
5. `globals.css` — per-wing CSS via `[data-district="<id>"]`, per-card CSS via `[data-resident="<id>"]`.

### Routing
Single `page.tsx` with client-side state machine:
- **Landing** (`arrival`): Full-screen hero, ENTER/EXIT
- **Age Gate** (`confirm`): 18+ modal
- **Hub** (`hub`): Wing selection grid + sidebar
- **Wing** (`district`): Individual wing view with sidebar

### Custom Wing Renderers
- `dating` -> `DatingRoom.tsx`
- Everything else -> `DistrictScene.tsx` generic + `EncounterCard.tsx`

> **IMPORTANT**: `LiveCamsRoom.tsx` is DEAD CODE. It is still on disk but no longer
> imported anywhere. The `if (district.id === 'live-cams')` special-case was removed
> from `DistrictScene.tsx`. Live Cams now uses the standard data-driven path.

---

## 2. CURRENT WING INVENTORY

| Wing | Internal ID | Cards | Renderer |
|------|-------------|-------|----------|
| Dates | `dating` | 4 (dating-encounter, vicky-milan-dating, date-player-two, hometown-flirt) | DatingRoom.tsx |
| Live Cams | `live-cams` | 3 (camirada, jerkmate-cams, myfreecams) | DistrictScene generic |
| AI Partners | `ai-companions` | 3 (girlfriendgpt, candy-ai-male, darlink-ai) | DistrictScene generic |
| Fan Sites | `fan-sites` | 3 (fanvue-amber, fanvue-talia, fanvue-mila) | DistrictScene generic |
| Pay Sites | `pay-sites` | 2 (bellesa-plus, sextpanther) | DistrictScene generic |
| GAY | `niche` | 2 (gay-offer, xlovegay-cams) | DistrictScene generic |
| Games | `gaming` | 3 (manga-rpg, comix-harem-1, comix-harem-2) | DistrictScene generic |
| TRANSGENDER | `our-mission` | 3 (trans-offer, jermate-trans, soda-offer) | DistrictScene generic |

**Total active affiliate cards: 23**

---

## 3. PROJECT STANDARDS

### Standardized UI Rules
- Gold/amber ALL CAPS heading above every affiliate banner.
- Banner is the visual. Do not overlay text on banners.
- Caption/description goes BELOW the banner when present.
- Empty descriptions remain empty — do not invent marketing copy.
- 300x250 is the standard offer size unless intentionally different.
- Fan Sites use 300x100 banners (exception).
- Brand names are NEVER translated (MYFREECAMS, COMIX HAREM, SEXT PANTHER, etc.).
- English and Spanish must remain synchronized at all times.

### Typography Standard for Offer Headings
```css
font-size: 16px;
letter-spacing: 0.22em;
text-align: center;
color: var(--amber);
text-shadow: 0 0 18px rgba(212,160,23,0.45), 0 0 36px rgba(212,160,23,0.15);
```

### Engineering Rules
- **Patch-only workflow.** Minimum change to achieve the request.
- Fix root causes, not symptoms.
- Never redesign while fixing.
- Verify repository state before continuing interrupted work.
- Build -> Commit -> Push -> Verify Vercel Production.

### Localization Rules
- English must NEVER display Spanish.
- Spanish must NEVER display English.
- Every localization change requires a full EN/ES audit before commit.
- i18n keys use the district `id` (e.g., `district.niche.name`), not the display name.

### Commit Convention
- `patch:` — bug fixes, small adjustments
- `feat:` — new features, offers, content
- `fix:` — root cause fixes
- `docs:` — documentation
- `asset:` — image/file additions

---

## 4. DEPLOYMENT WORKFLOW

1. `git add && git commit -m "<type>: <description>"`
2. `git push origin main` — auto-triggers Vercel
3. Wait ~50 seconds
4. Verify via `agent-browser` CLI

**IMPORTANT:** If local and remote have diverged, run `git pull --rebase` before pushing.

---

## 5. COMMON FAILURE PATTERNS TO AVOID

1. **Do NOT use `Math.random()` in client components** — causes hydration mismatches.
2. **Do NOT convert Trans wing cards back to grid/flex** — they use `display: block` due to a confirmed Chromium subpixel rounding bug (see §7).
3. **Do NOT add CSS then remove it in the same session** — creates commit noise.
4. **Do NOT refer to Wings as "icons", "buttons", or "pages".** They are Wings.
5. **LiveCamsRoom.tsx is DEAD CODE** — do not reference it, do not restore it.
6. **The RESIDENTS `};` and DISTRICTS `];` closers look similar** — inserting a resident into the wrong array causes syntax errors.
7. **Uploaded files land in `/home/z/my-project/upload/`** — always copy to `/public/` with descriptive names.
8. **The `id` field in DISTRICTS never changes** — wing renames only change `name` and i18n display strings.
9. **Do NOT place Spanish translations in the EN i18n block**.
10. **Production verification is mandatory** after pushing.
11. **i18n.tsx has mixed indentation** — preserve surrounding whitespace exactly when editing, or risk silent failures.
12. **`margin: 0` shorthand after `margin-top: 8px` will override it** — CSS shorthand always wins over earlier longhands.
13. **`agent-browser eval` reuses JS scope** — never declare the same variable name across calls in the same browser session.
14. **Any hardcoded room component bypasses i18n** — if you create a custom renderer that reads `resident.name` directly instead of `t[\`resident.${id}.name\`]`, it will skip translations.

---

## 6. CRITICAL BUG: Chromium Subpixel Rounding on Trans Cards

**Affected elements**: `[data-resident="trans-offer"]`, `[data-resident="jermate-trans"]`, `[data-resident="soda-offer"]`

**Symptom**: With `display: flex` or `display: grid`, card 3 (CAMSODA TRANSGENDER) renders its image 2px higher than cards 1+2, despite:
- Identical CSS rules (all 3 in the same selector group)
- Identical computed styles (verified via `getComputedStyle`)
- Identical DOM structure (verified after flattening)
- Identical grid track sizes (verified)
- The bug persists even with identical 2-line text in all names

**Root cause**: Chromium distributes fractional pixels inconsistently across flex/grid items when children have different intrinsic content heights (even with `min-height` equalizing them).

**Fix**: `display: block` with explicit `margin-top: 8px` on image and desc elements. Block layout does not have subpixel gap/track distribution.

**Rule**: Do NOT "fix" these cards back to grid or flex. The `display: block` is intentional and documented in PROJECT_CANON.md §3.

---

## 7. RECENT MILESTONES (2026-07-09 session)

- **Live Cams migrated** from hardcoded `LiveCamsRoom.tsx` to standard data-driven `DistrictScene` + `EncounterCard` architecture. 3 residents (camirada, jerkmate-cams, myfreecams) added to rooms.ts.
- **DatingRoom i18n bug fixed** — was using `resident.name` directly, now uses `t[\`resident.${id}.name\`]` pattern.
- **HOMETOWN FLIRT added** as 4th Dating wing card (USA-only offer).
- **Trans wing subtitle replaced** — "Every Body. Every Story. All Are Welcome Here." / ES translation added. Gold/amber 18px uppercase.
- **Trans wing cards unified** — `display: block` layout, all 3 cards pixel-perfect aligned. Flat DOM in EncounterCard.tsx for these 3 residents.
- **JERKMATE TRANSGENDER + CAMSODA TRANSGENDER** cards added (3rd session work).
- **i18n name translations** — Dating, Live Cams, Gay, and several other wing card names now have ES overrides.

---

## 8. NEXT RECOMMENDED TASKS

**In priority order:**

1. **Add captions to Trans cards 2+3** — `jermate-trans` and `soda-offer` need `description` text in rooms.ts + i18n entries.
2. **Site-wide i18n audit** — Verify all remaining untranslated card names.
3. **Favicon/Open Graph** — Replace lantern with butterfly brand asset.
4. **ES language toggle** — Make gold/amber, slightly larger.
5. **Landing page bounce** — Polish the entrance animation.
6. **GAY wing** — Add 1 more offer (currently 2).
7. **Pay Sites wing** — Add 1 more offer (currently 2).
8. **Background contrast** — Some wing backgrounds are too light behind offers.
9. **Cleanup** — Delete dead `LiveCamsRoom.tsx`, remove orphaned `.livecams-*` CSS.