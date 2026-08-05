/* ── GA4 event helper ──
   Safely fires custom events via the global dataLayer.
   Works whether gtag.js has loaded or not (queues events). */

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { gtag?: GtagFn; dataLayer?: unknown[] };
  if (typeof w.gtag === 'function') return w.gtag;
  // dataLayer push fallback — gtag.js will process queued items once loaded
  if (Array.isArray(w.dataLayer)) {
    return (...args: unknown[]) => {
      w.dataLayer!.push(args);
    };
  }
  return null;
}

export function trackWingView(wingId: string) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', 'wing_view', { wing_id: wingId });
  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] wing_view', { wing_id: wingId });
  }
}

export function trackOfferClick(offerId: string, wingId: string) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', 'offer_click', { offer_id: offerId, wing_id: wingId });
  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] offer_click', { offer_id: offerId, wing_id: wingId });
  }
}
