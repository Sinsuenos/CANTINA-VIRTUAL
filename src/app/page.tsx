'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DISTRICTS } from '@/data/rooms';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { SmokeParticles } from '@/components/cantina/SmokeParticles';
import { SidebarHub } from '@/components/cantina/SidebarHub';
import { DistrictScene } from '@/components/cantina/DistrictScene';
import { NectarHUD } from '@/components/cantina/NectarHUD';

const HERO_BG = 'https://sfile.chatglm.cn/images-ppt/b4e9051f97b1.jpg';

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

  const handleSubmit = useCallback((e: React.FormEvent) => {
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
  }, [input, onUnlock]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative ${shaking ? 'shake' : ''}`}
      style={{ background: 'radial-gradient(ellipse at center bottom, #1a1208 0%, #0a0e17 70%)' }}>

      <SmokeParticles />

      <div className="mb-10">
        <MariposaCenterpiece dead={mariposaDead} />
      </div>

      <div className="mb-6 h-7 overflow-hidden">
        <span className="typewriter-text text-lg tracking-widest" style={{ color: 'var(--amber)' }}>
          The cantina is listening...
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <label className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Whisper the password
        </label>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-56 text-center py-2 px-4 rounded-none text-sm tracking-widest outline-none"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,160,23,0.2)',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
          }}
          placeholder="..."
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="px-6 py-2 text-xs tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer"
          style={{
            background: 'transparent',
            border: '1px solid var(--amber)',
            color: 'var(--amber)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--amber)';
            e.currentTarget.style.color = '#0a0e17';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--amber)';
          }}
        >
          Enter
        </button>
      </form>

      {showReject && (
        <p className="mt-6 text-sm fade-in" style={{ color: 'var(--sale-red)' }}>
          Not tonight, forastero.
        </p>
      )}

      <p className="absolute bottom-8 text-[10px] tracking-[0.2em]" style={{ color: 'var(--text-dim)' }}>
        The password hides in the videos
      </p>
    </div>
  );
}

/* ─── Main Cantina ─── */
function Cantina() {
  const [activeDistrict, setActiveDistrict] = useState(DISTRICTS[0].id);
  const [transitioning, setTransitioning] = useState(false);
  const [displayedDistrict, setDisplayedDistrict] = useState(DISTRICTS[0].id);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleDistrictChange = useCallback((id: string) => {
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
  }, [activeDistrict, transitioning]);

  const district = DISTRICTS.find((d) => d.id === displayedDistrict);

  return (
    <div className="cantina-layout">
      <SidebarHub
        activeDistrict={activeDistrict}
        onDistrictChange={handleDistrictChange}
      />

      <main ref={mainRef} className="cantina-main scene-transition">
        <div className="mariposa" style={{ top: '12%', right: '8%', color: '#ff69b4' }}>
          <span className="mariposa-wing">🦋</span>
        </div>
        <div className="mariposa" style={{ top: '35%', left: '5%', color: '#ff69b4', animationDelay: '-3s' }}>
          <span className="mariposa-wing" style={{ animationDelay: '-0.2s' }}>🦋</span>
        </div>

        {district && <DistrictScene district={district} />}

        <SmokeParticles />

        {/* Nectar teaser — bottom of scene */}
        <div className="district-nectar-teaser">
          <div className="nectar-hud-icon">🍯</div>
          <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--text-dim)' }}>
            Earn nectar. Spend it. Come back for more.
          </span>
        </div>

        {/* Discord — bottom bar */}
        <footer className="district-footer">
          <div className="district-footer-left">
            <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-dim)' }}>
              Cantina Virtual &middot; Pacific Coast &middot; 2025
            </p>
          </div>
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-bordered no-underline"
            style={{
              border: '1px solid var(--amber)',
              color: 'var(--amber)',
            }}
          >
            Enter the Discord
          </a>
        </footer>
      </main>
    </div>
  );
}

/* ─── HOME (Entry Point) ─── */
export default function Home() {
  const [state, setState] = useState<'locked' | 'exiting' | 'unlocked'>('locked');

  const handleUnlock = useCallback(() => {
    setState('exiting');
    setTimeout(() => setState('unlocked'), 500);
  }, []);

  return (
    <>
      <NectarHUD />
      {state === 'exiting' && (
        <div
          className="scene-exit min-h-screen"
          style={{ background: 'radial-gradient(ellipse at center bottom, #1a1208 0%, #0a0e17 70%)' }}
        />
      )}
      {state === 'locked' && (
        <PasswordScreen onUnlock={handleUnlock} />
      )}
      {state === 'unlocked' && (
        <Cantina />
      )}
    </>
  );
}