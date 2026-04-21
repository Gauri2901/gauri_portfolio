import { Star } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useViewport } from '../../hooks/useViewport';

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

export default function Education() {
  const { isMobile, isTablet } = useViewport();

  return (
    <section id="education" style={{ padding: isMobile ? '36px 16px 48px' : isTablet ? '40px 24px 52px' : '44px 40px 64px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // academic background
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 24 : 28, fontWeight: 500, color: '#2C2C2A' }}>
            education
          </h2>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div
          style={{
            background: '#FAFAF7',
            borderRadius: '0 10px 10px 0',
            border: '1px solid #E8E4DC',
            borderLeft: '3px solid #E8E4DC',
            padding: isMobile ? '18px 16px' : '22px 26px',
            boxShadow: '2px 2px 0 #E8E4DC',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background: 'linear-gradient(180deg, rgba(239,159,39,0.18), rgba(239,159,39,0.04))',
              pointerEvents: 'none',
            }}
          />
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                right: 22,
                top: 18,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#888780',
              }}
            >
              education.note
            </div>
          )}

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#888780',
              marginBottom: 8,
              letterSpacing: '0.05em',
            }}
          >
            // degree
          </div>

          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 500,
              color: '#2C2C2A',
              marginBottom: 6,
            }}
          >
            Shri Sant Gajanan Maharaj College of Engineering
          </h3>

          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#2C2C2A', marginBottom: 12 }}>
            Bachelor of Technology — Information Technology
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#888780' }}>
              Aug 2020 - May 2024 · Shegaon, Maharashtra
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 11px',
                borderRadius: 8,
                background: '#F3F0E8',
                border: '1px solid #E8E4DC',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 500,
                color: '#2C2C2A',
              }}
            >
              CGPA <span style={{ color: '#2C2C2A', fontSize: 16 }}>9.0</span>
              <Star size={15} fill="#EF9F27" color="#BA7517" strokeWidth={1.4} />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
