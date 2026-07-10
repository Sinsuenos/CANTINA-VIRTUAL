/* ═══════════════════════════════════════════════════════════════
   NECTAR ENGINE — Store (pure localStorage, no React)
   ═══════════════════════════════════════════════════════════════

   PRIVACY: 100% client-side localStorage. No server calls.
   Tied to THIS BROWSER only. Clearing browser data resets progress.
   ═══════════════════════════════════════════════════════════════ */

import { NectarState, EMPTY_NECTAR_STATE } from './types';

const STORAGE_KEY = 'cv_nectar_v1';
const CELEBRATED_KEY = 'nectar_celebrated';

/** Read the full NectarState from localStorage. Returns empty state on error / missing. */
export function readState(): NectarState {
  if (typeof window === 'undefined') return EMPTY_NECTAR_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_NECTAR_STATE;
    const parsed = JSON.parse(raw) as Partial<NectarState>;
    // Defensive: ensure all fields exist
    return {
      visitedSections: parsed.visitedSections ?? {},
      completedQuests: parsed.completedQuests ?? {},
      totalPoints: typeof parsed.totalPoints === 'number' ? parsed.totalPoints : 0,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return EMPTY_NECTAR_STATE;
  }
}

/** Write the full NectarState to localStorage. Silently fails on quota / SSR. */
export function writeState(state: NectarState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded or storage disabled — fail silently.
    // Progress won't persist but the in-memory state remains valid for the session.
  }
}

/** Remove all Nectar data from localStorage. */
export function clearState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fail silently
  }
}

/**
 * Has the PassportModal celebration already been shown?
 * Stored as a separate key so it survives Nectar state resets and
 * prevents the modal from auto-re-triggering on subsequent visits.
 */
export function hasCelebrated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(CELEBRATED_KEY) === 'true';
  } catch {
    return false;
  }
}

/** Mark the PassportModal celebration as shown. Called when the modal is dismissed. */
export function markCelebrated(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CELEBRATED_KEY, 'true');
  } catch {
    // fail silently
  }
}

/** Clear the celebrated flag (used if Nectar is ever fully reset). */
export function clearCelebrated(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CELEBRATED_KEY);
  } catch {
    // fail silently
  }
}
