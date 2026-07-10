'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { DISTRICTS } from '@/data/rooms';
import { LangProvider, useLang } from '@/lib/i18n';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { SmokeParticles } from '@/components/cantina/SmokeParticles';
import { SidebarHub } from '@/components/cantina/SidebarHub';
import { DistrictScene } from '@/components/cantina/DistrictScene';
import { PassportModal, NectarToast, type NectarToastData } from '@/components/nectar-engine';
import { useNectarEngine, NectarProvider } from '@/lib/nectar-engine';
import { hasCelebrated, markCelebrated } from '@/lib/nectar-engine/store';
import type { Lang } from '@/lib/i18n';

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
function HubScreen({
  onCategorySelect,
  onBack,
}: {
  onCategorySelect: (id: string) => void;
  onBack: () => void;
}) {
  const { t, lang, onToggleLang } = useLang();
  const visits = useVisitCount();
  const aliveCount = useAliveCount();

  const regularMessage = useMemo(() => {
    if (visits < 2) return null;
    if (visits < 5) return t.regularReturn;
    if (visits < 10) return t.regularFamiliar;
    return t.regularVip;
  }, [visits, t.regularReturn, t.regularFamiliar, t.regularVip]);

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

        <div className="hub-grid">
          {DISTRICTS.map((district, index) => (
            <button
              key={district.id}
              className="hub-card"
              style={{
                animationDelay: `${index * 0.07}s`,
              } as React.CSSProperties}
              onClick={() => onCategorySelect(district.id)}
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

        <button className="hub-back" onClick={onBack}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hub-back-icon"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          {t.hubBack}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Cantina (only shown after explicit category selection) ─── */
function Cantina({
  initialDistrict,
  onBackToHub,
}: {
  initialDistrict: string;
  onBackToHub: () => void;
}) {
  const { t } = useLang();
  const { visit, allQuestsComplete, config, questStatus, state } = useNectarEngine();
  const [activeDistrict, setActiveDistrict] = useState(initialDistrict);
  const [transitioning, setTransitioning] = useState(false);
  const [displayedDistrict, setDisplayedDistrict] = useState(initialDistrict);
  const [toast, setToast] = useState<NectarToastData | null>(null);
  const [showPassport, setShowPassport] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  /* ── On mount: register first wing visit for initialDistrict ── */
  useEffect(() => {
    const awarded = visit(initialDistrict);
    if (awarded) {
      const district = DISTRICTS.find((d) => d.id === initialDistrict);
      const wingName = district ? (t[`district.${initialDistrict}.name`] || district.name) : initialDistrict;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount toast; visit() is idempotent and setToast is conditional on first-visit award.
      setToast({ id: Date.now(), points: 10, wingName });
    }
  }, []);

  /* ── When all 8 wings complete, show PassportModal ONCE per browser ── */
  /* Only trigger if allWingsVisited === true && !hasCelebrated.
     Once dismissed, markCelebrated() writes nectar_celebrated=true so it never auto-triggers again. */
  useEffect(() => {
    if (allQuestsComplete && !hasCelebrated()) {
      // Small delay so the final toast can show first
      setTimeout(() => setShowPassport(true), 1500);
    }
  }, [allQuestsComplete]);

  /* ── Return to Hub from PassportModal: mark celebrated + clear modal + trigger Hub navigation ── */
  const handleReturnToHub = useCallback(() => {
    markCelebrated();
    setShowPassport(false);
    onBackToHub();
  }, [onBackToHub]);

  const handleDistrictChange = useCallback(
    (id: string) => {
      if (id === activeDistrict || transitioning) return;
      setTransitioning(true);
      const main = mainRef.current;
      if (main) {
        main.classList.add('scene-exit');
        setTimeout(() => {
          setActiveDistrict(id);
          setDisplayedDistrict(id);
          main.classList.remove('scene-exit');
          main.classList.add('scene-transition');
          setTransitioning(false);
          setTimeout(() => main.classList.remove('scene-transition'), 800);
          /* ── Register Nectar visit for the new wing ── */
          const awarded = visit(id);
          if (awarded) {
            const district = DISTRICTS.find((d) => d.id === id);
            const wingName = district ? (t[`district.${id}.name`] || district.name) : id;
            setToast({
              id: Date.now(),
              points: 10,
              wingName,
              isComplete: config.sections.every((s) =>
                s.id === id ? true : questStatus[s.id]
              ),
            });
          }
        }, 500);
      } else {
        setActiveDistrict(id);
        setDisplayedDistrict(id);
        setTransitioning(false);
        const awarded = visit(id);
        if (awarded) {
          const district = DISTRICTS.find((d) => d.id === id);
          const wingName = district ? (t[`district.${id}.name`] || district.name) : id;
          setToast({
            id: Date.now(),
            points: 10,
            wingName,
            isComplete: config.sections.every((s) =>
              s.id === id ? true : questStatus[s.id]
            ),
          });
        }
      }
    },
    [activeDistrict, transitioning, visit, t, config.sections, questStatus],
  );

  const district = DISTRICTS.find((d) => d.id === displayedDistrict);

  return (
    <div className="cantina-layout">
      <SidebarHub
        activeDistrict={activeDistrict}
        onDistrictChange={handleDistrictChange}
        onBackToHub={onBackToHub}
        onViewPassport={() => setShowPassport(true)}
      />

      <main ref={mainRef} className="cantina-main scene-transition">
        <button className="mobile-back-hub" onClick={onBackToHub} aria-label="Back to Hub">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          className="mariposa"
          style={{ top: '12%', right: '8%', color: '#ff69b4' }}
        >
          <span className="mariposa-wing">🦋</span>
        </div>
        <div
          className="mariposa"
          style={{ top: '35%', left: '5%', color: '#ff69b4', animationDelay: '-3s' }}
        >
          <span className="mariposa-wing" style={{ animationDelay: '-0.2s' }}>
            🦋
          </span>
        </div>

        {district && <DistrictScene district={district} />}

        <SmokeParticles />

        {/* Nectar status — live points + future opportunities */}
        <div className="district-nectar-teaser">
          <div className="nectar-teaser-content">
            <div className="nectar-teaser-header">
              <span className="nectar-hud-icon">🦋</span>
              <span
                className="nectar-teaser-title"
                style={{ color: 'var(--amber)' }}
              >
                {t.nectarPointsLabel} · {state.totalPoints} {t.nectarPointsUnit}
              </span>
              <span
                className="nectar-teaser-soon"
                style={{ color: 'var(--amber)', opacity: 0.7 }}
              >
                {config.sections.filter((s) => questStatus[s.id]).length}/{config.sections.length} {t.nectarProgress}
              </span>
            </div>
            <p className="nectar-teaser-intro" style={{ color: 'var(--text-muted)' }}>
              {t.nectarFutureIntro}
            </p>
            <p className="nectar-teaser-list" style={{ color: 'var(--text-dim)' }}>
              {t.nectarFutureList}
            </p>
          </div>
        </div>
      </main>

      {/* Nectar toast — brief, non-blocking notification */}
      <NectarToast toast={toast} onDismiss={() => setToast(null)} />

      {/* PassportModal — only when all 8 wings visited (first time per browser) */}
      {showPassport && (
        <PassportModal onReturnToHub={handleReturnToHub} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME — Entry Point
   Flow: Landing → 18+ Confirm → HUB → Category
   Uses browser history API for real back navigation
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>('en');

  /* ── Persist age confirmation and lang across navigations ── */
  useEffect(() => {
    if (sessionStorage.getItem('cv_age') === '1') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe hydration: useState(false) gives deterministic server render, useEffect syncs from sessionStorage on client only. Lazy initializer would crash SSR (sessionStorage undefined on server).
      setAgeConfirmed(true);
    }
    const savedLang = sessionStorage.getItem('cv_lang');
    if (savedLang === 'en' || savedLang === 'es') {
      setLang(savedLang);
    }
  }, []);

  /* ── Browser history integration ── */
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state as { screen?: string } | null;
      if (!state || !state.screen || state.screen === 'landing') {
        setAgeConfirmed(false);
        setActiveDistrict(null);
      } else if (state.screen === 'hub') {
        setAgeConfirmed(true);
        setActiveDistrict(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAgeConfirm = useCallback(() => {
    setAgeConfirmed(true);
    sessionStorage.setItem('cv_age', '1');
    window.history.pushState({ screen: 'hub' }, '');
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'es' : 'en';
      sessionStorage.setItem('cv_lang', next);
      return next;
    });
  }, []);

  const handleCategorySelect = useCallback((id: string) => {
    setActiveDistrict(id);
    window.history.pushState({ screen: 'category', id }, '');
  }, []);

  const handleBackToHub = useCallback(() => {
    setActiveDistrict(null);
    window.history.pushState({ screen: 'hub' }, '');
  }, []);

  const handleBackToLanding = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <LangProvider lang={lang} onToggleLang={handleToggleLang}>
      <NectarProvider>
        {!ageConfirmed && (
          <AgeGate
            onConfirm={handleAgeConfirm}
            onLeave={() => { window.location.href = 'https://google.com'; }}
          />
        )}
        {ageConfirmed && !activeDistrict && (
          <HubScreen
            onCategorySelect={handleCategorySelect}
            onBack={handleBackToLanding}
          />
        )}
        {ageConfirmed && activeDistrict && (
          <Cantina
            initialDistrict={activeDistrict}
            onBackToHub={handleBackToHub}
          />
        )}
      </NectarProvider>
    </LangProvider>
  );
}