import { useEffect, useRef, useState } from 'react';
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

function SkillChip({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = lineRef.current;
    if (!path) return;
    if (hovered) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = 'stroke-dashoffset 0.3s ease';
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0';
      });
    } else {
      path.style.strokeDashoffset = path.getTotalLength().toString();
    }
  }, [hovered]);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', margin: '4px 4px 4px 0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          display: 'inline-block',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          padding: '4px 10px',
          background: '#F3F0E8',
          border: `1px solid ${hovered ? '#EF9F27' : '#E8E4DC'}`,
          borderRadius: 4,
          color: hovered ? '#BA7517' : '#2C2C2A',
          transition: 'all 0.15s ease',
          cursor: 'default',
        }}
      >
        {label}
      </span>
      <svg
        style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', overflow: 'visible' }}
        height="8"
        viewBox="0 0 60 8"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M2 5 C10 3, 20 7, 30 5 C40 3, 50 7, 58 5"
          stroke="#EF9F27"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
        />
      </svg>
    </div>
  );
}

function BracketGroup({ title, skills, delay }: { title: string; skills: string[]; delay: number }) {
  const { ref, inView } = useInView(0.1);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !inView) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.transition = `stroke-dashoffset 0.6s ease ${delay}s`;
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = '0';
    });
  }, [inView, delay]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}s`,
        display: 'flex',
        gap: 16,
        marginBottom: 28,
        alignItems: 'flex-start',
      }}
    >
      {/* SVG bracket */}
      <svg width="16" height="80" viewBox="0 0 16 80" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
        <path
          ref={pathRef}
          d="M14 2 L8 2 C5 2, 2 5, 2 8 L2 36 C2 39, 2 41, 2 40 L2 44 C2 43, 2 45, 2 48 L2 72 C2 75, 5 78, 8 78 L14 78"
          stroke="#EF9F27"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
        />
      </svg>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 500,
            color: '#2C2C2A',
            marginBottom: 10,
          }}
        >
          {title}
        </div>
        <div>
          {skills.map((s) => (
            <SkillChip key={s} label={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SKILL_GROUPS = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    title: 'Frontend',
    skills: ['Vue.js', 'Vuetify', 'React', 'Figma', 'Responsive Design'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Sequelize', 'REST APIs'],
  },
  {
    title: 'Concepts',
    skills: ['System Design', 'UX/UI', 'OOPs', 'DBMS', 'OS', 'Linux', 'Git', 'Web Scraping'],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '40px 40px 60px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // what I know
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 500, color: '#2C2C2A' }}>
            skills
          </h2>
        </div>
      </AnimatedSection>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
        {SKILL_GROUPS.map((group, i) => (
          <BracketGroup key={group.title} title={group.title} skills={group.skills} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
