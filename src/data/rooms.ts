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
    name: 'GIRLFRIEND GPT',
    subtitle: '',
    description: 'She remembers every conversation. Every name.',
    image: 'https://sfile.chatglm.cn/images-ppt/45b22e591c90.png',
  },
  'candy-ai-male': {
    id: 'candy-ai-male',
    name: 'CANDY AI MALE',
    subtitle: '',
    description: 'YOUR AI COMPANION\nBUILT FOR CONNECTION',
    image: 'https://www.imglnkx.com/10022/01_realistic_male_nsfw_300x250_candy_banner.gif',
  },
  'darlink-ai': {
    id: 'darlink-ai',
    name: 'DARLINK AI',
    subtitle: '',
    description: 'CREATE YOUR COMPANION\nYOUR STORY EVOLVES',
    image: 'https://www.imglnkx.com/10345/300x250a.png',
  },
  'dating-encounter': {
    id: 'dating-encounter',
    name: 'Real Connections',
    subtitle: '',
    description: 'Someone is waiting. The bar is open.',
    image: '/dating-offer.png',
  },
  'vicky-milan-dating': {
    id: 'vicky-milan-dating',
    name: 'ENJOY A\nDISCREET DATE',
    subtitle: '',
    description: '',
    image: '/vicky-milan-dating.png',
  },
  'cams-banner': {
    id: 'cams-banner',
    name: 'Live Performers',
    subtitle: '',
    description: 'Red lights. Frosted glass. They are already waiting.',
    image: 'https://www.imglnkx.com/9776/PCAM-244_DESIGN-23232_300250.gif',
  },
  'fanvue-mila': {
    id: 'fanvue-mila',
    name: 'MILA LERUE',
    subtitle: '',
    description: '',
    image: 'https://www.imglnkx.com/10395/MilaBanner300x100-2.png',
  },
  'fanvue-talia': {
    id: 'fanvue-talia',
    name: 'TALIA ROSE',
    subtitle: '',
    description: '',
    image: 'https://www.imglnkx.com/10398/TaliaBanner300x100-2.png',
  },
  'fanvue-amber': {
    id: 'fanvue-amber',
    name: 'AMBER SANTORI',
    subtitle: '',
    description: '',
    image: 'https://www.imglnkx.com/10394/AmberBanner300x100-1.png',
  },
  'gay-offer': {
    id: 'gay-offer',
    name: 'PREMIUM\nGAY ENTERTAINMENT',
    subtitle: '',
    description: '',
    image: '/gay-offer.png',
  },
  'bellesa-plus': {
    id: 'bellesa-plus',
    name: 'ETHICAL\nPREMIUM\nENTERTAINMENT',
    subtitle: '',
    description: '',
    image: 'https://www.imglnkx.com/9976/BellesaPlus_20250307_300250.jpeg',
  },
  'sextpanther': {
    id: 'sextpanther',
    name: 'SEXT PANTHER',
    subtitle: '',
    description: '',
    image: '/sext-panther-300x250.png',
  },
  'manga-rpg': {
    id: 'manga-rpg',
    name: 'MANGA RPG',
    subtitle: '',
    description: 'BUILD YOUR GUILD\nBEGIN THE ADVENTURE',
    image: '/manga-rpg-300x250.png',
  },
  'college-harem-1': {
    id: 'college-harem-1',
    name: 'COLLEGE × HAREM',
    subtitle: '',
    description: 'BUILD YOUR HAREM\nCHOOSE YOUR PATH',
    image: '/FSX-300x250.gif',
  },
  'college-harem-2': {
    id: 'college-harem-2',
    name: 'COLLEGE × HAREM',
    subtitle: '',
    description: 'EVERY CHOICE MATTERS\nEVERY ROMANCE COUNTS',
    image: '/CxH-SQ1-13_300x250_EN.gif',
  },
  'trans-offer': {
    id: 'trans-offer',
    name: 'TRANS PORNSTAR HAREM',
    subtitle: '',
    description: '',
    image: '/trans-offer.png',
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
      {
        residentId: 'vicky-milan-dating',
        href: 'https://t.crdtg3.com/413627/4593/40617?aff_sub=DATING&aff_sub2=VICMILAN&aff_sub3=MILDLP&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
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
        href: 'https://t.camsk1.com/413627/9776/0?aff_sub=CAMS2&source=CANTINA&po=6533&aff_sub5=SF_006OG000004lmDN',
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
    bgImage: '/ai-partners-bg.png',
    encounters: [
      {
        residentId: 'girlfriendgpt',
        href: 'https://t.vlmai-1.com/413627/10046/38605?aff_sub=AI&source=Cantina&aff_sub5=SF_006OG000004lmDN',
      },
      {
        residentId: 'darlink-ai',
        href: 'https://t.vlmai-1.com/413627/10345/0?aff_sub=AI&aff_sub2=DARLINK&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
      {
        residentId: 'candy-ai-male',
        href: 'https://t.vlmai-1.com/413627/10022/37968?aff_sub=AI&aff_sub2=MALE&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
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
    bgImage: '/fan-sites-bg.png',
    encounters: [
      {
        residentId: 'fanvue-amber',
        href: 'https://t.acust-9.com/413627/10394/0?aff_sub=FAN&aff_sub2=AMBERS&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
      {
        residentId: 'fanvue-talia',
        href: 'https://t.acust-9.com/413627/10398/0?aff_sub=FAN&aff_sub2=TALIAR&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
      {
        residentId: 'fanvue-mila',
        href: 'https://t.acust-9.com/413627/10395/0?aff_sub=FAN&aff_sub2=MILAL&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
    ],
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
    encounters: [
      {
        residentId: 'bellesa-plus',
        href: 'https://t.bbwafx.com/413627/7378?aff_sub=PAY&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
      {
        residentId: 'sextpanther',
        href: 'https://t.acust-9.com/413627/9927/38131?aff_sub=PAY&aff_sub2=LATINA&aff_sub3=SEXTPANTHR&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
    ],
  },
  {
    id: 'niche',
    name: 'GAY',
    subtitle: '',
    neonClass: 'neon-amber',
    dividerClass: 'divider-amber',
    description: 'A premium corner of the cantina. Open, welcoming, and always alive.',
    borderColor: 'rgba(212,160,23,0.3)',
    textColor: 'var(--amber)',
    bgImage: '/gay-bg.png',
    encounters: [
      {
        residentId: 'gay-offer',
        href: 'https://t.acust-7.com/413627/4080/0?aff_sub=GAY&source=Cantina&po=6456&aff_sub5=SF_006OG000004lmDN',
      },
    ],
  },
  {
    id: 'gaming',
    name: 'Games',
    subtitle: '',
    neonClass: 'neon-cyan',
    dividerClass: 'divider-cyan',
    description: 'The cabinets glow in the dark. Someone is already on the high score screen.',
    borderColor: 'rgba(0,245,255,0.3)',
    textColor: 'var(--cyan)',
    bgImage: 'https://sfile.chatglm.cn/images-ppt/fcef82f7bbdf.png',
    encounters: [
      {
        residentId: 'manga-rpg',
        href: 'https://t.acust-9.com/413627/6621?aff_sub=GAMES&aff_sub2=MNGRPG&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
      {
        residentId: 'college-harem-1',
        href: 'https://t.aagm.link/413627/7930/27132?aff_sub=GAMES&aff_sub2=CMXHRM&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
      {
        residentId: 'college-harem-2',
        href: 'https://t.aagm.link/413627/7930/27132?aff_sub=GAMES&aff_sub2=CMXHRM&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
    ],
  },
  {
    id: 'our-mission',
    name: 'TRANSGENDER',
    subtitle: '',
    neonClass: 'neon-purple',
    dividerClass: 'divider-purple',
    description: 'Why the cantina exists. What it stands for. The honest version.',
    borderColor: 'rgba(123,45,142,0.3)',
    textColor: 'var(--purple)',
    bgImage: '/trans-bg.jpg',
    encounters: [
      {
        residentId: 'trans-offer',
        href: 'https://t.mbagm.link/413627/8663/0?aff_sub=TRANS&source=CANTINA&aff_sub5=SF_006OG000004lmDN',
      },
    ],
  },
];