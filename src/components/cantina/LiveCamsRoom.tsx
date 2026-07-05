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

  const encounters = district.encounters
    .map((e) => ({
      resident: RESIDENTS[e.residentId],
      href: e.href,
    }))
    .filter((e) => e.resident);

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
          <h2 className={`livecams-room-title ${district.neonClass}`}>
            {t[`district.${district.id}.name`] || district.name}
          </h2>
          <div className={`livecams-room-divider ${district.dividerClass}`} />
          <p className="livecams-room-prose">
            {t[`district.${district.id}.desc`] || district.description}
          </p>
        </div>

        <div className="livecams-encounters">
          {encounters.length > 0 ? (
            encounters.map(({ resident, href }) => (
              <a
                href={href || '#'}
                key={resident.id}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                className="livecams-encounter-card no-underline"
              >
                <div
                  className="livecams-encounter-image"
                  style={{ backgroundImage: `url('${resident.image}')` }}
                />
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