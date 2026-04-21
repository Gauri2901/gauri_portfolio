import { Linkedin, Github, Mail, User, Briefcase, FolderOpen, Wrench, GraduationCap, Trophy, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Section } from '../hooks/useActiveSection';
import { useViewport } from '../hooks/useViewport';

const NAV_ITEMS: { id: Section; label: string; icon: LucideIcon }[] = [
  { id: 'about', label: 'about', icon: User },
  { id: 'experience', label: 'experience', icon: Briefcase },
  { id: 'projects', label: 'projects', icon: FolderOpen },
  { id: 'skills', label: 'skills', icon: Wrench },
  { id: 'education', label: 'education', icon: GraduationCap },
  { id: 'achievements', label: 'achievements', icon: Trophy },
  { id: 'contact', label: 'contact', icon: MessageCircle },
];

interface Props {
  active: Section;
  onNav: (id: Section) => void;
  scrollProgress: number;
}

export default function Sidebar({ active, onNav, scrollProgress }: Props) {
  const { isMobile, isTablet } = useViewport();
  const profileImageSize = 200;

  if (isTablet) {
    return (
      <aside
        style={{
          width: '100%',
          minWidth: 0,
          background: '#F3F0E8',
          borderBottom: '1px solid #E8E4DC',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: 2,
            width: `${scrollProgress * 100}%`,
            background: '#EF9F27',
            transition: 'width 0.1s linear',
          }}
        />

        <div
          style={{
            padding: isMobile ? '14px 16px 10px' : '16px 24px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: isMobile ? 48 : 56,
                height: isMobile ? 48 : 56,
                borderRadius: '50%',
                border: '2px solid #EF9F27',
                overflow: 'hidden',
                background: '#E8E4DC',
                flexShrink: 0,
              }}
            >
              <img
                src="/profile-pic.jpeg"
                alt="Gauri Borle"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: isMobile ? 16 : 18,
                  color: '#2C2C2A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Gauri Borle
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: '#888780',
                  marginTop: 4,
                }}
              >
                Software Engineer
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              flexShrink: 0,
            }}
          >
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
                  width: isMobile ? 32 : 34,
                  height: isMobile ? 32 : 34,
                  borderRadius: 8,
                  border: '1px solid #E8E4DC',
                  background: '#FAFAF7',
                  color: '#888780',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '1px 1px 0 #E8E4DC',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} strokeWidth={1.7} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      style={{
        width: isTablet ? '100%' : 280,
        minWidth: isTablet ? 0 : 280,
        height: isTablet ? 'auto' : '100dvh',
        background: '#F3F0E8',
        borderRight: isTablet ? 'none' : '1px solid #E8E4DC',
        borderBottom: isTablet ? '1px solid #E8E4DC' : 'none',
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
      <div
        style={{
          padding: '36px 24px 26px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <div style={{ position: 'relative', marginBottom: 16, flexShrink: 0 }}>
          <div
            style={{
              width: profileImageSize,
              height: profileImageSize,
              borderRadius: '50%',
              border: '2px solid #EF9F27',
              overflow: 'hidden',
              background: '#E8E4DC',
            }}
          >
            <img
              src="/profile-pic.jpeg"
              alt="Gauri Borle"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>
        </div>

        <div style={{ minWidth: 0, width: 'auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 20, color: '#2C2C2A', textAlign: 'center' }}>
            Gauri Borle
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#888780', marginTop: 6, textAlign: 'center' }}>
            Software Engineer
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#888780', marginTop: 7, textAlign: 'center' }}>
            // Malkapur, MH
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
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
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  border: '1px solid #E8E4DC',
                  background: '#FAFAF7',
                  color: '#888780',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '1px 1px 0 #E8E4DC',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#EF9F27';
                  e.currentTarget.style.borderColor = '#EF9F27';
                  e.currentTarget.style.boxShadow = '1px 1px 0 #EF9F27';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#888780';
                  e.currentTarget.style.borderColor = '#E8E4DC';
                  e.currentTarget.style.boxShadow = '1px 1px 0 #E8E4DC';
                }}
              >
                <Icon size={18} strokeWidth={1.7} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E8E4DC', margin: '0 16px' }} />

      {/* Nav */}
      <nav
        style={{
          padding: '18px 14px',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 0,
        }}
      >
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
                gap: 12,
                padding: '12px 14px',
                borderRadius: 8,
                border: 'none',
                background: isActive ? '#2C2C2A' : 'transparent',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                color: isActive ? '#FAFAF7' : '#2C2C2A',
                transition: 'all 0.15s ease',
                position: 'relative',
                marginBottom: 5,
                textAlign: 'left',
              }}
            >
              <Icon
                size={17}
                strokeWidth={1.6}
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
    </aside>
  );
}
