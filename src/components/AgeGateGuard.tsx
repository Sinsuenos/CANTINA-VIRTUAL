'use client';

import { useState, useEffect, useCallback } from 'react';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { useLang } from '@/lib/i18n';

/* ═══════════════════════════════════════════════════════════════
   AgeGateGuard — wraps wing content behind session-based 18+ gate
   ═══════════════════════════════════════════════════════════════

   Behavior:
   - If sessionStorage has cv_age=1, renders children immediately.
   - Otherwise, shows the 18+ confirmation gate (same 2-step flow
     as the homepage: Enter → "Are you 18+?" → confirm/leave).
   - The URL stays on the requested wing (e.g. /dating).
   - After confirming, the wing content is revealed WITHOUT redirect.
   - "Leave" sends the user to Google.

   This is NOT a redirect-based gate. The user stays on the
   requested URL throughout the age verification process.
   ═══════════════════════════════════════════════════════════════ */

function WingAgeGateScene({ children }: { children: React.ReactNode }) {
  return (
    <div className="arrival-scene">
      <div className="arrival-bg" />
      <div className="arrival-dim" />
      <div className="arrival-fog arrival-fog-1" />
      <div className="arrival-fog arrival-fog-2" />
      <div className="arrival-fog arrival-fog-3" />
      <div className="arrival-glow arrival-glow-amber" />
      <div className="arrival-glow arrival-glow-magenta" />
      <div className="arrival-silhouette" />
      <div className="arrival-reflection" />
      <div className="arrival-vignette" />
      <div className="arrival-content">{children}</div>
    </div>
  );
}

export function AgeGateGuard({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<'gate' | 'confirmed'>('gate');
  const [gateStep, setGateStep] = useState<'landing' | 'confirm'>('landing');
  const { t, lang, onToggleLang } = useLang();

  /* Check sessionStorage on mount */
  useEffect(() => {
    if (sessionStorage.getItem('cv_age') === '1') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe hydration: deterministic server render, useEffect syncs from sessionStorage client-only.
      setStep('confirmed');
    }
  }, []);

  const handleConfirm = useCallback(() => {
    sessionStorage.setItem('cv_age', '1');
    setStep('confirmed');
  }, []);

  const handleLeave = useCallback(() => {
    window.location.href = 'https://google.com';
  }, []);

  if (step === 'confirmed') {
    return <>{children}</>;
  }

  /* ── Confirm step ("Are you 18+?") ── */
  if (gateStep === 'confirm') {
    return (
      <WingAgeGateScene>
        <div className="age-gate age-confirm">
          <div className="age-gate-butterfly">
            <MariposaCenterpiece />
          </div>
          <p className="age-confirm-question">{t.confirmQ}</p>
          <div className="age-confirm-actions">
            <button
              className="age-gate-btn age-gate-btn-enter"
              onClick={handleConfirm}
            >
              <span className="age-gate-btn-label">{t.confirmEnter}</span>
            </button>
            <button
              className="age-gate-btn age-gate-btn-leave"
              onClick={handleLeave}
            >
              <span className="age-gate-btn-label">{t.confirmLeave}</span>
            </button>
          </div>
          <div className="age-gate-compliance">
            <span className="age-gate-compliance-notice">{t.adultsOnly}</span>
            <a href="/dmca" className="age-gate-compliance-link">DMCA</a>
            <a href="/privacy" className="age-gate-compliance-link">{t.privacy}</a>
            <a href="/terms" className="age-gate-compliance-link">{t.terms}</a>
            <a href="/contact" className="age-gate-compliance-link">{t.contact}</a>
          </div>
        </div>
      </WingAgeGateScene>
    );
  }

  /* ── Landing step (Enter / Leave) ── */
  return (
    <WingAgeGateScene>
      <div className="age-gate">
        <div className="age-gate-butterfly">
          <MariposaCenterpiece />
        </div>
        <h1 className="age-gate-title">
          <span className="age-gate-title-cantina">CANTINA</span>
          <span className="age-gate-title-virtual">VIRTUAL</span>
        </h1>
        <p className="arrival-copy">
          {t.copyLine1}
          <br />
          {t.copyLine2}
        </p>
        <p className="arrival-copy arrival-copy-closing">
          {t.copyClosing}
        </p>
        <button
          className="lang-toggle landing-lang-toggle"
          onClick={onToggleLang}
          aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="lang-toggle-label">{lang === 'en' ? 'ES' : 'EN'}</span>
        </button>
        <div className="age-gate-actions">
          <button
            className="age-gate-btn age-gate-btn-enter"
            onClick={() => setGateStep('confirm')}
          >
            <span className="age-gate-btn-label">{t.enter}</span>
          </button>
          <button
            className="age-gate-btn age-gate-btn-leave"
            onClick={handleLeave}
          >
            <span className="age-gate-btn-label">{t.leave}</span>
          </button>
        </div>
        <div className="age-gate-compliance">
          <span className="age-gate-compliance-notice">{t.adultsOnly}</span>
          <a href="/dmca" className="age-gate-compliance-link">DMCA</a>
          <a href="/privacy" className="age-gate-compliance-link">{t.privacy}</a>
          <a href="/terms" className="age-gate-compliance-link">{t.terms}</a>
          <a href="/contact" className="age-gate-compliance-link">{t.contact}</a>
        </div>
      </div>
    </WingAgeGateScene>
  );
}