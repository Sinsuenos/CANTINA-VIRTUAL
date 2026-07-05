import type { Resident } from '@/data/rooms';
import { useLang } from '@/lib/i18n';

interface EncounterCardProps {
  resident: Resident;
  ctaColor: string;
}

export function EncounterCard({ resident, ctaColor }: EncounterCardProps) {
  const { t } = useLang();

  return (
    <a
      href="#"
      className="encounter-card no-underline"
    >
      <div
        className="encounter-card-image"
        style={{ backgroundImage: `url('${resident.image}')` }}
      />
      <div className="encounter-card-body">
        <span className="encounter-card-name">{resident.name}</span>
        <span className="encounter-card-subtitle">
          {t[`resident.${resident.id}.subtitle`] || resident.subtitle}
        </span>
        <p className="encounter-card-desc">
          {t[`resident.${resident.id}.desc`] || resident.description}
        </p>
        <span
          className="cta-bordered"
          style={{ border: `1px solid ${ctaColor}`, color: ctaColor }}
        >
          {t.ctaDrink}
        </span>
      </div>
    </a>
  );
}