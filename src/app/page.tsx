'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { DISTRICTS } from '@/data/rooms';
import { LangProvider, useLang } from '@/lib/i18n';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { SmokeParticles } from '@/components/cantina/SmokeParticles';
import { SidebarHub } from '@/components/cantina/SidebarHub';
import { DistrictScene } from '@/components/cantina/DistrictScene';
import { NectarHUD } from '@/components/cantina/NectarHUD';
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
      <button
        className="lang-toggle"
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

/* ─── Main Cantina ─── */
function Cantina() {
  const { t } = useLang();
  const [activeDistrict, setActiveDistrict] = useState(DISTRICTS[0].id);
  const [transitioning, setTransitioning] = useState(false);
  const [displayedDistrict, setDisplayedDistrict] = useState(DISTRICTS[0].id);
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
      <NectarHUD />
      <SidebarHub
        activeDistrict={activeDistrict}
        onDistrictChange={handleDistrictChange}
      />

      <main ref={mainRef} className="cantina-main scene-transition">
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
            style={{ color: 'var(--text-dim)' }}
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

/* ─── HOME (Entry Point) ─── */
export default function Home() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  const handleAgeConfirm = useCallback(() => {
    setAgeConfirmed(true);
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);

  return (
    <LangProvider lang={lang} onToggleLang={handleToggleLang}>
      {!ageConfirmed && (
        <AgeGate
          onConfirm={handleAgeConfirm}
          onLeave={() => { window.location.href = 'https://google.com'; }}
        />
      )}
      {ageConfirmed && <Cantina />}
    </LangProvider>
  );
}