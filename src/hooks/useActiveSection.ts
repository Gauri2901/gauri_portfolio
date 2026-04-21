import { useEffect, useState } from 'react';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact'] as const;
export type Section = typeof SECTIONS[number];

export function useActiveSection(): Section {
  const [active, setActive] = useState<Section>('about');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
