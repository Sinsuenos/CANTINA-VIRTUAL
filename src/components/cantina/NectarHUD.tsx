'use client';

import { useLang } from '@/lib/i18n';

export function NectarHUD() {
  const { t } = useLang();

  return (
    <div className="sidebar-nectar">
      <span className="sidebar-nectar-icon">🍯</span>
      <div className="sidebar-nectar-text">
        <span className="sidebar-nectar-label">{t.nectarTitle}</span>
        <span className="sidebar-nectar-count">{t.nectarComingSoon}</span>
      </div>
    </div>
  );
}