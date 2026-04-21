import { useEffect, useRef, useState } from 'react';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'education', 'achievements', 'contact'] as const;
export type Section = typeof SECTIONS[number];

export function useActiveSection(
  scrollRef?: React.RefObject<HTMLElement>,
  useWindowScroll = true
): [Section, (id: Section) => void] {
  const [active, setActive] = useState<Section>('about');
  const clickLock = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const root = useWindowScroll ? null : scrollRef?.current ?? null;

    const getSections = () =>
      SECTIONS.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      }).filter((item): item is { id: Section; el: HTMLElement } => item !== null);

    const updateActive = () => {
      if (clickLock.current) return;

      const sections = getSections();
      if (sections.length === 0) return;

      const activationOffset = root ? 120 : 140;
      const rootTop = root ? root.getBoundingClientRect().top : 0;
      const viewportHeight = root ? root.clientHeight : window.innerHeight;
      const scrollEl = root ?? document.documentElement;

      // If scrolled to very bottom of page, always pick last section
      const atBottom =
        Math.abs(scrollEl.scrollHeight - scrollEl.scrollTop - viewportHeight) < 8;
      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      let nextActive = sections[0].id;
      for (const section of sections) {
        const relativeTop = section.el.getBoundingClientRect().top - rootTop;
        if (relativeTop <= activationOffset) {
          nextActive = section.id;
        } else {
          break;
        }
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

  const scrollToSection = (id: Section) => {
    setActive(id); // highlight immediately on click
    clickLock.current = true;
    if (lockTimer.current) clearTimeout(lockTimer.current);

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Release lock after smooth scroll settles (~950ms)
    lockTimer.current = setTimeout(() => {
      clickLock.current = false;
    }, 950);
  };

  return [active, scrollToSection];
}