'use client';

import { createContext, useContext } from 'react';

/* ═══════════════════════════════════════════════════════════════
   CANTINA VIRTUAL — i18n
   Single source of truth for all translatable strings.
   Context makes lang available globally without prop drilling.
   ═══════════════════════════════════════════════════════════════ */

export type Lang = 'en' | 'es';

export const T: Record<Lang, Record<string, string>> = {
  en: {
    /* ── Landing ── */
    copyLine1: 'Some evenings begin with a destination.',
    copyLine2: 'The unforgettable ones begin with a feeling.',
    copyBody:
      'Behind these lanterns are warm conversations, genuine companionship, playful chemistry, beautiful people, and stories that unfold one encounter at a time.',
    copyClosing: 'Tonight is yours to discover.',
    enter: 'ENTER',
    leave: 'EXIT',
    confirmQ: 'Are you 18 or older?',
    confirmEnter: 'I am 18 or older',
    confirmLeave: 'Exit',

    /* ── Sidebar ── */
    sidebarFooter: 'Pacific coast. After dark.',

    /* ── Nectar ── */
    nectarTitle: 'NECTAR PROGRAM',
    nectarComingSoon: 'COMING SOON',
    nectarFutureIntro: 'Future Nectar opportunities may include:',
    nectarFutureList: 'Socializing\nConversations\nParticipation\nSupporting creators\nDiscovering offers\nEvents',

    /* ── District names ── */
    'district.dating.name': 'Dates',
    'district.live-cams.name': 'Live Cams',
    'district.ai-companions.name': 'AI Companions',
    'district.fan-sites.name': 'Fansites',
    'district.pay-sites.name': 'Paysites',
    'district.niche.name': 'GAY',
    'district.gaming.name': 'Games',
    'district.our-mission.name': 'TRANSGENDER',

    /* ── District descriptions ── */
    'district.dating.desc':
      'Faint guitar. Tequila slides across the bar. Someone is always watching from the corner.',
    'district.live-cams.desc':
      'The deep alcove. Red lights behind frosted glass. You know what you want.',
    'district.ai-companions.desc':
      'Where the cantina meets the coast. Neon hums behind every screen.',
    'district.fan-sites.desc':
      'The creators have their own corner. Autographs optional.',
    'district.pay-sites.desc':
      'BEYOND THE VELVET ROPE\nPREMIUM ENTERTAINMENT AWAITS',
    'district.niche.desc':
      'A premium corner of the cantina. Open, welcoming, and always alive.',
    'district.gaming.desc':
      'The cabinets glow in the dark. Someone is already on the high score screen.',
    'district.our-mission.desc':
      'Every Body. Every Story. All Are Welcome Here.',

    /* ── Resident subtitles ── */
    'resident.girlfriendgpt.subtitle': '',
    /* ── Resident names ── */
    'resident.gay-offer.name': 'LOCAL DATING',
    'resident.dating-encounter.name': 'REAL CONNECTIONS',
    'resident.vicky-milan-dating.name': 'ENJOY A DISCREET DATE',
    'resident.date-player-two.name': 'DATE PLAYER TWO',
    'resident.hometown-flirt.name': 'HOMETOWN FLIRT',
    'resident.camirada.name': 'CAMIRADA',
    'resident.jerkmate-cams.name': 'JERKMATE',
    'resident.myfreecams.name': 'MYFREECAMS',
    'resident.girlfriendgpt.name': 'GIRLFRIEND GPT',
    'resident.candy-ai-male.name': 'CANDY AI MALE',
    'resident.darlink-ai.name': 'DARLINK AI',
    'resident.fanvue-amber.name': 'AMBER SANTORI',
    'resident.fanvue-talia.name': 'TALIA ROSE',
    'resident.fanvue-mila.name': 'MILA LERUE',
    'resident.bellesa-plus.name': 'BELLESA PLUS',
    'resident.sextpanther.name': 'SEXT PANTHER',
    'resident.manga-rpg.name': 'MANGA RPG',
    'resident.comix-harem-1.name': 'COMIX HAREM',
    'resident.comix-harem-2.name': 'COMIX HAREM',
    'resident.trans-offer.name': 'TRANS PORNSTAR HAREM',
    'resident.xlovegay-cams.name': 'XLOVEGAY CAMS',
    'resident.jermate-trans.name': 'JERKMATE TRANSGENDER',
    'resident.soda-offer.name': 'CAMSODA TRANSGENDER',
    /* ── Resident descriptions ── */
    'resident.girlfriendgpt.desc':
      'She remembers every conversation. Every name.',
    'resident.darlink-ai.desc':
      'CREATE YOUR COMPANION\nYOUR STORY EVOLVES',
    'resident.candy-ai-male.desc':
      'YOUR AI COMPANION\nBUILT FOR CONNECTION',
    'resident.dating-encounter.desc':
      'Someone is waiting. The bar is open.',
    'resident.date-player-two.desc':
      'FIND YOUR PLAYER TWO',
    'resident.hometown-flirt.desc':
      'Only available in the USA',
    'resident.manga-rpg.desc':
      'BUILD YOUR GUILD\nBEGIN THE ADVENTURE',
    'resident.comix-harem-1.desc':
      'BUILD YOUR HAREM\nCREATE YOUR STORY',
    'resident.comix-harem-2.desc':
      'YOUR CHOICES MATTER\nEVERY PATH CHANGES',
    'resident.trans-offer.desc':
      'BUILD YOUR ROSTER\nCHOOSE YOUR SCENES',
    'resident.gay-offer.desc':
      'FIND YOUR MATCH TONIGHT',
    'resident.jermate-trans.desc':
      'LIVE TRANS PERFORMERS\nREADY TO CHAT',
    'resident.soda-offer.desc':
      'TRANS CAM MODELS\nON DEMAND',

    /* ── UI strings ── */
    ctaDrink: 'Send a Drink',
    ctaPrivate: 'Request Private',
    emptyResidents: 'Residents arriving soon.',

    /* ── Hub ── */
    hubSubtitle: 'Choose your destination.',
    hubBack: 'Back',
    backToHub: 'Back to Hub',

    /* ── Regular Status ── */
    regularReturn: 'Welcome back.',
    regularFamiliar: "You know your way around here.",
    regularVip: "You're a regular now.",

    /* ── Alive Counter ── */
    aliveText: 'people exploring the cantina right now',

    /* ── Compliance footer ── */
    adultsOnly: '18+ Adults Only',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
  },

  es: {
    /* ── Landing ── */
    copyLine1: 'Algunas noches empiezan con un destino.',
    copyLine2: 'Las inolvidables empiezan con una sensación.',
    copyBody:
      'Detrás de estas linternas hay conversaciones cálidas, compañía genuina, química divertida, gente hermosa e historias que se van tejiendo encuentro a encuentro.',
    copyClosing: 'Esta noche es tuya para descubrir.',
    enter: 'ENTRAR',
    leave: 'SALIR',
    confirmQ: '¿Tienes 18 años o más?',
    confirmEnter: 'Tengo 18 años o más',
    confirmLeave: 'Salir',

    /* ── Sidebar ── */
    sidebarFooter: 'Costa del Pacífico. Después del anochecer.',

    /* ── Nectar ── */
    nectarTitle: 'PROGRAMA NÉCTAR',
    nectarComingSoon: 'PRÓXIMAMENTE',
    nectarFutureIntro: 'Las futuras oportunidades de Néctar pueden incluir:',
    nectarFutureList: 'Socializar\nConversaciones\nParticipación\nApoyar a creadores\nDescubrir ofertas\nEventos',

    /* ── District names ── */
    'district.dating.name': 'Citas',
    'district.live-cams.name': 'Cámaras en Vivo',
    'district.ai-companions.name': 'Compañeros IA',
    'district.fan-sites.name': 'Sitios de Fans',
    'district.pay-sites.name': 'Sitios de Pago',
    'district.niche.name': 'GAY',
    'district.gaming.name': 'Juegos',
    'district.our-mission.name': 'TRANSGENDER',

    /* ── District descriptions ── */
    'district.dating.desc':
      'Una guitarra suena de fondo. El tequila se desliza por la barra. Alguien siempre observa desde la esquina.',
    'district.live-cams.desc':
      'El rincón más profundo. Luces rojas detrás del cristal esmerilado. Sabes lo que buscas.',
    'district.ai-companions.desc':
      'Donde la cantina se encuentra con la costa. El neón zumba detrás de cada pantalla.',
    'district.fan-sites.desc':
      'Las creadoras tienen su propio rincón. Las autografías son opcionales.',
    'district.pay-sites.desc':
      'MÁS ALLÁ DE LA CUERDA DE TERCIPELO\nENTRETENIMIENTO PREMIUM TE ESPERA',
    'district.niche.desc':
      'Un rincón premium de la cantina. Abierto, acogedor, siempre vivo.',
    'district.gaming.desc':
      'Las máquinas brillan en la oscuridad. Alguien ya está en la pantalla de récord.',
    'district.our-mission.desc':
      'Cada Cuerpo. Cada Historia. Todos Son Bienvenidos Aquí.',

    /* ── Resident subtitles ── */
    'resident.girlfriendgpt.subtitle': '',
    /* ── Resident names ── */
    'resident.gay-offer.name': 'CITAS LOCALES',
    'resident.dating-encounter.name': 'CONEXIONES REALES',
    'resident.vicky-milan-dating.name': 'CITA DISCRETA',
    'resident.date-player-two.name': 'DATE PLAYER TWO',
    'resident.hometown-flirt.name': 'COQUETEO LOCAL',
    'resident.camirada.name': 'CAMIRADA',
    'resident.jerkmate-cams.name': 'JERKMATE',
    'resident.myfreecams.name': 'MYFREECAMS',
    'resident.girlfriendgpt.name': 'NOVIA GPT',
    'resident.candy-ai-male.name': 'CANDY AI MASCULINO',
    'resident.darlink-ai.name': 'DARLINK IA',
    'resident.fanvue-amber.name': 'AMBER SANTORI',
    'resident.fanvue-talia.name': 'TALIA ROSE',
    'resident.fanvue-mila.name': 'MILA LERUE',
    'resident.bellesa-plus.name': 'BELLESA PLUS',
    'resident.sextpanther.name': 'SEXT PANTHER',
    'resident.manga-rpg.name': 'MANGA RPG',
    'resident.comix-harem-1.name': 'COMIX HAREM',
    'resident.comix-harem-2.name': 'COMIX HAREM',
    'resident.trans-offer.name': 'TRANS PORNSTAR HAREM',
    'resident.xlovegay-cams.name': 'XLOVEGAY CAMS',
    'resident.jermate-trans.name': 'JERKMATE TRANSGENDER',
    'resident.soda-offer.name': 'CAMSODA TRANSGENDER',
    /* ── Resident descriptions ── */
    'resident.girlfriendgpt.desc':
      'Recuerda cada conversación. Cada nombre.',
    'resident.darlink-ai.desc':
      'CREA A TU COMPAÑERO\nTU HISTORIA EVOLUCIONA',
    'resident.candy-ai-male.desc':
      'TU COMPAÑERO IA\nDISEÑADO PARA CONECTAR',
    'resident.dating-encounter.desc':
      'Alguien te espera. La barra está abierta.',
    'resident.date-player-two.desc':
      'ENCUENTRA A TU PLAYER TWO',
    'resident.hometown-flirt.desc':
      'Solo disponible en Estados Unidos',
    'resident.manga-rpg.desc':
      'CONSTRUYE TU GUILD\nCOMIENZA LA AVENTURA',
    'resident.comix-harem-1.desc':
      'CONSTRUYE TU HAREM\nCREA TU HISTORIA',
    'resident.comix-harem-2.desc':
      'CADA ELECCIÓN IMPORTA\nCADA CAMBIO CUENTA',
    'resident.trans-offer.desc':
      'ARMA TU ROSTER\nELIGE TUS ESCENAS',
    'resident.gay-offer.desc':
      'ENCUENTRA TU PAREJA ESTA NOCHE',
    'resident.jermate-trans.desc':
      'PERFORMERS TRANS EN VIVO\nLISTAS PARA CHATEAR',
    'resident.soda-offer.desc':
      'MODELOS TRANS EN CAM\nA DEMANDA',

    /* ── UI strings ── */
    ctaDrink: 'Invitar un Trago',
    ctaPrivate: 'Pedir Privado',
    emptyResidents: 'Los residentes están por llegar.',

    /* ── Hub ── */
    hubSubtitle: 'Elige tu destino.',
    hubBack: 'Volver',
    backToHub: 'Volver al Hub',

    /* ── Regular Status ── */
    regularReturn: 'Bienvenido de vuelta.',
    regularFamiliar: 'Ya conoces el camino.',
    regularVip: 'Eres un habitual ahora.',

    /* ── Alive Counter ── */
    aliveText: 'personas explorando la cantina en este momento',

    /* ── Compliance footer ── */
    adultsOnly: 'Solo +18',
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto',
  },
};

/* ── Context ── */
interface LangContextValue {
  lang: Lang;
  t: Record<string, string>;
  onToggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  lang,
  onToggleLang,
  children,
}: {
  lang: Lang;
  onToggleLang: () => void;
  children: React.ReactNode;
}) {
  const t = T[lang];
  return (
    <LangContext.Provider value={{ lang, t, onToggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within a LangProvider');
  return ctx;
}