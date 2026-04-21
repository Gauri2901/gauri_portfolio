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

const PROJECTS = [
  {
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
    img: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=900&h=420&fit=crop',
  },
  {
    name: 'Freelance Sites',
    eyebrow: 'Responsive portfolio websites',
    desc: 'Portfolio websites for 3 non-technical clients, translating loose requirements into polished, responsive pages that are easy to maintain.',
    details: [
      'Created clean visual systems for clients who needed simple, professional online presence.',
      'Handled layout, content structure, responsive behavior, and handoff-friendly implementation.',
      'Used lightweight frontend stacks to keep pages fast and deployment simple.',
    ],
    tech: ['React', 'HTML/CSS', 'JavaScript', 'Figma'],
    links: { github: 'https://github.com/gauriborle', live: '#' },
    img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=900&h=420&fit=crop',
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
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
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(44,44,42,0.05), rgba(44,44,42,0.55))',
            }}
          />
          <div
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
          </div>
        </div>

        <div style={{ padding: isMobile ? '20px 16px' : isTablet ? '24px 22px' : '28px 30px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#BA7517', marginBottom: 10 }}>
            // {project.eyebrow}
          </div>
          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 20 : 24,
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

export default function Projects() {
  const { isMobile, isTablet } = useViewport();

  return (
    <section id="projects" style={{ padding: isMobile ? '36px 16px 48px' : isTablet ? '40px 24px 56px' : '46px 40px 70px' }}>
      <AnimatedSection>
        <div style={{ marginBottom: 34 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888780', marginBottom: 8 }}>
            // things I built
          </div>
          <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 24 : 28, fontWeight: 500, color: '#2C2C2A' }}>
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
