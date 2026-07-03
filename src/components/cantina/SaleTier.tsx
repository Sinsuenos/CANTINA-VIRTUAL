import type { SaleTier as SaleTierType } from '@/data/rooms';

interface SaleTierProps {
  tier: SaleTierType;
}

export function SaleTierCard({ tier }: SaleTierProps) {
  return (
    <div
      className={`text-center p-3 rounded${tier.badge ? ' relative' : ''}`}
      style={{ background: tier.bgColor, border: `1px solid ${tier.borderColor}` }}
    >
      {tier.badge && (
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] tracking-wider uppercase rounded-full"
          style={{ background: tier.badgeBg, color: tier.badgeColor, fontWeight: 700 }}
        >
          {tier.badge}
        </span>
      )}
      <p
        className={`text-[10px] tracking-wider uppercase mb-1${tier.badge ? ' mt-1' : ''}`}
        style={{ color: tier.labelColor }}
      >
        {tier.label}
      </p>
      <p className="text-lg font-bold" style={{ color: tier.color }}>
        {tier.price}
        <span className="text-xs font-normal">{tier.period}</span>
      </p>
      <p className="text-[10px]" style={{ color: tier.color }}>
        {tier.discount}
      </p>
    </div>
  );
}