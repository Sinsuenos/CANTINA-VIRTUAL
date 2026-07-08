import type { Resident } from '@/data/rooms';
import { useLang } from '@/lib/i18n';

interface EncounterCardProps {
  resident: Resident;
  ctaColor: string;
  href?: string;
}

export function EncounterCard({ resident, ctaColor, href }: EncounterCardProps) {
  const { t } = useLang();

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
        <span className="encounter-card-name">{t[`resident.${resident.id}.name`] || resident.name}</span>
        {(t[`resident.${resident.id}.desc`] || resident.description) && (
          <p className="encounter-card-desc">
            {t[`resident.${resident.id}.desc`] || resident.description}
          </p>
        )}
      </div>
    </a>
  );
}