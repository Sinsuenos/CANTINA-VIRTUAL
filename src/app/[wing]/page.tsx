import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SLUG_TO_ID, SITE_BASE, WING_SLUGS } from '@/lib/wing-routes';
import { DISTRICTS } from '@/data/rooms';
import { WingPageClient } from './WingPageClient';

/* ═══════════════════════════════════════════════════════════════
   Dynamic wing route: /[wing]
   ═══════════════════════════════════════════════════════════════

   Next.js matches /dating, /live-cams, /ai-companions, etc.
   The [wing] param is the PUBLIC SLUG.

   Explicit routes (/privacy, /dmca, /terms, /contact) take
   precedence over this dynamic segment per Next.js conventions.

   We resolve the slug to the internal district ID, validate it,
   then render the WingPageClient (a 'use client' component).
   ═══════════════════════════════════════════════════════════════ */

interface PageProps {
  params: Promise<{ wing: string }>;
}

/* ── Static generation for all 10 wings ── */
export function generateStaticParams() {
  return WING_SLUGS.map((wing) => ({ wing }));
}

/* ── Per-wing metadata for SEO ── */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { wing: slug } = await params;
  const districtId = SLUG_TO_ID[slug];
  if (!districtId) return {};

  const district = DISTRICTS.find((d) => d.id === districtId);
  if (!district) return {};

  const WING_META: Record<string, { title: string; description: string }> = {
    'dating': {
      title: 'Dating — Cantina Virtual',
      description: 'Connect with real people tonight. The best adult dating offers curated in one place.',
    },
    'live-cams': {
      title: 'Live Cams — Cantina Virtual',
      description: 'Live webcam models performing in real time. Spanish beauties, top cam networks, free shows.',
    },
    'ai-companions': {
      title: 'AI Companions — Cantina Virtual',
      description: 'Create your own AI companion. Chat, connect, and explore with the best AI girlfriend and companion platforms.',
    },
    'fan-sites': {
      title: 'Fansites — Cantina Virtual',
      description: 'Exclusive content from top creators. Fanvue profiles, VIP access, and premium fan content.',
    },
    'pay-sites': {
      title: 'Paysites — Cantina Virtual',
      description: 'Premium adult content from the top paysites. Full video libraries, exclusive scenes, and memberships.',
    },
    'gay': {
      title: 'GAY — Cantina Virtual',
      description: 'A welcoming corner of the cantina. Dating, live cams, and exclusive offers for the gay community.',
    },
    'games': {
      title: 'Games — Cantina Virtual',
      description: 'Adult games and interactive experiences. RPGs, harem builders, and gamified adult entertainment.',
    },
    'transgender': {
      title: 'Transgender — Cantina Virtual',
      description: 'Transgender live cams, dating, and premium content. Inclusive adult entertainment for every preference.',
    },
    'unique-offers': {
      title: 'Unique Offers — Cantina Virtual',
      description: 'One-of-a-kind adult offers you won\'t find anywhere else. Limited time, exclusive deals.',
    },
    'nectar': {
      title: 'Nectar — Cantina Virtual',
      description: 'The heartbeat of the Cantina. Earn wings, collect stamps, and unlock rewards as you explore every room.',
    },
  };

  const meta = WING_META[slug] || {
    title: `${district.name} — Cantina Virtual`,
    description: district.description,
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_BASE}/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `${SITE_BASE}/${slug}`,
    },
  };
}

/* ── Page component ── */
export default async function WingPageRoute({ params }: PageProps) {
  const { wing: slug } = await params;
  const districtId = SLUG_TO_ID[slug];

  if (!districtId || !DISTRICTS.find((d) => d.id === districtId)) {
    notFound();
  }

  return <WingPageClient districtId={districtId} />;
}