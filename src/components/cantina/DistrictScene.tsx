'use client';

import { RESIDENTS, type District } from '@/data/rooms';
import { useLang } from '@/lib/i18n';
import { EncounterCard } from './EncounterCard';
import { DatingRoom } from './DatingRoom';
import { NectarCabins } from './NectarCabins';


interface DistrictSceneProps {
  district: District;
}

export function DistrictScene({ district }: DistrictSceneProps) {
  const { t } = useLang();

  /* ── Immersive room overrides ── */
  if (district.id === 'dating') {
    return <DatingRoom district={district} />;
  }

  /* ── Default generic scene (all non-dating districts) ── */
  return (
    <div className="district-scene" key={district.id} data-district={district.id}>
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
          <p className="district-description">
            {t[`district.${district.id}.desc`] || district.description}
          </p>
        </div>

        {/* Nectar cabinas — 3 doors only on the Nectar wing */}
        {district.id === 'nectar' && <NectarCabins />}

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
                  href={encounter.href}
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