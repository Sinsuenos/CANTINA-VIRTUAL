import type { Resident } from '@/data/rooms';
import { useLang } from '@/lib/i18n';

interface EncounterCardProps {
  resident: Resident;
  ctaColor: string;
  href?: string;
}

const FLAT_LAYOUT_RESIDENTS = new Set([
  'trans-offer',
  'jermate-trans',
  'soda-offer',
]);

export function EncounterCard({ resident, ctaColor, href }: EncounterCardProps) {
  const { t } = useLang();

  const nameText = t[`resident.${resident.id}.name`] || resident.name;
  const descText = t[`resident.${resident.id}.desc`] || resident.description;

  if (FLAT_LAYOUT_RESIDENTS.has(resident.id)) {
    return (
      <a
        href={href || '#'}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        className="encounter-card no-underline"
        data-resident={resident.id}
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