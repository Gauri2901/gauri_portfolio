import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
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

// ─── Types ────────────────────────────────────────────────────────────────────

type FreelancePanel = {
  label: string;
  icon: string;
  desc: string;
  details: string[];
  tech: string[];
  links: { github: string; live: string };
};

type FullProject = {
  type: 'full';
  name: string;
  eyebrow: string;
  desc: string;
  details: string[];
  tech: string[];
  links: { github: string; live: string };
  img: string;
};

type FreelanceProject = {
  type: 'freelance-split';
  name: string;
  eyebrow: string;
  panels: FreelancePanel[];
};

type Project = FullProject | FreelanceProject;

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    type: 'full',
    name: 'Art-Case',
    eyebrow: 'Custom artwork marketplace & request workflow',
    desc: 'A full-stack platform where users can request personalized artwork, track orders, and complete secure payments through a streamlined, admin-driven workflow.',
    details: [
      'Designed a custom request-to-order flow where users submit artwork requirements, admins finalize pricing, and payment links are automatically dispatched.',
      'Built a role-based admin dashboard for order tracking, artwork CRUD, activity logs, and customization request management.',
      'Integrated Razorpay for secure payments with automated order confirmations and PDF invoice generation.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Razorpay'],
    links: { github: 'https://github.com/gauriborle', live: 'https://art-case-frontend.vercel.app/' },
    img: '/art-case.png',
  },
  {
    type: 'freelance-split',
    name: 'Freelance Work',
    eyebrow: 'client projects',
    panels: [
      {
        label: 'Websites',
        icon: '⌘',
        desc: 'Built portfolio websites for non-technical clients, turning ideas into clean, responsive interfaces.',
        details: [
          'Translated client requirements into clear structure and user-friendly layouts.',
          'Developed responsive sites using React, HTML/CSS, and JavaScript.',
          'Delivered end-to-end solutions from concept to deployment.',
        ],
        tech: ['React', 'HTML/CSS', 'JavaScript', 'Figma'],
        links: { github: 'https://github.com/gauriborle', live: '#' },
      },
      {
        label: 'Prototypes',
        icon: '◈',
        desc: 'Created UI/UX prototypes to help clients visualize and validate ideas before development.',
        details: [
          'Designed wireframes and interactive prototypes in Figma.',
          'Refined user flows and interactions with client feedback.',
          'Reduced rework by aligning design early.',
        ],
        tech: ['Figma', 'Prototyping', 'UI/UX', 'Wireframing'],
        links: { github: 'https://github.com/gauriborle', live: '#' },
      },
    ],
  }
];

// ─── Freelance Split Card ──────────────────────────────────────────────────────

