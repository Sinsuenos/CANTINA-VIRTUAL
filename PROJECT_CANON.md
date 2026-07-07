# CANTINA VIRTUAL — PROJECT CANON

> **Permanent rules. Append only. Never remove entries.**

---

## PHILOSOPHY

- **PATCH-ONLY STABILIZATION MODE.** No refactors, no redesigns, no CSS masking experiments, no unrelated changes.
- Every change must be the minimum required to achieve the user's request.
- If the user says "edit ONLY rooms.ts", edit ONLY rooms.ts.
- Do not argue with the user. Execute the patch.

---

## TERMINOLOGY

- **Wings** — the 8 sections of the site (dating, live-cams, ai-companions, fan-sites, pay-sites, niche/GAY, gaming, our-mission/TRANSGENDER). NOT "icons", NOT "buttons", NOT "pages".
- **Residents** — offer cards within a Wing (defined in `RESIDENTS` in `rooms.ts`).
- **Encounters** — the junction between a Resident and an affiliate URL (defined in each District's `encounters[]` array).
- **Hub** — the wing selection screen.

---

## STANDARDIZED UI RULES (established 2026-07-08)

- Gold/amber ALL CAPS heading above every affiliate banner.
- Banner is the visual. Do not overlay text on banners.
- Caption/description goes BELOW the banner when present.
- Empty descriptions remain empty — do not invent marketing copy.
- 300x250 is the standard offer size unless intentionally different.
- Fan Sites use 300x100 banners (established exception).
- Brand names are NEVER translated (MYFREECAMS, COMIX HAREM, SEXT PANTHER, BELLESA PLUS, MANGA RPG, etc.).
- English and Spanish must remain synchronized at all times.

---

## ENGINEERING RULES (established 2026-07-08)

- Patch-only workflow.
- Fix root causes, not symptoms.
- Never redesign while fixing.
- Never globally hide overflow.
- Never introduce regressions while solving another bug.
- Verify repository state before continuing interrupted work.
- Verify Build.
- Commit.
- Push.
- Verify GitHub.
- Verify Vercel Production.
- Report only factual completion.

---

## LOCALIZATION RULES (established 2026-07-08)

- English must NEVER display Spanish.
- Spanish must NEVER display English.
- Every localization change requires a full EN/ES audit before commit.
- Brand names remain identical across languages unless intentionally localized.

---

## DATA INTEGRITY RULES (established 2026-07-08)

- `rooms.ts` is the single source of truth for all wing data, resident data, and affiliate URLs.
- `i18n.tsx` is the single source of truth for all display strings (EN + ES).
- i18n keys use the district `id`, not the display name (e.g., `district.niche.name` not `district.gay.name`).
- The `id` field in DISTRICTS never changes. Wing renames only change `name` and i18n display strings.
- Uploaded images go to `/home/z/my-project/public/` and are referenced with leading `/`.
- External images (imglnkx.com, chatglm.cn) are referenced by full URL.

---

## HYDRATION SAFETY RULES (established prior)

- Never use `Math.random()` in client components. Use deterministic LCG seed if randomness is needed.

---

## FUTURE BACKLOG

- "BANG OTHER SUPERHER-HOES!" — Potential future superhero-themed offer tagline. Status: Backlog only.
- CrakRevenue LiveCam API integration — Pending approval. Will replace hardcoded LiveCamsRoom cards.