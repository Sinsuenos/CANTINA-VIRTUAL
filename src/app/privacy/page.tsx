'use client';

import { LegalPage } from '@/components/cantina/LegalPage';

export default function PrivacyPage() {
  return (
    <LegalPage
      titleEn="Privacy Policy"
      titleEs="Política de Privacidad"
      en={[
        'Cantina Virtual respects your privacy. This Privacy Policy explains how information may be handled when you use our website and related services.',
        'Cantina Virtual may collect information you voluntarily provide, such as contact information submitted through forms, and limited technical information needed to operate, secure, and improve the website.',
        'The website may use cookies and similar technologies for essential functionality, preferences, analytics, and site improvement. Where required, users can manage their cookie choices through the site controls.',
        'Cantina Virtual does not sell your personal information. Information may be shared with service providers only when reasonably necessary to operate the website, provide requested services, maintain security, comply with law, or protect users and the platform.',
        'Cantina Virtual may use third-party services and links. Those services have their own privacy policies and terms, and Cantina Virtual is not responsible for their independent privacy practices.',
        'Pinterest API data: if you authorize a Pinterest connection to Cantina Virtual, the application may access Pinterest account, Pin, and Board data only to provide the functionality you authorize. Pinterest data will not be sold or used for unrelated purposes. You may revoke access through your Pinterest account settings.',
        'For questions about privacy or requests concerning your information, please contact us:',
        'sinaloainspireddreams@gmail.com',
      ]}
      es={[
        'Cantina Virtual respeta su privacidad. Esta Política de Privacidad explica cómo puede manejarse la información cuando utiliza nuestro sitio web y servicios relacionados.',
        'Cantina Virtual puede recopilar información que usted proporcione voluntariamente, como datos de contacto enviados mediante formularios, y cierta información técnica necesaria para operar, proteger y mejorar el sitio web.',
        'El sitio puede utilizar cookies y tecnologías similares para funciones esenciales, preferencias, análisis y mejoras del sitio. Cuando sea necesario, los usuarios pueden gestionar sus opciones de cookies mediante los controles del sitio.',
        'Cantina Virtual no vende su información personal. La información puede compartirse con proveedores de servicios únicamente cuando sea razonablemente necesario para operar el sitio, prestar servicios solicitados, mantener la seguridad, cumplir con la ley o proteger a los usuarios y la plataforma.',
        'Cantina Virtual puede utilizar servicios y enlaces de terceros. Dichos servicios tienen sus propias políticas de privacidad y términos, y Cantina Virtual no es responsable de sus prácticas independientes de privacidad.',
        'Datos de la API de Pinterest: si autoriza una conexión de Pinterest con Cantina Virtual, la aplicación puede acceder a datos de la cuenta, Pines y Tableros de Pinterest únicamente para proporcionar la funcionalidad que usted autorice. Los datos de Pinterest no se venderán ni utilizarán para fines no relacionados. Puede revocar el acceso desde la configuración de su cuenta de Pinterest.',
        'Para preguntas sobre privacidad o solicitudes relacionadas con su información, contáctenos:',
        'sinaloainspireddreams@gmail.com',
      ]}
    />
  );
}
