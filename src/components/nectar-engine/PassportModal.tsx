'use client';

/* ═══════════════════════════════════════════════════════════════
   PassportModal — full-screen celebration overlay
   ═══════════════════════════════════════════════════════════════

   Shown ONLY when all 8 wings have been visited (first time only —
   a localStorage flag prevents re-triggering on subsequent visits).
   Also reachable via the "View Passport" button in PointsWidget.

   PRIVACY: No sign-in, no accounts, no email. Share is manual copy
   only — no auto-post to social media.
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { useNectarEngine } from '@/lib/nectar-engine';
import { DISTRICTS } from '@/data/rooms';

interface PassportModalProps {
  /** Called when user clicks "Return to Explore" — should navigate to the Hub. */
  onReturnToHub: () => void;
}

export function PassportModal({ onReturnToHub }: PassportModalProps) {
  const { t } = useLang();
  const { state, questStatus, config } = useNectarEngine();
  const [copied, setCopied] = useState(false);

  const shareText = t.nectarPassportShareText.replace('{points}', String(state.totalPoints));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API may fail in some browsers — fallback: select text
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // give up silently
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="passport-overlay" role="dialog" aria-modal="true" aria-label={t.nectarPassportTitle}>
      <div className="passport-modal">
        {/* Butterfly icon — same brand mark */}
        <div className="passport-icon" aria-hidden="true">🦋</div>

        <h2 className="passport-title">{t.nectarPassportTitle}</h2>
        <p className="passport-subtitle">{t.nectarPassportSubtitle}</p>

        {/* Stamp grid — all 8 wings */}
        <div className="passport-stamps">
          <div className="passport-stamps-header">
            <span>{t.nectarPassportStamps}</span>
            <span className="passport-stamps-count">
              {config.sections.filter((s) => questStatus[s.id]).length}/{config.sections.length}
            </span>
          </div>
          <ul className="passport-stamp-grid">
            {config.sections.map((section) => {
              const district = DISTRICTS.find((d) => d.id === section.id);
              const name = district
                ? (t[`district.${section.id}.name`] || district.name)
                : section.id;
              return (
                <li key={section.id} className="passport-stamp visited">
                  <span className="passport-stamp-icon" aria-hidden="true">🦋</span>
                  <span className="passport-stamp-name">{name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="passport-congrats">{t.nectarPassportCongrats}</p>

        {/* Share section — manual copy only, no auto-post */}
        <div className="passport-share">
          <span className="passport-share-label">{t.nectarPassportShareLabel}</span>
          <div className="passport-share-text">{shareText}</div>
          <button
            className="passport-share-btn"
            onClick={handleCopy}
            aria-label={t.nectarPassportCopyBtn}
          >
            {copied ? t.nectarPassportCopied : t.nectarPassportCopyBtn}
          </button>
        </div>

        <div className="passport-actions">
          <button className="passport-close-btn" onClick={onReturnToHub}>
            {t.nectarPassportClose}
          </button>
        </div>

        {/* Privacy note */}
        <p className="passport-privacy">{t.nectarProgressSaved}</p>
      </div>
    </div>
  );
}
