import { useState } from 'react';
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

function TornEdge({ color }: { color: string }) {
  return (
    <svg
      style={{ display: 'block', width: '100%' }}
      height="14"
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
    >
      <path
        d={`M0 14 L0 8 C20 4, 30 12, 50 7 C70 2, 85 10, 100 6 C115 2, 130 11, 150 7 C170 3, 185 10, 200 6 C215 2, 230 11, 250 7 C270 3, 285 10, 300 8 L300 14Z`}
        fill={color}
      />
    </svg>
  );
}

const PROJECTS = [
  {
    name: 'Art-Case',
    desc: 'Full-stack art marketplace with gallery browsing, order management, and secure payments.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Razorpay'],
    links: { github: 'https://github.com/gauriborle', live: '#' },
    img: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600&h=280&fit=crop',
  },
  {
    name: 'Freelance Sites',
    desc: 'Portfolio websites for 3 non-technical clients — translating requirements into clean, responsive interfaces.',
    tech: ['React', 'HTML/CSS', 'JavaScript', 'Figma'],
    links: { github: 'https://github.com/gauriborle', live: '#' },
    img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600&h=280&fit=crop',
  },
];

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1.5px solid ${hovered ? '#EF9F27' : '#E8E4DC'}`,
          borderRadius: 10,
          overflow: 'hidden',
          background: '#FAFAF7',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.2s ease',
          boxShadow: hovered ? '0 6px 20px rgba(239,159,39,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Torn page top edge */}
        <TornEdge color="#F3F0E8" />

        {/* Image area */}
        <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
          <img
            src={project.img}
            alt={project.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
          />
          {/* Overlay with view project on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(44,44,42,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#FAFAF7',
                transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                transition: 'transform 0.2s ease',
              }}
            >
              view project →
            </span>
          </div>
        </div>

        <div style={{ padding: '16px 18px' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 500,
              color: '#2C2C2A',
              marginBottom: 6,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: '#888780',
              lineHeight: 1.5,
              marginBottom: 12,
            }}
          >
            {project.desc}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  padding: '2px 7px',
                  background: '#F3F0E8',
                  border: '1px solid #E8E4DC',
                  borderRadius: 3,
                  color: '#888780',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#888780',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2C2C2A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888780')}
            >
              github →
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '40px 40px 60px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // things I built
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, color: '#2C2C2A' }}>
            projects
          </h2>
        </div>
      </AnimatedSection>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} delay={i * 0.1} />
        ))}
      </div>

      {/* Art-Case extra details */}
      <AnimatedSection delay={0.3}>
        <div
          style={{
            marginTop: 24,
            padding: '20px 24px',
            background: '#F3F0E8',
            border: '1px solid #E8E4DC',
            borderRadius: 8,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 500,
              color: '#2C2C2A',
              marginBottom: 10,
            }}
          >
            Art-Case — highlights
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Custom artwork request workflow — users submit requirements, admin sets final price, payment link auto-dispatched via email with order confirmation & PDF invoice.',
              'Full-featured Admin Dashboard with Role-Based Access Control covering order tracking, artwork CRUD operations, activity logs, and customization request management.',
              'Razorpay payment gateway integration for secure transactions.',
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: '#2C2C2A',
                  lineHeight: 1.6,
                  paddingLeft: 14,
                  position: 'relative',
                }}
              >
                <span style={{ position: 'absolute', left: 0, color: '#EF9F27' }}>·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </section>
  );
}
