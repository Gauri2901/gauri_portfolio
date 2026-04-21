import { useInView } from '../../hooks/useInView';

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
        background: '#FEF3DC',
        color: '#BA7517',
        borderRadius: 3,
        padding: '0 5px',
        fontWeight: 500,
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
    location: 'Shegoan, MH',
    bullets: [
      <>Designed interactive dashboards and reusable UI components using <Highlight>Vue.js and Vuetify</Highlight>, enabling real-time visibility into IT infrastructure, compliance, and security metrics.</>,
      <>Engineered scalable REST APIs using Node.js, Express.js, and PostgreSQL, handling <Highlight>5M+ records</Highlight> via indexing, partitioning, and query optimization.</>,
      <>Developed a dynamic export and upload feature supporting multiple file formats, reducing manual data operations.</>,
      <>Optimized database performance with <Highlight>Sequelize ORM and SQL</Highlight>, eliminating redundant queries and reducing response times under high load.</>,
      <>Integrated AI capabilities into core platform workflows to automate repetitive processes; implemented end-to-end test cases across key modules.</>,
      <>Diagnosed and resolved <Highlight>80+ critical bugs</Highlight> across frontend and backend systems, improving platform stability.</>,
    ],
  },
  {
    num: '02',
    company: 'ApexaIQ Technologies',
    role: 'Software Engineer Intern',
    dates: 'Jan 2024 – Mar 2024',
    location: 'Remote',
    bullets: [
      <>Developed web scraping pipelines using <Highlight>Selenium and Python</Highlight> to extract and process structured data from external sources for internal research use.</>,
      <>Contributed to UX design decisions and assisted in creating wireframes and prototypes to improve user experience across key product flows.</>,
      <>Designed and delivered Proof-of-Concept (POC) presentations to mentors, covering research, architecture, and design proposals.</>,
      <>Built and maintained reusable UI components and responsive interfaces using Vue.js and Vuetify for final year industry project.</>,
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '40px 40px 60px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // work history
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, color: '#2C2C2A' }}>
            experience
          </h2>
        </div>
      </AnimatedSection>

      <div style={{ position: 'relative', paddingLeft: 52 }}>
        {/* Vertical timeline line */}
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

        {EXPERIENCE.map((exp, idx) => (
          <AnimatedSection key={exp.num} delay={idx * 0.15}>
            <div style={{ position: 'relative', marginBottom: 40 }}>
              {/* Line number gutter */}
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

              {/* Timeline dot */}
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

              <div
                style={{
                  background: '#FAFAF7',
                  border: '1px solid #E8E4DC',
                  borderRadius: 8,
                  padding: '20px 24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
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
                        fontSize: 15,
                        fontWeight: 500,
                        color: '#2C2C2A',
                        marginBottom: 3,
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: '#888780',
                      }}
                    >
                      {exp.role}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: '#888780',
                      }}
                    >
                      {exp.dates}
                    </div>
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
                        fontSize: 13,
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
