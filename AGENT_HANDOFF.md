# AGENT HANDOFF — CANTINA VIRTUAL

> Read this before writing a single line of code.
> This document will save you 20 hours of mistakes.

---

## 1. CHRISTOPHER'S EXPECTATIONS

**How he communicates:** Short, precise instructions. Every detail you need is in the message. Logos are attached as images. Links are exact. Titles are exact. Captions are exact.

**What he wants:** Action. First time. Exact adherence. Production screenshot proof.

**What makes him angry:**
- Asking clarifying questions when the instruction was clear
- Trying to be creative with his branding, copy, or logos
- Rewording his captions or "improving" his text
- Shipping without production screenshot proof
- Breaking the IMAGE SIZING STANDARD (see §2)
- Leaving orphaned/broken code behind
- Making changes he didn't request
- Claiming done without all 7 workflow steps (see §6)
- Wasting tokens on back-and-forth — he's on free tier

**What makes him satisfied:**
- Clear, specific commit messages
- Screenshots of every change on production at 300x250 bounding box
- Fast turnaround
- Exact adherence to every rule
- No questions, just work
- Getting it right the first time

---

## 2. IMAGE SIZING — THIS WILL DESTROY YOU IF YOU GET IT WRONG

### The Rule
All offer card images MUST be exactly **300px x 250px**. Every single one. No exceptions.

### The CSS That Must Be Applied
For EVERY resident card image, you MUST add a CSS block that enforces:

```css
/* Dating wing uses .dating-encounter-image (DatingRoom.tsx).
   All other wings use .encounter-card-image (EncounterCard.tsx).
   ALWAYS target BOTH or your CSS will silently do nothing on one wing. */
[data-resident="RESIDENT-ID"] .dating-encounter-image,
[data-resident="RESIDENT-ID"] .encounter-card-image {
  aspect-ratio: 300/250;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
[data-resident="RESIDENT-ID"] .dating-encounter-image::after,
[data-resident="RESIDENT-ID"] .encounter-card-image::after {
  background: none;
}
```

### The Dual-Class Trap (I FAILED THIS)

**This is the #1 thing that will bite you.**

The Dating wing does NOT use `EncounterCard.tsx`. It uses a completely separate component called `DatingRoom.tsx` that renders cards with **`.dating-encounter-image`** class names. ALL other wings use `EncounterCard.tsx` with **`.encounter-card-image`** class names.

If you write CSS targeting only `.encounter-card-image`, it will work perfectly on every wing EXCEPT Dating. The Dating wing will silently ignore your CSS. The card will render with wrong aspect ratio, wrong positioning, and the default gradient overlay. You won't know until you check production.

**Always target both classes. Always.** The CSS template above does this. Use it.

### The Clipping History

This rule exists because image clipping has happened THREE times:
1. Red dismiss-X button on Crossdressing Fun was clipped off the right edge — container lacked `overflow: hidden`
2. Banner text obscured by default gradient overlay — `::after` rule not overridden
3. Background-position offset (`center 30%`) caused right-edge clipping of logos

### Production Verification (MANDATORY)

After deploying, you MUST:
1. Navigate to the wing containing the card on production
2. Get the image element's `getBoundingClientRect()`
3. Screenshot at the exact bounding box
4. Visually confirm ZERO clipping on all four edges: left, right, top, bottom
5. If ANY clipping exists, you have not finished the task

### Full standard documented at:
`docs/IMAGE_SIZING_STANDARD.md` — read it before touching any image.

---

## 3. FLAT_LAYOUT_RESIDENTS — NOT OPTIONAL

### What It Is

A `Set` in `EncounterCard.tsx` (line 13) that changes the DOM structure for specific residents. When a resident is in this set, the card renders with a flat DOM: name, image, and description as direct children of the `<a>` tag, with NO `.encounter-card-body` wrapper.

### Current Members
```
trans-offer, jermate-trans, soda-offer, sweepsex-trans, imlive-trans, datsk-trans
```

### When to Add a Resident to It

