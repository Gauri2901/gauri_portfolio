import {
  Linkedin, Github, Mail,
  User, Briefcase, FolderOpen, Wrench,
  GraduationCap, Trophy, MessageCircle, Menu, X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { Section } from '../hooks/useActiveSection';
import { useViewport } from '../hooks/useViewport';

const NAV_ITEMS: { id: Section; label: string; icon: LucideIcon }[] = [
  { id: 'about',         label: 'about',        icon: User },
  { id: 'experience',   label: 'experience',   icon: Briefcase },
  { id: 'projects',     label: 'projects',     icon: FolderOpen },
  { id: 'skills',       label: 'skills',       icon: Wrench },
  { id: 'education',    label: 'education',    icon: GraduationCap },
  { id: 'achievements', label: 'achievements', icon: Trophy },
  { id: 'contact',      label: 'contact',      icon: MessageCircle },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com/in/gauriborle', label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/gauriborle',     label: 'GitHub' },
  { icon: Mail,     href: 'mailto:gauriborle1002@gmail.com',   label: 'Email' },
];

interface Props {
  active: Section;
  onNav: (id: Section) => void;
  scrollProgress: number;
}

export default function Sidebar({ active, onNav, scrollProgress }: Props) {
  const { isMobile, isTablet } = useViewport();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleNav = (id: Section) => {
    onNav(id);
    setMenuOpen(false);
  };

  // ─── Mobile / Tablet ────────────────────────────────────────────────────────
  if (isTablet) {
    return (
      <div ref={dropdownRef}>
        {/* Slim top bar: name + hamburger only */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: '#F3F0E8',
            borderBottom: '1px solid #E8E4DC',
          }}
        >
          {/* Scroll progress */}
          <div style={{ height: 2, width: `${scrollProgress * 100}%`, background: '#EF9F27', transition: 'width 0.1s linear' }} />

          <div
            style={{
              padding: isMobile ? '0 18px' : '0 28px',
              height: isMobile ? 54 : 62,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Portfolio name — left */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: isMobile ? 15 : 17,
                color: '#2C2C2A',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              gauri
              <span style={{ color: '#EF9F27' }}>.</span>
              <span style={{ fontWeight: 400, color: '#888780', fontSize: isMobile ? 12 : 13 }}>portfolio</span>
            </div>

            {/* Hamburger — right */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle navigation"
              style={{
                width: isMobile ? 40 : 44,
                height: isMobile ? 40 : 44,
                borderRadius: 10,
                border: `1.5px solid ${menuOpen ? '#EF9F27' : '#E8E4DC'}`,
                background: menuOpen ? '#2C2C2A' : 'transparent',
                color: menuOpen ? '#EF9F27' : '#2C2C2A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              {menuOpen
                ? <X size={isMobile ? 17 : 19} strokeWidth={2} />
                : <Menu size={isMobile ? 17 : 19} strokeWidth={1.8} />
              }
            </button>
          </div>
        </header>

        {/* Dropdown — floats below header, doesn't cover full page */}
        <div
          style={{
            position: 'fixed',
            top: isMobile ? 56 : 64,   /* header height + 2px progress bar */
            right: isMobile ? 12 : 20,
            zIndex: 200,
            width: isMobile ? 220 : 260,
            background: '#2C2C2A',
            borderRadius: 14,
            border: '1px solid #3A3A38',
            boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
            overflow: 'hidden',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
            pointerEvents: menuOpen ? 'all' : 'none',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          {/* Header inside dropdown */}
          <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #3A3A38' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#666663', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              navigate
            </div>
          </div>

          {/* Nav items — vertical list */}
          <nav style={{ padding: '8px 8px' }}>
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: 'none',
                    background: isActive ? '#EF9F27' : 'transparent',
                    cursor: 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: isActive ? '#2C2C2A' : '#C8C5BC',
                    fontWeight: isActive ? 700 : 400,
                    transition: 'all 0.12s ease',
                    textAlign: 'left',
                    marginBottom: i < NAV_ITEMS.length - 1 ? 2 : 0,
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#363634'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon
                    size={14}
                    strokeWidth={isActive ? 2.2 : 1.6}
                    style={{ color: isActive ? '#2C2C2A' : '#888780', flexShrink: 0 }}
                  />
                  {item.label}
                  {isActive && (
                    <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#2C2C2A', flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    );
  }

  // ─── Desktop: sticky left sidebar ──────────────────────────────────────────
  return (
    <aside
      style={{
        width: 260, minWidth: 260, height: '100dvh',
        background: '#F3F0E8', borderRight: '1px solid #E8E4DC',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, width: 2, height: `${scrollProgress * 100}%`, background: '#EF9F27', transition: 'height 0.1s linear', zIndex: 10 }} />

      <div style={{ padding: '36px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid #EF9F27', overflow: 'hidden', background: '#E8E4DC' }}>
            <img
              src="/profilepic.jpeg"
              alt="Gauri Borle"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '60% 20%', // 👉 move right + up
                transform: 'scale(1.8) translate(12px, -3px)', // 👉 right + up
              }}
            />   
          </div>
        </div>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 18, color: '#2C2C2A' }}>Gauri Borle</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#888780', marginTop: 5 }}>Software Engineer</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#888780', marginTop: 6 }}>// Malkapur, MH</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18 }}>
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #E8E4DC', background: '#FAFAF7', color: '#888780', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '1px 1px 0 #E8E4DC', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EF9F27'; e.currentTarget.style.borderColor = '#EF9F27'; e.currentTarget.style.boxShadow = '1px 1px 0 #EF9F27'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#888780'; e.currentTarget.style.borderColor = '#E8E4DC'; e.currentTarget.style.boxShadow = '1px 1px 0 #E8E4DC'; }}>
                <Icon size={16} strokeWidth={1.7} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: '#E8E4DC', margin: '0 16px' }} />

      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 8, border: 'none', background: isActive ? '#2C2C2A' : 'transparent', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: isActive ? '#FAFAF7' : '#2C2C2A', transition: 'all 0.15s ease', position: 'relative', textAlign: 'left' }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#ECEAE0'; }}
onMouseLeave={e => { e.currentTarget.style.background = isActive ? '#2C2C2A' : 'transparent'; }}>
              <Icon size={16} strokeWidth={1.6} style={{ color: isActive ? '#EF9F27' : '#888780', flexShrink: 0 }} />
              {item.label}
              {isActive && <div style={{ position: 'absolute', right: 10, width: 5, height: 5, borderRadius: '50%', background: '#EF9F27' }} />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}