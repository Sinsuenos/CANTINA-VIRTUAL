'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DISTRICTS } from '@/data/rooms';
import { useLang } from '@/lib/i18n';
import { MariposaCenterpiece } from '@/components/cantina/MariposaCenterpiece';
import { SmokeParticles } from '@/components/cantina/SmokeParticles';
import { SidebarHub } from '@/components/cantina/SidebarHub';
import { DistrictScene } from '@/components/cantina/DistrictScene';
import { PassportModal, NectarToast, type NectarToastData } from '@/components/nectar-engine';
import { useNectarEngine } from '@/lib/nectar-engine';
import { hasCelebrated, markCelebrated } from '@/lib/nectar-engine/store';
import { trackWingView } from '@/lib/ga4';
import { ID_TO_SLUG } from '@/lib/wing-routes';

/* ═══════════════════════════════════════════════════════════════
   WingPage — full wing view with sidebar, cards, nectar integration
   ═══════════════════════════════════════════════════════════════

   Extracted from page.tsx. Uses Next.js router for navigation
   instead of window.history.pushState fake-SPA navigation.

   Props:
   - districtId: the internal district ID (e.g. 'dating', 'gaming')
   ═══════════════════════════════════════════════════════════════ */

export function WingPage({ districtId }: { districtId: string }) {
  const router = useRouter();
  const { t } = useLang();
  const { visit, allQuestsComplete, config, questStatus, state } = useNectarEngine();

  const [activeDistrict, setActiveDistrict] = useState(districtId);
  const [displayedDistrict, setDisplayedDistrict] = useState(districtId);
  const [transitioning, setTransitioning] = useState(false);
  const [toast, setToast] = useState<NectarToastData | null>(null);
  const [showPassport, setShowPassport] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  /* ── On mount: register wing visit for this district ── */
  useEffect(() => {
    const awarded = visit(districtId);
    trackWingView(districtId);
    if (awarded) {
      const district = DISTRICTS.find((d) => d.id === districtId);
      const wingName = district ? (t[`district.${districtId}.name`] || district.name) : districtId;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount toast; visit() is idempotent and setToast is conditional on first-visit award.
      setToast({ id: Date.now(), points: 10, wingName });
    }
  }, []);

  /* ── When all 8 wings complete, show PassportModal ONCE per browser ── */
  useEffect(() => {
    if (allQuestsComplete && !hasCelebrated()) {
      setTimeout(() => setShowPassport(true), 1500);
    }
  }, [allQuestsComplete]);

  /* ── Return to Hub from PassportModal ── */
  const handleReturnToHub = useCallback(() => {
    markCelebrated();
    setShowPassport(false);
    router.push('/');
  }, [router]);

  /* ── Navigate to a different wing via sidebar ── */
  const handleDistrictChange = useCallback(
    (id: string) => {
      if (id === activeDistrict || transitioning) return;

      const main = mainRef.current;
      if (main) {
        setTransitioning(true);
        main.classList.add('scene-exit');
        setTimeout(() => {
          setActiveDistrict(id);
          setDisplayedDistrict(id);
          main.classList.remove('scene-exit');
          main.classList.add('scene-transition');
          setTransitioning(false);
          setTimeout(() => main.classList.remove('scene-transition'), 800);

          /* ── Register Nectar visit + GA4 wing_view ── */
          trackWingView(id);
          const awarded = visit(id);
          if (awarded) {
            const district = DISTRICTS.find((d) => d.id === id);
            const wingName = district ? (t[`district.${id}.name`] || district.name) : id;
            setToast({
              id: Date.now(),
              points: 10,
              wingName,
              isComplete: config.sections.every((s) =>
                s.id === id ? true : questStatus[s.id]
              ),
            });
          }

          /* ── Update browser URL to the new wing's public slug ── */
          const slug = ID_TO_SLUG[id] || id;
          router.replace(`/${slug}`, { scroll: false });
        }, 500);
      } else {
        /* No main ref — navigate immediately */
        setActiveDistrict(id);
        setDisplayedDistrict(id);
        trackWingView(id);
        const awarded = visit(id);
        if (awarded) {
          const district = DISTRICTS.find((d) => d.id === id);
          const wingName = district ? (t[`district.${id}.name`] || district.name) : id;
          setToast({
            id: Date.now(),
            points: 10,
            wingName,
            isComplete: config.sections.every((s) =>
              s.id === id ? true : questStatus[s.id]
            ),
          });
        }
        const slug = ID_TO_SLUG[id] || id;
        router.replace(`/${slug}`, { scroll: false });
      }
    },
    [activeDistrict, transitioning, visit, t, config.sections, questStatus, router],
  );

  /* ── Back to Hub ── */
  const handleBackToHub = useCallback(() => {
    router.push('/');
  }, [router]);

  const district = DISTRICTS.find((d) => d.id === displayedDistrict);

  return (
    <div className="cantina-layout">
      <SidebarHub
        activeDistrict={activeDistrict}
        onDistrictChange={handleDistrictChange}
        onBackToHub={handleBackToHub}
        onViewPassport={() => setShowPassport(true)}
      />

      <main ref={mainRef} className="cantina-main scene-transition">
        <button className="mobile-back-hub" onClick={handleBackToHub} aria-label="Back to Hub">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          className="mariposa"
          style={{ top: '12%', right: '8%', color: '#ff69b4' }}
        >
          <span className="mariposa-wing">🦋</span>
        </div>
        <div
          className="mariposa"
          style={{ top: '35%', left: '5%', color: '#ff69b4', animationDelay: '-3s' }}
        >
          <span className="mariposa-wing" style={{ animationDelay: '-0.2s' }}>
            🦋
          </span>
        </div>

        {district && <DistrictScene district={district} />}

        <SmokeParticles />

        {/* GeneratePorn.ai cross-promo banner - all wings except ai-porn-gen */}
        {activeDistrict !== 'ai-porn-gen' && (
          <a
            href="https://t.vlmai-5.com/413627/10512/43094?aff_sub=AI&aff_sub2=GEN&aff_sub3=GOLFO&aff_sub4=SUENOS&aff_sub5=NOCTURNO&source=CANTINA"
            target="_blank"
            rel="noopener noreferrer"
            className="promo-gp-banner no-underline"
          >
            <img src="/generateporn-logo.svg" alt="" className="promo-gp-logo" />
            <div className="promo-gp-center">
              <span className="promo-gp-title">GENERATEPORN.AI</span>
              <span className="promo-gp-sub">48 FREE CREDITS &middot; NO CARD REQUIRED</span>
            </div>
            <img src="/generateporn-logo.svg" alt="" className="promo-gp-logo promo-gp-logo-flip" />
          </a>
        )}

        {/* Black/gold promo buttons — site-wide, all wings */}
        <div className="promo-btns-stack">
          <a
            href="https://cantina-casita-total-offers.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="promo-btn-gold"
          >
            🔥 All Affiliate Offers 70+ »
          </a>
          <a
            href="https://sinaloa-suenos-ai-reviews.carrd.co"
            target="_blank"
            rel="noopener noreferrer"
            className="promo-btn-gold"
          >
            🤖 AI Companion Reviews »
          </a>
        </div>

        {/* Nectar status — live points + future opportunities */}
        <div className="district-nectar-teaser">
          <div className="nectar-teaser-content">
            <div className="nectar-teaser-header">
              <span className="nectar-hud-icon">🦋</span>
              <span
                className="nectar-teaser-title"
                style={{ color: 'var(--amber)' }}
              >
                {t.nectarPointsLabel} · {state.totalPoints} {t.nectarPointsUnit}
              </span>
              <span
                className="nectar-teaser-soon"
                style={{ color: 'var(--amber)', opacity: 0.7 }}
              >
                {config.sections.filter((s) => questStatus[s.id]).length}/{config.sections.length} {t.nectarProgress}
              </span>
            </div>
            <p className="nectar-teaser-intro" style={{ color: 'var(--text-muted)' }}>
              {t.nectarFutureIntro}
            </p>
            <p className="nectar-teaser-list" style={{ color: 'var(--text-dim)' }}>
              {t.nectarFutureList}
            </p>
          </div>
        </div>
      </main>

      {/* Nectar toast */}
      <NectarToast toast={toast} onDismiss={() => setToast(null)} />

      {/* PassportModal */}
      {showPassport && (
        <PassportModal onReturnToHub={handleReturnToHub} />
      )}
    </div>
  );
}
