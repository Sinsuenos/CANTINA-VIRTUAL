'use client';

import { LegalPage } from '@/components/cantina/LegalPage';

export default function ContactPage() {
  return (
    <LegalPage
      titleEn="Contact"
      titleEs="Contacto"
      en={[
        'Welcome to Cantina Virtual.',
        'We are happy to hear from you. Whether you have questions, need support, want to discuss a business inquiry, or are a creator interested in collaboration, we welcome your message.',
        'Reach us at:',
        'sinaloainspireddreams@gmail.com',
        'We do our best to respond within 72 hours.',
      ]}
      es={[
        'Bienvenido a Cantina Virtual.',
        'Estamos felices de escucharte. Ya sea que tengas preguntas, necesites soporte, quieras discutir una propuesta de negocios o seas un creador interesado en colaborar, te damos la bienvenida.',
        'Escr\u00edbenos a:',
        'sinaloainspireddreams@gmail.com',
        'Hacemos nuestro mejor esfuerzo por responder en 72 horas o menos.',
      ]}
    />
  );
}