'use client';

import { useMemo } from 'react';
import type { District } from '@/data/rooms';
import { trackOfferClick } from '@/lib/ga4';

/* ═══════════════════════════════════════════════════════════════
   GeneratePornRoom — Dedicated landing page for GeneratePorn.ai
   ═══════════════════════════════════════════════════════════════

   Full-page single-offer takeover. Gold (#DAB12A) accents on dark
   cinematic background. Banner → bullets → CTA. No card grid.
   ═══════════════════════════════════════════════════════════════ */

const AFFILIATE_URL =
  'https://t.vlmai-5.com/413627/10512/43094?aff_sub=AI&aff_sub2=GEN&aff_sub3=GOLFO&aff_sub4=SUENOS&aff_sub5=NOCTURNO&source=CANTINA';

interface GeneratePornRoomProps {
  district: District;
}

export function GeneratePornRoom({ district }: GeneratePornRoomProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 16,
        duration: 8 + Math.random() * 12,
        size: 1 + Math.random() * 2.5,
        opacity: 0.04 + Math.random() * 0.12,
      })),
    [],
  );

  const features = [
    '48 FREE CREDITS to start — no card required',
    'Generate, edit, upscale, and animate in one studio',
    'No card required to start creating immediately',
    'CRYPTO ACCEPTED — Bitcoin, Ethereum, and more',
    'Private by default — discreet billing, zero data sharing',
    'FIRST IN INDUSTRY — card processing for direct AI porn content generation',
  ];

  const handleClick = () => trackOfferClick('generateporn-ai', district.id);

  return (
    <div className="gp-room" data-district={district.id}>
      {/* Atmospheric layers */}
      <div className="gp-room-bg" />
      <div className="gp-room-overlay" />
      <div className="gp-glow gp-glow-gold-top" />
      <div className="gp-glow gp-glow-gold-bottom" />

      {/* Ambient gold particles */}
      <div className="gp-particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="gp-particle"
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

      {/* ── Content ── */}
      <div className="gp-room-content">

        {/* ===== FULL-WIDTH BANNER ===== */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-banner-cta no-underline"
          onClick={handleClick}
        >
          <img
            src="/generateporn-logo.svg"
            alt="GeneratePorn.ai"
            className="gp-banner-logo"
          />
          <span className="gp-banner-tagline">
            THE #1 UNCENSORED AI PORN STUDIO
          </span>
          <div className="gp-banner-pulse" />
        </a>

        {/* ===== HERO IMAGE ===== */}
        <div className="gp-hero-wrap">
          <a
            href={AFFILIATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            onClick={handleClick}
          >
            <img
              src="/generateporn-og.webp"
              alt="GeneratePorn.ai studio preview"
              className="gp-hero-img"
            />
          </a>
          {/* Red right-border accent */}
          <div className="gp-red-border" />
        </div>

        {/* ===== FEATURES ===== */}
        <div className="gp-features">
          <h2 className="gp-features-headline">WHY GENERATEPORN.AI</h2>
          <div className="gp-gold-divider" />
          <ul className="gp-bullet-list">
            {features.map((f, i) => (
              <li key={i} className="gp-bullet-item">
                <span className="gp-bullet-icon">&#9670;</span>
                <span className="gp-bullet-text">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== CTA BUTTON ===== */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-cta no-underline"
          onClick={handleClick}
        >
          START GENERATING NOW &#8594;
        </a>

        {/* ===== SAMPLE GALLERY ===== */}
        <div className="gp-gallery">
          <div className="gp-gallery-divider" />
          <p className="gp-gallery-label">SAMPLE OUTPUTS</p>
          <div className="gp-gallery-grid">
            {['/generateporn-hero.jpg', '/generateporn-og.webp'].map((src, i) => (
              <a
                key={i}
                href={AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gp-gallery-thumb no-underline"
                onClick={handleClick}
              >
                <img src={src} alt={`GeneratePorn sample ${i + 1}`} />
              </a>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM CTA ===== */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-bottom-cta no-underline"
          onClick={handleClick}
        >
          <span>48 FREE CREDITS — NO CARD REQUIRED</span>
          <span className="gp-bottom-arrow">&#8594;</span>
        </a>
      </div>
    </div>
  );
}