**Only Transgender wing residents** should be in this set. The Trans wing intentionally uses a different layout (`display: block` instead of `display: grid`) due to a confirmed Chromium subpixel rounding bug that causes 2px offset between cards with different text lengths.

### What Happens If You Don't

If you add a card to the Trans wing and don't add it to `FLAT_LAYOUT_RESIDENTS`, the card will render with a different DOM structure than every other Trans card. It'll have a `.encounter-card-body` wrapper, different padding, and sit at a different height. It'll be visibly misaligned.

### What Happens If You Add a Non-Trans Resident to It

The card will render without the `.encounter-card-body` wrapper. If the wing's CSS expects that wrapper (most do), the card will break visually.

---

## 4. PER-RESIDENT CSS BLOCK — THE MOST FREQUENTLY MISSED STEP

### The Rule (from PROJECT_CANON §13, constraint #11)

Every new resident/offer card added to a wing MUST include its own per-resident CSS block in `globals.css`. This block strips default card chrome and applies the grid layout with `order: 1/2/3` for title/banner/caption.

### What Happens Without It

The card renders with default `.encounter-card` styling: visible border, wrong padding, no title-above/caption-below reordering. The data, translations, and image can all be correct, but the card looks broken.

### Always Verify

After adding a new resident, grep for `[data-resident="NEW-ID"]` in `globals.css` to confirm the block exists. If it doesn't, the card is broken even if the build passes.

---

## 5. DATING WING IS A SEPARATE SYSTEM

### The Critical Difference

The Dating wing uses `DatingRoom.tsx` — a completely separate component from `EncounterCard.tsx`. This means:

| Feature | DatingRoom.tsx (Dating) | EncounterCard.tsx (All Others) |
|---|---|---|
| CSS class prefix | `.dating-encounter-*` | `.encounter-card-*` |
| Image class | `.dating-encounter-image` | `.encounter-card-image` |
| Body class | `.dating-encounter-body` | `.encounter-card-body` |
| Name class | `.dating-encounter-name` | `.encounter-card-name` |
| Desc class | `.dating-encounter-desc` | `.encounter-card-desc` |
| FLAT_LAYOUT | Not applicable | See FLAT_LAYOUT_RESIDENTS |
| Dismiss X | Not supported | Via DISMISSABLE_RESIDENTS |

### What This Means for You

1. Any CSS you write for a Dating wing card MUST target `.dating-encounter-image`, not `.encounter-card-image` (or both, to be safe)
2. `DatingRoom.tsx` does NOT check `FLAT_LAYOUT_RESIDENTS` or `DISMISSABLE_RESIDENTS` — those are `EncounterCard.tsx` features only
3. If you need to modify card rendering for a Dating offer, edit `DatingRoom.tsx`, not `EncounterCard.tsx`
4. There is dead CSS in `globals.css` targeting `.dating-encounter-image::after` for USA ONLY badge on MMP — that class structure was correct for DatingRoom but the badge logic was removed

---

## 6. VERCEL/GIT WORKFLOW — THE SEVEN STEP SEQUENCE

### Git Config (must be set every session)
```
git config user.name "Sinaloa Suenos"
git config user.email "sinaloainspireddreams@gmail.com"
```

### The Sacred Sequence (ALL 7 STEPS, EVERY TIME)

1. **Commit** — with clear, specific message
2. **Push** — to `main` branch of `Sinsuenos/CANTINA-VIRTUAL`
3. **Confirm hash** — report the full commit SHA
4. **Vercel redeploy** — wait for auto-deploy or trigger via dashboard
5. **Confirm build 200** — verify the deployment succeeded
6. **Screenshot production** — navigate to the live URL and take screenshots
7. **Report done** — with commit hash, production screenshots, and confirmation

### What's Failed

- **CLI timeouts:** If `npx next build` or `git push` times out, don't retry the same command 3 times. Switch methods immediately.
- **Vercel cache:** After pushing, wait 45-60 seconds before checking production. Vercel builds take time.
- **Stale production:** If the DOM shows old class names or old content, the new build hasn't deployed yet. Wait more, then hard-refresh.
- **Build passes but CSS doesn't work:** You targeted the wrong class. See §5.

