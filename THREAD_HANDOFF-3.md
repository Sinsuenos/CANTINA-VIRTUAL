# THREAD HANDOFF #3 — Gumroad + Routing Status

> Read AGENT_HANDOFF.md first. It contains all Cantina Virtual rules.
> This document covers what happened AFTER AGENT_HANDOFF.md was written.

---

## 1. WHAT WAS COMPLETED SINCE LAST HANDOFF

### Cantina Virtual — ALL DONE (in other threads)

| Phase | Commit | Status |
|-------|--------|--------|
| Phase 0: Bug fixes (i18n, lint, CSS) | `67abfc3` | Done |
| Phase 1: Providers to layout | `f5c52f8` | Done |
| Routing: 10 shareable wing URLs | `16841d7` | Done |
| Dashboard: PIN-gated /dashboard | `4eaf226` | Done |

### Routing Implementation Details

The site now has real Next.js routes for all 10 wings via dynamic `[wing]` segment:

```
src/app/[wing]/page.tsx         — Server component, generateStaticParams, per-wing SEO metadata
src/app/[wing]/WingPageClient.tsx — Client component that renders the wing
src/lib/wing-routes.ts          — SLUG_TO_ID mapping, WING_SLUGS array, SITE_BASE
```

**Shareable URLs now work:**
```
cantina-virtual.vercel.app/dating
cantina-virtual.vercel.app/live-cams
cantina-virtual.vercel.app/ai-companions
cantina-virtual.vercel.app/fan-sites
cantina-virtual.vercel.app/pay-sites
cantina-virtual.vercel.app/gay
ucantina-virtual.vercel.app/gaming
cantina-virtual.vercel.app/our-mission   (Transgender — legacy ID)
cantina-virtual.vercel.app/unique-offers
cantina-virtual.vercel.app/nectar
```

**FIRST TASK for new thread:** Verify all 10 wing URLs return 200, render correctly, and have proper SEO metadata. Check that the age gate works on direct wing access. Screenshot each one.

### Sitemap

`src/app/sitemap.ts` exists but only has 5 entries (root, privacy, dmca, terms, contact). It needs to be updated with all 10 wing URLs plus the dashboard. The routing commit may have already done this — verify.

---

## 2. GUMROAD — SINALOA SUEÑOS PROFILE (done this thread)

### What Was Built

Custom Gumroad profile page for the **Sinaloa Sueños** store. Live and published.

- **URL:** https://sinaloainspired.gumroad.com
- **HTML source:** `docs/sinaloa-suenos-gumroad-profile.html` in this repo
- **Design:** Dark nectar-glow background (PNG converted from SVG), dark gradient overlay for text readability, white bold headline, purple CTA button, one block
- **Identity:** Sinaloa Sueños — NO invented personal name or biography
- **Primary CTA:** Nectar Engine ($47) → links to product purchase page
- **Copy:** "We turn one affiliate offer into platform-ready campaigns." — No compliance language, no AI mentions

### Gumroad Assets Hosted on Their CDN

| Asset | URL |
|-------|-----|
| Profile image | `https://public-files.gumroad.com/tabcyhdgrnbv8i7gkeopz6rrylxf` |
| Nectar glow background (PNG) | `https://public-files.gumroad.com/1tv186hbt4m694h32fw9musnaqal` |
| Product cover (old, do NOT use) | `https://public-files.gumroad.com/jgwse9eio089kfvxqjx8973mxw16` |

### Gumroad Credentials

Tokens are in `/home/z/my-project/.env` (gitignored, persists between sessions):
```
GUMROAD_ACCESS_TOKEN=<token>
GUMROAD_REFRESH_TOKEN=<token>
```

Account: Christopher B / sinaloainspireddreams@gmail.com
Scope: account edit_profile view_profile

### Gumroad CLI — Critical Knowledge

**Install (every new session — binary gets wiped):**
```bash
curl -fsSL https://gumroad.com/install-cli.sh | bash
export PATH="$HOME/.local/bin:$PATH"
```

**Auth with token (preferred — no interactive flow needed):**
```bash
echo "$GUMROAD_ACCESS_TOKEN" | gumroad auth login --with-token
```

**Raw OAuth (if token expires — no background process needed):**
```bash
# Step 1: Get device code
curl -s -X POST 'https://app.gumroad.com/oauth/device/code' \
  -H 'Content-Type: application/json' \
  -d '{"client_id":"<see Gumroad CLI source or ask Christopher>","scope":"account edit_profile view_profile"}'
# Returns: device_code, user_code, verification_uri_complete, expires_in (600s)

# Step 2: Give user the verification_uri_complete URL to approve in browser

# Step 3: After approval, exchange for token
curl -s -X POST 'https://app.gumroad.com/oauth/token' \
  -H 'Content-Type: application/json' \
  -d '{"client_id":"<see Gumroad CLI source>","device_code":"DEVICE_CODE_HERE","grant_type":"urn:ietf:params:oauth:grant-type:device_code"}'
```

**Key commands:**
```bash
gumroad pages push profile ./file.html   # Publish profile
gumroad pages preview ./file.html       # Preview sanitization (safe, no publish)
gumroad pages pull profile              # Download current profile HTML
gumroad pages list                       # List all storefront pages
gumroad products list                    # List products
gumroad products view <id>               # View product details
gumroad media upload ./file.png          # Upload image to Gumroad CDN
gumroad user                            # Show account info
gumroad auth status                     # Check auth state
```

