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
    'district.ai-companions.name': 'AI Partners',
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
      'Why the cantina exists. What it stands for. The honest version.',

    /* ── Resident subtitles ── */
    'resident.girlfriendgpt.subtitle': '',
    /* ── Resident descriptions ── */
    'resident.girlfriendgpt.desc':
      'She remembers every conversation. Every name.',
    'resident.darlink-ai.desc':
      'CREATE YOUR COMPANION\nYOUR STORY EVOLVES',
    'resident.candy-ai-male.desc':
      'YOUR AI COMPANION\nBUILT FOR CONNECTION',
    'resident.dating-encounter.desc':
      'Someone is waiting. The bar is open.',
    'resident.cams-banner.desc':
      'Red lights. Frosted glass. They are already waiting.',
    'resident.manga-rpg.desc':
      'BUILD YOUR GUILD\nBEGIN THE ADVENTURE',
    'resident.comix-harem-1.desc':
      'BUILD YOUR HAREM\nCREATE YOUR STORY',
    'resident.comix-harem-2.desc':
      'YOUR CHOICES MATTER\nEVERY PATH CHANGES',
    'resident.xlovegay-cams.desc':
      'Large selection of models',

    /* ── UI strings ── */
    ctaDrink: 'Send a Drink',
    ctaPrivate: 'Request Private',
    emptyResidents: 'Residents arriving soon.',

    /* ── Hub ── */
    hubSubtitle: 'Choose your destination.',
    hubBack: 'Back',
    backToHub: 'Back to Hub',

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
      'Por qué existe la cantina. Lo que representa. La versión honesta.',

    /* ── Resident subtitles ── */
    'resident.girlfriendgpt.subtitle': '',
    /* ── Resident descriptions ── */
    'resident.girlfriendgpt.desc':
      'Recuerda cada conversación. Cada nombre.',
    'resident.darlink-ai.desc':
      'CREA A TU COMPAÑERO\nTU HISTORIA EVOLUCIONA',
    'resident.candy-ai-male.desc':
      'TU COMPAÑERO IA\nDISEÑADO PARA CONECTAR',
    'resident.dating-encounter.desc':
      'Alguien te espera. La barra está abierta.',
    'resident.cams-banner.desc':
      'Luces rojas. Cristal esmerilado. Ya están esperando.',
    'resident.manga-rpg.desc':
      'CONSTRUYE TU GUILD\nCOMIENZA LA AVENTURA',
    'resident.comix-harem-1.desc':
      'CONSTRUYE TU HAREM\nCREA TU HISTORIA',
    'resident.comix-harem-2.desc':
      'CADA ELECCIÓN IMPORTA\nCADA CAMBIO CUENTA',
    'resident.xlovegay-cams.desc':
      'Gran selección de modelos',

    /* ── UI strings ── */
    ctaDrink: 'Invitar un Trago',
    ctaPrivate: 'Pedir Privado',
    emptyResidents: 'Los residentes están por llegar.',

    /* ── Hub ── */
    hubSubtitle: 'Elige tu destino.',
    hubBack: 'Volver',
    backToHub: 'Volver al Hub',

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