### When Stuck

- **File corruption?** `git checkout HEAD -- <file>` to restore, confirm build passes, then retry
- **CLI timeout?** Don't retry CLI. Use Vercel dashboard "Redeploy" button immediately
- **Build failure?** Report the exact error message before retrying
- **Unsure about styling?** Copy from an existing working card in the same wing. Do NOT invent.

---

## 7. AFFILIATE LINKS — SACRED, IMMUTABLE

### The Rule

Never touch an affiliate link. Never shorten it. Never strip parameters. Never "clean it up." The sub-IDs (`aff_sub`, `aff_sub2`, `aff_sub3`, `aff_sub5=SF_006OG000004lmDN`) are tracking parameters. That's the whole point.

### If Christopher Gives You a Link

Use it EXACTLY as-provided. Every parameter, every subdirectory. No exceptions.

---

## 8. SPANISH TRANSLATION — LATAM ONLY

### The Rules

- **LatAm Spanish only.** Not Spain Spanish.
- **No vosoteros.** No "vosotros," "vuestro," etc.
- **No jungle imagery.** This is an 18+ dating/cam site, not a nature documentary.
- **No "lawless" language.** No "sin ley" or similar on an adult site.
- **Check globally.** If you find a translation error (like "Quates" instead of "Citas"), search ALL instances in `i18n.tsx` and fix every one. One missed instance is a failure.

### Translation File

`src/lib/i18n.tsx` — two objects: `T.en` and `T.es`. Both must be updated for every new resident. Key format: `resident.<id>.name` and `resident.<id>.desc`.

### Mixed Indentation Warning

`i18n.tsx` uses inconsistent spaces/tabs. When editing, preserve the exact whitespace of surrounding lines or risk silent parse failures.

---

## 9. DESIGN CONSISTENCY — NEVER INVENT

### Colors
```
--amber: #dab12a     (gold, used for titles, borders, accents)
--amber-dim: #b08a1a
--bg-deep: #0a0e17   (darkest background)
--bg-card: #0f1520   (card background)
--text-primary: #e8e0d4
--sale-red: #ff3b3b  (for X buttons, alerts)
```

### Fonts

Monospace stack: `'Courier New', 'Lucida Console', monospace`. This is the only font. Do NOT introduce new fonts.

### Card Title Standard (gold)
```css
font-size: 16px;
letter-spacing: 0.22em;
text-align: center;
color: var(--amber);
text-shadow: 0 0 18px rgba(212,160,23,0.45), 0 0 36px rgba(212,160,23,0.15);
```

### What Should Never Be Invented

- New color schemes
- New fonts
- New card layouts
- New hover effects
- New animation patterns
- "Improvements" to the design system

Copy from an existing working card in the same wing. Every time.

---

## 10. COMMIT MESSAGE PATTERNS

### Good Commits
```
fix: replace My Mature Passion fake gold logo with real pink 300x250 banner
feat: update Mature Flirts Nearby with real tagline, 300x250 pink banner, i18n
docs: add IMAGE_SIZING_STANDARD and README card image policy
fix: target .dating-encounter-image for Dating wing 300x250 CSS
```

### Bad Commits
```
update stuff
fix things
WIP
try this
maybe fix
```

### Format
`<type>: <short description of what changed and why>`

Types: `fix`, `feat`, `docs`, `chore`, `refactor`

---

## 11. DISMISSABLE_RESIDENTS — RED X OVERLAY

A `Set` in `EncounterCard.tsx` (line 23) for residents that get a red dismiss-X button on their banner. Currently only `crossdressing-fun`.

**This only works in `EncounterCard.tsx`**, NOT in `DatingRoom.tsx`. If Christopher asks for a dismiss button on a Dating wing card, you'll need to modify `DatingRoom.tsx` to support it.

