import { useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import StatusBar from './components/StatusBar';
import PencilCursor from './components/PencilCursor';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import { useActiveSection } from './hooks/useActiveSection';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useViewport } from './hooks/useViewport';
import type { Section } from './hooks/useActiveSection';

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useViewport();
  const dividerMargin = isMobile ? 16 : isTablet ? 24 : 40;
  const isCompactLayout = isTablet;
  const active = useActiveSection(scrollRef, isCompactLayout);
  const scrollProgress = useScrollProgress(scrollRef);

  useEffect(() => {
    const root = document.getElementById('root');

    document.documentElement.style.overflow = isCompactLayout ? 'auto' : 'hidden';
    document.body.style.overflow = isCompactLayout ? 'auto' : 'hidden';
    document.documentElement.style.height = isCompactLayout ? 'auto' : '100%';
    document.body.style.height = isCompactLayout ? 'auto' : '100%';

    if (root) {
      root.style.height = isCompactLayout ? 'auto' : '100%';
      root.style.minHeight = isCompactLayout ? '100dvh' : '0';
    }

    return () => {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';

      if (root) {
        root.style.height = '100%';
        root.style.minHeight = '0';
      }
    };
  }, [isCompactLayout]);

  const scrollTo = (id: Section) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (isCompactLayout) {
      const y = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: y, behavior: 'smooth' });
      return;
    }

    if (scrollRef.current) {
      const top = el.offsetTop;
      scrollRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (isCompactLayout) {
    return (
      <>
        <PencilCursor />
        <div style={{ minHeight: '100dvh', background: '#FAFAF7' }}>
          <Sidebar active={active} onNav={scrollTo} scrollProgress={scrollProgress} />

          <main>
            <About />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Experience />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Projects />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Skills />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Education />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Achievements />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Contact />
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <PencilCursor />
      <div
        style={{
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          width: '100%',
          height: '100dvh',
          overflow: 'hidden',
          background: '#FAFAF7',
        }}
      >
        <Sidebar active={active} onNav={scrollTo} scrollProgress={scrollProgress} />

        {/* Right panel */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Scrollable content */}
          <div
            ref={scrollRef}
            style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}
          >
            <About />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Experience />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Projects />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Skills />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Education />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Achievements />
            <div style={{ height: 1, background: '#E8E4DC', margin: `0 ${dividerMargin}px` }} />
            <Contact />
          </div>

          <StatusBar active={active} />
        </div>
      </div>
    </>
  );
}
