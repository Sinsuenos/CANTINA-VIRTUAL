'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
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
  const postitialConfigured = useRef(false);

  /* ── Postitial interstitial — Unique Offers wing ONLY ── */
  useEffect(() => {
    if (district.id !== 'unique-offers' || postitialConfigured.current) return;
    postitialConfigured.current = true;

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (window as any).crakPopInParamsIframe = {
      url: 'https://t.datsk9.com/413627/9741/0?aff_sub=DATING&aff_sub2=XRCDRS&source=CANTINA&aff_sub5=SF_006OG000004lmDN&aff_sub4=AT_0016',
      decryptUrl: false,
      contentUrl: 'https://c.hubz.pl/?affiliateId=66375&partnerId=17491&utm_custom=%7Btransaction_id%7D&utm_source=%7Baff_id%7D&aff_id=1&transaction_id=postitial',
      decryptContentUrl: false,
      contentType: 'iframe',
      width: '85%',
      height: '70%',
      timeout: false,
      delayClose: 0,
      clickStart: false,
      closeIntent: false,
      postitialBehavior: true,
      closeButtonColor: '#000',
      closeCrossColor: '#fff',
      shadow: true,
      shadowColor: '#000',
      shadowOpacity: '.5',
      shadeColor: '#111',
      shadeOpacity: '0',
      border: '1px',
      borderColor: '#000',
      borderRadius: '0px',
      leadOut: true,
      animation: 'slide',
      direction: 'up',
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      expireDays: 0.01,
    };
  }, [district.id]);

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

      {/* Postitial script — loads ONLY on Unique Offers wing */}
      {district.id === 'unique-offers' && (
        <Script
          src="https://crxcra.com/popin/latest/affstitial-min.js"
          strategy="afterInteractive"
        />
      )}
    </div>
  );
}