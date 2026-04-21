import { useEffect, useState } from 'react';

export function useScrollProgress(scrollRef: React.RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [scrollRef]);

  return progress;
}
