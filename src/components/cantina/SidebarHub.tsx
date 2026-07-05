'use client';

import { DISTRICTS, type District } from '@/data/rooms';
import { useLang } from '@/lib/i18n';

interface SidebarHubProps {
  activeDistrict: string;
  onDistrictChange: (id: string) => void;
  onBackToHub: () => void;
}

export function SidebarHub({ activeDistrict, onDistrictChange, onBackToHub }: SidebarHubProps) {
  const { t } = useLang();

  return (
    <nav className="sidebar-hub">
      <div className="sidebar-brand">
        <span className="sidebar-brand-name">Cantina</span>
        <span className="sidebar-brand-sub">Virtual</span>
      </div>

      <div className="sidebar-divider" />

      {/* Back to Hub */}
      <button className="sidebar-back-hub" onClick={onBackToHub}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        <span>{t.backToHub}</span>
      </button>

      <div className="sidebar-divider" />

      <ul className="sidebar-nav">
        {DISTRICTS.map((district: District) => {
          const isActive = activeDistrict === district.id;
          return (
            <li key={district.id}>
              <button
                onClick={() => onDistrictChange(district.id)}
                className={`sidebar-item${isActive ? ' active' : ''}`}
                style={{
                  '--district-color': district.textColor,
                } as React.CSSProperties}
              >
                <span
                  className="sidebar-dot"
                  style={{
                    background: isActive ? district.textColor : 'var(--text-dim)',
                    boxShadow: isActive ? `0 0 8px ${district.borderColor}` : 'none',
                  }}
                />
                <span className="sidebar-item-name">
                  {t[`district.${district.id}.name`] || district.name}
                </span>
                <span className="sidebar-item-sub">{district.subtitle}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-divider" />
        <p className="sidebar-footer-text">{t.sidebarFooter}</p>
      </div>
    </nav>
  );
}