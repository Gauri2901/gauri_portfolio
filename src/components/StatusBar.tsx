import type { Section } from '../hooks/useActiveSection';
import { useViewport } from '../hooks/useViewport';

interface Props {
  active: Section;
}

export default function StatusBar({ active }: Props) {
  const { isMobile, isTablet } = useViewport();

  if (isTablet) return null;

  return (
    <div
      style={{
        minHeight: 26,
        background: '#2C2C2A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? 6 : 12,
        padding: isMobile ? '8px 12px' : '0 16px',
        flexShrink: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#888780', flexWrap: 'wrap' }}>
        <span>
          <span style={{ color: '#1D9E75' }}>●</span>{' '}
          <span style={{ color: '#FAFAF7' }}>ready</span>
        </span>
        <span style={{ color: '#888780' }}>·</span>
        <span style={{ color: '#EF9F27' }}>{active}</span>
        {!isMobile && (
          <>
            <span style={{ color: '#888780' }}>·</span>
            <span style={{ color: '#888780' }}>Sketchbook+IDE</span>
          </>
        )}
      </div>
      <div style={{ display: 'flex', gap: 12, color: '#888780', flexWrap: 'wrap' }}>
        <span>{isMobile ? 'Malkapur, India' : 'Malkapur, MH · India'}</span>
        {!isTablet && (
          <>
            <span style={{ color: '#888780' }}>·</span>
            <span>UTF-8</span>
          </>
        )}
      </div>
    </div>
  );
}
