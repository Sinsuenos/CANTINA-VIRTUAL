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
    globals.css       — ALL styling (~2800 lines). Per-wing overrides use [data-district="<id>"]
    api/route.ts      — Exists, not actively used
  components/
    cantina/
      DistrictScene.tsx   — Generic wing renderer. Routes to custom overrides for dating/live-cams.
      EncounterCard.tsx   — Default offer card. Has data-resident attribute for per-card CSS.
      LiveCamsRoom.tsx    — Custom renderer for live-cams. All 3 cards HARDCODED in JSX.
      DatingRoom.tsx      — Custom renderer for dating wing.
      SidebarHub.tsx      — Left sidebar navigation.
      NectarHUD.tsx       — Nectar points display.
      (SmokeParticles, MariposaCenterpiece, FanvueCard, OfferButton, RoomCard, SaleTier — UNUSED)
    ui/               — shadcn/ui (do not modify)
  data/
    rooms.ts          — CANONICAL DATA: all RESIDENTS + DISTRICTS + affiliate URLs
  lib/
    i18n.tsx          — EN/ES translations. Single source of truth for display strings.
    db.ts             — Prisma (exists, not actively used)
    utils.ts          — shadcn utils
  hooks/
    use-mobile.ts, useReveal.ts, use-toast.ts
public/               — Static assets (banners, backgrounds, logo, robots.txt)
```

### Data Flow
1. `rooms.ts` — single source of truth for wing data, resident data, affiliate URLs.
2. `i18n.tsx` — single source of truth for all display strings (EN + ES).
3. `DistrictScene.tsx` — routes to `LiveCamsRoom` or `DatingRoom` for custom wings; uses `EncounterCard` for all others.
4. `globals.css` — per-wing CSS via `[data-district="<id>"]`, per-card CSS via `[data-resident="<id>"]` or `[data-cam="<id>"]`.

### Routing
Single `page.tsx` with client-side state machine:
- **Landing** (`arrival`): Full-screen hero, ENTER/EXIT
- **Age Gate** (`confirm`): 18+ modal
- **Hub** (`hub`): Wing selection grid + sidebar
- **Wing** (`district`): Individual wing view with sidebar

### Custom Wing Renderers
- `dating` -> `DatingRoom.tsx`
- `live-cams` -> `LiveCamsRoom.tsx` (ALL cards hardcoded, NOT data-driven)
- Everything else -> `DistrictScene.tsx` generic + `EncounterCard.tsx`

---

## 2. CURRENT WING INVENTORY

| Wing | Internal ID | Offers | Renderer |
|------|-------------|--------|----------|
| Dates | `dating` | 2 (dating-encounter, vicky-milan-dating) | DatingRoom.tsx |
| Live Cams | `live-cites` | 3 (Camarada, Jerkmate, MYFREECAMS — all hardcoded) | LiveCamsRoom.tsx |
| AI Partners | `ai-companions` | 3 (girlfriendgpt, darlink-ai, candy-ai-male) | DistrictScene generic |
| Fan Sites | `fan-sites` | 3 (fanvue-amber, fanvue-talia, fanvue-mila) | DistrictScene generic |
| Pay Sites | `pay-sites` | 2 (bellesa-plus, sextpanther) | DistrictScene generic |
| GAY | `niche` | 1 (gay-offer) | DistrictScene generic |
| Games | `gaming` | 3 (manga-rpg, comix-harem-1, comix-harem-2) | DistrictScene generic |
| TRANSGENDER | `our-mission` | 1 (trans-offer) | DistrictScene generic |

**Total active affiliate offers: 18**

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
- Never globally hide overflow.
- Never introduce regressions while solving another bug.
- Verify repository state before continuing interrupted work.
- Build -> Commit -> Push -> Verify GitHub -> Verify Vercel Production.
- Report only factual completion data.

### Localization Rules
- English must NEVER display Spanish.
- Spanish must NEVER display English.
- Every localization change requires a full EN/ES audit before commit.
- Brand names remain identical across languages unless intentionally localized.
- i18n keys use the district `id` (e.g., `district.niche.name`), not the display name.

### Commit Convention
- `patch:` — bug fixes, small adjustments
- `feat:` — new features, offers, content
- `fix:` — root cause fixes
- `docs:` — documentation
- `asset:` — image/file additions

---

## 4. DEPLOYMENT WORKFLOW

1. `npm run build` — must compile clean (Turbopack)
2. `git add -A && git commit -m "<type>: <description>"`
3. `git push` — auto-triggers Vercel
4. Wait ~50 seconds
5. `curl -s -o /dev/null -w "%{http_code}" https://cantina-virtual.vercel.app/` — expect 200
6. For visual verification: `agent-browser` CLI is available

**IMPORTANT:** If local and remote have diverged, run `git pull --rebase` before pushing.

---

## 5. COMMON FAILURE PATTERNS TO AVOID

1. **Do NOT use `Math.random()` in client components** — causes hydration mismatches. Use deterministic LCG seed.
2. **Do NOT change `aspect-ratio` on `.livecams-encounter-image`** for legacy cards — must stay `3/2`.
3. **Do NOT add CSS then remove it in the same session** — creates commit noise.
4. **Do NOT argue with the user.** Execute the patch.
5. **Do NOT refer to Wings as "icons", "buttons", or "pages".** They are Wings.
6. **LiveCamsRoom.tsx has 3 HARDCODED cards** — editing `rooms.ts` alone will NOT change them.
7. **The RESIDENTS `};` and DISTRICTS `];` closers look similar** — a previous agent inserted a resident into the DISTRICTS array causing a syntax error.
8. **Uploaded files land in `/home/z/my-project/upload/`** — always copy to `/public/` with descriptive names.
9. **The `id` field in DISTRICTS never changes** — wing renames only change `name` and i18n display strings.
10. **Do NOT place Spanish translations in the EN i18n block** — this was the root cause of cross-language contamination.
11. **Build verification is mandatory** before committing.
12. **Production verification is mandatory** after pushing.

---

## 6. RECENT MILESTONES

- Fan Sites: 3 Fanvue creators added (300x100 banners, titles above)
- AI Partners: Darlink AI + Candy AI Male added (300x250, titles above, captions below)
- Dating: Vicky Milan offer added
- Pay Sites: SEXT PANTHER added (300x250, gold heading above banner)
- Games wing created: MANGA RPG + 2x COMIX HAREM (300x250, gold headings, descriptions below)
- "Video Games" renamed to "Games" / "Juegos" everywhere
- Live Cams: MYFREECAMS card added (300x250, gold heading above banner)
- i18n cross-contamination bug fixed (Spanish in EN block -> moved to ES block)

---

## 7. NEXT RECOMMENDED TASKS

**In priority order:**

1. **Upload missing Games wing banner GIFs** — `CxH-SQ1-13_300x250_EN.gif` and `010679A_CXHR_18_ALL_EN_71_L.gif` need to be placed in `/public/`. The code is already wired.

2. **Sidebar spacing below TRANSGENDER icon** — Visual alignment fix.

3. **CONTACT footer should email Christopher** — Wire the footer "Contact" link to a `mailto:`.

4. **PRIVACY / DMCA / Copyright removal** — Wire footer links or create pages that email Christopher.

5. **Continue replacing remaining white offer headings with gold/amber** — Audit all wings for non-gold headings.

6. **Alternate bug fixes with new affiliate offers** — Maintain cadence: fix, offer, fix, offer.

7. **CrakRevenue LiveCam API integration** — Pending approval. Will replace hardcoded LiveCamsRoom cards with dynamic data.