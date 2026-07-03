'use client';

import { RESIDENTS, type District } from '@/data/rooms';
import { EncounterCard } from './EncounterCard';

interface DistrictSceneProps {
  district: District;
}

export function DistrictScene({ district }: DistrictSceneProps) {
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
          <p
            className="district-subtitle"
            style={{ color: 'var(--text-muted)' }}
          >
            {district.subtitle}
          </p>
          <h2 className={`district-name ${district.neonClass}`}>
            {district.name}
          </h2>
          <div className={`district-divider ${district.dividerClass}`} />
          <p
            className="district-description"
            style={{ color: 'var(--text-muted)' }}
          >
            {district.description}
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
            <p className="district-empty">Residents arriving soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}