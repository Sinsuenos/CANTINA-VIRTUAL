'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { DISTRICTS } from '@/data/rooms';
import { LangProvider, useLang } from '@/lib/i18n';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { SmokeParticles } from '@/components/cantina/SmokeParticles';
import { SidebarHub } from '@/components/cantina/SidebarHub';
import { DistrictScene } from '@/components/cantina/DistrictScene';
import type { Lang } from '@/lib/i18n';

/* ─── Arrival Dust Particles ─── */
function ArrivalDust() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 7 + Math.random() * 8,
        size: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.25,
      })),
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
  const { t } = useLang();

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
        <p className="arrival-copy arrival-copy-body">
          {t.copyBody}
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
  const [activeDistrict, setActiveDistrict] = useState(initialDistrict);
  const [transitioning, setTransitioning] = useState(false);
  const [displayedDistrict, setDisplayedDistrict] = useState(initialDistrict);
  const mainRef = useRef<HTMLDivElement>(null);

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
        }, 500);
      } else {
        setActiveDistrict(id);
        setDisplayedDistrict(id);
        setTransitioning(false);
      }
    },
    [activeDistrict, transitioning],
  );

  const district = DISTRICTS.find((d) => d.id === displayedDistrict);

  return (
    <div className="cantina-layout">
      <SidebarHub
        activeDistrict={activeDistrict}
        onDistrictChange={handleDistrictChange}
        onBackToHub={onBackToHub}
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

        {/* Nectar teaser — bottom of scene */}
        <div className="district-nectar-teaser">
          <div className="nectar-hud-icon">🍯</div>
          <span
            className="text-xs tracking-[0.15em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.nectarTeaser}
          </span>
        </div>

        <footer className="compliance-footer">
          <span className="compliance-brand">Cantina Virtual</span>
          <nav className="compliance-nav">
            <a href="#" className="compliance-link">{t.adultsOnly}</a>
            <a href="#" className="compliance-link">2257</a>
            <a href="#" className="compliance-link">DMCA</a>
            <a href="#" className="compliance-link">{t.privacy}</a>
            <a href="#" className="compliance-link">{t.terms}</a>
            <a href="#" className="compliance-link">{t.contact}</a>
          </nav>
        </footer>
      </main>
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
    window.history.pushState({ screen: 'hub' }, '');
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'es' : 'en'));
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
    </LangProvider>
  );
}