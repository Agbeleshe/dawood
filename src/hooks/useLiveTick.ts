import { useEffect } from 'react';
import { useCommand } from '../store';

/** Advance live vehicle positions on the map every ~1.8s */
export function useLiveTick() {
  const tick = useCommand((s) => s.tick);
  useEffect(() => {
    const id = window.setInterval(tick, 1800);
    return () => window.clearInterval(id);
  }, [tick]);
}
