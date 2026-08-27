'use client';

import { useMemo } from 'react';
import type { District } from '@/data/rooms';
import { trackOfferClick } from '@/lib/ga4';

/* ═══════════════════════════════════════════════════════════════
   GeneratePornRoom — Full-bleed banner sales floor
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
        size: 1 + Math.random() * 2,
        opacity: 0.04 + Math.random() * 0.08,
      })),
    [],
  );

  const handleClick = () => trackOfferClick('generateporn-ai', district.id);

  const banners = [
    { src: '/gp-banner6.jpg', alt: 'GeneratePorn.ai — nightlife studio' },
    { src: '/gp-banner3.jpg', alt: 'GeneratePorn.ai — tropical escape' },
    { src: '/gp-banner5.jpg', alt: 'GeneratePorn.ai — festival vibes' },
    { src: '/gp-banner4.jpg', alt: 'GeneratePorn.ai — boardwalk connections' },
    { src: '/gp-banner1.jpg', alt: 'GeneratePorn.ai — concert energy' },
    { src: '/gp-banner2.jpg', alt: 'GeneratePorn.ai — beach sunset' },
  ];

  return (
    <div className="gp-room" data-district={district.id}>
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

        {/* ═══ HERO BANNER 1 — full bleed ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-full-banner no-underline"
          onClick={handleClick}
        >
          <img src={banners[0].src} alt={banners[0].alt} />
          <div className="gp-banner-fade" />
        </a>

        {/* ═══ HOOK COPY — landing page font style ═══ */}
        <div className="gp-copy-block">
          <p className="gp-landing-copy">
            GeneratePorn.ai is a <strong>purpose-built adult AI creation studio</strong> —
            not another AI girlfriend or chat offer.
          </p>
          <p className="gp-landing-copy gp-landing-copy-dim">
            Generate explicit fictional-adult images, precisely edit results, upscale them,
            and turn your favourites into video — all inside one private-by-default studio.
          </p>
        </div>

        {/* ═══ HERO BANNER 2 ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-full-banner no-underline"
          onClick={handleClick}
        >
          <img src={banners[1].src} alt={banners[1].alt} />
          <div className="gp-banner-fade" />
        </a>

        {/* ═══ STUDIO LINE ═══ */}
        <div className="gp-studio-line">
          <span className="gp-studio-line-text">Your private AI creation studio is open.</span>
        </div>

        {/* ═══ HERO BANNER 3 ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-full-banner no-underline"
          onClick={handleClick}
        >
          <img src={banners[2].src} alt={banners[2].alt} />
          <div className="gp-banner-fade" />
        </a>

        {/* ═══ FEATURE BULLETS ═══ */}
        <div className="gp-bullets-strip">
          <div className="gp-bullet-row">
            <span className="gp-bullet-diamond">&#9670;</span>
            <span>48 FREE CREDITS — no card required</span>
          </div>
          <div className="gp-bullet-row">
            <span className="gp-bullet-diamond">&#9670;</span>
            <span>Generate, edit, upscale, and animate in one studio</span>
          </div>
          <div className="gp-bullet-row">
            <span className="gp-bullet-diamond">&#9670;</span>
            <span><strong>CRYPTO ACCEPTED</strong> — Bitcoin, Ethereum, and more</span>
          </div>
          <div className="gp-bullet-row">
            <span className="gp-bullet-diamond">&#9670;</span>
            <span>Private by default — discreet billing, zero data sharing</span>
          </div>
          <div className="gp-bullet-row">
            <span className="gp-bullet-diamond">&#9670;</span>
            <span><strong>FIRST IN INDUSTRY</strong> — card processing for direct AI porn content generation</span>
          </div>
        </div>

        {/* ═══ HERO BANNER 4 ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-full-banner no-underline"
          onClick={handleClick}
        >
          <img src={banners[3].src} alt={banners[3].alt} />
          <div className="gp-banner-fade" />
        </a>

        {/* ═══ MID-PAGE CTA BUTTON ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-cta-banner no-underline"
          onClick={handleClick}
        >
          START GENERATING NOW &#8594;
        </a>

        {/* ═══ HERO BANNER 5 ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-full-banner no-underline"
          onClick={handleClick}
        >
          <img src={banners[4].src} alt={banners[4].alt} />
          <div className="gp-banner-fade" />
        </a>

        {/* ═══ VIBE COPY ═══ */}
        <div className="gp-copy-block">
          <p className="gp-landing-copy gp-landing-copy-italic">
            Generate the guys, the scenes, the vibes you actually want.
            Edit. Upscale. Animate.
          </p>
          <p className="gp-landing-copy-dim">
            48 free credits. No card required. Late-night ideas hit different.
          </p>
        </div>

        {/* ═══ HERO BANNER 6 ═══ */}
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gp-full-banner no-underline"
          onClick={handleClick}
        >
          <img src={banners[5].src} alt={banners[5].alt} />
          <div className="gp-banner-fade" />
        </a>

        {/* ═══ BOTTOM CTA ═══ */}
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
