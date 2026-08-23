'use client';

import { AgeGateGuard } from '@/components/AgeGateGuard';
import { WingPage } from '@/components/cantina/WingPage';

/* ═══════════════════════════════════════════════════════════════
   WingPageClient — client component wrapper for wing routes
   ═══════════════════════════════════════════════════════════════

   Wraps the WingPage component with the age gate guard.
   The age gate uses the same sessionStorage key (cv_age) as
   the homepage, so verification is shared across routes.

   If the user already verified on /, the gate passes through
   instantly. If not, they see the full 18+ gate at /dating
   (or whatever wing they navigated to directly).
   ═══════════════════════════════════════════════════════════════ */

export function WingPageClient({ districtId }: { districtId: string }) {
  return (
    <AgeGateGuard>
      <WingPage districtId={districtId} />
    </AgeGateGuard>
  );
}