The X button CSS is `.card-dismiss-x` in `globals.css`. It's red (#cc0000), circular, positioned top-right with z-index 5. The `overflow: hidden` on the image container MUST be present or the X will be clipped.

---

## 12. DATA LAYER — WHERE OFFERS LIVE

### `src/data/rooms.ts`

Two exports:
- `RESIDENTS`: Record of all offer entities (id, name, subtitle, description, image)
- `DISTRICTS`: Array of wings, each with `encounters[]` referencing residents by ID with optional `href`

### District (Wing) IDs
```
dating, live-cams, ai-companions, fan-sites, pay-sites, niche, gaming, our-mission, unique-offers, nectar
```

**Note:** Transgender wing ID is `our-mission` (legacy), NOT `transgender`. Gay wing ID is `niche`.

### Adding a New Offer — All 5 Steps (from PROJECT_CANON §14)

1. `src/data/rooms.ts` — Add entry in `RESIDENTS` record
2. `src/data/rooms.ts` — Add entry in target district's `encounters[]` array with exact affiliate link
3. `src/lib/i18n.tsx` — Add EN translation (`resident.<id>.name`, `resident.<id>.desc`)
4. `src/lib/i18n.tsx` — Add ES translation (same keys in `T.es`)
5. `src/app/globals.css` — Add per-resident CSS block (see §4)

---

## 13. PROMO BUTTONS — BLACK/GOLD STYLE

The site has two promo buttons that appear on every wing and the Nectar page. These are in `src/app/page.tsx` inside `.promo-btns-stack`. They use `.promo-btn-gold` CSS class (black background, gold text, gold border).

- "ALL AFFILIATE OFFERS 70+" (🔥)
- "AI COMPANION REVIEWS" (🤖) — links to `https://sinaloa-suenos-ai-reviews.carrd.co`

These replaced the old red/purple buttons. Do NOT recreate red or purple promo buttons.

---

## 14. EMOJI CORRUPTION — KNOWN ISSUE

When writing emoji characters (🔥, 🤖, ») using the Write or Edit tool, they can be corrupted into byte sequences like `^Af525` or `^@bb`. This has happened multiple times.

**If you see garbled characters after an edit:**
1. Use Python to do byte-level replacement: `\xf0\x9f\x94\xa5` = 🔥, `\xf0\x9f\xa4\x96` = 🤖, `\xc2\xbb` = »
2. Or restore the file with `git checkout HEAD -- <file>` and re-edit
3. Always verify emoji display after editing files that contain them

---

## 15. PROJECT CANON

`PROJECT_CANON.md` at the project root is the single source of truth. Read it. It covers architecture, district inventory, offer card structure, banner assets, affiliate links, i18n, CSS design system, age gate, legal pages, git/deploy, known issues, known constraints, and the pre-flight checklist.

If code and canon disagree, code wins. But usually they agree.

---

## 16. CURRENT PRODUCTION STATE

**URL:** `https://cantina-virtual.vercel.app/`
**Repo:** `Sinsuenos/CANTINA-VIRTUAL` on GitHub, `main` branch
**Latest commits (this session):**
- `f99d15a` — fix: target .dating-encounter-image for Dating wing 300x250 CSS
- `68763e0` — docs: add IMAGE_SIZING_STANDARD and README card image policy
- `e0b5d6c` — feat: update Mature Flirts Nearby with real tagline, 300x250 pink banner, i18n
- `59d7774` — fix: replace My Mature Passion fake gold logo with real pink 300x250 banner

**Wings with offers:** Dating (9), Live Cams (7), AI Companions (4), Fansites (4), Paysites (4), Gay (5), Games (4), Transgender (6), Unique Offers (7), Nectar (0, teaser only)

---

## 17. MISTAKES I MADE — LEARN FROM THEM

### Mistake 1: CSS Targeted Wrong Class
I wrote `[data-resident="my-mature-passion"] .encounter-card-image` for a Dating wing card. The Dating wing uses `DatingRoom.tsx` which has `.dating-encounter-image`. My CSS silently did nothing on production. I didn't catch it until I inspected the DOM.

