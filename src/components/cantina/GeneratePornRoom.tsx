'use client';

import { useMemo } from 'react';
import type { District } from '@/data/rooms';
import { trackOfferClick } from '@/lib/ga4';

/* ═══════════════════════════════════════════════════════════════
   GeneratePornRoom — Dedicated full-page for GeneratePorn.ai
   ═══════════════════════════════════════════════════════════════

   Replaces the generic DistrictScene for the ai-companions wing.
   Single-offer takeover: full-width CTA banner at top, feature
   bullets on the right, red right-border accent.
   ═══════════════════════════════════════════════════════════════ */

const AFFILIATE_URL =
  'https://t.vlmai-5.com/413627/10512/43094?aff_sub=AI&aff_sub2=GEN&aff_sub3=GOLFO&aff_sub4=SUENOS&aff_sub5=NOCTURNO&source=X';

interface GeneratePornRoomProps {
  district: District;
}

export function GeneratePornRoom({ district }: GeneratePornRoomProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 7 + Math.random() * 11,
        size: 1 + Math.random() * 2,
        opacity: 0.06 + Math.random() * 0.14,
      })),
    [],
  );

  const features = [
    'UNCENSORED AI IMAGE GENERATION — Powered by KREA V3 ULTRA',
    'EDIT ANY RESULT — Refine, extend, and perfect every image',
    'STILL-TO-VIDEO — Turn generated images into video loops',
    'PAY BY CARD OR CRYPTO — First platform to accept both',
    'PRIVATE & SECURE — Discreet billing, no data sharing',
    '3 FREE IMAGES — Start generating immediately, no card required',
  ];

  return (
    <div className="gp-room" data-district={district.id}>
      {/* Atmospheric background */}
      <div className="gp-room-bg" />
      <div className="gp-room-overlay" />

      {/* Cyan glow top-left */}
      <div className="gp-glow gp-glow-cyan" />
      {/* Red glow bottom-right */}
      <div className="gp-glow gp-glow-red" />

      {/* Ambient particles */}
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
        {/* ===== FULL-WIDTH CTA BANNER ===== */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-banner-cta no-underline"
          onClick={() => trackOfferClick('generateporn-ai', district.id)}
        >
          <div className="gp-banner-inner">
            <img
              src="/generateporn-logo.svg"
              alt="GeneratePorn.ai"
              className="gp-banner-logo"
            />
            <span className="gp-banner-tagline">
              AI-POWERED · UNCENSORED · CARD & CRYPTO
            </span>
          </div>
          <div className="gp-banner-pulse" />
        </a>

        {/* ===== HERO SECTION: Image + Features ===== */}
        <div className="gp-hero-section">
          {/* Left: Hero image with red right border */}
          <div className="gp-hero-image-wrap">
            <a
              href={AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              onClick={() => trackOfferClick('generateporn-ai', district.id)}
            >
              <img
                src="/generateporn-og.webp"
                alt="GeneratePorn.ai preview"
                className="gp-hero-image"
              />
            </a>
            {/* Red accent border on right */}
            <div className="gp-red-border-right" />
          </div>

          {/* Right: Feature bullets */}
          <div className="gp-features-panel">
            <h2 className="gp-features-title">
              GENERATEPORN.AI
            </h2>
            <div className="gp-features-divider" />
            <ul className="gp-features-list">
              {features.map((f, i) => (
                <li key={i} className="gp-feature-item">
                  <span className="gp-feature-bullet">&#9654;</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gp-cta-button no-underline"
              onClick={() => trackOfferClick('generateporn-ai', district.id)}
            >
              START GENERATING NOW &#8594;
            </a>
          </div>
        </div>

        {/* ===== SAMPLE GALLERY ===== */}
        <div className="gp-gallery-section">
          <div className="gp-gallery-divider" />
          <p className="gp-gallery-label">SAMPLE OUTPUTS</p>
          <div className="gp-gallery-grid">
            {[
              '/generateporn-hero.jpg',
              '/generateporn-og.webp',
            ].map((src, i) => (
              <a
                key={i}
                href={AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gp-gallery-thumb no-underline"
                onClick={() => trackOfferClick('generateporn-ai', district.id)}
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
          onClick={() => trackOfferClick('generateporn-ai', district.id)}
        >
          <span>TRY 3 FREE IMAGES — NO CARD REQUIRED</span>
          <span className="gp-bottom-cta-arrow">&#8594;</span>
        </a>
      </div>
    </div>
  );
}
