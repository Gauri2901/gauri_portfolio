import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

const FULL_NAME = 'Gauri Sanjay Borle';

function TypewriterName() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < FULL_NAME.length) {
        setText(FULL_NAME.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    const cursorInterval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <h1
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(34px, 5vw, 56px)',
        fontWeight: 500,
        color: '#2C2C2A',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        marginBottom: 18,
      }}
    >
      {text}
      <span
        style={{
          color: '#EF9F27',
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s',
          marginLeft: 2,
        }}
      >
        |
      </span>
    </h1>
  );
}

function WobblyUnderline() {
  const pathRef = useRef<SVGPathElement>(null);
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !inView) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = '0';
    });
  }, [inView]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ position: 'relative', display: 'inline-block', marginBottom: 28 }}>
      <em
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 20,
          fontStyle: 'italic',
          color: '#2C2C2A',
          fontWeight: 400,
        }}
      >
        i build things that work &amp; things that feel.
      </em>
      <svg
        style={{ position: 'absolute', bottom: -6, left: 0, width: '100%', height: 10, overflow: 'visible' }}
        viewBox="0 0 300 10"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0 6 C20 3, 40 9, 60 5 C80 2, 100 8, 120 5 C140 2, 160 8, 180 5 C200 2, 220 8, 240 5 C260 2, 280 8, 300 5"
          stroke="#EF9F27"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function SelfPortrait() {
  return (
    <svg width="220" height="260" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M170 20 L180 15 M175 30 L185 25 M165 35 L178 32" stroke="#E8E4DC" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 200 L15 210 M30 215 L25 225 M10 220 L18 228" stroke="#E8E4DC" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="100" cy="100" r="55" stroke="#2C2C2A" strokeWidth="1.5" fill="#FEF9EF"/>
      <path d="M50 90 C55 55, 80 45, 100 45 C120 45, 145 55, 150 90 L148 80 C140 50, 120 38, 100 38 C80 38, 60 50, 52 80Z" fill="#2C2C2A"/>
      <rect x="76" y="88" width="14" height="10" rx="5" fill="#2C2C2A"/>
      <rect x="110" y="88" width="14" height="10" rx="5" fill="#2C2C2A"/>
      <circle cx="82" cy="92" r="2" fill="#FAFAF7"/>
      <circle cx="116" cy="92" r="2" fill="#FAFAF7"/>
      <path d="M98 100 L96 112 L100 115 L104 112 L102 100" stroke="#2C2C2A" strokeWidth="1" fill="none"/>
      <path d="M86 122 C90 128, 110 128, 114 122" stroke="#2C2C2A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="72" y="155" width="56" height="60" rx="4" fill="#F3F0E8" stroke="#2C2C2A" strokeWidth="1.5"/>
      <rect x="90" y="148" width="20" height="14" fill="#FEF9EF" stroke="#2C2C2A" strokeWidth="1"/>
      <rect x="80" y="168" width="40" height="18" rx="3" fill="#2C2C2A"/>
      <text x="84" y="180" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#EF9F27">&lt;/dev+art&gt;</text>
      <path d="M18 80 C22 75, 30 78, 28 85" stroke="#EF9F27" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M172 150 C178 145, 184 148, 182 155" stroke="#EF9F27" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="28" cy="60" r="3" fill="none" stroke="#E8E4DC" strokeWidth="1.5"/>
      <circle cx="172" cy="180" r="3" fill="none" stroke="#E8E4DC" strokeWidth="1.5"/>
      <path d="M155 35 L157 30 L159 35 L164 35 L160 38 L162 43 L157 40 L152 43 L154 38 L150 35Z" fill="#EF9F27" opacity="0.5"/>
    </svg>
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
  return (
    <section id="about" style={{ padding: '64px 40px 70px' }}>
      <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatedSection>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#1D9E75',
                marginBottom: 22,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: '#1D9E75',
                }}
              />
              available for opportunities
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <TypewriterName />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <WobblyUnderline />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                lineHeight: 1.8,
                color: '#2C2C2A',
                marginBottom: 30,
                maxWidth: 650,
              }}
            >
              Software engineer at <strong>ApexaIQ Technologies</strong>, Shegaon, designing dashboards,
              REST APIs, and scalable systems that handle <strong>5M+ records</strong>. I also bring an
              artist's eye into product work, so the interfaces I build are not just functional, but clear,
              thoughtful, and comfortable to use.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  padding: '11px 24px',
                  borderRadius: 6,
                  border: 'none',
                  background: '#2C2C2A',
                  color: '#FAFAF7',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#EF9F27';
                  e.currentTarget.style.color = '#2C2C2A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2C2C2A';
                  e.currentTarget.style.color = '#FAFAF7';
                }}
              >
                explore cv →
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  padding: '11px 24px',
                  borderRadius: 6,
                  border: '1.5px solid #2C2C2A',
                  background: 'transparent',
                  color: '#2C2C2A',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#EF9F27';
                  e.currentTarget.style.color = '#BA7517';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2C2C2A';
                  e.currentTarget.style.color = '#2C2C2A';
                }}
              >
                say hello
              </button>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SelfPortrait />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
