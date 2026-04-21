import { useEffect, useState } from 'react';

export function useScrollProgress(scrollRef: React.RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) {
      const handler = () => {
        const scrollTop = window.scrollY;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? scrollTop / max : 0);
      };

      handler();
      window.addEventListener('scroll', handler, { passive: true });
      window.addEventListener('resize', handler, { passive: true });

      return () => {
        window.removeEventListener('scroll', handler);
        window.removeEventListener('resize', handler);
      };
    }

    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };

    handler();
    el.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler, { passive: true });

    return () => {
      el.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [scrollRef]);

  return progress;
}
