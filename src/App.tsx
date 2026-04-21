import { useRef } from 'react';
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
import type { Section } from './hooks/useActiveSection';

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection();
  const scrollProgress = useScrollProgress(scrollRef);

  const scrollTo = (id: Section) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      const top = el.offsetTop;
      scrollRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <PencilCursor />
      <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: '#FAFAF7' }}>
        <Sidebar active={active} onNav={scrollTo} scrollProgress={scrollProgress} />

        {/* Right panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Scrollable content */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}
          >
            <About />
            <div style={{ height: 1, background: '#E8E4DC', margin: '0 40px' }} />
            <Experience />
            <div style={{ height: 1, background: '#E8E4DC', margin: '0 40px' }} />
            <Projects />
            <div style={{ height: 1, background: '#E8E4DC', margin: '0 40px' }} />
            <Skills />
            <div style={{ height: 1, background: '#E8E4DC', margin: '0 40px' }} />
            <Education />
            <div style={{ height: 1, background: '#E8E4DC', margin: '0 40px' }} />
            <Achievements />
            <div style={{ height: 1, background: '#E8E4DC', margin: '0 40px' }} />
            <Contact />
          </div>

          <StatusBar active={active} />
        </div>
      </div>
    </>
  );
}
