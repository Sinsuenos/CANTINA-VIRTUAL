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

/* ── Dashboard click tracking (localStorage) ── */
const CLICKS_KEY = 'cv_dash_clicks';
const MAX_CLICKS = 10000;

interface ClickRecord {
  ts: number;
  offerId: string;
  wingId: string;
}

function recordClickLocal(offerId: string, wingId: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CLICKS_KEY);
    const clicks: ClickRecord[] = raw ? JSON.parse(raw) : [];
    clicks.push({ ts: Date.now(), offerId, wingId });
    /* Keep only the most recent MAX_CLICKS to prevent unbounded growth */
    if (clicks.length > MAX_CLICKS) {
      clicks.splice(0, clicks.length - MAX_CLICKS);
    }
    localStorage.setItem(CLICKS_KEY, JSON.stringify(clicks));
  } catch {
    /* localStorage full or unavailable — silently fail */
  }
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
  /* Also record to localStorage for dashboard */
  recordClickLocal(offerId, wingId);
}
