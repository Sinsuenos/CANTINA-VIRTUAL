/* ═══════════════════════════════════════════════════════════════
   Wing Route Mapping — public URL slugs to internal district IDs
   ═══════════════════════════════════════════════════════════════

   Public slug is what appears in the URL bar.
   District ID is the internal key used in rooms.ts DISTRICTS array.

   Most slugs match the district ID. Exceptions:
   - /games → gaming (district ID is 'gaming' per CrackRevenue data)
   - /transgender → our-mission (stale internal ID, not a public URL)

   Do NOT change the district IDs in rooms.ts — they are referenced
   by affiliate tracking parameters (aff_sub), CSS selectors,
   i18n keys, and nectar-engine config.
   ═══════════════════════════════════════════════════════════════ */

/** Public URL slug → internal district ID */
export const SLUG_TO_ID: Record<string, string> = {
  'dating':        'dating',
  'live-cams':     'live-cams',
  'ai-companions': 'ai-companions',
  'fan-sites':     'fan-sites',
  'pay-sites':     'pay-sites',
  'gay':           'niche',
  'games':         'gaming',
  'transgender':   'our-mission',
  'unique-offers': 'unique-offers',
  'nectar':        'nectar',
};

/** All valid public slugs (for validation and sitemap) */
export const WING_SLUGS = Object.keys(SLUG_TO_ID);

/** Reverse lookup: district ID → public slug */
export const ID_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_ID).map(([slug, id]) => [id, slug]),
);

/** Canonical site base URL */
export const SITE_BASE = 'https://cantina-virtual.vercel.app';
