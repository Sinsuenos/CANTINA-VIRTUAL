'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { DISTRICTS } from '@/data/rooms';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { SmokeParticles } from '@/components/cantina/SmokeParticles';
import { SidebarHub } from '@/components/cantina/SidebarHub';
import { DistrictScene } from '@/components/cantina/DistrictScene';
import { NectarHUD } from '@/components/cantina/NectarHUD';

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
function AgeGate({ onConfirm, onLeave }: { onConfirm: () => void; onLeave: () => void }) {
  const [step, setStep] = useState<'landing' | 'confirm'>('landing');

  if (step === 'confirm') {
    return (
      <ArrivalScene>
        <div className="age-gate age-confirm">
          <div className="age-gate-butterfly">
            <MariposaCenterpiece />
          </div>
          <p className="age-confirm-question">Are you 18 or older?</p>
          <div className="age-confirm-actions">
            <button
              className="age-gate-btn age-gate-btn-enter"
              onClick={onConfirm}
            >
              <span className="age-gate-btn-label">Yes</span>
            </button>
            <button
              className="age-gate-btn age-gate-btn-leave"
              onClick={() => setStep('landing')}
            >
              <span className="age-gate-btn-label">No</span>
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
        <div className="age-gate-actions">
          <button
            className="age-gate-btn age-gate-btn-enter"
            onClick={() => setStep('confirm')}
          >
            <span className="age-gate-btn-label">ENTER</span>
          </button>
          <button
            className="age-gate-btn age-gate-btn-leave"
            onClick={onLeave}
          >
            <span className="age-gate-btn-label">LEAVE</span>
          </button>
        </div>
      </div>
    </ArrivalScene>
  );
}

/* ─── Password Screen ─── */
function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [shaking, setShaking] = useState(false);
  const [mariposaDead, setMariposaDead] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (input.toLowerCase().trim() === 'mariposa') {
        onUnlock();
      } else {
        setShaking(true);
        setMariposaDead(true);
        setTimeout(() => {
          setShaking(false);
          setMariposaDead(false);
          setShowReject(false);
          setInput('');
          inputRef.current?.focus();
        }, 2000);
        setShowReject(true);
      }
    },
    [input, onUnlock],
  );

  return (
    <ArrivalScene>
      <div className={`password-scene ${shaking ? 'shake' : ''}`}>
        <div className="password-butterfly">
          <MariposaCenterpiece dead={mariposaDead} />
        </div>
        <div className="password-atmosphere">
          <div className="h-7 overflow-hidden">
            <span
              className="typewriter-text text-lg tracking-widest"
              style={{ color: 'var(--amber)' }}
            >
              The cantina is listening...
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="password-form">
          <label className="password-label">Whisper the password</label>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="password-input"
            placeholder="..."
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button type="submit" className="password-btn">
            Enter
          </button>
        </form>
        {showReject && (
          <p className="password-reject fade-in">Not tonight, forastero.</p>
        )}
      </div>
    </ArrivalScene>
  );
}

/* ─── Main Cantina ─── */
function Cantina() {
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
            Earn nectar. Spend it. Come back for more.
          </span>
        </div>

        <footer className="compliance-footer">
          <span className="compliance-brand">Cantina Virtual</span>
          <nav className="compliance-nav">
            <a href="#" className="compliance-link">18+ Adults Only</a>
            <a href="#" className="compliance-link">2257</a>
            <a href="#" className="compliance-link">DMCA</a>
            <a href="#" className="compliance-link">Privacy</a>
            <a href="#" className="compliance-link">Terms</a>
            <a href="#" className="compliance-link">Contact</a>
          </nav>
        </footer>
      </main>
    </div>
  );
}

/* ─── HOME (Entry Point) ─── */
export default function Home() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [state, setState] = useState<'locked' | 'exiting' | 'unlocked'>('locked');

  useEffect(() => {
    const confirmed = localStorage.getItem('cv-age-confirmed');
    if (confirmed === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe localStorage read
      setAgeConfirmed(true);
    }
    setAgeChecked(true);
  }, []);

  const handleAgeConfirm = useCallback(() => {
    localStorage.setItem('cv-age-confirmed', 'true');
    setAgeConfirmed(true);
  }, []);

  const handleUnlock = useCallback(() => {
    setState('exiting');
    setTimeout(() => setState('unlocked'), 500);
  }, []);

  if (!ageChecked) return null;

  return (
    <>
      <NectarHUD />
      {!ageConfirmed && <AgeGate onConfirm={handleAgeConfirm} onLeave={() => { window.location.href = 'https://google.com'; }} />}
      {ageConfirmed && state === 'locked' && (
        <PasswordScreen onUnlock={handleUnlock} />
      )}
      {state === 'exiting' && (
        <div
          className="scene-exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20,
            overflow: 'hidden',
          }}
        >
          <div className="arrival-bg" />
          <div className="arrival-dim" />
          <div className="arrival-vignette" />
        </div>
      )}
      {state === 'unlocked' && (
        <Cantina />
      )}
    </>
  );
}