**Gumroad sanitization rules (confirmed by testing):**
- STRIPS: `<meta charset>`, `<meta viewport>`, `<title>` — Gumroad adds their own
- BLOCKS: SVG images ("unsupported format") — must use PNG/JPEG/WebP/GIF
- ALLOWS: External image URLs (non-Gumroad domains), CSS @import, inline styles, position/overlay CSS
- ALLOWED tags: Standard HTML (div, span, p, h1-h6, a, img, section, main, header, footer, ul, li, figure, etc.)

### Gumroad Product Details

```
Product Name:  Nectar Engine, High-Risk Vertical Affiliate Toolkit
Product ID:    4By4iOoHFmaK28EIIRmDlw==
Price:         $47
Status:        Published
Sales:         0
Product URL:   https://sinaloainspired.gumroad.com/l/nectar-engine
FAQ URL:       https://nectar-engine.vercel.app/faq
Nectar Site:   https://nectar-engine.vercel.app
OG Image:      https://nectar-engine.vercel.app/og-image.png
Nectar Glow:   https://nectar-engine.vercel.app/nectar-glow.svg (SVG — blocked by Gumroad)
```

### Gumroad Design Decisions

- NO compliance/AI language on Gumroad (Christopher's rule — platform restrictions + brand positioning)
- NO black-font-on-white-background designs (Christopher rejected it)
- NO busy layouts with multiple boxes/cards (Christopher rejected it)
- NO "automatic" or "AI" claims in copy
- The nectar-glow background (dark with purple/blue firefly orbs) is the brand visual — use it
- Profile HTML file is at `docs/sinaloa-suenos-gumroad-profile.html` in this repo

---

## 3. CREDENTIALS

### GitHub

```
Repo:          Sinsuenos/CANTINA-VIRTUAL
Branch:        main
Token:         (see git remote URL or ask Christopher)
Git user.name: Sinaloa Suenos
Git user.email: sinaloainspireddreams@gmail.com
Workspace:     /home/z/my-project/CANTINA-VIRTUAL/
```

### Vercel

```
Production URL: https://cantina-virtual.vercel.app/
Deploy trigger: Git push to main (auto-deploy)
```

### Gumroad

```
Access Token:  BG3oMNdN5EVsoVB0iqYOZQOqhPwO1ky43xHeiH51XDk
Refresh Token: I96ICoq4gz_g-p9WcC-PMh_fF7lLEUm2fCA82fQEIx0
Store URL:     https://sinaloainspired.gumroad.com
```

---

## 4. FILE REFERENCE GUIDE

### Read These First (in order)

1. `AGENT_HANDOFF.md` — Christopher's rules, image sizing, CSS traps, workflow
2. `PROJECT_CANON.md` — Architecture, data layer, design system, pre-flight checklist
3. `PROJECT_STATUS.md` — Current wing inventory, known issues, engineering decisions
4. `THREAD_HANDOFF-3.md` (this file) — Gumroad + routing status

### Key Source Files

| File | Purpose |
|------|---------|
| `src/app/[wing]/page.tsx` | Wing route — server component, SEO metadata, static params |
| `src/app/[wing]/WingPageClient.tsx` | Wing route — client component, renders wing content |
| `src/lib/wing-routes.ts` | Slug-to-ID mapping, WING_SLUGS array |
| `src/app/Providers.tsx` | LangProvider + NectarProvider wrapper (moved in Phase 1) |
| `src/app/layout.tsx` | App layout — imports Providers |
| `src/app/page.tsx` | Main SPA — arrival, age gate, hub, all scenes |
| `src/app/dashboard/page.tsx` | Dashboard with PIN gate |
| `src/app/globals.css` | All CSS (4300+ lines) |
| `src/data/rooms.ts` | DISTRICTS array, RESIDENTS record |
| `src/lib/i18n.tsx` | T.en / T.es translations |
| `docs/sinaloa-suenos-gumroad-profile.html` | Published Gumroad profile HTML |

---

## 5. WHAT THE NEW THREAD SHOULD DO FIRST

### Priority 1: Verify Routing

1. Pull latest from `main`
2. Run `npm run build` — confirm clean build
3. Check all 10 wing URLs on production return 200 and render correctly
4. Verify age gate appears on direct wing URL access (new browser / cleared sessionStorage)
5. Verify SEO metadata on each wing URL (title, description, OG tags)
6. Screenshot each wing
7. Check/update `sitemap.ts` to include all wing URLs

### Priority 2: Gumroad Follow-ups (if Christopher asks)

- Profile page is live and approved — no changes needed unless requested
- Nectar Engine product description on Gumroad still has old compliance/AI language in the LONG description (the product page, not the profile). Christopher may want this cleaned up. Do NOT touch it without explicit permission.
- Potential future: upload more assets, create additional Gumroad pages

---

## 6. ENVIRONMENT NOTES

- **Gumroad CLI binary gets wiped between sessions.** Always reinstall at start.
- **Background processes get killed between turns.** Use raw curl for OAuth, or `--with-token` for CLI auth.
- **Workspace path:** `/home/z/my-project/CANTINA-VIRTUAL/`
- **Node version:** Check with `node -v` — project uses Next.js 16
- **Build:** `npm run build` (Turbopack)

---

## 7. THREAD HISTORY

| Thread | What Happened |
|--------|---------------|
| Thread 1 | Built most of Cantina Virtual — offers, CSS, i18n, images |
| Thread 2 | Phase 0 fixes, Phase 1 providers, routing migration, dashboard |
| Thread 3 (this one) | Gumroad CLI auth, Sinaloa Sueños profile page built + published |

This is **Thread 3**. The routing was completed in Thread 2. The new thread will be **Thread 4**.