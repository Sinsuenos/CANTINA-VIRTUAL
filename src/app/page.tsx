'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DISTRICTS } from '@/data/rooms';
import { useLang } from '@/lib/i18n';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { ID_TO_SLUG } from '@/lib/wing-routes';

/* ─── Arrival Dust Particles ─── */
function ArrivalDust() {
  const particles = useMemo(
    () => {
      const s = (n: number) => ((n * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
      return Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: s(i) * 100,
        delay: s(i + 50) * 10,
        duration: 7 + s(i + 100) * 8,
        size: 1 + s(i + 150) * 2,
        opacity: 0.15 + s(i + 200) * 0.25,
      }));
    },
    [],
  );

  return (
    <div className="arrival-dust-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="arrival-dust"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Arrival Scene (cinematic background wrapper) ─── */
function ArrivalScene({ children }: { children: React.ReactNode }) {
  const { lang, onToggleLang } = useLang();

  return (
    <div className="arrival-scene">
      <div className="arrival-bg" />
      <div className="arrival-dim" />
      <div className="arrival-fog arrival-fog-1" />
      <div className="arrival-fog arrival-fog-2" />
      <div className="arrival-fog arrival-fog-3" />
      <div className="arrival-glow arrival-glow-amber" />
      <div className="arrival-glow arrival-glow-magenta" />
      <ArrivalDust />

      {/* Red-light district silhouettes on the aerial wrap-around porch */}
      <div className="porch-silhouettes" aria-hidden="true">
        <span className="porch-silhouette porch-silhouette-female porch-silhouette-1">♀</span>
        <span className="porch-silhouette porch-silhouette-male porch-silhouette-1">♂</span>
        <span className="porch-silhouette porch-silhouette-female porch-silhouette-2">♀</span>
        <span className="porch-silhouette porch-silhouette-male porch-silhouette-2">♂</span>
      </div>

      <div className="arrival-silhouette" />
      <div className="arrival-reflection" />
      <div className="arrival-vignette" />
      <div className="arrival-content">{children}</div>
    </div>
  );
}

/* ─── Age Gate ─── */
function AgeGate({
  onConfirm,
  onLeave,
}: {
  onConfirm: () => void;
  onLeave: () => void;
}) {
  const [step, setStep] = useState<'landing' | 'confirm'>('landing');
  const { t, lang, onToggleLang } = useLang();

  if (step === 'confirm') {
    return (
      <ArrivalScene>
        <div className="age-gate age-confirm">
          <div className="age-gate-butterfly">
            <MariposaCenterpiece />
          </div>
          <p className="age-confirm-question">{t.confirmQ}</p>
          <div className="age-confirm-actions">
            <button
              className="age-gate-btn age-gate-btn-enter"
              onClick={onConfirm}
            >
              <span className="age-gate-btn-label">{t.confirmEnter}</span>
            </button>
            <button
              className="age-gate-btn age-gate-btn-leave"
              onClick={onLeave}
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
      </ArrivalScene>
    );
  }

  return (
    <ArrivalScene>
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
            onClick={() => setStep('confirm')}
          >
            <span className="age-gate-btn-label">{t.enter}</span>
          </button>
          <button
            className="age-gate-btn age-gate-btn-leave"
            onClick={onLeave}
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
    </ArrivalScene>
  );
}

/* ─── Regular Status Hook ─── */
function useVisitCount(): number {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const current = parseInt(localStorage.getItem('cv_visits') || '0', 10);
    const next = current + 1;
    localStorage.setItem('cv_visits', String(next));
    return next;
  });
  return count;
}

function useAliveCount() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 51) + 100);
  useEffect(() => {
    const tick = () => {
      setCount(Math.floor(Math.random() * 51) + 100);
    };
    const delay = 30000 + Math.random() * 30000;
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, []);
  return count;
}

/* ═══════════════════════════════════════════════════════════════
   HUB SCREEN — Category Selection (first screen after 18+)
   ═══════════════════════════════════════════════════════════════ */
function HubScreen() {
  const router = useRouter();
  const { t, lang, onToggleLang } = useLang();
  const visits = useVisitCount();
  const aliveCount = useAliveCount();

  const regularMessage = useMemo(() => {
    if (visits < 2) return null;
    if (visits < 5) return t.regularReturn;
    if (visits < 10) return t.regularFamiliar;
    return t.regularVip;
  }, [visits, t.regularReturn, t.regularFamiliar, t.regularVip]);

  const handleCategorySelect = useCallback((districtId: string) => {
    const slug = ID_TO_SLUG[districtId] || districtId;
    router.push(`/${slug}`);
  }, [router]);

  return (
    <div className="hub-scene">
      <div className="hub-bg" />
      <div className="hub-overlay" />
      <div className="hub-glow hub-glow-amber" />
      <div className="hub-glow hub-glow-magenta" />
      <div className="hub-vignette" />

      <div className="hub-content">
        <button
          className="lang-toggle hub-lang-toggle"
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

        <div className="hub-brand">
          <span className="hub-brand-main">CANTINA</span>
          <span className="hub-brand-sub">VIRTUAL</span>
        </div>

        <div className="hub-divider" />

        <p className="hub-subtitle">{t.hubSubtitle}</p>

        {regularMessage && (
          <p className="hub-regular-line">{regularMessage}</p>
        )}

        <div className="hub-grid" role="list" aria-label="Wing selection">
          {DISTRICTS.map((district, index) => (
            <button
              key={district.id}
              className="hub-card"
              role="listitem"
              style={{
                animationDelay: `${index * 0.07}s`,
              } as React.CSSProperties}
              onClick={() => handleCategorySelect(district.id)}
            >
              <span className="hub-card-name">
                {t[`district.${district.id}.name`] || district.name}
              </span>
            </button>
          ))}
        </div>

        <p className="hub-alive-line">
          <span className="hub-alive-count">{aliveCount}</span>{' '}
          {t.aliveText}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME — Entry Point
   Flow: Landing → 18+ Confirm → HUB
   Wing navigation now uses real Next.js routes.
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const { onToggleLang } = useLang();

  /* ── Persist age confirmation across navigations ── */
  useEffect(() => {
    if (sessionStorage.getItem('cv_age') === '1') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe hydration: useState(false) gives deterministic server render, useEffect syncs from sessionStorage on client only.
      setAgeConfirmed(true);
    }
  }, []);

  const handleAgeConfirm = useCallback(() => {
    setAgeConfirmed(true);
    sessionStorage.setItem('cv_age', '1');
  }, []);

  return (
    <>
      {!ageConfirmed && (
        <AgeGate
          onConfirm={handleAgeConfirm}
          onLeave={() => { window.location.href = 'https://google.com'; }}
        />
      )}
      {ageConfirmed && <HubScreen />}
    </>
  );
}