# CANTINA VIRTUAL — PROJECT BOOTSTRAP

> **This document is the canonical bootstrap for any new Z.ai agent thread.**
> Read it completely before executing any task. Do not reconstruct history from chat logs.

---

## 1. VERIFIED CURRENT STATE

| Item | Value |
|------|-------|
| **Repository** | `Sinsuenos/CANTINA-VIRTUAL` on GitHub |
| **Branch** | `main` (single branch, no dev/staging) |
| **Workspace path** | `/home/z/my-project/` |
| **Remote URL** | `https://github.com/Sinsuenos/CANTINA-VIRTUAL.git` (PAT embedded via `x-access-token` — check `git remote -v` for full URL) |
| **Git status** | Clean. Local = remote. No uncommitted changes. |
| **Last commit** | `55702d0` — "Add live cam banner to cams page" |
| **Last verified push** | This session. `git pull --rebase` + `git push` confirmed sync. |
| **Build** | `npm run build` — compiles clean, 0 errors, 0 type errors |
| **Production URL** | `https://cantina-virtual.vercel.app/` |
| **Deployment** | Git push to `main` auto-triggers Vercel. No Vercel CLI needed. |
| **Deploy latency** | ~45-50 seconds from push to live |
| **Node/Bun** | Project uses `next build` via npm. Bun available for `start` only. |
| **Framework** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui |

---

## 2. PROJECT CANON

### Philosophy
- **PATCH-ONLY STABILIZATION MODE.** No refactors, no redesigns, no CSS masking experiments, no unrelated changes.
- Every change must be the minimum required to achieve the user's request.
- If the user says "edit ONLY rooms.ts", edit ONLY rooms.ts.
- Do not argue with the user. Execute the patch.

