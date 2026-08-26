'use client';

import { useState, useCallback, useEffect, startTransition } from 'react';
import { LangProvider } from '@/lib/i18n';
import { NectarProvider } from '@/lib/nectar-engine';
import type { Lang } from '@/lib/i18n';

/* ═══════════════════════════════════════════════════════════════
   Providers — application-level client context wrappers
   ═══════════════════════════════════════════════════════════════

   LangProvider and NectarProvider live here so they are
   available to ALL pages (root, wing routes, legal pages).
   Previously these were scoped to page.tsx only.

   Lang state is persisted to sessionStorage (per-tab).
   Nectar state is persisted to localStorage (per-browser, via
   its own internal hooks). Both are SSR-safe.
   ═══════════════════════════════════════════════════════════════ */

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  /* ── Hydrate lang from sessionStorage on client mount ── */
  useEffect(() => {
    const savedLang = sessionStorage.getItem('cv_lang');
    if (savedLang === 'en' || savedLang === 'es') {
      startTransition(() => setLang(savedLang));
    }
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'es' : 'en';
      sessionStorage.setItem('cv_lang', next);
      return next;
    });
  }, []);

  return (
    <LangProvider lang={lang} onToggleLang={handleToggleLang}>
      <NectarProvider>
        {children}
      </NectarProvider>
    </LangProvider>
  );
}
