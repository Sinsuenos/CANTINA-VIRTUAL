# Session Handoff — 2026-07-09 (continued from prior session)

## Git Status
- **HEAD / origin/main**: `af5fe01` — "Trans cards: switch to block layout to eliminate flex/grid subpixel rounding"
- **Everything pushed** — origin/main matches local HEAD exactly.
- **Production verified** via agent-browser DOM inspection for all changes below.

## Completed This Session
1. **Transgender wing subtitle replaced** — EN: "Every Body. Every Story. All Are Welcome Here." / ES: "Cada Cuerpo. Cada Historia. Todos Son Bienvenidos Aquí." Gold/amber 18px uppercase. Files: `i18n.tsx`, `globals.css`.
2. **Trans card uniformity — ACTUALLY FIXED** (took ~12 commits). All 3 cards now pixel-perfect aligned: image top 295.38, bottom 529.38 on all three. EN + ES verified.
   - `EncounterCard.tsx` — flat DOM for `trans-offer`, `jermate-trans`, `soda-offer` (name/image/desc as direct children, no `.encounter-card-body` wrapper).
   - `globals.css` — `display: block` (NOT flex/grid), `margin-top: 8px` on image and desc, `min-height: 48px` on name, `aspect-ratio: 300/270`.

## ⚠️ Trans Card 3 Bug — Full Post-Mortem
**Symptom**: Card 3 (CAMSODA TRANSGENDER) image rendered 2px higher than cards 1+2.
**Root cause**: Chromium flex/grid subpixel rounding inconsistency. `display: flex` and `display: grid` distribute fractional pixels differently depending on content. Even with identical CSS, identical computed styles, identical DOM structure, and identical grid track sizes (verified), card 3's image was always 2px off.
**What did NOT work** (DO NOT REPEAT): `display: grid` with `1fr`/`auto`/explicit px rows, `display: flex` with `gap`/`margin-top`, `display: contents` removal, `order`/`grid-row` explicit placement, `min-height` on name, `flex-shrink: 0`, margin compensation hacks (8→9→10px all missed).
**What WORKED**: `display: block` with `margin-top`. Block layout doesn't have subpixel gap/track distribution. Switching from flex/grid to block eliminated the 2px entirely.
**Lesson**: When pixel-perfect alignment matters across cards with different text content lengths, prefer `display: block` + explicit margins over flex/grid gap.

## Still Pending (from prior sessions, NOT started this session)
- **Trans card captions**: `jermate-trans` and `soda-offer` still have `description: ''` in rooms.ts. Need short gold/amber captions.
- **Site-wide i18n name translations**: ~12 untranslated card names across Dating, AI Companions, Fan Sites, Pay Sites, Games, Transgender wings.
- **Cleanup (optional)**: Dead `LiveCamsRoom.tsx` file and orphaned `.livecams-*` CSS classes.

## Gotchas This Session
- `agent-browser eval` throws `Identifier already declared` across calls — always use unique variable names.
- Language toggle only visible from hub, not inside wings. Navigate back to hub to switch.
- Trans wing district ID is `our-mission` (legacy), not `transgender`. All CSS selectors must use `[data-district="our-mission"]`.
- VLMs hallucinate on adult content — always verify via DOM `textContent`.
- `margin: 0` shorthand AFTER `margin-top: 8px` will override it. Shorthand always wins over longhand when it appears later.