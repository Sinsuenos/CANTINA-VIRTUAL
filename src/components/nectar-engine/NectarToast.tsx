'use client';

/* ═══════════════════════════════════════════════════════════════
   NectarToast — brief notification when Nectar is earned
   ═══════════════════════════════════════════════════════════════

   Slides in near the PointsWidget, auto-dismisses after 3 seconds.
   Does NOT block navigation or cover offer cards.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';

export interface NectarToastData {
  id: number;
  points: number;
  wingName: string;
  isComplete?: boolean;
}

interface NectarToastProps {
  toast: NectarToastData | null;
  onDismiss: () => void;
}

export function NectarToast({ toast, onDismiss }: NectarToastProps) {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      // Trigger enter animation on next frame
      requestAnimationFrame(() => setVisible(true));
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 300); // wait for exit animation
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- conditional reset when toast becomes null; required for exit animation cleanup.
      setVisible(false);
    }
  }, [toast, onDismiss]);

  if (!toast) return null;

  const message = toast.isComplete
    ? t.nectarToastComplete
    : t.nectarToastEarned
        .replace('{points}', String(toast.points))
        .replace('{wing}', toast.wingName);

  return (
    <div
      className={`nectar-toast${visible ? ' visible' : ''}${toast.isComplete ? ' complete' : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="nectar-toast-icon" aria-hidden="true">🦋</span>
      <span className="nectar-toast-text">{message}</span>
    </div>
  );
}
