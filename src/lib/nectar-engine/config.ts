/* ═══════════════════════════════════════════════════════════════
   NECTAR ENGINE — Config (Cantina Virtual 8-wing configuration)
   ═══════════════════════════════════════════════════════════════

   8 sections, one per wing. IDs match district IDs in rooms.ts EXACTLY:
     dating, live-cams, ai-companions, fan-sites, pay-sites, niche, gaming, our-mission

   Phase 1: first visit to each wing = +10 points.
   No quests, no bonus actions, no decay, no caps.
   ═══════════════════════════════════════════════════════════════ */

import { NectarConfig } from './types';

export const NECTAR_CONFIG: NectarConfig = {
  sections: [
    { id: 'dating', points: 10 },
    { id: 'live-cams', points: 10 },
    { id: 'ai-companions', points: 10 },
    { id: 'fan-sites', points: 10 },
    { id: 'pay-sites', points: 10 },
    { id: 'niche', points: 10 },
    { id: 'gaming', points: 10 },
    { id: 'our-mission', points: 10 },
  ],
  quests: [], // Phase 1: no quests beyond section visits
};

/** Total points achievable in Phase 1 (8 wings × 10 points). */
export const MAX_POINTS = NECTAR_CONFIG.sections.reduce((sum, s) => sum + s.points, 0);