### Terminology
- **Wings** — the 8 sections of the site (dating, live-cams, ai-companions, fan-sites, pay-sites, niche/GAY, gaming, our-mission/TRANSGENDER). NOT "icons", NOT "buttons", NOT "pages".
- **Residents** — offer cards within a Wing (defined in `RESIDENTS` in `rooms.ts`).
- **Encounters** — the junction between a Resident and an affiliate URL (defined in each District's `encounters[]` array).
- **Hub** — the wing selection screen.

### Data Flow
1. `rooms.ts` = **single source of truth** for all wing data, resident data, and affiliate URLs.
2. `i18n.tsx` = single source of truth for all display strings (EN + ES).
3. `DistrictScene.tsx` routes to custom renderers (`LiveCamsRoom`, `DatingRoom`) or the generic `EncounterCard` renderer.
4. `globals.css` = all styling. Per-wing overrides use `[data-district="<id>"]` selectors.

### Engineering Rules
- **Hydration safety**: Never use `Math.random()` in client components. Use deterministic LCG seed if randomness is needed (see `ArrivalDust` in `page.tsx`).
- **i18n keys use the district `id`**, not the display name. E.g., `district.niche.name` not `district.gay.name`. The `id` field never changes even when display names do.
- **Wing display names** come from `i18n.tsx` lookups: `t[district.${district.id}.name]`. The `name` field in `rooms.ts` DISTRICTS is a fallback only.
- **Uploaded images** go to `/home/z/my-project/public/` and are referenced with leading `/` in `rooms.ts`.
- **External images** (imglnkx.com, chatglm.cn, etc.) are referenced by full URL in `rooms.ts`.

---

## 3. CURRENT ARCHITECTURE

### Directory Structure
```
src/
  app/
    page.tsx          ← Single-page app. 3 states: Landing → AgeGate → Hub/Wing
    layout.tsx        ← Root layout
    globals.css       ← ALL styling (2428 lines). No Tailwind utility classes on custom components.
    api/route.ts      ← API route (exists, not actively used for content)
  components/
    cantina/
      DistrictScene.tsx   ← Generic wing renderer. Routes to custom overrides.
      EncounterCard.tsx   ← Default offer card (image + name + description below)
      LiveCamsRoom.tsx    ← Custom immersive renderer for live-cams wing ONLY
      DatingRoom.tsx      ← Custom immersive renderer for dating wing ONLY
      SidebarHub.tsx      ← Left sidebar navigation with wing list
      NectarHUD.tsx       ← Nectar points display
      SmokeParticles.tsx  ← Unused in current build
      MariposaCenterpiece.tsx ← Unused in current build
      FanvueCard.tsx      ← Unused in current build
      OfferButton.tsx     ← Unused in current build
      RoomCard.tsx        ← Unused in current build
      SaleTier.tsx        ← Unused in current build
    ui/               ← shadcn/ui components (do not modify)
  data/
    rooms.ts          ← CANONICAL DATA: RESIDENTS + DISTRICTS + affiliate URLs
  lib/
    i18n.tsx          ← EN/ES translations
    db.ts             ← Prisma (exists, not actively used)
    utils.ts          ← shadcn utils
  hooks/
    use-mobile.ts     ← Mobile detection
    useReveal.ts      ← Scroll reveal
    use-toast.ts      ← Toast notifications
public/
  cantina-arrival.png   ← Landing page background
  hub-bg.png            ← Hub page background
  dating-room.jpg       ← Dating wing background
  livecams-room.png     ← Live Cams wing background
  ai-partners-bg.png    ← AI Partners wing background
  fan-sites-bg.png      ← Fan-sites wing background
  dating-offer.png      ← Dating offer card image
  gay-offer.png         ← GAY wing offer card image
  trans-offer.png       ← TRANSGENDER wing offer card image
  logo.svg              ← Logo (exists, usage unclear)
  robots.txt            ← Search engine directives
```

### Routing
- Single `page.tsx` with client-side state machine:
  - **Landing** (`arrival`): Full-screen hero with background image, copy, ENTER/LEAVE
  - **Age Gate** (`confirm`): "Are you 18 or older?" modal
  - **Hub** (`hub`): Wing selection grid + sidebar
  - **Wing** (`district`): Individual wing view with sidebar navigation

### Custom Wing Renderers
- `dating` → `DatingRoom.tsx` (immersive room with dust particles, amber glows)
- `live-cams` → `LiveCamsRoom.tsx` (immersive room with crimson glows, glass strip)
- All other wings → `DistrictScene.tsx` generic renderer using `EncounterCard.tsx`

### Per-Wing CSS Overrides (in globals.css)
- `[data-district="fan-sites"]` — brightness override on `.district-scene-bg` (opacity: 0.55), custom overlay gradient
- `[data-district="our-mission"]` — encounter card body `order: -1` to put title ABOVE banner image

---

## 4. COMPLETED FEATURES

All verified live on production.

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page with hero background | ✅ Verified | `min-height: 100vh` fix applied to prevent black bleed on scroll |
| Age gate (18+) | ✅ Verified | Modal with ENTER/LEAVE, EN/ES |
| Hub wing selection grid | ✅ Verified | Cards 20% bigger, sidebar 33% bigger |
| Sidebar navigation | ✅ Verified | All 8 wings listed, active state highlight |
| EN/ES language toggle | ✅ Verified | Full i18n via LangProvider context |
| ArrivalDust hydration fix | ✅ Verified | Deterministic LCG seed replaces Math.random() |
| Ghost DOM elimination | ✅ Verified | Removed hidden `livecams-encounter-body` block |
| Fan-sites brightness | ✅ Verified | Per-district CSS opacity override |
| Wing rename: NICHE → GAY | ✅ Verified | Both EN/ES, sidebar + hub + wing page |
| Wing rename: MISSION → TRANSGENDER | ✅ Verified | Both EN/ES, sidebar + hub + wing page |
| GAY wing offer card | ✅ Verified | Banner: `/gay-offer.png`, URL: `t.acust-7.com/413627/4080/0?aff_sub=GAY...` |
| TRANSGENDER wing offer card | ✅ Verified | Title "TRANS PORNSTAR HAREM" above banner, URL: `t.mbagm.link/413627/8663/0?aff_sub=TRANS...` |
| Live Cams: Camarada LEFT card | ✅ Verified | Image: `PCAM-244_DESIGN-23232_300250.gif`, URL: `t.camsk1.com/413627/9776/0?aff_sub=CAMS2...` |
| Live Cams: Jerkmate RIGHT card | ✅ Verified | Image: `JM-885_DESIGN-23079...jpg`, URL: `t.mbjrkmms.com/413627/8780/0?file_id=644338...` |
| Live Cams card dimensions | ✅ Verified | Both cards `aspect-ratio: 3/2`, `background-size: cover` |

---

## 5. CURRENT WINGS — EXACT STATE

| Wing | Internal ID | Display EN | Display ES | Background | Offers | Renderer |
|------|-------------|------------|------------|------------|--------|----------|
| Dates | `dating` | Dates | Citas | `/dating-room.jpg` | 1 (dating-encounter) | DatingRoom.tsx |
| Live Cams | `live-cams` | Live Cams | Camaras en Vivo | `/livecams-room.png` | 2 (Camarada + Jerkmate, hardcoded in LiveCamsRoom.tsx) | LiveCamsRoom.tsx |
| AI Partners | `ai-companions` | AI Partners | Companeros IA | `/ai-partners-bg.png` | 1 (girlfriendgpt) | DistrictScene generic |
| Fansites | `fan-sites` | Fansites | Sitios de Fans | `/fan-sites-bg.png` | 0 | DistrictScene generic |
| Paysites | `pay-sites` | Paysites | Sitios de Pago | `chatglm.cn/...fcef82f7bbdf.png` | 0 | DistrictScene generic |
| **GAY** | `niche` | GAY | GAY | `chatglm.cn/...91b93c38ff40.jpg` | 1 (gay-offer) | DistrictScene generic |
| Video Games | `gaming` | Video Games | Videojuegos | `chatglm.cn/...fcef82f7bbdf.png` | 0 | DistrictScene generic |
| **TRANSGENDER** | `our-mission` | TRANSGENDER | TRANSGENDER | `chatglm.cn/...310a4b1925d7.jpg` | 1 (trans-offer) | DistrictScene generic |

### Locked Affiliate URLs (DO NOT MODIFY unless explicitly instructed)

**Dating:**
- `https://t.acust-7.com/413627/3785/0?po=6456&aff_sub5=SF_006OG000004lmDN`

**Live Cams — Camarada (LEFT card, from rooms.ts):**
- `https://t.camsk1.com/413627/9776/0?aff_sub=CAMS2&source=CANTINA&po=6533&aff_sub5=SF_006OG000004lmDN`

**Live Cams — Jerkmate (RIGHT card, hardcoded in LiveCamsRoom.tsx line 110):**
- `https://t.mbjrkmms.com/413627/8780/0?file_id=644338&po=6533&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0002`

**Live Cams — Additional Camarada card (hardcoded in LiveCamsRoom.tsx line 80):**
- `https://t.camsk1.com/413627/9776/37445?aff_sub=CAMS&source=CANTINA&po=6533&aff_sub5=SF_006OG000004lmDN`

**AI Partners:**
- `https://t.vlmai-1.com/413627/10046/38605?aff_sub=AI&source=Cantina&aff_sub5=SF_006OG000004lmDN`

**GAY:**
- `https://t.acust-7.com/413627/4080/0?aff_sub=GAY&source=Cantina&po=6456&aff_sub5=SF_006OG000004lmDN`

**TRANSGENDER:**
- `https://t.mbagm.link/413627/8663/0?aff_sub=TRANS&source=CANTINA&aff_sub5=SF_006OG000004lmDN`

---

## 6. CURRENT BUGS

**None known.** All previously reported issues have been resolved:
- Landing bounce (ArrivalDust hydration) — fixed with deterministic LCG seed
- Ghost DOM in Live Cams — fixed by removing hidden body block
- Jerkmate banner not filling card — fixed by restoring `aspect-ratio: 3/2` + `background-size: cover`
- Card order wrong (Jerkmate LEFT, Camarada RIGHT) — fixed, Camarada now LEFT
- Fan-sites too dark — fixed with per-district opacity override
- Landing black box bleed — fixed with `min-height: 100vh`

---

## 7. KNOWN AI PITFALLS

These are patterns that have caused failures in previous agent sessions. **Do not repeat them.**

1. **Do NOT change `aspect-ratio` on `.livecams-encounter-image`.** It must stay `3/2`. Previous agents changed it to `3/1` which compressed all cams cards.

2. **Do NOT add CSS then remove it in the same session.** This creates commit noise and confuses the diff history.

3. **Do NOT argue with the user.** If they say "edit ONLY rooms.ts", edit ONLY rooms.ts. If you think another file needs changing, note it but do not do it unless they approve.

4. **Do NOT use `Math.random()` in client components.** It causes hydration mismatches (server renders one value, client renders another). Use a deterministic LCG seed.

5. **Do NOT refer to Wings as "icons", "buttons", or "pages".** They are **Wings**. Using wrong terminology causes AI agents to edit the wrong components.

6. **Live Cams has THREE hardcoded cards in `LiveCamsRoom.tsx`**, not just the encounters from `rooms.ts`. The component renders: (1) a hardcoded Camarada `<img>` tag at line 80, (2) encounters from the district map (currently the `cams-banner` resident), and (3) a hardcoded Jerkmate `<div>` at line 109. Editing `rooms.ts` alone will NOT change cards 1 and 3.

7. **When adding a new resident to `rooms.ts`, the closing `};` of RESIDENTS and the closing `];` of DISTRICTS look similar.** A previous agent accidentally inserted a resident entry at the end of the DISTRICTS array, causing a syntax error. Always verify the structure after editing.

8. **`git pull --rebase` may be needed** if local and remote have diverged (e.g., from sandbox restarts or parallel sessions). Always check `git status` and sync before pushing.

9. **Uploaded files land in `/home/z/my-project/upload/`** with names like `Copilot_YYYYMMDD_HHMMSS.png`. Always copy them to `/home/z/my-project/public/` with a descriptive name before referencing in code.

10. **The `id` field in DISTRICTS never changes.** Wing renames only change the `name` field in `rooms.ts` and the display strings in `i18n.tsx`. The i18n keys (`district.niche.name`, `district.our-mission.name`) also stay tied to the original `id`.

11. **Per-wing CSS overrides use `[data-district="<id>"]`**, not the display name. E.g., `[data-district="our-mission"]` for the TRANSGENDER wing.

12. **Build verification is mandatory.** Always run `npm run build` after any code change and confirm "Compiled successfully" before committing.

13. **Production verification is mandatory.** After push, wait ~50 seconds, then use `agent-browser` to navigate to the live site and verify the change. Do not report success without visual confirmation.

14. **The `.encounter-card-name` styling** (gold/amber, uppercase, 12px, 0.15em letter-spacing) is the canonical offer title style. Do not recreate it — it already exists in globals.css.

---

## 8. VERIFIED CONNECTIONS

| Connection | Status | Details |
|------------|--------|---------|
| GitHub authentication | ✅ Working | PAT embedded in remote URL |
| Git remote | ✅ Working | `origin` → `github.com/Sinsuenos/CANTINA-VIRTUAL.git` |
| Push capability | ✅ Working | Verified this session |
| Vercel deployment | ✅ Working | Auto-triggered on push to `main` |
| Production URL | ✅ Live | `https://cantina-virtual.vercel.app/` |
| Agent browser | ✅ Working | `agent-browser` CLI available for verification |

---

## 9. NEXT IMMEDIATE TASKS

**In priority order:**

1. **TRANSGENDER wing background replacement.** The user will upload a new background image. When received:
   - Copy from `/home/z/my-project/upload/` to `/home/z/my-project/public/` (e.g., `trans-bg.png`)
   - Update `bgImage` in `rooms.ts` for the `our-mission` district (line ~185) to point to the new file
   - The user explicitly says: do NOT darken, blur, tint, desaturate, or overlay. Use `background-size: cover`, `background-position: center`, `background-repeat: no-repeat` (these are already the defaults in `.district-scene-bg`)
   - If a readability overlay is absolutely necessary, use maximum 5% opacity
   - Do NOT modify the existing overlay for the fan-sites wing or any other wing
   - Build, commit, push, verify on production

2. **Future: GAY wing background.** The user may upload a replacement for the current `chatglm.cn` hosted image. Same rules apply.

3. **Future: Additional offers.** The user mentioned they will provide more offers for GAY and TRANSGENDER wings later. Wait for instructions.

---

## 10. PROJECT MEMORY

### Durable Facts
- The user's timezone is `America/Mazatlan`.
- The user communicates in English. The site supports EN and ES.
- The user prefers rapid execution over explanation. "Do not analyze. Do not argue. Just execute."
- The user becomes frustrated with multiple failed attempts on the same issue. Get it right the first time.
- The project has no test suite. Verification is done via `npm run build` + `agent-browser` visual inspection.
- The `download/` directory is for final deliverables only. The `upload/` directory contains user-uploaded files awaiting processing.
- The `scripts/` directory does not exist yet but should be used for any generation scripts per workspace rules.
- `worklog.md` should be maintained at `/home/z/my-project/worklog.md` per workspace rules.

### Commit Message Convention
- Patches: `patch: <description>`
- Features: `feat: <description>`
- Fixes: `fix: <description>`
- Keep messages short and descriptive.

### Live Cams Architecture Warning
`LiveCamsRoom.tsx` has **three** cards, only one of which comes from `rooms.ts`:
1. **Line 79-90**: Hardcoded Camarada `<img>` with affiliate URL `.../37445?aff_sub=CAMS...`
2. **Line 91-108**: Dynamic encounters map from `rooms.ts` (currently renders `cams-banner` resident)
3. **Line 109-119**: Hardcoded Jerkmate `<div>` with affiliate URL `.../8780/0?file_id=644338...`

To change the Camarada image/URL on the LEFT card, edit line 85-86 of `LiveCamsRoom.tsx`.
To change the Jerkmate image/URL on the RIGHT card, edit line 110-117 of `LiveCamsRoom.tsx`.
To change the middle card (from rooms.ts), edit the `cams-banner` resident in `rooms.ts`.

### Unused Components
These files exist in the codebase but are NOT imported or rendered anywhere in the current build:
- `FanvueCard.tsx`, `OfferButton.tsx`, `RoomCard.tsx`, `SaleTier.tsx`
- `SmokeParticles.tsx`, `MariposaCenterpiece.tsx`
- Most of `src/components/ui/` (shadcn/ui boilerplate)
- `src/lib/db.ts` (Prisma), `src/app/api/route.ts`

Do NOT delete them. Do NOT modify them. They may be used in future development phases.