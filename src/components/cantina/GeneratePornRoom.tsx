'use client';

import { useMemo } from 'react';
import type { District } from '@/data/rooms';
import { trackOfferClick } from '@/lib/ga4';

/* ═══════════════════════════════════════════════════════════════
   GeneratePornRoom — Full sales floor landing page
   ═══════════════════════════════════════════════════════════════ */

const AFFILIATE_URL =
  'https://t.vlmai-5.com/413627/10512/43094?aff_sub=AI&aff_sub2=GEN&aff_sub3=GOLFO&aff_sub4=SUENOS&aff_sub5=NOCTURNO&source=CANTINA';

interface GeneratePornRoomProps {
  district: District;
}

export function GeneratePornRoom({ district }: GeneratePornRoomProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 7 + Math.random() * 14,
        size: 1 + Math.random() * 2.5,
        opacity: 0.03 + Math.random() * 0.10,
      })),
    [],
  );

  const handleClick = () => trackOfferClick('generateporn-ai', district.id);

  const screenshots = [
    { src: '/gp-screen1.png', alt: 'GeneratePorn.ai studio interface' },
    { src: '/gp-screen2.png', alt: 'GeneratePorn.ai editing tools' },
    { src: '/gp-screen3.png', alt: 'GeneratePorn.ai generation output' },
  ];

  const generated = [
    { src: '/gp-gen1.jpg', alt: 'AI generated sample 1' },
    { src: '/gp-gen2.jpg', alt: 'AI generated sample 2' },
    { src: '/gp-gen3.jpg', alt: 'AI generated sample 3' },
  ];

  return (
    <div className="gp-room" data-district={district.id}>
      <div className="gp-room-bg" />
      <div className="gp-room-overlay" />
      <div className="gp-glow gp-glow-gold-top" />
      <div className="gp-glow gp-glow-gold-bottom" />

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

      <div className="gp-room-content">

        {/* ═══ BANNER ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-banner-cta no-underline"
          onClick={handleClick}
        >
          <img src="/generateporn-logo.svg" alt="GeneratePorn.ai" className="gp-banner-logo" />
          <span className="gp-banner-tagline">THE #1 UNCENSORED AI PORN STUDIO</span>
          <div className="gp-banner-pulse" />
        </a>

        {/* ═══ HERO: BIG OPENING IMAGE + HOOK COPY ═══ */}
        <div className="gp-hero">
          <div className="gp-hero-image-box">
            <a href={AFFILIATE_URL} target="_blank" rel="noopener noreferrer" className="no-underline" onClick={handleClick}>
              <img src="/gp-gen2.jpg" alt="GeneratePorn.ai studio" className="gp-hero-img" />
            </a>
            <div className="gp-red-border" />
          </div>
          <div className="gp-hero-copy">
            <h2 className="gp-headline-gold">THIS IS NOT ANOTHER AI COMPANION</h2>
            <p className="gp-body">
              GeneratePorn.ai is a <strong>purpose-built adult AI creation studio</strong> — not another
              AI girlfriend or chat offer. Generate explicit fictional-adult images, precisely edit
              results, upscale them, and turn your favourites into video — all inside one
              <strong>private-by-default studio</strong>.
            </p>
            <p className="gp-body gp-body-dim">
              Your private AI creation studio is open. Generate the scenes, the vibes you
              actually want. Late-night ideas hit different when you can turn them into
              images and video inside your private AI studio.
            </p>
          </div>
        </div>

        {/* ═══ STUDIO SCREENSHOTS ═══ */}
        <div className="gp-section">
          <h3 className="gp-section-title">THE STUDIO</h3>
          <div className="gp-screenshots">
            {screenshots.map((s, i) => (
              <a
                key={i}
                href={AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gp-screenshot no-underline"
                onClick={handleClick}
              >
                <img src={s.src} alt={s.alt} />
              </a>
            ))}
          </div>
        </div>

        {/* ═══ FEATURE BULLETS ═══ */}
        <div className="gp-section">
          <h3 className="gp-section-title">WHY GENERATEPORN.AI</h3>
          <div className="gp-gold-divider" />
          <ul className="gp-bullet-list">
            <li className="gp-bullet-item">
              <span className="gp-bullet-icon">&#9670;</span>
              <span>48 FREE CREDITS to start — no card required</span>
            </li>
            <li className="gp-bullet-item">
              <span className="gp-bullet-icon">&#9670;</span>
              <span>Generate, edit, upscale, and animate in one studio</span>
            </li>
            <li className="gp-bullet-item">
              <span className="gp-bullet-icon">&#9670;</span>
              <span>No card required to start creating immediately</span>
            </li>
            <li className="gp-bullet-item">
              <span className="gp-bullet-icon">&#9670;</span>
              <span><strong>CRYPTO ACCEPTED</strong> — Bitcoin, Ethereum, and more</span>
            </li>
            <li className="gp-bullet-item">
              <span className="gp-bullet-icon">&#9670;</span>
              <span>Private by default — discreet billing, zero data sharing</span>
            </li>
            <li className="gp-bullet-item">
              <span className="gp-bullet-icon">&#9670;</span>
              <span><strong>FIRST IN INDUSTRY</strong> — card processing for direct AI porn content generation</span>
            </li>
          </ul>
        </div>

        {/* ═══ CTA BUTTON ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-cta no-underline"
          onClick={handleClick}
        >
          START GENERATING NOW &#8594;
        </a>

        {/* ═══ GENERATED IMAGE GALLERY ═══ */}
        <div className="gp-section">
          <h3 className="gp-section-title">SAMPLE OUTPUTS</h3>
          <div className="gp-gen-grid">
            {generated.map((g, i) => (
              <a
                key={i}
                href={AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gp-gen-thumb no-underline"
                onClick={handleClick}
              >
                <img src={g.src} alt={g.alt} />
              </a>
            ))}
          </div>
        </div>

        {/* ═══ CLOSING CTA ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-bottom-cta no-underline"
          onClick={handleClick}
        >
          <span>GENERATE. EDIT. UPSCALE. ANIMATE. 48 FREE CREDITS. NO CARD REQUIRED.</span>
          <span className="gp-bottom-arrow">&#8594;</span>
        </a>

      </div>
    </div>
  );
}
