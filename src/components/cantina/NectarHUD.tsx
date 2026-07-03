'use client';

import { useState, useEffect } from 'react';

export function NectarHUD() {
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="nectar-hud">
      <span className="nectar-hud-icon">🍯</span>
      <span className="nectar-hud-label">Nectar</span>
      <span className={`nectar-hud-count${pulse ? ' pulse' : ''}`}>
        {count}
      </span>
    </div>
  );
}