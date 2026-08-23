import type { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';

/* ═══════════════════════════════════════════════════════════════
   /dashboard — Private Control Room
   ═══════════════════════════════════════════════════════════════

   NOT part of the public Cantina experience.
   Not in sitemap. Not in public navigation. noindex.
   Protected by a PIN gate (session-based).
   ═══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'Dashboard — Cantina Virtual',
  description: 'Private control room. Not for public access.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
