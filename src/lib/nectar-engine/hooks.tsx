/* ═══════════════════════════════════════════════════════════════
   NECTAR ENGINE — React Hook + Context Provider
   ═══════════════════════════════════════════════════════════════

   NectarProvider wraps the app and holds a SINGLE shared state instance.
   useNectarEngine() consumes from context — all components see the same
   state and update together.

   PRIVACY: 100% client-side. No sign-in, no accounts, no email.
   State persists in localStorage on THIS BROWSER only.
   ═══════════════════════════════════════════════════════════════ */

'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { NectarEngineHook, NectarState, EMPTY_NECTAR_STATE } from './types';
import { NECTAR_CONFIG } from './config';
import { readState, writeState, clearState } from './store';

const NectarContext = createContext<NectarEngineHook | null>(null);

/** Wrap the app (or the section that needs Nectar) in this provider. */
export function NectarProvider({ children }: { children: ReactNode }) {
  // SSR-safe: start with empty state, hydrate from localStorage in useEffect.
  const [state, setState] = useState<NectarState>(EMPTY_NECTAR_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe hydration: useState(EMPTY) gives deterministic server render, useEffect syncs from localStorage on client only. Lazy initializer would crash SSR (localStorage undefined on server).
    setState(readState());
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever state changes (after hydration).
  useEffect(() => {
    if (hydrated) {
      writeState(state);
    }
  }, [state, hydrated]);

  /** Mark a section as visited. Awards points on first visit only. */
  const visit = useCallback((sectionId: string): boolean => {
    const section = NECTAR_CONFIG.sections.find((s) => s.id === sectionId);
    if (!section) return false;

    let awarded = false;
    setState((prev) => {
      if (prev.visitedSections[sectionId]) {
        // Already visited — no points, no state change.
        return prev;
      }
      awarded = true;
      const timestamp = new Date().toISOString();
      return {
        ...prev,
        visitedSections: { ...prev.visitedSections, [sectionId]: timestamp },
        totalPoints: prev.totalPoints + section.points,
        history: [
          ...prev.history,
          {
            action: 'visit',
            points: section.points,
            timestamp,
            meta: sectionId,
          },
        ],
      };
    });
    return awarded;
  }, []);

  /** Record a bonus action (future use — Phase 1 has no bonus actions). */
  const recordBonus = useCallback((action: string, points: number, meta?: string) => {
    setState((prev) => {
      const timestamp = new Date().toISOString();
      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        history: [
          ...prev.history,
          { action, points, timestamp, meta },
        ],
      };
    });
  }, []);

  /** Reset all progress. */
  const reset = useCallback(() => {
    clearState();
    setState(EMPTY_NECTAR_STATE);
  }, []);

  // Derive: all sections visited?
  const allQuestsComplete = NECTAR_CONFIG.sections.every(
    (s) => !!state.visitedSections[s.id]
  );

  // Derive: per-section completion status.
  const questStatus: Record<string, boolean> = {};
  for (const s of NECTAR_CONFIG.sections) {
    questStatus[s.id] = !!state.visitedSections[s.id];
  }

  const value: NectarEngineHook = {
    state,
    visit,
    recordBonus,
    reset,
    allQuestsComplete,
    questStatus,
    config: NECTAR_CONFIG,
  };

  return (
    <NectarContext.Provider value={value}>
      {children}
    </NectarContext.Provider>
  );
}

/** Consume the shared Nectar state. Must be used inside <NectarProvider>. */
export function useNectarEngine(): NectarEngineHook {
  const ctx = useContext(NectarContext);
  if (!ctx) throw new Error('useNectarEngine must be used within a NectarProvider');
  return ctx;
}
