'use client';

/* ═══════════════════════════════════════════════════════════════
   Footer — site-wide compliance footer
   ═══════════════════════════════════════════════════════════════

   Rendered in layout.tsx so it appears on EVERY page:
   landing, hub, wings, legal pages, etc.

   BFCache fix: listens for `pageshow` event (fires on back/forward
   navigation including BFCache restores) and forces a re-render via
   reloadKey state increment. This ensures the footer remains visible
   when returning to a page via the browser Back button.
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
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // Sync with sessionStorage (set by the main app's LangProvider)
    const syncLang = () => {
      const savedLang = sessionStorage.getItem('cv_lang');
      if (savedLang === 'en' || savedLang === 'es') {
        setLang(savedLang);
      }
    };
    syncLang();

    // BFCache fix: when the page is restored from back-forward cache,
    // the pageshow event fires with persisted=true. Force a re-render
    // so the footer (which may have been detached by the browser) is
    // guaranteed to be visible.
    const handlePageShow = (event: PageTransitionEvent) => {
      // Always re-sync lang + bump reloadKey on pageshow (covers both
      // BFCache restores and normal navigations).
      syncLang();
      setReloadKey((k) => k + 1);
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const t = FOOTER_STRINGS[lang];

  return (
    <footer className="site-footer" key={reloadKey}>
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
