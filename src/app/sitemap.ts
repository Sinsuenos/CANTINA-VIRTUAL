import type { MetadataRoute } from 'next';
import { WING_SLUGS, SITE_BASE } from '@/lib/wing-routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* Static pages */
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_BASE}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_BASE}/dmca`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_BASE}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  /* Wing pages — public, shareable URLs */
  const wingPages: MetadataRoute.Sitemap = WING_SLUGS.map((slug) => ({
    url: `${SITE_BASE}/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  /* NOTE: /dashboard is intentionally EXCLUDED from the sitemap.
     It is a private control room, not a public page. */

  return [...staticPages, ...wingPages];
}
