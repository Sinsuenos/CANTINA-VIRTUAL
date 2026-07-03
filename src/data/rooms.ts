/* ═══════════════════════════════════════════════════════════════
   CANTINA VIRTUAL — WORLD DATA LAYER

   AFFILIATE DATA IS INTERNAL ONLY.
   UI components MUST NOT import AFFILIATE_MAP or any link directly.
   All outbound links flow through resolveOfferLink().
   ═══════════════════════════════════════════════════════════════ */

/* ─── INTERNAL: Affiliate Link Mapping (NEVER export) ─── */
const AFFILIATE_MAP: Record<string, string> = {
  'girlfriendgpt': 'https://t.vlmai-1.com/413627/7477?aff_sub=SSUENOS&aff_sub2=SINNOCTURNOS&source=X&aff_sub5=SF_006OG000004lmDN',
  'lina-rose': 'https://t.acust-9.com/413627/10396/0?aff_sub=SinNoches_REV25_LinaRose&aff_sub2=SinSuenos_REV25_LinaRose&source=X&aff_sub5=SF_006OG000004lmDN',
  'ava-harrington': 'https://t.acust-9.com/413627/10397/0?aff_sub=GPrivado_REV_AvaH&aff_sub2=SinSuenos_Rev_AvaH&source=X&aff_sub5=SF_006OG000004lmDN',
  'isla-king': 'https://t.acust-9.com/413627/10364/0?aff_sub=SinNocturn_IslaKing_FNVREV&source=X&aff_sub5=SF_006OG000004lmDN',
};

/* ─── Link Resolution (single gate) ─── */
export function resolveOfferLink(residentId: string): string {
  const link = AFFILIATE_MAP[residentId];
  if (!link) {
    console.warn(`[LINK INTEGRITY] No affiliate link for resident: ${residentId}`);
    return '#';
  }
  console.log(`[LINK INTEGRITY] Resolved: ${residentId}`);
  return link;
}

/* ═══════════════════════════════════════════════════════════════
   WORLD-FACING DATA — UI consumes only what's below this line
   ═══════════════════════════════════════════════════════════════ */

/* ─── Resident ─── */
export interface Resident {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

export const RESIDENTS: Record<string, Resident> = {
  'lina-rose': {
    id: 'lina-rose',
    name: 'Lina Rose',
    subtitle: 'Resident of Sinaloa Sueños',
    description: 'She plays guitar by the window. The tequila is already poured.',
    image: 'https://sfile.chatglm.cn/images-ppt/efdf6cbf206b.jpg',
  },
  'ava-harrington': {
    id: 'ava-harrington',
    name: 'Ava Harrington',
    subtitle: 'Evening residency, warm light',
    description: 'The bar stool closest to the candle. Always reserved.',
    image: 'https://sfile.chatglm.cn/images-ppt/8c23e2c5aa19.jpg',
  },
  'girlfriendgpt': {
    id: 'girlfriendgpt',
    name: 'GirlfriendGPT',
    subtitle: 'Summer residency, Perla Puente',
    description: 'She remembers every conversation. Every name.',
    image: 'https://sfile.chatglm.cn/images-ppt/45b22e591c90.png',
  },
  'isla-king': {
    id: 'isla-king',
    name: 'Isla King',
    subtitle: 'Private residency, Golfo Privado',
    description: 'The back booth. Knock twice.',
    image: 'https://sfile.chatglm.cn/images-ppt/8e81418a549d.jpg',
  },
};

/* ─── District Data ─── */
export interface District {
  id: string;
  name: string;
  subtitle: string;
  neonClass: string;
  dividerClass: string;
  description: string;
  borderColor: string;
  textColor: string;
  bgImage: string;
  encounters: DistrictEncounter[];
}

export interface DistrictEncounter {
  residentId: string;
}

export const DISTRICTS: District[] = [
  {
    id: 'dating-lounge',
    name: 'Dating Lounge',
    subtitle: 'Sinaloa Sueños',
    neonClass: 'neon-amber',
    dividerClass: 'divider-amber',
    description: 'Faint guitar. Tequila slides across the bar. Someone is always watching from the corner.',
    borderColor: 'rgba(212,160,23,0.3)',
    textColor: 'var(--amber)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/91b93c38ff40.jpg',
    encounters: [
      { residentId: 'lina-rose' },
      { residentId: 'ava-harrington' },
    ],
  },
  {
    id: 'ai-companions',
    name: 'AI Companions',
    subtitle: 'Perla Puente',
    neonClass: 'neon-cyan',
    dividerClass: 'divider-cyan',
    description: 'Where the cantina meets the coast. Neon hums behind every screen.',
    borderColor: 'rgba(0,245,255,0.3)',
    textColor: 'var(--cyan)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/0eb8607628ce.jpg',
    encounters: [
      { residentId: 'girlfriendgpt' },
    ],
  },
  {
    id: 'live-cam',
    name: 'Live Cam District',
    subtitle: 'Golfo Privado',
    neonClass: 'neon-purple',
    dividerClass: 'divider-purple',
    description: 'The deep alcove. Red lights behind frosted glass. You know what you want.',
    borderColor: 'rgba(123,45,142,0.3)',
    textColor: 'var(--purple)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/310a4b1925d7.jpg',
    encounters: [
      { residentId: 'isla-king' },
    ],
  },
  {
    id: 'gaming',
    name: 'Gaming District',
    subtitle: 'Arcade Nocturno',
    neonClass: 'neon-emerald',
    dividerClass: 'divider-emerald',
    description: 'The cabinets glow in the dark. Someone is already on the high score screen.',
    borderColor: 'rgba(0,255,136,0.3)',
    textColor: 'var(--emerald)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/fcef82f7bbdf.png',
    encounters: [],
  },
  {
    id: 'communities',
    name: 'Communities',
    subtitle: 'Niche District',
    neonClass: 'neon-rose',
    dividerClass: 'divider-rose',
    description: 'The back rooms. The hidden tables. Where the regulars know each other\'s names.',
    borderColor: 'rgba(233,30,140,0.3)',
    textColor: 'var(--rose)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/508f8158b122.jpg',
    encounters: [],
  },
];

/* ─── Sale Tier (Platform Mode — NOT rendered in World) ─── */
export interface SaleTier {
  label: string;
  price: string;
  period: string;
  discount: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badge?: string;
  badgeBg?: string;
  badgeColor?: string;
  labelColor: string;
}

export const SALE_TIERS: SaleTier[] = [
  {
    label: 'Premium',
    price: '$109',
    period: '/yr',
    discount: '39% off',
    color: 'var(--sale-green)',
    bgColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.05)',
    labelColor: 'var(--text-muted)',
  },
  {
    label: 'Deluxe',
    price: '$199',
    period: '/yr',
    discount: '53% off',
    color: 'var(--sale-green)',
    bgColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.05)',
    labelColor: 'var(--text-muted)',
  },
  {
    label: 'Elite',
    price: '$239',
    period: '/yr',
    discount: '60% off',
    color: 'var(--cyan)',
    bgColor: 'rgba(0,245,255,0.05)',
    borderColor: 'rgba(0,245,255,0.2)',
    labelColor: 'var(--cyan)',
    badge: 'BEST',
    badgeBg: 'var(--cyan)',
    badgeColor: '#0a0e17',
  },
];