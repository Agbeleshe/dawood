import type { ReactNode } from 'react';
import { useDesktopDuty } from '../hooks/useDesktopDuty';
import { MobileBlocked } from './MobileBlocked';

export function DesktopGate({ children }: { children: ReactNode }) {
  const desktop = useDesktopDuty();
  if (!desktop) return <MobileBlocked />;
  return children;
}