**Fix:** Always target both classes. The CSS template in §2 does this.

### Mistake 2: Assumed All Wings Use EncounterCard.tsx
I didn't know `DatingRoom.tsx` existed until I inspected the production DOM and saw different class names. PROJECT_CANON mentions it (§3 table row for Dating: "Separate system. Not using EncounterCard.") but I didn't read carefully enough.

**Fix:** Read PROJECT_CANON §3 and §5 before touching any card.

### Mistake 3: Used AI-Generated Images Instead of Christopher's
Christopher provided specific images (Image 2, Image 3) in the previous session. Those were lost when context ran out. I generated replacement banners with PIL instead of asking for the originals.

**Fix:** If Christopher provides images, use THEM. Not AI-generated replacements.

### Mistake 4: Landing Page Text Isn't Always a Tagline
I visited mymaturepassion.com expecting a slogan. The page is a multi-step signup flow with provocative questions, not a marketing page with a tagline. The "tagline" was "Have you ever had sexual experiences with strange girls who wear big stockings?" — clearly not suitable as a card caption.

**Fix:** Use judgment. If the landing page text isn't a tagline, use the brand name-derived caption. Confirm it has no forward slashes.

---

## 18. PENDING WORK / KNOWN ISSUES

From PROJECT_CANON §12:
1. Favicon/Open Graph image — still shows lantern, not butterfly
2. Landing page bounce animation — needs polish
3. ES language toggle — needs gold/amber color and slightly larger sizing
4. Fan Sites — banner uniformity check needed
5. GAY wing — only 2 offers; needs 1 more (NOTE: now has 5, may be outdated)
6. Pay Sites — only 2 offers; needs 1 more (NOTE: now has 4, may be outdated)
7. Background images behind offers — too light, need contrast adjustment
8. Pay Sites background — needs replacing

**Note:** PROJECT_CANON may be outdated on some counts. Always verify against current `rooms.ts`.

---

## 19. BROWSER AUTOMATION — NAVIGATING THE SITE

The site uses client-side navigation (useState, no URL routing for wings). You cannot navigate to a wing by URL.

### To reach a wing on production:
1. Open `https://cantina-virtual.vercel.app`
2. Click ENTER on the landing page
3. Click "I AM 18 OR OLDER" on the age gate
4. Accept cookie consent if present
5. Click the wing name in the hub grid — use `document.querySelectorAll('[role=listitem]')[N].click()` or find `.hub-card` elements
6. Wait 3-4 seconds for the wing to render
7. Verify content via snapshot or DOM inspection

### Cookie consent can block interaction:
If buttons don't respond, the cookie banner may be intercepting clicks. Dismiss it first with JS or by finding the ACCEPT button ref.

---

## 20. FILES YOU WILL TOUCH

| File | What It Does | When You Touch It |
|---|---|---|
| `src/data/rooms.ts` | All resident data + district/wing definitions | Adding/modifying offers, changing captions, changing images |
| `src/lib/i18n.tsx` | EN/ES translations | Any text change, new offer, caption update |
| `src/app/globals.css` | All CSS (4300+ lines) | Any visual change, new card CSS, button styles |
| `src/components/cantina/EncounterCard.tsx` | Card renderer for non-Dating wings | Adding to FLAT_LAYOUT_RESIDENTS, DISMISSABLE_RESIDENTS |
| `src/components/cantina/DatingRoom.tsx` | Card renderer for Dating wing ONLY | Modifying Dating card rendering |
| `src/app/page.tsx` | Main page with all scenes | Promo buttons, age gate, hub |
| `public/` | Static images | Adding/replacing banner images |
| `docs/IMAGE_SIZING_STANDARD.md` | 300x250 requirements | Reference only, update if standard changes |
| `PROJECT_CANON.md` | Source of truth | Reference only, update if architecture changes |

---

## 21. FINAL RULE

Do not waste Christopher's tokens. Do the work. Screenshot proof. Move on.
