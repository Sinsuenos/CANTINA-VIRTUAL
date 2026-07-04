'use client';

import { useMemo } from 'react';
import { RESIDENTS, type District } from '@/data/rooms';

/* ═══════════════════════════════════════════════════════════════
   DATING ROOM — Sinaloa Sueños
   Immersive district experience with affiliate offer layout
   ═══════════════════════════════════════════════════════════════ */

interface DatingRoomProps {
  district: District;
}

export function DatingRoom({ district }: DatingRoomProps) {
  /* Ambient dust particles — warm amber tones */
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 10,
        size: 1 + Math.random() * 2.5,
        opacity: 0.08 + Math.random() * 0.18,
      })),
    [],
  );

  const residents = district.encounters
    .map((e) => RESIDENTS[e.residentId])
    .filter(Boolean);

  return (
    <div className="dating-room">
      {/* Room atmospheric layers */}
      <div className="room-atmosphere-bg">
        {/* IMAGE SLOT — room hero background: currently /dating-room.jpg via district.bgImage */}
        <div
          className="dating-room-bg-image"
          style={{ backgroundImage: `url('${district.bgImage}')` }}
        />
      </div>

      <div className="dating-room-overlay" />

      {/* Warm amber glow — top left */}
      <div className="dating-glow dating-glow-warm" />
      {/* Secondary glow — bottom right, softer */}
      <div className="dating-glow dating-glow-candle" />

      {/* Ambient dust */}
      <div className="dating-dust-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="dating-dust"
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

      {/* ── Room Content ── */}
      <div className="dating-room-content">
        {/* Header */}
        <div className="dating-room-header">
          <p className="dating-room-locale">{district.subtitle}</p>
          <h2 className={`dating-room-title ${district.neonClass}`}>
            {district.name}
          </h2>
          <div className={`dating-room-divider ${district.dividerClass}`} />
          <p className="dating-room-prose">{district.description}</p>
        </div>

        {/* Featured Offer Hero — large cinematic banner slot */}
        <div className="dating-hero-offer">
          {/* IMAGE SLOT — featured dating offer hero banner (landscape, ~16:9) */}
          <div className="dating-hero-image">
            {/* Replace this div's background-image with your featured offer artwork */}
            <div className="dating-hero-image-placeholder">
              <span>FEATURED OFFER</span>
              <span className="dating-hero-image-sub">IMAGE SLOT — Hero Banner</span>
            </div>
          </div>
          <div className="dating-hero-body">
            <p className="dating-hero-tag">Sinaloa Sueños Selection</p>
            <h3 className="dating-hero-name">
              {/* IMAGE SLOT — Offer brand name goes here */}
              Tonight&apos;s Featured Encounter
            </h3>
            <p className="dating-hero-desc">
              A handpicked connection from the warmest corner of the cantina.
              {/* PLACEHOLDER — affiliate offer description */}
            </p>
            {/* PLACEHOLDER — affiliate offer CTA link */}
            <a href="#" className="dating-hero-cta">
              <span>Enter the Encounter</span>
            </a>
          </div>
        </div>

        {/* Encounter Cards — residents of this room */}
        <div className="dating-encounters">
          {residents.map((resident) => (
            <a href="#" key={resident.id} className="dating-encounter-card no-underline">
              {/* IMAGE SLOT — resident portrait: swap resident.image with Cantina artwork */}
              <div
                className="dating-encounter-image"
                style={{ backgroundImage: `url('${resident.image}')` }}
              />
              <div className="dating-encounter-body">
                <span className="dating-encounter-name">{resident.name}</span>
                <span className="dating-encounter-role">{resident.subtitle}</span>
                <p className="dating-encounter-desc">{resident.description}</p>
                {/* PLACEHOLDER — affiliate offer link per resident */}
                <span
                  className="dating-encounter-cta"
                  style={{ borderColor: 'var(--amber)', color: 'var(--amber)' }}
                >
                  Send a Drink
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Offer Grid — affiliate placement slots */}
        <div className="dating-offer-grid">
          {/* Offer Slot 1 */}
          <a href="#" className="dating-offer-card no-underline">
            {/* IMAGE SLOT — dating offer thumbnail (portrait or square) */}
            <div className="dating-offer-image">
              <div className="dating-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="dating-offer-body">
              <span className="dating-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="dating-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="dating-offer-action">Visit</span>
            </div>
          </a>

          {/* Offer Slot 2 */}
          <a href="#" className="dating-offer-card no-underline">
            {/* IMAGE SLOT — dating offer thumbnail (portrait or square) */}
            <div className="dating-offer-image">
              <div className="dating-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="dating-offer-body">
              <span className="dating-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="dating-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="dating-offer-action">Visit</span>
            </div>
          </a>

          {/* Offer Slot 3 */}
          <a href="#" className="dating-offer-card no-underline">
            {/* IMAGE SLOT — dating offer thumbnail (portrait or square) */}
            <div className="dating-offer-image">
              <div className="dating-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="dating-offer-body">
              <span className="dating-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="dating-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="dating-offer-action">Visit</span>
            </div>
          </a>

          {/* Offer Slot 4 */}
          <a href="#" className="dating-offer-card no-underline">
            {/* IMAGE SLOT — dating offer thumbnail (portrait or square) */}
            <div className="dating-offer-image">
              <div className="dating-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="dating-offer-body">
              <span className="dating-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="dating-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="dating-offer-action">Visit</span>
            </div>
          </a>
        </div>

        {/* Bottom ambient strip — room signature */}
        <div className="dating-room-signature">
          {/* IMAGE SLOT — optional: small room signature artwork or icon */}
          <div className="dating-signature-line" />
          <span className="dating-signature-text">Sinaloa Sueños</span>
          <div className="dating-signature-line" />
        </div>
      </div>
    </div>
  );
}