function FreelanceSplitCard({ project, index }: { project: FreelanceProject; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const { isMobile, isTablet } = useViewport();

  return (
    <AnimatedSection delay={index * 0.12}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1px solid ${hovered ? '#EF9F27' : '#E8E4DC'}`,
          borderRadius: 14,
          background: '#FAFAF7',
          overflow: 'hidden',
          boxShadow: hovered ? '3px 3px 0 #E8E4DC' : '1px 1px 0 #E8E4DC',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.2s ease',
          padding: isMobile ? '20px 16px' : isTablet ? '24px 22px' : '28px 30px',
        }}
      >
        {/* Top meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#BA7517',
            }}
          >
            // {project.eyebrow}
          </div>
          {/* <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#BA7517',
              background: '#FDF6E3',
              border: '1px solid #EDD9A3',
              borderRadius: 999,
              padding: '3px 10px',
            }}
          >
            0{index + 1} / selected work
          </div> */}
        </div>

        {/* Section title */}
        <h3
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isMobile ? 20 : 22,
            fontWeight: 500,
            color: '#2C2C2A',
            marginBottom: 16,
          }}
        >
          {project.name}
        </h3>

        {/* Two side-by-side panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 14,
          }}
        >
          {project.panels.map((panel, i) => (
            <div
              key={panel.label}
              onMouseEnter={() => setHoveredPanel(i)}
              onMouseLeave={() => setHoveredPanel(null)}
              style={{
                border: `1px solid ${hoveredPanel === i ? '#EF9F27' : '#E8E4DC'}`,
                borderRadius: 12,
                background: hoveredPanel === i ? '#FDFAF2' : '#fafaf6',
                padding: isMobile ? '20px 16px' : '26px 24px',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Panel header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 18,
                    color: '#EF9F27',
                    lineHeight: 1,
                  }}
                >
                  {panel.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#2C2C2A',
                  }}
                >
                  {panel.label}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13.5,
                  color: '#4A4845',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {panel.desc}
              </p>

              {/* Detail bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                {panel.details.map((detail) => (
                  <div
                    key={detail}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-start',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      color: '#2C2C2A',
                    }}
                  >
                    <span
                      style={{
                        color: '#EF9F27',
                        fontFamily: "'JetBrains Mono', monospace",
                        marginTop: 1,
                        flexShrink: 0,
                      }}
                    >
                      ~
                    </span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Tech tags — pushed to bottom */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, marginTop: 'auto' }}>
                {panel.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      padding: '4px 9px',
                      background: '#F3F0E8',
                      border: '1px solid #E8E4DC',
                      borderRadius: 4,
                      color: '#665F55',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={panel.links.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#2C2C2A',
                    textDecoration: 'none',
                    border: '1px solid #E8E4DC',
                    borderRadius: 6,
                    padding: '7px 11px',
                    background: '#FAFAF7',
                  }}
                >
                  <Github size={13} strokeWidth={1.6} />
                  github
                </a>
                <a
                  href={panel.links.live}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: '#2C2C2A',
                    textDecoration: 'none',
                    border: '1px solid #E8E4DC',
                    borderRadius: 6,
                    padding: '7px 11px',
                    background: '#F3F0E8',
                  }}
                >
                  <ExternalLink size={13} strokeWidth={1.6} />
                  preview
                </a>
              </div> */}
            </div>
          ))}
        </div>
      </article>
    </AnimatedSection>
  );
}

// ─── Full Project Card (unchanged) ────────────────────────────────────────────

function FullProjectCard({ project, index }: { project: FullProject; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { isMobile, isTablet } = useViewport();

  return (
    <AnimatedSection delay={index * 0.12}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 0,
          border: `1px solid ${hovered ? '#EF9F27' : '#E8E4DC'}`,
          borderRadius: 14,
          background: '#FAFAF7',
          overflow: 'hidden',
          boxShadow: hovered ? '3px 3px 0 #E8E4DC' : '1px 1px 0 #E8E4DC',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ position: 'relative', minHeight: isMobile ? 220 : 280, overflow: 'hidden', background: '#F3F0E8' }}>
          <img
            src={project.img}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.35s ease',
            }}
          />
          {/* <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(44,44,42,0.05), rgba(44,44,42,0.55))',
            }}
          /> */}
          {/* <div
            style={{
              position: 'absolute',
              left: isMobile ? 14 : 18,
              bottom: isMobile ? 14 : 18,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#2C2C2A',
              background: 'rgba(250,250,247,0.92)',
              border: '1px solid #E8E4DC',
              borderRadius: 999,
              padding: '7px 12px',
            }}
          >
            0{index + 1} / selected work
          </div> */}
        </div>

        <div style={{ padding: isMobile ? '20px 16px' : isTablet ? '24px 22px' : '28px 30px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#BA7517', marginBottom: 10 }}>
            // {project.eyebrow}
          </div>
          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 20 : 22,
              fontWeight: 500,
              color: '#2C2C2A',
              marginBottom: 12,
            }}
          >
            {project.name}
          </h3>
          {project.desc && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#2C2C2A',
                lineHeight: 1.7,
                marginBottom: 18,
                maxWidth: 720,
              }}
            >
              {project.desc}
            </p>
          )}

          {project.details.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
              {project.details.map((detail) => (
                <div
                  key={detail}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#2C2C2A',
                  }}
                >
                  <span style={{ color: '#EF9F27', fontFamily: "'JetBrains Mono', monospace", marginTop: 1 }}>~</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
            {project.tech.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  padding: '4px 9px',
                  background: '#F3F0E8',
                  border: '1px solid #E8E4DC',
                  borderRadius: 4,
                  color: '#665F55',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#2C2C2A',
                textDecoration: 'none',
                border: '1px solid #E8E4DC',
                borderRadius: 6,
                padding: '8px 11px',
                background: '#FAFAF7',
              }}
            >
              <Github size={14} strokeWidth={1.6} />
              github
            </a>
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: '#2C2C2A',
                textDecoration: 'none',
                border: '1px solid #E8E4DC',
                borderRadius: 6,
                padding: '8px 11px',
                background: '#F3F0E8',
              }}
            >
              <ExternalLink size={14} strokeWidth={1.6} />
              preview
            </a>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}

// ─── Router Card ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  if (project.type === 'freelance-split') {
    return <FreelanceSplitCard project={project} index={index} />;
  }
  return <FullProjectCard project={project} index={index} />;
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const { isMobile, isTablet } = useViewport();

  return (
    <section
      id="projects"
      style={{ padding: isMobile ? '36px 16px 48px' : isTablet ? '40px 24px 56px' : '46px 40px 70px' }}
    >
      <AnimatedSection>
        <div style={{ marginBottom: 34 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // things I built
          </div>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 24 : 28,
              fontWeight: 500,
              color: '#2C2C2A',
            }}
          >
            projects
          </h2>
        </div>
      </AnimatedSection>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}