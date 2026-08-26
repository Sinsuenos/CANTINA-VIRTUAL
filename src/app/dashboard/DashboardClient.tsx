'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLang } from '@/lib/i18n';

/* ═══════════════════════════════════════════════════════════════
   DashboardClient — Christopher's private control room
   ═══════════════════════════════════════════════════════════════

   ACCESS PROTECTION:
   This dashboard is protected by a simple PIN gate.
   The PIN is: cv2025

   SECURITY ASSESSMENT:
   - The route is NOT linked from any public navigation (sidebar, hub, footer)
   - It has noindex/norobots meta tags
   - It is excluded from the sitemap
   - The PIN gate prevents casual browsing
   - However, the PIN is hardcoded in client-side JavaScript.
     A determined developer could find it in the bundled code.
   - This is appropriate for a personal control room where the
     primary threat is casual visitors, not targeted attacks.
   - For stronger protection, a server-side middleware with
     HTTP Basic Auth or a proper auth system would be needed.

   DATA INTEGRITY:
   - All revenue defaults to $0.00
   - Click data is tracked in localStorage per-browser
   - No demo/seed/fake data exists anywhere
   - No database — this is 100% client-side
   ═══════════════════════════════════════════════════════════════ */

const DASHBOARD_PIN = 'cv2025';
const STORAGE_KEY = 'cv_dash_auth';
const CLICKS_KEY = 'cv_dash_clicks';

interface ClickRecord {
  ts: number;
  offerId: string;
  wingId: string;
}

type TimeRange = 'today' | 'yesterday' | '7d' | '14d' | '30d' | 'quarter' | '365d' | 'all';

const TIME_RANGES: { key: TimeRange; label: string; labelEs: string }[] = [
  { key: 'today', label: 'Today', labelEs: 'Hoy' },
  { key: 'yesterday', label: 'Previous Day', labelEs: 'Dia anterior' },
  { key: '7d', label: '7 Days', labelEs: '7 dias' },
  { key: '14d', label: '14 Days', labelEs: '14 dias' },
  { key: '30d', label: '30 Days', labelEs: '30 dias' },
  { key: 'quarter', label: 'This Quarter', labelEs: 'Este trimestre' },
  { key: '365d', label: '365 Days', labelEs: '365 dias' },
  { key: 'all', label: 'All Time', labelEs: 'Todo el tiempo' },
];

function getTimeRangeBounds(range: TimeRange): { start: number; end: number } {
  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  switch (range) {
    case 'today':
      return { start: startOfDay.getTime(), end: endOfDay.getTime() };
    case 'yesterday': {
      const yStart = new Date(startOfDay.getTime() - 86400000);
      const yEnd = new Date(startOfDay.getTime() - 1);
      return { start: yStart.getTime(), end: yEnd.getTime() };
    }
    case '7d':
      return { start: now.getTime() - 7 * 86400000, end: now.getTime() };
    case '14d':
      return { start: now.getTime() - 14 * 86400000, end: now.getTime() };
    case '30d':
      return { start: now.getTime() - 30 * 86400000, end: now.getTime() };
    case 'quarter': {
      const qMonth = Math.floor(now.getMonth() / 3) * 3;
      const qStart = new Date(now.getFullYear(), qMonth, 1, 0, 0, 0, 0);
      return { start: qStart.getTime(), end: now.getTime() };
    }
    case '365d':
      return { start: now.getTime() - 365 * 86400000, end: now.getTime() };
    case 'all':
      return { start: 0, end: now.getTime() };
  }
}

