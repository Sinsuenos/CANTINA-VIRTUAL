import type { Room } from '@/data/rooms';
import { RESIDENTS, ROOM_BG_IMAGES } from '@/data/rooms';
import { EncounterCard } from './EncounterCard';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const bgImage = ROOM_BG_IMAGES[room.id];

  return (
    <div
      className={`reveal ${room.revealDelay} room-card p-6 flex flex-col items-center text-center`}
      style={{
        background: 'var(--bg-card)',
        '--room-border': room.borderColor,
        '--room-border-hover': room.borderColor.replace(/,\s*[\d.]+\)/, ', 0.55)'),
      } as React.CSSProperties}
    >
      {bgImage && (
        <div
          className="room-card-bg"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
      )}
      <div className="text-4xl mb-4">🔒</div>
      <h3 className={`${room.neonClass} text-lg tracking-wider uppercase mb-2`}>{room.name}</h3>
      <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
        {room.subtitle}
      </p>
      <div className={`${room.dividerClass} w-16 mb-4`} />
      <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
        {room.description}
      </p>
      <div className="mt-auto flex flex-col gap-3 w-full">
        {room.offers.map((offer) => {
          const resident = RESIDENTS[offer.residentId];
          if (!resident) return null;
          return (
            <EncounterCard
              key={offer.residentId}
              resident={resident}
              ctaColor={room.textColor}
            />
          );
        })}
      </div>
    </div>
  );
}