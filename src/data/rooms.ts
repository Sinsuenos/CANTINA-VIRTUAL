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
  'girlfriendgpt': {
    id: 'girlfriendgpt',
    name: 'GirlfriendGPT',
    subtitle: '',
    description: 'She remembers every conversation. Every name.',
    image: 'https://sfile.chatglm.cn/images-ppt/45b22e591c90.png',
  },
  'dating-encounter': {
    id: 'dating-encounter',
    name: 'Real Connections',
    subtitle: '',
    description: 'Someone is waiting. The bar is open.',
    image: '/dating-offer.png',
  },
  'cams-banner': {
    id: 'cams-banner',
    name: 'Live Performers',
    subtitle: '',
    description: 'Red lights. Frosted glass. They are already waiting.',
    image: 'https://www.imglnkx.com/8780/PMKT-1110_DESIGN-17951_PinkGreen.gif',
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
  href?: string;
}

export const DISTRICTS: District[] = [
  {
    id: 'dating',
    name: 'Dates',
    subtitle: '',
    neonClass: 'neon-amber',
    dividerClass: 'divider-amber',
    description: 'Faint guitar. Tequila slides across the bar. Someone is always watching from the corner.',
    borderColor: 'rgba(212,160,23,0.3)',
    textColor: 'var(--amber)',
    bgImage: '/dating-room.jpg',
    encounters: [
      {
        residentId: 'dating-encounter',
        href: 'https://t.acust-7.com/413627/3785/0?po=6456&aff_sub5=SF_006OG000004lmDN',
      },
    ],
  },
  {
    id: 'live-cams',
    name: 'Live Cams',
    subtitle: '',
    neonClass: 'neon-purple',
    dividerClass: 'divider-purple',
    description: 'The deep alcove. Red lights behind frosted glass. You know what you want.',
    borderColor: 'rgba(123,45,142,0.3)',
    textColor: 'var(--purple)',
    bgImage: '/livecams-room.png',
    encounters: [
      {
        residentId: 'cams-banner',
        href: 'https://t.mbjrkmms.com/413627/8780/32514?aff_sub=CAMS&source=CANTINA&po=6533&aff_sub5=SF_006OG000004lmDN',
      },
    ],
  },
  {
    id: 'ai-companions',
    name: 'AI Partners',
    subtitle: '',
    neonClass: 'neon-cyan',
    dividerClass: 'divider-cyan',
    description: 'Where the cantina meets the coast. Neon hums behind every screen.',
    borderColor: 'rgba(0,245,255,0.3)',
    textColor: 'var(--cyan)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/0eb8607628ce.jpg',
    encounters: [
      {
        residentId: 'girlfriendgpt',
        href: 'https://t.vlmai-1.com/413627/10046/38605?aff_sub=AI&source=Cantina&aff_sub5=SF_006OG000004lmDN',
      },
    ],
  },
  {
    id: 'fan-sites',
    name: 'Fansites',
    subtitle: '',
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
    name: 'Paysites',
    subtitle: '',
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
    subtitle: '',
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
    name: 'Video Games',
    subtitle: '',
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
    subtitle: '',
    neonClass: 'neon-purple',
    dividerClass: 'divider-purple',
    description: 'Why the cantina exists. What it stands for. The honest version.',
    borderColor: 'rgba(123,45,142,0.3)',
    textColor: 'var(--purple)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/310a4b1925d7.jpg',
    encounters: [],
  },
];