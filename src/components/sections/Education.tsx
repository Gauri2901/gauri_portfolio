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

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L9.5 6.5H14L10.5 9L12 13.5L8 11L4 13.5L5.5 9L2 6.5H6.5Z" fill="#EF9F27" stroke="#BA7517" strokeWidth="0.5"/>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="6" r="3" stroke="#2C2C2A" strokeWidth="1.5"/>
      <circle cx="13" cy="6" r="3" stroke="#888780" strokeWidth="1.5"/>
      <path d="M1 17 C1 13, 4 11, 7 11 C10 11, 13 13, 13 17" stroke="#2C2C2A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M13 12 C16 12, 19 14, 19 17" stroke="#888780" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="7" y="1" width="6" height="10" rx="3" stroke="#2C2C2A" strokeWidth="1.5"/>
      <path d="M3 9 C3 14, 7 17, 10 17 C13 17, 17 14, 17 9" stroke="#2C2C2A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M10 17 L10 19 M8 19 L12 19" stroke="#2C2C2A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const ACHIEVEMENTS = [
  {
    title: 'Intern Recruitment Lead',
    org: 'ApexaIQ Technologies',
    desc: 'Spearheaded internship program for 3rd and final year students — independently handling candidate screening, technical interviews, and onboarding. Mentored interns.',
    icon: <PeopleIcon />,
    rotation: -1.5,
  },
  {
    title: 'Workshop Conductor',
    org: 'Pursuit 2023 · SSGMCE',
    desc: 'Conducted a hands-on UI/UX design workshop at the annual college technical fest, guiding students through design principles, wireframing, and prototyping fundamentals.',
    icon: <MicIcon />,
    rotation: 1.2,
  },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '40px 40px 60px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // background
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, color: '#2C2C2A' }}>
            education & achievements
          </h2>
        </div>
      </AnimatedSection>

      {/* Education sticky-note card */}
      <AnimatedSection delay={0.1}>
        <div
          style={{
            background: '#FFFDF4',
            borderRadius: '0 8px 8px 0',
            border: '1px solid #E8E4DC',
            borderLeft: '3px solid #EF9F27',
            padding: '20px 24px',
            marginBottom: 32,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#888780',
              marginBottom: 6,
              letterSpacing: '0.05em',
            }}
          >
            // education
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 500,
              color: '#2C2C2A',
              marginBottom: 4,
            }}
          >
            Shri Sant Gajanan Maharaj College of Engineering
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#2C2C2A', marginBottom: 8 }}>
            Bachelor of Technology — Information Technology
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}
          >
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#888780' }}>
              Aug 2020 – May 2024 · Shegoan, Maharashtra
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                fontWeight: 500,
                color: '#2C2C2A',
              }}
            >
              CGPA <span style={{ color: '#EF9F27', marginLeft: 4 }}>9.0</span>
              <StarIcon />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Achievements stamps */}
      <AnimatedSection delay={0.2}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#888780',
            marginBottom: 16,
          }}
        >
          // achievements
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.title}
              style={{
                background: '#FAFAF7',
                border: '2px solid #2C2C2A',
                borderRadius: 8,
                padding: '18px 20px',
                transform: `rotate(${ach.rotation}deg)`,
                boxShadow: '2px 2px 0 #2C2C2A',
                position: 'relative',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = `rotate(${ach.rotation}deg)`;
              }}
            >
              <div style={{ marginBottom: 10, color: '#EF9F27' }}>{ach.icon}</div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#2C2C2A',
                  marginBottom: 4,
                }}
              >
                {ach.title}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#888780',
                  marginBottom: 8,
                }}
              >
                {ach.org}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: '#888780',
                  lineHeight: 1.5,
                }}
              >
                {ach.desc}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
