import { LINKS, type LinkKey } from '@/data/rooms';

interface OfferButtonProps {
  label: string;
  linkKey: LinkKey;
  borderColor: string;
  textColor: string;
}

export function OfferButton({ label, linkKey, borderColor, textColor }: OfferButtonProps) {
  return (
    <a
      href={LINKS[linkKey]}
      target="_blank"
      rel="noopener noreferrer"
      className="offer-btn block text-center py-2 text-[10px] tracking-wider uppercase no-underline transition-all duration-300"
      style={{ border: `1px solid ${borderColor}`, color: textColor }}
    >
      {label}
    </a>
  );
}