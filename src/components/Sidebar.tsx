import { Linkedin, Github, Mail, User, Briefcase, FolderOpen, Wrench, GraduationCap, MessageCircle } from 'lucide-react';
import type { Section } from '../hooks/useActiveSection';

const NAV_ITEMS: { id: Section; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'about', label: 'about', icon: User },
  { id: 'experience', label: 'experience', icon: Briefcase },
  { id: 'projects', label: 'projects', icon: FolderOpen },
  { id: 'skills', label: 'skills', icon: Wrench },
  { id: 'education', label: 'education', icon: GraduationCap },
  { id: 'contact', label: 'contact', icon: MessageCircle },
];

interface Props {
  active: Section;
  onNav: (id: Section) => void;
  scrollProgress: number;
}

export default function Sidebar({ active, onNav, scrollProgress }: Props) {
  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        height: '100vh',
        background: '#F3F0E8',
        borderRight: '1px solid #E8E4DC',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Scroll progress line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 2,
          height: `${scrollProgress * 100}%`,
          background: '#EF9F27',
          transition: 'height 0.1s linear',
          zIndex: 10,
        }}
      />

      {/* Profile */}
      <div style={{ padding: '28px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '2px solid #EF9F27',
              overflow: 'hidden',
              background: '#E8E4DC',
            }}
          >
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
              alt="Gauri Borle"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 3,
              right: 3,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#1D9E75',
              border: '2px solid #F3F0E8',
            }}
          />
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 15, color: '#2C2C2A', textAlign: 'center' }}>
          Gauri Borle
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#888780', marginTop: 3, textAlign: 'center' }}>
          Software Engineer
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#888780', marginTop: 4, textAlign: 'center' }}>
          // Malkapur, MH
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E8E4DC', margin: '0 16px' }} />

      {/* Nav */}
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 6,
                border: 'none',
                background: isActive ? '#2C2C2A' : 'transparent',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: isActive ? '#FAFAF7' : '#2C2C2A',
                transition: 'all 0.15s ease',
                position: 'relative',
                marginBottom: 2,
                textAlign: 'left',
              }}
            >
              <Icon
                size={14}
                strokeWidth={1.5}
                style={{ color: isActive ? '#EF9F27' : '#888780', flexShrink: 0 }}
              />
              {item.label}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    right: 10,
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#EF9F27',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Social icons */}
      <div style={{ padding: '16px 20px', display: 'flex', gap: 14, justifyContent: 'center' }}>
        {[
          { icon: Linkedin, href: 'https://linkedin.com/in/gauriborle', label: 'LinkedIn' },
          { icon: Github, href: 'https://github.com/gauriborle', label: 'GitHub' },
          { icon: Mail, href: 'mailto:gauriborle1002@gmail.com', label: 'Email' },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            title={label}
            style={{
              color: '#888780',
              transition: 'color 0.15s',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF9F27')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888780')}
          >
            <Icon size={16} strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </aside>
  );
}
