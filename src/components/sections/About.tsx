import { useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useViewport } from '../../hooks/useViewport';

const FULL_NAME = 'Gauri Sanjay Borle';

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com/in/gauriborle', label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/gauriborle',     label: 'GitHub' },
  { icon: Mail,     href: 'mailto:gauriborle1002@gmail.com',   label: 'Email' },
];

const TERMINAL_LINES = [
  { text: 'const gauri = {',              color: '#2C2C2A' },
  { text: '  role: "engineer + artist",', color: '#888780' },
  { text: '  loves: ["systems", "craft"],',color: '#888780' },
  { text: '  building: "v2.0 of self",',  color: '#888780' },
  { text: '};',                           color: '#2C2C2A' },
  { text: '',                             color: '' },
  { text: '// ships fast. ships pretty.', color: '#1D9E75' },
];

function TypewriterName() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < FULL_NAME.length) { setText(FULL_NAME.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, 60);
    const cursorInterval = setInterval(() => setShowCursor(c => !c), 530);
    return () => { clearInterval(interval); clearInterval(cursorInterval); };
  }, []);

  return (
    <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 500, color: '#2C2C2A', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 18 }}>
      {text}
      <span style={{ color: '#EF9F27', opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s', marginLeft: 2 }}>|</span>
    </h1>
  );
}

function WobblyUnderline() {
  const pathRef = useRef<SVGPathElement>(null);
  const { ref, inView } = useInView(0.5);
  const { isMobile } = useViewport();

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !inView) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });
  }, [inView]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ position: 'relative', display: 'inline-block', marginBottom: 28 }}>
      <em style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 17 : 20, fontStyle: 'italic', color: '#2C2C2A', fontWeight: 400 }}>
        i build things that work &amp; things that feel.
      </em>
      <svg style={{ position: 'absolute', bottom: -6, left: 0, width: '100%', height: 10, overflow: 'visible' }} viewBox="0 0 300 10" preserveAspectRatio="none">
        <path ref={pathRef} d="M0 6 C20 3, 40 9, 60 5 C80 2, 100 8, 120 5 C140 2, 160 8, 180 5 C200 2, 220 8, 240 5 C260 2, 280 8, 300 5" stroke="#EF9F27" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FloatingTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const currentLine = TERMINAL_LINES[visibleLines].text;
    if (charCount < currentLine.length) {
      const t = setTimeout(() => setCharCount(c => c + 1), 38);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines(v => v + 1);
        setCharCount(0);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [visibleLines, charCount]);

  return (
    <div style={{ animation: 'termFloat 4s ease-in-out infinite', flexShrink: 0 }}>
      <style>{`
        @keyframes termFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div style={{
        width: 300,
        background: '#FAFAF7',
        border: '1.5px solid #2C2C2A',
        borderRadius: 10,
        boxShadow: '5px 5px 0 #2C2C2A',
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
      }}>
        {/* ── Title bar ── */}
        <div style={{
          background: '#2C2C2A',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}>
          {(['#EF9F27', '#1D9E75', '#E8E4DC'] as const).map((c, i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ marginLeft: 8, color: '#888780', fontSize: 11 }}>~/gauri/portfolio</span>
        </div>

        {/* ── Code body ── */}
        <div style={{ padding: '16px 18px', minHeight: 162 }}>
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ color: line.color, lineHeight: 1.9, whiteSpace: 'pre' }}>
              {line.text}
            </div>
          ))}

          {visibleLines < TERMINAL_LINES.length && (
            <div style={{ color: TERMINAL_LINES[visibleLines].color, lineHeight: 1.9, whiteSpace: 'pre' }}>
              {TERMINAL_LINES[visibleLines].text.slice(0, charCount)}
              <span style={{ animation: 'termBlink 0.8s step-end infinite', color: '#EF9F27' }}>▋</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Amber accent line below ── */}
      <div style={{
        height: 3,
        background: 'linear-gradient(to right, #EF9F27, transparent)',
        marginTop: 10,
        borderRadius: 2,
        width: '60%',
        marginLeft: 'auto',
        marginRight: 18,
      }} />
    </div>
  );
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const { isMobile, isTablet } = useViewport();

  return (
    <section
      id="about"
      style={{
        // ── More breathing room on the left for desktop ──
        padding: isMobile
          ? '32px 18px 48px'
          : isTablet
          ? '40px 28px 56px'
          : '64px 48px 70px 56px',
      }}
    >
      {/* ── Mobile / tablet: big profile photo at top ── */}
      {isTablet && (
        <AnimatedSection>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <div
              style={{
                width: isMobile ? 110 : 140,
                height: isMobile ? 110 : 140,
                borderRadius: '50%',
                border: '3px solid #EF9F27',
                overflow: 'hidden',
                background: '#E8E4DC',
                marginBottom: 16,
              }}
            >
              <img
                src="/profilepic.jpeg"
                alt="Gauri Borle"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '60% 20%',
                  transform: 'scale(1.9) translate(8px, -2px)',
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: isMobile ? 17 : 20, color: '#2C2C2A', letterSpacing: '-0.02em' }}>
                Gauri Borle
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 13 : 14, color: '#888780', marginTop: 4 }}>
                Software Engineer
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#888780', marginTop: 4 }}>
                // Malkapur, Maharashtra
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 14 }}>
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #E8E4DC', background: '#FAFAF7', color: '#888780', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '1px 1px 0 #E8E4DC', textDecoration: 'none', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#EF9F27'; e.currentTarget.style.borderColor = '#EF9F27'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#888780'; e.currentTarget.style.borderColor = '#E8E4DC'; }}
                  >
                    <Icon size={16} strokeWidth={1.7} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: '#E8E4DC', marginBottom: 32 }} />
        </AnimatedSection>
      )}

      {/* ── Main content row ── */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 56, alignItems: 'center' }}>

        {/* Left: text content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatedSection>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#1D9E75', marginBottom: isMobile ? 18 : 22, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: '#1D9E75' }} />
              available for opportunities
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}><TypewriterName /></AnimatedSection>
          <AnimatedSection delay={0.2}><WobblyUnderline /></AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 15 : 17, lineHeight: 1.8, color: '#2C2C2A', marginBottom: isMobile ? 24 : 30, maxWidth: 700 }}>
              Software engineer at <strong>ApexaIQ Technologies</strong>, Shegaon, building dashboards, APIs, and and systems that scale across millions of records.
              I bring an artist’s eye into engineering — creating interfaces that are clear, intuitive, and feel right to use.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, padding: isMobile ? '11px 18px' : '11px 24px', borderRadius: 6, border: 'none', background: '#2C2C2A', color: '#FAFAF7', cursor: 'pointer', transition: 'all 0.2s ease', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EF9F27'; e.currentTarget.style.color = '#2C2C2A'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2C2C2A'; e.currentTarget.style.color = '#FAFAF7'; }}
              >
                explore cv →
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, padding: isMobile ? '11px 18px' : '11px 24px', borderRadius: 6, border: '1.5px solid #2C2C2A', background: 'transparent', color: '#2C2C2A', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF9F27'; e.currentTarget.style.color = '#BA7517'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2C2C2A'; e.currentTarget.style.color = '#2C2C2A'; }}
              >
                say hello
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Right: floating terminal — desktop only */}
        {!isTablet && (
          <AnimatedSection delay={0.25}>
            <FloatingTerminal />
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}