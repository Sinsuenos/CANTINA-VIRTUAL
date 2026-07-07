'use client';

import { LegalPage } from '@/components/cantina/LegalPage';

export default function TermsPage() {
  return (
    <LegalPage
      titleEn="Terms"
      titleEs="T\u00e9rminos"
      en={[
        'By accessing and using Cantina Virtual, you confirm that you are at least 18 years of age.',
        'Cantina Virtual is an entertainment platform. All content is provided for informational and entertainment purposes only.',
        'Third-party offers and brands featured on this site remain the property of their respective owners. Cantina Virtual does not claim ownership of any third-party trademarks, logos, or content.',
        'Users are solely responsible for ensuring that their use of this site and any third-party services accessed through it complies with all applicable local, state, national, and international laws.',
        'External websites linked from Cantina Virtual operate under their own terms and policies. Cantina Virtual is not responsible for the content, terms, or practices of any linked external site.',
        'If you have any questions about these Terms, please contact us:',
        'sinaloainspireddreams@gmail.com',
      ]}
      es={[
        'Al acceder y utilizar Cantina Virtual, confirma que tiene al menos 18 a\u00f1os de edad.',
        'Cantina Virtual es una plataforma de entretenimiento. Todo el contenido se proporciona \u00fanicamente con fines informativos y de entretenimiento.',
        'Las ofertas y marcas de terceros que aparecen en este sitio son propiedad de sus respectivos propietarios. Cantina Virtual no reclama la propiedad de ninguna marca comercial, logotipo o contenido de terceros.',
        'Los usuarios son responsables de asegurarse de que su uso de este sitio y cualquier servicio de terceros accedido a trav\u00e9s del mismo cumpla con todas las leyes locales, estatales, nacionales e internacionales aplicables.',
        'Los sitios web externos vinculados desde Cantina Virtual operan bajo sus propios t\u00e9rminos y pol\u00edticas. Cantina Virtual no es responsable del contenido, los t\u00e9rminos o las pr\u00e1cticas de ning\u00fan sitio externo vinculado.',
        'Si tiene alguna pregunta sobre estos T\u00e9rminos, cont\u00e1ctenos:',
        'sinaloainspireddreams@gmail.com',
      ]}
    />
  );
}