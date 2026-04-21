import { useEffect, useState } from 'react';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact'] as const;
export type Section = typeof SECTIONS[number];

export function useActiveSection(scrollRef?: React.RefObject<HTMLElement>, useWindowScroll = true): Section {
  const [active, setActive] = useState<Section>('about');

  useEffect(() => {
    const root = useWindowScroll ? null : scrollRef?.current ?? null;

    const getSections = () =>
      SECTIONS.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      }).filter((item): item is { id: Section; el: HTMLElement } => item !== null);

    const updateActive = () => {
      const sections = getSections();
      if (sections.length === 0) return;

      const activationOffset = root ? 120 : 140;
      const rootTop = root ? root.getBoundingClientRect().top : 0;

      let nextActive = sections[0].id;

      for (const section of sections) {
        const relativeTop = section.el.getBoundingClientRect().top - rootTop;
        if (relativeTop <= activationOffset) {
          nextActive = section.id;
        } else {
          break;
        }
      }

      const lastSection = sections[sections.length - 1];
      const lastRect = lastSection.el.getBoundingClientRect();
      const viewportHeight = root ? root.clientHeight : window.innerHeight;

      if (lastRect.bottom - rootTop <= viewportHeight) {
        nextActive = lastSection.id;
      }

      setActive(nextActive);
    };

    updateActive();

    const scrollTarget: HTMLElement | Window = root ?? window;
    scrollTarget.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive, { passive: true });

    return () => {
      scrollTarget.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [scrollRef, useWindowScroll]);

  return active;
}
