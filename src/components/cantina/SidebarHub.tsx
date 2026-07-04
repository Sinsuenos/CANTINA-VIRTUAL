'use client';

import { DISTRICTS, type District } from '@/data/rooms';

interface SidebarHubProps {
  activeDistrict: string;
  onDistrictChange: (id: string) => void;
}

export function SidebarHub({ activeDistrict, onDistrictChange }: SidebarHubProps) {
  return (
    <nav className="sidebar-hub">
      <div className="sidebar-brand">
        <span className="sidebar-brand-name">Cantina</span>
        <span className="sidebar-brand-sub">Virtual</span>
      </div>

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
                <span className="sidebar-item-name">{district.name}</span>
                <span className="sidebar-item-sub">{district.subtitle}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-divider" />
        <p className="sidebar-footer-text">Pacific coast. After dark.</p>
      </div>
    </nav>
  );
}