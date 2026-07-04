'use client';

import { useMemo } from 'react';
import { RESIDENTS, type District } from '@/data/rooms';

/* ═══════════════════════════════════════════════════════════════
   LIVE CAMS ROOM — Golfo Privado
   Immersive district experience with affiliate offer layout
   ═══════════════════════════════════════════════════════════════ */

interface LiveCamsRoomProps {
  district: District;
}

export function LiveCamsRoom({ district }: LiveCamsRoomProps) {
  /* Ambient particles — deep violet, slower drift */
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 10 + Math.random() * 12,
        size: 1 + Math.random() * 2,
        opacity: 0.06 + Math.random() * 0.14,
      })),
    [],
  );

  const residents = district.encounters
    .map((e) => RESIDENTS[e.residentId])
    .filter(Boolean);

  return (
    <div className="livecams-room">
      {/* Room atmospheric layers */}
      <div className="room-atmosphere-bg">
        {/* IMAGE SLOT — room hero background: currently /livecams-room.png via district.bgImage */}
        <div
          className="livecams-room-bg-image"
          style={{ backgroundImage: `url('${district.bgImage}')` }}
        />
      </div>

      <div className="livecams-room-overlay" />

      {/* Deep purple glow — top right */}
      <div className="livecams-glow livecams-glow-deep" />
      {/* Crimson accent glow — bottom left, subtle */}
      <div className="livecams-glow livecams-glow-crimson" />

      {/* Ambient particles */}
      <div className="livecams-dust-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="livecams-dust"
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

      {/* Frosted glass horizontal strip — cinematic divider */}
      <div className="livecams-glass-strip" />

      {/* ── Room Content ── */}
      <div className="livecams-room-content">
        {/* Header */}
        <div className="livecams-room-header">
          <p className="livecams-room-locale">{district.subtitle}</p>
          <h2 className={`livecams-room-title ${district.neonClass}`}>
            {district.name}
          </h2>
          <div className={`livecams-room-divider ${district.dividerClass}`} />
          <p className="livecams-room-prose">{district.description}</p>
        </div>

        {/* Featured Performer Hero — large cinematic slot */}
        <div className="livecams-hero-offer">
          {/* IMAGE SLOT — featured live cam performer banner (landscape, ~16:9) */}
          <div className="livecams-hero-image">
            {/* Replace this div's background-image with your featured performer artwork */}
            <div className="livecams-hero-image-placeholder">
              <span>LIVE NOW</span>
              <span className="livecams-hero-image-sub">IMAGE SLOT — Performer Banner</span>
            </div>
          </div>
          <div className="livecams-hero-body">
            <p className="livecams-hero-tag">Golfo Privado Exclusive</p>
            <h3 className="livecams-hero-name">
              {/* IMAGE SLOT — Performer/stage name goes here */}
              Tonight&apos;s Featured Stage
            </h3>
            <p className="livecams-hero-desc">
              Behind frosted glass, the show never stops.
              {/* PLACEHOLDER — affiliate offer description */}
            </p>
            {/* PLACEHOLDER — affiliate offer CTA link */}
            <a href="#" className="livecams-hero-cta">
              <span>Watch Live</span>
            </a>
          </div>
        </div>

        {/* Encounter Cards — residents of this room */}
        <div className="livecams-encounters">
          {residents.map((resident) => (
            <a href="#" key={resident.id} className="livecams-encounter-card no-underline">
              {/* IMAGE SLOT — resident portrait: swap resident.image with Cantina artwork */}
              <div
                className="livecams-encounter-image"
                style={{ backgroundImage: `url('${resident.image}')` }}
              />
              <div className="livecams-encounter-body">
                <span className="livecams-encounter-name">{resident.name}</span>
                <span className="livecams-encounter-role">{resident.subtitle}</span>
                <p className="livecams-encounter-desc">{resident.description}</p>
                {/* PLACEHOLDER — affiliate offer link per resident */}
                <span
                  className="livecams-encounter-cta"
                  style={{ borderColor: 'var(--purple)', color: 'var(--purple)' }}
                >
                  Request Private
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Offer Grid — affiliate placement slots */}
        <div className="livecams-offer-grid">
          {/* Offer Slot 1 */}
          <a href="#" className="livecams-offer-card no-underline">
            {/* IMAGE SLOT — live cam offer thumbnail (portrait or square) */}
            <div className="livecams-offer-image">
              <div className="livecams-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="livecams-offer-body">
              <span className="livecams-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="livecams-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="livecams-offer-action">Go Live</span>
            </div>
          </a>

          {/* Offer Slot 2 */}
          <a href="#" className="livecams-offer-card no-underline">
            {/* IMAGE SLOT — live cam offer thumbnail (portrait or square) */}
            <div className="livecams-offer-image">
              <div className="livecams-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="livecams-offer-body">
              <span className="livecams-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="livecams-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="livecams-offer-action">Go Live</span>
            </div>
          </a>

          {/* Offer Slot 3 */}
          <a href="#" className="livecams-offer-card no-underline">
            {/* IMAGE SLOT — live cam offer thumbnail (portrait or square) */}
            <div className="livecams-offer-image">
              <div className="livecams-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="livecams-offer-body">
              <span className="livecams-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="livecams-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="livecams-offer-action">Go Live</span>
            </div>
          </a>

          {/* Offer Slot 4 */}
          <a href="#" className="livecams-offer-card no-underline">
            {/* IMAGE SLOT — live cam offer thumbnail (portrait or square) */}
            <div className="livecams-offer-image">
              <div className="livecams-offer-image-placeholder">IMAGE SLOT</div>
            </div>
            <div className="livecams-offer-body">
              <span className="livecams-offer-label">PLACEHOLDER — Offer Name</span>
              <p className="livecams-offer-teaser">PLACEHOLDER — Short offer description</p>
              <span className="livecams-offer-action">Go Live</span>
            </div>
          </a>
        </div>

        {/* Bottom ambient strip — room signature */}
        <div className="livecams-room-signature">
          {/* IMAGE SLOT — optional: small room signature artwork or icon */}
          <div className="livecams-signature-line" />
          <span className="livecams-signature-text">Golfo Privado</span>
          <div className="livecams-signature-line" />
        </div>
      </div>
    </div>
  );
}