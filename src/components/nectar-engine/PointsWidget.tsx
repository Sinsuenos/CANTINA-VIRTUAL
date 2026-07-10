'use client';

/* ═══════════════════════════════════════════════════════════════
   PointsWidget — floating Nectar points badge + expandable panel
   ═══════════════════════════════════════════════════════════════

   Placement: top of sidebar, replacing the old "COMING SOON" badge.
   Visual: uses existing amber palette, butterfly icon, sidebar styles.

   PRIVACY: 100% client-side localStorage. No sign-in, no accounts.
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { useNectarEngine } from '@/lib/nectar-engine';
import { DISTRICTS } from '@/data/rooms';

interface PointsWidgetProps {
  /** Called when the user clicks "view passport" — parent renders PassportModal */
  onViewPassport?: () => void;
}

export function PointsWidget({ onViewPassport }: PointsWidgetProps) {
  const { t } = useLang();
  const { state, questStatus, config } = useNectarEngine();
  const [expanded, setExpanded] = useState(false);

  const visitedCount = config.sections.filter((s) => questStatus[s.id]).length;
  const totalCount = config.sections.length;

  return (
    <div className="nectar-widget-wrap">
      <button
        className="nectar-widget-badge"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={t.nectarExpand}
      >
        {/* Butterfly icon — same brand mark used site-wide */}
        <span className="nectar-widget-icon" aria-hidden="true">🦋</span>
        <span className="nectar-widget-text">
          <span className="nectar-widget-label">{t.nectarPointsLabel}</span>
          <span className="nectar-widget-count">
            {state.totalPoints}
            <span className="nectar-widget-unit"> {t.nectarPointsUnit}</span>
          </span>
        </span>
        <span className="nectar-widget-progress">
          {visitedCount}/{totalCount}
        </span>
      </button>

      {/* Subtle privacy note */}
      <p className="nectar-widget-privacy">{t.nectarProgressSaved}</p>

      {expanded && (
        <div className="nectar-widget-panel">
          <div className="nectar-widget-panel-header">
            <span className="nectar-widget-panel-title">
              {t.nectarPassportStamps}
            </span>
            <span className="nectar-widget-panel-count">
              {visitedCount}/{totalCount}
            </span>
          </div>

          <ul className="nectar-stamp-grid">
            {config.sections.map((section) => {
              const visited = questStatus[section.id];
              const district = DISTRICTS.find((d) => d.id === section.id);
              const name = district
                ? (t[`district.${section.id}.name`] || district.name)
                : section.id;
              return (
                <li
                  key={section.id}
                  className={`nectar-stamp${visited ? ' visited' : ''}`}
                >
                  <span className="nectar-stamp-icon" aria-hidden="true">
                    {visited ? '🦋' : '·'}
                  </span>
                  <span className="nectar-stamp-name">{name}</span>
                </li>
              );
            })}
          </ul>

          <div className="nectar-widget-panel-actions">
            <button
              className="nectar-widget-panel-btn"
              onClick={() => {
                setExpanded(false);
                onViewPassport?.();
              }}
            >
              {t.nectarExpand}
            </button>
            <button
              className="nectar-widget-panel-btn-secondary"
              onClick={() => setExpanded(false)}
            >
              {t.nectarCollapse}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