function loadClicks(): ClickRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CLICKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function DashboardClient() {
  const { lang } = useLang();
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [range, setRange] = useState<TimeRange>('30d');
  const [clicks] = useState<ClickRecord[]>(() => loadClicks());

  /* Check session on mount */
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe hydration.
      setAuthenticated(true);
    }
  }, []);

  const handlePinSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (pin === DASHBOARD_PIN) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  }, [pin]);

  /* Filter clicks by time range */
  const filteredClicks = useMemo(() => {
    const { start, end } = getTimeRangeBounds(range);
    return clicks.filter((c) => c.ts >= start && c.ts <= end);
  }, [clicks, range]);

  /* Aggregate by wing */
  const wingBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of filteredClicks) {
      map[c.wingId] = (map[c.wingId] || 0) + 1;
    }
    return map;
  }, [filteredClicks]);

  /* Aggregate by offer */
  const offerBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of filteredClicks) {
      const key = `${c.offerId} (${c.wingId})`;
      map[key] = (map[key] || 0) + 1;
    }
    return map;
  }, [filteredClicks]);

  /* ── PIN Gate ── */
  if (!authenticated) {
    return (
      <div className="dashboard-gate">
        <div className="dashboard-gate-card">
          <h1 className="dashboard-gate-title">CONTROL ROOM</h1>
          <p className="dashboard-gate-subtitle">Cantina Virtual</p>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              inputMode="numeric"
              maxLength={10}
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false); }}
              className="dashboard-pin-input"
              placeholder="PIN"
              autoFocus
            />
            {pinError && (
              <p className="dashboard-pin-error">Incorrect PIN</p>
            )}
            <button type="submit" className="dashboard-pin-btn">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  const isEs = lang === 'es';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          CONTROL ROOM
        </h1>
        <p className="dashboard-subtitle">Cantina Virtual — Revenue Dashboard</p>
      </div>

      {/* Time Range Selector */}
      <div className="dashboard-filters">
        {TIME_RANGES.map((tr) => (
          <button
            key={tr.key}
            className={`dashboard-filter-btn${range === tr.key ? ' active' : ''}`}
            onClick={() => setRange(tr.key)}
          >
            {isEs ? tr.labelEs : tr.label}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="dashboard-metrics">
        <div className="dashboard-metric">
          <span className="dashboard-metric-value">$0.00</span>
          <span className="dashboard-metric-label">Total Revenue</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-value">0</span>
          <span className="dashboard-metric-label">Sales</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-value">{filteredClicks.length}</span>
          <span className="dashboard-metric-label">Clicks</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-value">$0.00</span>
          <span className="dashboard-metric-label">Affiliate Revenue</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-value">$0.00</span>
          <span className="dashboard-metric-label">Gumroad Revenue</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-value">$0.00</span>
          <span className="dashboard-metric-label">CrakRevenue Revenue</span>
        </div>
        <div className="dashboard-metric">
          <span className="dashboard-metric-value">$0.00</span>
          <span className="dashboard-metric-label">FansRevenue Revenue</span>
        </div>
      </div>

      {/* Click Breakdown by Wing */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Clicks by Wing</h2>
        {Object.keys(wingBreakdown).length > 0 ? (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Wing</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(wingBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([wing, count]) => (
                    <tr key={wing}>
                      <td>{wing}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="dashboard-empty">No data recorded for this period.</p>
        )}
      </div>

      {/* Click Breakdown by Offer */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Clicks by Offer</h2>
        {Object.keys(offerBreakdown).length > 0 ? (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Offer</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(offerBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([offer, count]) => (
                    <tr key={offer}>
                      <td>{offer}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="dashboard-empty">No data recorded for this period.</p>
        )}
      </div>

      {/* Data Source Legend */}
      <div className="dashboard-legend">
        <h3 className="dashboard-legend-title">Data Sources</h3>
        <ul className="dashboard-legend-list">
          <li><strong>Clicks:</strong> Tracked client-side via localStorage ({isEs ? 'datos del navegador actual' : 'current browser data only'})</li>
          <li><strong>Revenue / Sales:</strong> {isEs ? 'Sin datos importados' : 'No imported data'}. {isEs ? 'Todo empieza en $0.00' : 'Everything starts at $0.00'}.</li>
          <li><strong>Affiliate Revenue:</strong> {isEs ? 'Requiere integracion con CrakRevenue/Gumroad/FansRevenue API' : 'Requires CrakRevenue/Gumroad/FansRevenue API integration'}</li>
        </ul>
        <p className="dashboard-legend-note">
          {isEs
            ? 'Los datos de clics se pierden si se limpia el almacenamiento del navegador. Para reportes persistentes, se necesita una base de datos del lado del servidor.'
            : 'Click data is lost if browser storage is cleared. For persistent reporting, server-side database integration is needed.'}
        </p>
      </div>
    </div>
  );
}
