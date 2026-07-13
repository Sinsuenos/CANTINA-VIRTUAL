'use client';

/* ═══════════════════════════════════════════════════════════════
   Footer — site-wide compliance footer + cookie consent bar
   ═══════════════════════════════════════════════════════════════

   Rendered in layout.tsx so it appears on EVERY page:
   landing, hub, wings, legal pages, etc.

   Cookie consent: a slim row inside the footer (above the
   compliance nav). Uses the same small-caps link style.
   Choice stored in localStorage — dismissed permanently.
   REJECT blocks GA4 for the session; ACCEPT allows tracking.

   BFCache fix: listens for `pageshow` event (fires on back/forward
   navigation including BFCache restores) and forces a re-render via
   reloadKey state increment. This ensures the footer remains visible
   when returning to a page via the browser Back button.
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from 'react';

type Lang = 'en' | 'es';

const FOOTER_STRINGS = {
  en: {
    adultsOnly: '18+ Adults Only',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    cookieNotice: 'This site uses cookies to improve your experience.',
    accept: 'Accept',
    reject: 'Reject',
  },
  es: {
    adultsOnly: 'Solo +18',
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto',
    cookieNotice: 'Este sitio usa cookies para mejorar tu experiencia.',
    accept: 'Aceptar',
    reject: 'Rechazar',
  },
};

const CONSENT_KEY = 'cv_cookie_consent';

export function Footer() {
  const [lang, setLang] = useState<Lang>('en');
  const [reloadKey, setReloadKey] = useState(0);
  const [showConsent, setShowConsent] = useState(false);

  const syncLang = useCallback(() => {
    const savedLang = sessionStorage.getItem('cv_lang');
    if (savedLang === 'en' || savedLang === 'es') {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    syncLang();

    // Check cookie consent state
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === null) {
      // No choice made yet — show the bar
      setShowConsent(true);
      // Auto-accept after 30 seconds if no action taken
      const timer = setTimeout(() => {
        if (localStorage.getItem(CONSENT_KEY) === null) {
          localStorage.setItem(CONSENT_KEY, 'accepted');
          setShowConsent(false);
        }
      }, 30000);
      return () => clearTimeout(timer);
    } else {
      // Choice already made — hide bar, sync GA4 window flag
      setShowConsent(false);
      if (typeof window !== 'undefined') {
        window.__cv_cookie_consent = consent;
      }
    }
  }, [syncLang]);

  const handlePageShow = useCallback((event: PageTransitionEvent) => {
    syncLang();
    setReloadKey((k) => k + 1);
  }, [syncLang]);

  useEffect(() => {
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [handlePageShow]);

  const handleConsent = useCallback((choice: 'accepted' | 'rejected') => {
    localStorage.setItem(CONSENT_KEY, choice);
    if (typeof window !== 'undefined') {
      window.__cv_cookie_consent = choice;
    }
    setShowConsent(false);
  }, []);

  const t = FOOTER_STRINGS[lang];

  return (
    <footer className="site-footer" key={reloadKey}>
      {/* Cookie consent row — appears above the compliance nav */}
      {showConsent && (
        <div className="site-footer-consent">
          <span className="site-footer-link">{t.cookieNotice}</span>
          <button
            type="button"
            className="site-footer-link site-footer-consent-btn"
            onClick={() => handleConsent('accepted')}
          >
            {t.accept}
          </button>
          <button
            type="button"
            className="site-footer-link site-footer-consent-btn"
            onClick={() => handleConsent('rejected')}
          >
            {t.reject}
          </button>
        </div>
      )}
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