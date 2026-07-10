'use client';

/* ═══════════════════════════════════════════════════════════════
   Footer — site-wide compliance footer
   ═══════════════════════════════════════════════════════════════

   Rendered in layout.tsx so it appears on EVERY page:
   landing, hub, wings, legal pages, etc.

   Uses useLang() for EN/ES strings. Falls back to sessionStorage
   if the LangProvider isn't available (e.g., on legal pages which
   use their own language state).
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';

type Lang = 'en' | 'es';

const FOOTER_STRINGS = {
  en: {
    adultsOnly: '18+ Adults Only',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
  },
  es: {
    adultsOnly: 'Solo +18',
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto',
  },
};

export function Footer() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    // Sync with sessionStorage (set by the main app's LangProvider)
    const savedLang = sessionStorage.getItem('cv_lang');
    if (savedLang === 'en' || savedLang === 'es') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe hydration: useState('en') gives deterministic server render, useEffect syncs from sessionStorage on client only. Lazy initializer would crash SSR (sessionStorage undefined on server).
      setLang(savedLang);
    }
  }, []);

  const t = FOOTER_STRINGS[lang];

  return (
    <footer className="site-footer">
      <nav className="site-footer-nav">
        <span className="site-footer-link site-footer-notice">{t.adultsOnly}</span>
        <a href="/dmca" className="site-footer-link">DMCA</a>
        <a href="/privacy" className="site-footer-link">{t.privacy}</a>
        <a href="/terms" className="site-footer-link">{t.terms}</a>
        <a href="/contact" className="site-footer-link">{t.contact}</a>
      </nav>
    </footer>
  );
}
