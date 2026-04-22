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

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        // fontWeight: 600,
        color: '#BA7517',
        background: '#fcf8f0',
        borderRadius: 3,
        padding: '0 5px',
      }}
    >
      {children}
    </span>
  );
}

function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M2 7 C3 5, 5 4, 6 7 C7 9, 10 4, 12 3" stroke="#EF9F27" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

const EXPERIENCE = [
  {
    num: '01',
    company: 'ApexaIQ Technologies',
    role: 'Software Engineer',
    dates: 'Aug 2024 – Present',
    location: 'Shegoan, Maharashtra',
    bullets: [
      <>Built <Highlight>reusable UI components</Highlight> with Vue.js and Vuetify for consistent, scalable interfaces across enterprise client platforms.</>,
      <>Engineered REST APIs using <Highlight>Node.js, Express.js, and PostgreSQL</Highlight>, handling <Highlight>5M+ records</Highlight> via indexing, partitioning, and query optimization.</>,
      <>Developed an export and upload feature supporting <Highlight>5+ file formats</Highlight>, reducing manual data operations across the platform.</>,
      <>Built a customizable <Highlight>dashboard platform</Highlight> with <Highlight>widget-based layouts</Highlight>, dashboard cloning, and custom query-based metrics for real-time IT infrastructure and compliance visibility.</>,
      <>Optimized database performance using <Highlight>Sequelize ORM and SQL</Highlight>, eliminating redundant queries and reducing response times under high load.</>,
      <>Integrated <Highlight>AI APIs</Highlight> to automate 3+ repetitive processes; implemented end-to-end test coverage across key modules, improving release reliability.</>,
      <>Resolved <Highlight>80+ critical bugs</Highlight> across frontend and backend, reducing production incident rate by <Highlight>30%</Highlight>.</>,
    ],
  },
  {
    num: '02',
    company: 'ApexaIQ Technologies - Remote',
    role: 'Software Engineer Intern',
    dates: 'Jan 2024 – Mar 2024',
    location: 'Milford, USA',
        bullets: [
      <>Built <Highlight>web scraping</Highlight> pipelines using <Highlight>Selenium and Python</Highlight> to extract structured data from external sources for internal research.</>,
      <>Led UX decisions for <Highlight>3 product flows</Highlight>; created wireframes and prototypes in <Highlight>Figma</Highlight>, improving experience across core features.</>,
      <>Delivered <Highlight>POC presentations</Highlight> to mentors covering research, architecture, and design proposals.</>,
      <>Built <Highlight>10+ reusable UI components</Highlight> using Vue.js and Vuetify for the final year industry project.</>,
    ],
  },
];

export default function Experience() {
  const { isMobile, isTablet } = useViewport();
  const showTimeline = !isMobile;

  return (
    <section id="experience" style={{ padding: isMobile ? '32px 16px 48px' : isTablet ? '36px 24px 52px' : '40px 40px 60px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // work history
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500, color: '#2C2C2A' }}>
            experience
          </h2>
        </div>
      </AnimatedSection>

      <div style={{ position: 'relative', paddingLeft: showTimeline ? 52 : 0 }}>
        {/* Vertical timeline line */}
        {showTimeline && (
          <div
            style={{
              position: 'absolute',
              left: 32,
              top: 0,
              bottom: 0,
              width: 1,
              background: '#E8E4DC',
            }}
          />
        )}

        {EXPERIENCE.map((exp, idx) => (
          <AnimatedSection key={exp.num} delay={idx * 0.15}>
            <div style={{ position: 'relative', marginBottom: 40 }}>
              {/* Line number gutter */}
              {showTimeline && (
                <div
                  style={{
                    position: 'absolute',
                    left: -42,
                    top: 6,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#888780',
                    userSelect: 'none',
                  }}
                >
                  {exp.num}
                </div>
              )}

              {/* Timeline dot */}
              {showTimeline && (
                <div
                  style={{
                    position: 'absolute',
                    left: -22,
                    top: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#EF9F27',
                    border: '2px solid #F3F0E8',
                  }}
                />
              )}

              <div
                style={{
                  background: '#FAFAF7',
                  border: '1px solid #E8E4DC',
                  borderRadius: 8,
                  padding: isMobile ? '18px 16px' : '20px 24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#2C2C2A',
                        marginBottom: 3,
                      }}
                    >
                      {exp.role}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#888780',
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 4 }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: '#888780',
                      }}
                    >
                      {exp.dates}
                    </div>
                    {!showTimeline && (
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: '#888780',
                        }}
                      >
                        #{exp.num}
                      </div>
                    )}
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: '#888780',
                        background: '#F3F0E8',
                        border: '1px solid #E8E4DC',
                        borderRadius: 4,
                        padding: '2px 8px',
                      }}
                    >
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {exp.bullets.map((bullet, bi) => (
                    <li
                      key={bi}
                      style={{
                        display: 'flex',
                        gap: 8,
                        alignItems: 'flex-start',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        color: '#2C2C2A',
                      }}
                    >
                      <CheckMark />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
