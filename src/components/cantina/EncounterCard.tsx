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

export function EncounterCard({ resident, ctaColor, href, wingId }: EncounterCardProps) {
  const { t } = useLang();

  const nameText = t[`resident.${resident.id}.name`] || resident.name;
  const descText = t[`resident.${resident.id}.desc`] || resident.description;

  const handleClick = () => {
    if (wingId) trackOfferClick(resident.id, wingId);
  };

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
      />
      <div className="encounter-card-body">
        <span className="encounter-card-name">{nameText}</span>
        {descText && (
          <p className="encounter-card-desc">{descText}</p>
        )}
      </div>
    </a>
  );
}