import type { Resident } from '@/data/rooms';

interface EncounterCardProps {
  resident: Resident;
  ctaColor: string;
}

export function EncounterCard({ resident, ctaColor }: EncounterCardProps) {
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
        <span className="encounter-card-subtitle">{resident.subtitle}</span>
        <p className="encounter-card-desc">{resident.description}</p>
        <span
          className="cta-bordered"
          style={{ border: `1px solid ${ctaColor}`, color: ctaColor }}
        >
          Send a Drink
        </span>
      </div>
    </a>
  );
}