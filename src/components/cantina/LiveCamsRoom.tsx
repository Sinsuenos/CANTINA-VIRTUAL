'use client';

import { useMemo } from 'react';
import { RESIDENTS, type District } from '@/data/rooms';
import { useLang } from '@/lib/i18n';

interface LiveCamsRoomProps {
  district: District;
}

export function LiveCamsRoom({ district }: LiveCamsRoomProps) {
  const { t } = useLang();

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
      <div className="room-atmosphere-bg">
        <div
          className="livecams-room-bg-image"
          style={{ backgroundImage: `url('${district.bgImage}')` }}
        />
      </div>

      <div className="livecams-room-overlay" />

      <div className="livecams-glow livecams-glow-deep" />
      <div className="livecams-glow livecams-glow-crimson" />

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

      <div className="livecams-glass-strip" />

      <div className="livecams-room-content">
        <div className="livecams-room-header">
          <p className="livecams-room-locale">{district.subtitle}</p>
          <h2 className={`livecams-room-title ${district.neonClass}`}>
            {t[`district.${district.id}.name`] || district.name}
          </h2>
          <div className={`livecams-room-divider ${district.dividerClass}`} />
          <p className="livecams-room-prose">
            {t[`district.${district.id}.desc`] || district.description}
          </p>
        </div>

        <div className="livecams-hero-offer">
          <div className="livecams-hero-image" />
          <div className="livecams-hero-body" />
        </div>

        <div className="livecams-encounters">
          {residents.map((resident) => (
            <a href="#" key={resident.id} className="livecams-encounter-card no-underline">
              <div
                className="livecams-encounter-image"
                style={{ backgroundImage: `url('${resident.image}')` }}
              />
              <div className="livecams-encounter-body">
                <span className="livecams-encounter-name">{resident.name}</span>
                <span className="livecams-encounter-role">
                  {t[`resident.${resident.id}.subtitle`] || resident.subtitle}
                </span>
                <p className="livecams-encounter-desc">
                  {t[`resident.${resident.id}.desc`] || resident.description}
                </p>
                <span
                  className="livecams-encounter-cta"
                  style={{ borderColor: 'var(--purple)', color: 'var(--purple)' }}
                >
                  {t.ctaPrivate}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="livecams-offer-grid">
          <div className="livecams-offer-card" />
          <div className="livecams-offer-card" />
          <div className="livecams-offer-card" />
          <div className="livecams-offer-card" />
        </div>

        <div className="livecams-room-signature">
          <div className="livecams-signature-line" />
          <span className="livecams-signature-text">Golfo Privado</span>
          <div className="livecams-signature-line" />
        </div>
      </div>
    </div>
  );
}