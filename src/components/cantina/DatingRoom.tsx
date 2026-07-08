'use client';

import { useMemo } from 'react';
import { RESIDENTS, type District } from '@/data/rooms';
import { useLang } from '@/lib/i18n';

interface DatingRoomProps {
  district: District;
}

export function DatingRoom({ district }: DatingRoomProps) {
  const { t } = useLang();

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

  const encounters = district.encounters
    .map((e) => ({
      resident: RESIDENTS[e.residentId],
      href: e.href,
    }))
    .filter((e) => e.resident);

  return (
    <div className="dating-room">
      {/* Room atmospheric layers */}
      <div className="room-atmosphere-bg">
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
          <h2 className={`dating-room-title ${district.neonClass}`}>
            {t[`district.${district.id}.name`] || district.name}
          </h2>
          <div className={`dating-room-divider ${district.dividerClass}`} />
          <p className="dating-room-prose">
            {t[`district.${district.id}.desc`] || district.description}
          </p>
        </div>

        {/* Encounter Cards — residents of this room */}
        <div className="dating-encounters">
          {encounters.length > 0 ? (
            encounters.map(({ resident, href }) => (
              <a
                href={href || '#'}
                key={resident.id}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                className="dating-encounter-card no-underline"
                data-resident={resident.id}
              >
                <div
                  className="dating-encounter-image"
                  style={{ backgroundImage: `url('${resident.image}')` }}
                />
                <div className="dating-encounter-body">
                  <span className="dating-encounter-name">{t[`resident.${resident.id}.name`] || resident.name}</span>
                  <p className="dating-encounter-desc">
                    {t[`resident.${resident.id}.desc`] || resident.description}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <p className="district-empty">{t.emptyResidents}</p>
          )}
        </div>
      </div>
    </div>
  );
}