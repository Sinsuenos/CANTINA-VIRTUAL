import { useState, useCallback } from 'react';
import type { Resident } from '@/data/rooms';
import { useLang } from '@/lib/i18n';
import { trackOfferClick } from '@/lib/ga4';

interface EncounterCardProps {
  resident: Resident;
  ctaColor: string;
  href?: string;
  wingId?: string;
}

const FLAT_LAYOUT_RESIDENTS = new Set([
  'trans-offer',
  'jermate-trans',
  'soda-offer',
  'sweepsex-trans',
  'imlive-trans',
  'datsk-trans',
]);

/* Residents that get a red dismiss-X overlay on their banner image */
const DISMISSABLE_RESIDENTS = new Set([
  'crossdressing-fun',
]);

export function EncounterCard({ resident, ctaColor, href, wingId }: EncounterCardProps) {
  const { t } = useLang();
  const [dismissed, setDismissed] = useState(false);

  const nameText = t[`resident.${resident.id}.name`] || resident.name;
  const descText = t[`resident.${resident.id}.desc`] || resident.description;

  const handleClick = () => {
    if (wingId) trackOfferClick(resident.id, wingId);
  };

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
  }, []);

  if (dismissed) return null;

  const showDismissX = DISMISSABLE_RESIDENTS.has(resident.id);

  if (FLAT_LAYOUT_RESIDENTS.has(resident.id)) {
    return (
      <a
        href={href || '#'}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        className="encounter-card no-underline"
        data-resident={resident.id}
        onClick={handleClick}
      >
        <span className="encounter-card-name">{nameText}</span>
        <div
          className="encounter-card-image"
          style={{ backgroundImage: `url('${resident.image}')` }}
        />
        {descText && (
          <p className="encounter-card-desc">{descText}</p>
        )}
      </a>
    );
  }

  return (
    <a
      href={href || '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className="encounter-card no-underline"
      data-resident={resident.id}
      onClick={handleClick}
    >
      <div
        className="encounter-card-image"
        style={{ backgroundImage: `url('${resident.image}')` }}
      >
        {showDismissX && (
          <button
            type="button"
            className="card-dismiss-x"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
      <div className="encounter-card-body">
        <span className="encounter-card-name">{nameText}</span>
        {descText && (
          <p className="encounter-card-desc">{descText}</p>
        )}
      </div>
    </a>
  );
}
