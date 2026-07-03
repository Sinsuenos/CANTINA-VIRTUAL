import { LINKS, type FanvueEntry } from '@/data/rooms';

interface FanvueCardProps {
  entry: FanvueEntry;
}

export function FanvueCard({ entry }: FanvueCardProps) {
  return (
    <a
      href={LINKS[entry.linkKey]}
      target="_blank"
      rel="noopener noreferrer"
      className="room-card rounded p-4 no-underline text-center"
      style={{ background: 'var(--bg-card)' }}
    >
      <p className="text-sm tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
        {entry.name}
      </p>
      <p className="text-[10px] tracking-wider" style={{ color: entry.subtitleColor }}>
        {entry.subtitle}
      </p>
    </a>
  );
}