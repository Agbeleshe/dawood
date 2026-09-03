import { useEffect, useState } from 'react';

const MQ = '(min-width: 1024px)';

function readDesktop() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(MQ).matches;
}

export function useDesktopDuty() {
  const [desktop, setDesktop] = useState(readDesktop);

  useEffect(() => {
    const mq = window.matchMedia(MQ);
    const onChange = () => setDesktop(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return desktop;
}
