import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import type { Section } from '../hooks/useActiveSection';

interface Props {
  active: Section;
}

const FILE_NAMES: Record<Section, string> = {
  about: 'about.md',
  experience: 'experience.md',
  projects: 'projects.md',
  skills: 'skills.md',
  education: 'education.md',
  contact: 'contact.md',
};

export default function Topbar({ active }: Props) {
  const [displayed, setDisplayed] = useState(FILE_NAMES[active]);
  const [fading, setFading] = useState(false);
  const prevActive = useRef(active);

  useEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;
    setFading(true);
    const t = setTimeout(() => {
      setDisplayed(FILE_NAMES[active]);
      setFading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div
      style={{
        height: 48,
        borderBottom: '1px solid #E8E4DC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        background: '#FAFAF7',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#888780',
          transition: 'opacity 0.2s',
          opacity: fading ? 0 : 1,
        }}
      >
        <span style={{ color: '#888780' }}>portfolio</span>
        <span style={{ color: '#E8E4DC', margin: '0 6px' }}>/</span>
        <span style={{ color: '#2C2C2A' }}>{displayed}</span>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            padding: '5px 14px',
            border: '1px solid #E8E4DC',
            borderRadius: 4,
            color: '#2C2C2A',
            textDecoration: 'none',
            background: '#FAFAF7',
            transition: 'all 0.15s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#EF9F27';
            e.currentTarget.style.color = '#BA7517';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E8E4DC';
            e.currentTarget.style.color = '#2C2C2A';
          }}
        >
          resume.pdf
        </a>
        <a
          href="mailto:gauriborle1002@gmail.com"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            padding: '5px 14px',
            borderRadius: 4,
            color: '#FAFAF7',
            textDecoration: 'none',
            background: '#2C2C2A',
            transition: 'all 0.15s ease',
            cursor: 'pointer',
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
          hire me
        </a>
        <MoreHorizontal size={16} style={{ color: '#888780' }} />
      </div>
    </div>
  );
}
