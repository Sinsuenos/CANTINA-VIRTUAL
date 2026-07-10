/* ═══════════════════════════════════════════════════════════════
   NECTAR ENGINE — Type Definitions
   ═══════════════════════════════════════════════════════════════

   PRIVACY NOTICE (Phase 1):
   - NO sign-in, NO account creation, NO email capture.
   - All state is 100% client-side via localStorage.
   - Progress is tied to THIS BROWSER ONLY, not to a person's identity.
   - Clearing browser data or switching devices resets all progress.
   - No cookies, no external analytics, no third-party tracking.
   ═══════════════════════════════════════════════════════════════ */

export interface NectarSection {
  /** Unique ID matching the district ID in rooms.ts (e.g. 'dating', 'live-cams') */
  id: string;
  /** Points awarded on first visit */
  points: number;
}

export interface NectarQuest {
  /** Unique quest ID */
  id: string;
  /** Points awarded on completion */
  points: number;
}

export interface NectarHistoryEntry {
  action: string;
  points: number;
  timestamp: string; // ISO 8601
  meta?: string;
}

export interface NectarState {
  /** sectionId → ISO timestamp of first visit */
  visitedSections: Record<string, string>;
  /** questId → ISO timestamp of completion */
  completedQuests: Record<string, string>;
  totalPoints: number;
  history: NectarHistoryEntry[];
}

export interface NectarConfig {
  sections: NectarSection[];
  quests: NectarQuest[];
}

/** The shape returned by useNectarEngine() */
export interface NectarEngineHook {
  state: NectarState;
  /** Mark a section as visited. Awards points on first visit only. Returns true if points were awarded. */
  visit: (sectionId: string) => boolean;
  /** Record a bonus action (future use — Phase 1 has no bonus actions). */
  recordBonus: (action: string, points: number, meta?: string) => void;
  /** Reset all progress (clears localStorage). */
  reset: () => void;
  /** True when all sections in config have been visited. */
  allQuestsComplete: boolean;
  /** Per-section completion status, keyed by section ID. */
  questStatus: Record<string, boolean>;
  /** The active NectarConfig. */
  config: NectarConfig;
}

export const EMPTY_NECTAR_STATE: NectarState = {
  visitedSections: {},
  completedQuests: {},
  totalPoints: 0,
  history: [],
};
