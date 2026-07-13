'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useLang } from '@/lib/i18n';

/* ═══════════════════════════════════════════════════════════════
   NectarCabins — three "doors" on the Nectar wing page.
   Intro paragraph + 3 stacked rectangles. Clicking a rectangle
   opens a full-screen detail modal with floating Nectar particles.
   ═══════════════════════════════════════════════════════════════ */

type CabinId = 1 | 2 | 3;

const CABIN_LINKS: Record<CabinId, string | null> = {
  1: 'https://www.myerolink.com/sinaloainspireddreams',
  2: null, // email CTA — no external link
  3: 'https://www.crakrevenue.com/?r=413627', // do NOT alter or shorten
};

const CABIN_EMAIL = 'sinaloainspireddreams@gmail.com';

export function NectarCabins() {
  const { t } = useLang();
  const [openCabin, setOpenCabin] = useState<CabinId | null>(null);

  const cabins: Array<{
    id: CabinId;
    name: string;
    body: string;
    cta: string;
    icon: string;
  }> = [
    { id: 1, name: t.nectarCabin1Name, body: t.nectarCabin1Body, cta: t.nectarCabin1Cta, icon: '🌟' },
    { id: 2, name: t.nectarCabin2Name, body: t.nectarCabin2Body, cta: t.nectarCabin2Cta, icon: '🦋' },
    { id: 3, name: t.nectarCabin3Name, body: t.nectarCabin3Body, cta: t.nectarCabin3Cta, icon: '💰' },
  ];

  return (
    <section className="nectar-cabins" aria-label="Nectar opportunities">
      {/* Intro paragraph — bright white, dark-panel contrast */}
      <p className="nectar-cabins-intro">{t.nectarCabinsIntro}</p>

      {/* Three stacked cabin rectangles */}
      <div className="nectar-cabins-grid">
        {cabins.map((cabin) => (
          <button
            key={cabin.id}
            type="button"
            className="nectar-cabin-card"
            data-cabin={cabin.id}
            onClick={() => setOpenCabin(cabin.id)}
            aria-label={`${cabin.name} — open details`}
          >
            <span className="nectar-cabin-icon" aria-hidden="true">{cabin.icon}</span>
            <span className="nectar-cabin-name">{cabin.name}</span>
          </button>
        ))}
      </div>

      {/* Detail modal — full screen with particle bg */}
      {openCabin !== null && (
        <CabinaDetailModal
          cabinId={openCabin}
          cabin={cabins.find((c) => c.id === openCabin)!}
          onClose={() => setOpenCabin(null)}
        />
      )}
    </section>
  );
}

/* ── Detail modal with floating Nectar particle effect ── */
interface CabinaDetailModalProps {
  cabinId: CabinId;
  cabin: { name: string; body: string; cta: string; icon: string };
  onClose: () => void;
}

function CabinaDetailModal({ cabinId, cabin, onClose }: CabinaDetailModalProps) {
  const { t } = useLang();
  const link = CABIN_LINKS[cabinId];

  /* Escape key closes the modal */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  /* Floating Nectar particles — gold, green, soft blue orbs drifting
     like fireflies. Reuses the dating-dust float pattern but multi-color. */
  const particles = useMemo(() => {
    const colors = ['#dab12a', '#3ddc84', '#5bcefa']; // gold, green, soft blue
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 14,
      duration: 10 + Math.random() * 12,
      size: 2 + Math.random() * 4,
      color: colors[i % 3],
      drift: (Math.random() - 0.5) * 80, // horizontal drift in px
    }));
  }, []);

  return (
    <div
      className="cabina-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cabina-detail-title"
      onClick={onClose} // click backdrop to close
    >
      {/* Particle layer */}
      <div className="cabina-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="cabina-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}66`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              // @ts-expect-error custom prop consumed by keyframes
              '--drift': `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Modal panel */}
      <div
        className="cabina-detail-panel"
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
      >
        <button
          type="button"
          className="cabina-detail-close"
          onClick={onClose}
          aria-label={t.nectarCabinClose}
        >
          ✕
        </button>

        <div className="cabina-detail-header">
          <span className="cabina-detail-icon" aria-hidden="true">{cabin.icon}</span>
          <h3 id="cabina-detail-title" className="cabina-detail-title">{cabin.name}</h3>
        </div>

        <div className="cabina-detail-body">
          <p className="cabina-detail-copy">{cabin.body}</p>

          {/* CTA */}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="cabina-detail-cta"
            >
              {cabin.cta}
            </a>
          ) : (
            /* Email CTA for cabin 2 */
            <a
              href={`mailto:${CABIN_EMAIL}`}
              className="cabina-detail-cta cabina-detail-cta-email"
            >
              <span>{cabin.cta}</span>
              <span className="cabina-detail-email">{CABIN_EMAIL}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
