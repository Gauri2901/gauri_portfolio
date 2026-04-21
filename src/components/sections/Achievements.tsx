import { Check, Mic, Users } from 'lucide-react';
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

export default function Achievements() {
  const { isMobile, isTablet } = useViewport();

  return (
    <section id="achievements" style={{ padding: isMobile ? '36px 16px 48px' : isTablet ? '40px 24px 52px' : '44px 40px 66px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // leadership & initiatives
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 24 : 28, fontWeight: 500, color: '#2C2C2A' }}>
            achievements
          </h2>
        </div>
      </AnimatedSection>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : 'minmax(320px, 0.95fr) minmax(320px, 1.05fr)',
          gap: 22,
          alignItems: 'stretch',
        }}
      >
        <AnimatedSection delay={0.1}>
          <article
            style={{
              minHeight: 280,
              background: '#FAFAF7',
              border: '1px solid #E8E4DC',
              borderRadius: 12,
              boxShadow: '2px 2px 0 #E8E4DC',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #E8E4DC',
                background: '#F3F0E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#2C2C2A' }}>
                recruitment.checklist
              </span>
              <Users size={18} strokeWidth={1.6} color="#888780" />
            </div>

            <div style={{ padding: isMobile ? '18px 16px' : '22px 24px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#888780', marginBottom: 8 }}>
                // ApexaIQ Technologies
              </div>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 19, fontWeight: 500, color: '#2C2C2A', marginBottom: 18 }}>
                Intern Recruitment Lead
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {[
                  'Led internship recruitment for 3rd and final year candidates',
                  'Conducted technical interviews and shortlisted candidates',
                  'Onboarded and mentored interns into real project work with team',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        border: '1px solid #E8E4DC',
                        background: '#F3F0E8',
                        color: '#BA7517',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check size={13} strokeWidth={2} />
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.55, color: '#5C574F' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <article
            style={{
              minHeight: 280,
              background: '#FAFAF7',
              border: '1px solid #E8E4DC',
              borderRadius: 12,
              boxShadow: '2px 2px 0 #E8E4DC',
              position: 'relative',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '82px 1fr',
            }}
          >
            <div
              style={{
                background: '#F3F0E8',
                borderRight: isMobile ? 'none' : '1px dashed #D8D1C6',
                borderBottom: isMobile ? '1px dashed #D8D1C6' : 'none',
                color: '#2C2C2A',
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14,
                position: 'relative',
                padding: isMobile ? '14px 16px' : 0,
              }}
            >
              {!isMobile && [24, 68, 112, 156, 200, 244].map((top) => (
                <span
                  key={top}
                  style={{
                    position: 'absolute',
                    right: -7,
                    top,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: '#FAFAF7',
                    border: '1px solid #E8E4DC',
                  }}
                />
              ))}
              <Mic size={25} strokeWidth={1.7} color="#BA7517" />
              <span
                style={{
                  writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl',
                  transform: isMobile ? 'none' : 'rotate(180deg)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#888780',
                  letterSpacing: '0.12em',
                }}
              >
                EVENT PASS
              </span>
            </div>

            <div style={{ padding: isMobile ? '18px 16px' : '24px 26px', background: '#FAFAF7' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '5px 9px',
                  borderRadius: 999,
                  background: '#F3F0E8',
                  border: '1px solid #E8E4DC',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#665F55',
                  marginBottom: 16,
                }}
              >
                Pursuit 2023 · SSGMCE
              </div>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: '#2C2C2A', marginBottom: 12 }}>
                Workshop Conductor
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#5C574F', marginBottom: 18 }}>
                Conducted a hands-on UI/UX workshop covering design principles, wireframing, and prototyping fundamentals.
              </p>
              <div
                style={{
                  borderTop: '1px dashed #D8D1C6',
                  paddingTop: 14,
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                {['ui/ux', 'wireframes', 'prototyping'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      padding: '4px 8px',
                      borderRadius: 5,
                      background: '#F3F0E8',
                      border: '1px solid #E8E4DC',
                      color: '#665F55',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </AnimatedSection>
      </div>
    </section>
  );
}
