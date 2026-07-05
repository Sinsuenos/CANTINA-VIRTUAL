'use client';

import { RESIDENTS, type District } from '@/data/rooms';
import { useLang } from '@/lib/i18n';
import { EncounterCard } from './EncounterCard';
import { DatingRoom } from './DatingRoom';
import { LiveCamsRoom } from './LiveCamsRoom';

interface DistrictSceneProps {
  district: District;
}

export function DistrictScene({ district }: DistrictSceneProps) {
  const { t } = useLang();

  /* ── Immersive room overrides ── */
  if (district.id === 'dating') {
    return <DatingRoom district={district} />;
  }

  if (district.id === 'live-cams') {
    return <LiveCamsRoom district={district} />;
  }

  /* ── Default generic scene (unchanged for all other districts) ── */
  return (
    <div className="district-scene" key={district.id}>
      {/* Atmospheric background */}
      <div
        className="district-scene-bg"
        style={{ backgroundImage: `url('${district.bgImage}')` }}
      />

      {/* Gradient overlay for readability */}
      <div className="district-scene-overlay" />

      {/* Scene content */}
      <div className="district-scene-content">
        {/* District header */}
        <div className="district-header">
          <h2 className={`district-name ${district.neonClass}`}>
            {t[`district.${district.id}.name`] || district.name}
          </h2>
          <div className={`district-divider ${district.dividerClass}`} />
          <p
            className="district-description"
            style={{ color: 'var(--text-muted)' }}
          >
            {t[`district.${district.id}.desc`] || district.description}
          </p>
        </div>

        {/* Encounter cards — the people inside this place */}
        <div className="district-encounters">
          {district.encounters.length > 0 ? (
            district.encounters.map((encounter) => {
              const resident = RESIDENTS[encounter.residentId];
              if (!resident) return null;
              return (
                <EncounterCard
                  key={encounter.residentId}
                  resident={resident}
                  ctaColor={district.textColor}
                />
              );
            })
          ) : (
            <p className="district-empty">{t.emptyResidents}</p>
          )}
        </div>
      </div>
    </div>
  );
}