/* ═══════════════════════════════════════════════════════════════
   CANTINA VIRTUAL — WORLD DATA
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

/* ─── District ─── */
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
    id: 'dating',
    name: 'Dating',
    subtitle: 'Sinaloa Sueños',
    neonClass: 'neon-amber',
    dividerClass: 'divider-amber',
    description: 'Faint guitar. Tequila slides across the bar. Someone is always watching from the corner.',
    borderColor: 'rgba(212,160,23,0.3)',
    textColor: 'var(--amber)',
    bgImage: '/dating-room.jpg',
    encounters: [
      { residentId: 'lina-rose' },
      { residentId: 'ava-harrington' },
    ],
  },
  {
    id: 'live-cams',
    name: 'Live Cams',
    subtitle: 'Golfo Privado',
    neonClass: 'neon-purple',
    dividerClass: 'divider-purple',
    description: 'The deep alcove. Red lights behind frosted glass. You know what you want.',
    borderColor: 'rgba(123,45,142,0.3)',
    textColor: 'var(--purple)',
    bgImage: '/livecams-room.png',
    encounters: [
      { residentId: 'isla-king' },
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
    id: 'fan-sites',
    name: 'Fan Sites',
    subtitle: 'Calles Ocultas',
    neonClass: 'neon-rose',
    dividerClass: 'divider-rose',
    description: 'The creators have their own corner. Autographs optional.',
    borderColor: 'rgba(233,30,140,0.3)',
    textColor: 'var(--rose)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/508f8158b122.jpg',
    encounters: [],
  },
  {
    id: 'pay-sites',
    name: 'Pay Sites',
    subtitle: 'Terraza VIP',
    neonClass: 'neon-emerald',
    dividerClass: 'divider-emerald',
    description: 'The velvet rope. Beyond it, the night costs a little more.',
    borderColor: 'rgba(0,255,136,0.3)',
    textColor: 'var(--emerald)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/fcef82f7bbdf.png',
    encounters: [],
  },
  {
    id: 'niche',
    name: 'Niche',
    subtitle: 'Salas Escondidas',
    neonClass: 'neon-amber',
    dividerClass: 'divider-amber',
    description: 'The back rooms. The hidden tables. Where the regulars know each other\'s names.',
    borderColor: 'rgba(212,160,23,0.3)',
    textColor: 'var(--amber)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/91b93c38ff40.jpg',
    encounters: [],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    subtitle: 'Arcade Nocturno',
    neonClass: 'neon-cyan',
    dividerClass: 'divider-cyan',
    description: 'The cabinets glow in the dark. Someone is already on the high score screen.',
    borderColor: 'rgba(0,245,255,0.3)',
    textColor: 'var(--cyan)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/fcef82f7bbdf.png',
    encounters: [],
  },
  {
    id: 'our-mission',
    name: 'Our Mission',
    subtitle: 'La Verdad',
    neonClass: 'neon-purple',
    dividerClass: 'divider-purple',
    description: 'Why the cantina exists. What it stands for. The honest version.',
    borderColor: 'rgba(123,45,142,0.3)',
    textColor: 'var(--purple)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/310a4b1925d7.jpg',
    encounters: [],
  },
];