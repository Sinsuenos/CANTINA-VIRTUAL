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

    /* ── Nectar Cabins (3 doors on the Nectar wing page) ── */
    nectarCabinsIntro: "Step inside. Below are three doors — one for creators ready to build something real, one for guests curious about what's next, and one for promoters ready to cash in with CrakRevenue. Come one, come all, there's money to be made and a world to explore.",
    nectarCabin1Name: 'CREATOR SANCTUARY',
    nectarCabin1Body: "Step onto the digital stage without compromising your independence or your earnings. Through our partnership with FansRevenue, we deploy fast, mobile-optimized landing pages and real tracking infrastructure built to protect your brand and grow your reach. We handle the technical setup and walk you through the FansRevenue Creator Academy step by step, until you have everything you need to run things on your own terms.",
    nectarCabin1Cta: 'Enter Creator Sanctuary',
    nectarCabin2Name: 'NECTAR EVENTS',
    nectarCabin2Body: "Welcome to the jungle, the surf, and the raw, explicit reality of The Nectar Route. This isn't a digital agency; it's a high-stakes, NSFW open-world multiplayer campaign built straight out of the heavy Pacific heat of Mazatlán. Players step onto the Emerald Strip, a lawless, neon-drenched digital playground where the jungle cuts into the ocean and the air floats with raw, golden Nectar — a volatile currency tied to real-world corporate bounties. Random 'Heatwaves' throw open premium portals for exclusive drops and secret bounties. Let us know what you want from the next drop.",
    nectarCabin2Cta: 'Reach the Nectar Team',
    nectarCabin3Name: 'CANTINA VAULT OPPORTUNITIES',
    nectarCabin3Body: "Stop pouring your media buying and traffic skills into low-converting setups that hold you back. Plug directly into CrakRevenue, a 20-year global network processing billions of monthly clicks with proven smartlink infrastructure. Whether you're an independent marketer, a media buyer, or building a sub-affiliate network of your own, this is built to scale with you. Access Pay-Per-Lead, Pay-Per-Sale, and RevShare models backed by real-time data, and start building consistent, long-term earnings.",
    nectarCabin3Cta: 'Open the Vault',
    nectarCabinClose: 'Close',
    nectarCabinEmailLabel: 'Email us',

    /* ── Nectar Engine (Phase 1 — live) ── */
    nectarPointsLabel: 'NECTAR',
    nectarPointsUnit: 'pts',
    nectarProgress: 'wings visited',
    nectarProgressSaved: 'Progress saved on this device',
    nectarExpand: 'View passport',
    nectarCollapse: 'Close',
    nectarToastEarned: '+{points} Nectar — {wing} visited',
    nectarToastComplete: 'All wings visited! Passport complete.',
    nectarPassportTitle: 'PASSPORT COMPLETE',
    nectarPassportSubtitle: 'You have explored every wing of the Cantina.',
    nectarPassportCongrats: 'Every story. Every encounter. Every wing. You came, you saw, you stayed.',
    nectarPassportShareLabel: 'Share your journey',
    nectarPassportShareText: 'I explored all 8 wings of Cantina Virtual and earned {points} Nectar. Every body. Every story. All welcome here.',
    nectarPassportCopyBtn: 'Copy text',
    nectarPassportCopied: 'Copied!',
    nectarPassportClose: 'Return to Explore',
    nectarPassportStamps: 'Stamps collected',
    nectarPassportReset: 'Reset progress',
    nectarPassportResetConfirm: 'Reset all Nectar progress on this device?',

    /* ── District names ── */
    'district.dating.name': 'Dating',
    'district.live-cams.name': 'Live Cams',
    'district.ai-companions.name': 'AI Companions',
    'district.fan-sites.name': 'Fansites',
    'district.pay-sites.name': 'Paysites',
    'district.niche.name': 'GAY',
    'district.gaming.name': 'Games',
    'district.our-mission.name': 'TRANSGENDER',
    'district.unique-offers.name': 'Unique Offers',
    'district.nectar.name': 'Nectar',

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
    'district.unique-offers.desc':
      'One-of-a-kind encounters. Limited time. Only here.',
    'district.nectar.desc':
      'The heartbeat of the Cantina. Earn wings. Collect stamps. Your journey, remembered.',

    /* ── Resident subtitles ── */
    'resident.girlfriendgpt.subtitle': '',
    /* ── Resident names ── */
    'resident.gay-offer.name': 'LOCAL DATING',
    'resident.dating-encounter.name': 'REAL CONNECTIONS',
    'resident.vicky-milan-dating.name': 'ENJOY A DISCREET DATE',
    'resident.date-player-two.name': 'DATE PLAYER TWO',
    'resident.hometown-flirt.name': 'HOMETOWN FLIRT',
    'resident.camirada.name': 'CAMIRADA',
    'resident.camirada.desc': 'PRIVATE SHOWS WITH SPANISH BEAUTIES!',
    'resident.jerkmate-cams.name': 'JERKMATE',
    'resident.jerkmate-cams.desc': 'LIVE CAMS. TRY FOR FREE.',
    'resident.myfreecams.name': 'MYFREECAMS',
    'resident.myfreecams.desc': 'FREE LIVE CAM COMMUNITY.',
    'resident.ole.name': 'OLÉ',
    'resident.ole.desc': 'Spanish and Latina models',
    'resident.sweepsex.name': 'Sweepsex',
    'resident.sweepsex.desc': 'Exclusive Freemium\nAdult Webcam',
    'resident.imlive.name': "I'm Live",
    'resident.imlive.desc': '100+ NICHES AND SUB-NICHES',
    'resident.sweepsex-gay.name': 'GAY CAMS',
    'resident.sweepsex-gay.desc': 'Exclusive Freemium\nAdult Webcam',
    'resident.sweepsex-trans.name': 'TRANS CAMS',
    'resident.sweepsex-trans.desc': 'Exclusive Freemium\nAdult Webcam',
    'resident.girlfriendgpt.name': 'GIRLFRIEND GPT',
    'resident.candy-ai-male.name': 'CANDY AI MALE',
    'resident.darlink-ai.name': 'DARLINK AI',
    'resident.fanvue-amber.name': 'AMBER SANTORI',
    'resident.sofia-storme.name': 'SOFIA STORME',
    'resident.fanvue-talia.name': 'TALIA ROSE',
    'resident.fanvue-mila.name': 'MILA LERUE',
    'resident.bellesa-plus.name': 'BELLESA PLUS',
    'resident.sextpanther.name': 'SEXT PANTHER',
    'resident.faphouse.name': 'FAPHOUSE',
    'resident.manga-rpg.name': 'MANGA RPG',
    'resident.comix-harem-1.name': 'COMIX HAREM',
    'resident.comix-harem-2.name': 'COMIX HAREM',
    'resident.trans-offer.name': 'TRANS PORNSTAR HAREM',
    'resident.xlovegay-cams.name': 'XLOVEGAY CAMS',
    'resident.royal-cams.name': 'ROYAL CAMS',
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
    'resident.royal-cams.desc':
      'LIVE CAMS.\nNO LIMITS.',
    'resident.dirty-dating.name': 'DIRTY DATING',
    'resident.smok.name': 'SMOKE AND POKE',
    'resident.vescina-pasionales.name': 'VESCINA PASIONALES',
    'resident.vescina-pasionales.desc': 'LATAM DATING',
    'resident.sexymeet.name': 'Sexymeet.tv',
    'resident.dateplayer2-unique.name': 'DATEPLAYER2',
    'resident.dateplayer2-unique.desc': 'GEEK DATING MADE EASY!',
    'resident.x-game-hub.name': 'X Game Hub',
    'resident.x-game-hub.desc': 'DIGITAL GAMING COMPANION',
    'resident.oopsie.name': 'Oopsie',
    'resident.oopsie.desc': 'OUTRAGEOUS SITUATIONS',
    'resident.cozy.name': 'COZY',
    'resident.cozy.desc': 'MATURE ADULTS FIND COMPANIONSHIP',
    'resident.instabang-latinas.name': 'INSTABANG LATINAS',
    'resident.instabang-latinas.desc': 'HOOKUP & TRADE NAKED SELFIES',
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

    /* ── Nectar Cabinas (3 puertas en la página del ala Néctar) ── */
    nectarCabinsIntro: "Entra. Abajo hay tres puertas: una para creadores listos para construir algo real, una para invitados curiosos sobre lo que viene, y una para promotores listos para ganar con CrakRevenue. Vengan todos, hay dinero por hacer y un mundo por explorar.",
    nectarCabin1Name: 'SANTUARIO DE CREADORES',
    nectarCabin1Body: "Sube al escenario digital sin comprometer tu independencia ni tus ganancias. A través de nuestra asociación con FansRevenue, desplegamos páginas de destino rápidas y optimizadas para móvil, con infraestructura de seguimiento real diseñada para proteger tu marca y ampliar tu alcance. Nosotros manejamos la configuración técnica y te guiamos paso a paso por la FansRevenue Creator Academy, hasta que tengas todo lo necesario para manejar las cosas a tu manera.",
    nectarCabin1Cta: 'Entrar al Santuario de Creadores',
    nectarCabin2Name: 'EVENTOS NÉCTAR',
    nectarCabin2Body: "Bienvenido a la jungla, al surf y a la realidad cruda y explícita de The Nectar Route. Esto no es una agencia digital; es una campaña multijugador de mundo abierto NSFW, de altas apuestas, construida directamente desde el calor pesado del Pacífico en Mazatlán. Los jugadores entran al Emerald Strip, un patio de juego digital sin ley, bañado en neón, donde la jungla se mete en el océano y el aire flota con Néctar dorado y volátil — una moneda ligada a recompensas corporativas del mundo real. Los 'Heatwaves' aleatorios abren portales premium para drops exclusivos y recompensas secretas. Cuéntanos qué quieres del próximo drop.",
    nectarCabin2Cta: 'Contactar al Equipo Néctar',
    nectarCabin3Name: 'OPORTUNIDADES DEL VAULT DE LA CANTINA',
    nectarCabin3Body: "Deja de verter tus habilidades de compra de medios y tráfico en configuraciones de baja conversión que te frenan. Conéctate directamente a CrakRevenue, una red global de 20 años que procesa miles de millones de clics mensuales con infraestructura smartlink probada. Ya seas un marketero independiente, un comprador de medios o estés construyendo tu propia red de sub-afiliados, esto está diseñado para escalar contigo. Accede a modelos de Pay-Per-Lead, Pay-Per-Sale y RevShare respaldados por datos en tiempo real, y empieza a construir ganancias consistentes y a largo plazo.",
    nectarCabin3Cta: 'Abrir el Vault',
    nectarCabinClose: 'Cerrar',
    nectarCabinEmailLabel: 'Escríbenos',

    /* ── Nectar Engine (Phase 1 — live) ── */
    nectarPointsLabel: 'NÉCTAR',
    nectarPointsUnit: 'pts',
    nectarProgress: 'alas visitadas',
    nectarProgressSaved: 'Progreso guardado en este dispositivo',
    nectarExpand: 'Ver pasaporte',
    nectarCollapse: 'Cerrar',
    nectarToastEarned: '+{points} Néctar — {wing} visitada',
    nectarToastComplete: '¡Todas las alas visitadas! Pasaporte completo.',
    nectarPassportTitle: 'PASAPORTE COMPLETO',
    nectarPassportSubtitle: 'Has explorado cada ala de la Cantina.',
    nectarPassportCongrats: 'Cada historia. Cada encuentro. Cada ala. Viniste, viste, te quedaste.',
    nectarPassportShareLabel: 'Comparte tu viaje',
    nectarPassportShareText: 'Exploré las 8 alas de Cantina Virtual y gané {points} Néctar. Cada cuerpo. Cada historia. Todos bienvenidos.',
    nectarPassportCopyBtn: 'Copiar texto',
    nectarPassportCopied: '¡Copiado!',
    nectarPassportClose: 'Volver a Explorar',
    nectarPassportStamps: 'Sellos coleccionados',
    nectarPassportReset: 'Reiniciar progreso',
    nectarPassportResetConfirm: '¿Reiniciar todo el progreso de Néctar en este dispositivo?',

    /* ── District names ── */
    'district.dating.name': 'Citas',
    'district.live-cams.name': 'Cámaras en Vivo',
    'district.ai-companions.name': 'Compañeros IA',
    'district.fan-sites.name': 'Sitios de Fans',
    'district.pay-sites.name': 'Sitios de Pago',
    'district.niche.name': 'GAY',
    'district.gaming.name': 'Juegos',
    'district.our-mission.name': 'TRANSGENDER',
    'district.unique-offers.name': 'Ofertas Únicas',
    'district.nectar.name': 'Néctar',

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
    'district.unique-offers.desc':
      'Encuentros únicos. Tiempo limitado. Solo aquí.',
    'district.nectar.desc':
      'El latido de la Cantina. Gana alas. Colecciona sellos. Tu viaje, recordado.',

    /* ── Resident subtitles ── */
    'resident.girlfriendgpt.subtitle': '',
    /* ── Resident names ── */
    'resident.gay-offer.name': 'CITAS LOCALES',
    'resident.dating-encounter.name': 'CONEXIONES REALES',
    'resident.vicky-milan-dating.name': 'CITA DISCRETA',
    'resident.date-player-two.name': 'DATE PLAYER TWO',
    'resident.hometown-flirt.name': 'COQUETEO LOCAL',
    'resident.camirada.name': 'CAMIRADA',
    'resident.camirada.desc': 'SHOWS PRIVADOS CON BELLAS ESPAÑOLAS!',
    'resident.jerkmate-cams.name': 'JERKMATE',
    'resident.jerkmate-cams.desc': 'CÁMARAS EN VIVO. PRUÉBALO GRATIS.',
    'resident.myfreecams.name': 'MYFREECAMS',
    'resident.myfreecams.desc': 'COMUNIDAD GRATUITA DE CAM EN VIVO.',
    'resident.ole.name': 'OLÉ',
    'resident.ole.desc': 'Modelos españolas y latinas',
    'resident.sweepsex.name': 'Sweepsex',
    'resident.sweepsex.desc': 'Exclusive Freemium\nAdult Webcam',
    'resident.imlive.name': "I'm Live",
    'resident.imlive.desc': '100+ NICHOS Y SUB-NICHOS',
    'resident.sweepsex-gay.name': 'GAY CAMS',
    'resident.sweepsex-gay.desc': 'Exclusive Freemium\nAdult Webcam',
    'resident.sweepsex-trans.name': 'TRANS CAMS',
    'resident.sweepsex-trans.desc': 'Exclusive Freemium\nAdult Webcam',
    'resident.girlfriendgpt.name': 'NOVIA GPT',
    'resident.candy-ai-male.name': 'CANDY AI MASCULINO',
    'resident.darlink-ai.name': 'DARLINK IA',
    'resident.fanvue-amber.name': 'AMBER SANTORI',
    'resident.sofia-storme.name': 'SOFIA STORME',
    'resident.fanvue-talia.name': 'TALIA ROSE',
    'resident.fanvue-mila.name': 'MILA LERUE',
    'resident.bellesa-plus.name': 'BELLESA PLUS',
    'resident.sextpanther.name': 'SEXT PANTHER',
    'resident.faphouse.name': 'FAPHOUSE',
    'resident.manga-rpg.name': 'MANGA RPG',
    'resident.comix-harem-1.name': 'COMIX HAREM',
    'resident.comix-harem-2.name': 'COMIX HAREM',
    'resident.trans-offer.name': 'TRANS PORNSTAR HAREM',
    'resident.xlovegay-cams.name': 'XLOVEGAY CAMS',
    'resident.royal-cams.name': 'ROYAL CAMS',
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
    'resident.royal-cams.desc':
      'CÁMARAS EN VIVO.\nSIN LÍMITES.',
    'resident.dirty-dating.name': 'DIRTY DATING',
    'resident.smok.name': 'SMOKE AND POKE',
    'resident.vescina-pasionales.name': 'VESCINA PASIONALES',
    'resident.vescina-pasionales.desc': 'LATAM DATING',
    'resident.sexymeet.name': 'Sexymeet.tv',
    'resident.dateplayer2-unique.name': 'DATEPLAYER2',
    'resident.dateplayer2-unique.desc': 'GEEK DATING MADE EASY!',
    'resident.x-game-hub.name': 'X Game Hub',
    'resident.x-game-hub.desc': 'COMPAÑERO DE JUEGOS DIGITAL',
    'resident.oopsie.name': 'Oopsie',
    'resident.oopsie.desc': 'SITUACIONES ESCANDALOSAS',
    'resident.cozy.name': 'COZY',
    'resident.cozy.desc': 'ADULTOS MADUROS ENCUENTRAN COMPAÑÍA',
    'resident.instabang-latinas.name': 'INSTABANG LATINAS',
    'resident.instabang-latinas.desc': 'HOOKUP & TRADE NAKED SELFIES',
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