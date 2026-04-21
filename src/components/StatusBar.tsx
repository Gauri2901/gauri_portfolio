import type { Section } from '../hooks/useActiveSection';

interface Props {
  active: Section;
}

export default function StatusBar({ active }: Props) {
  return (
    <div
      style={{
        height: 26,
        background: '#2C2C2A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        flexShrink: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#888780' }}>
        <span>
          <span style={{ color: '#1D9E75' }}>●</span>{' '}
          <span style={{ color: '#FAFAF7' }}>ready</span>
        </span>
        <span style={{ color: '#888780' }}>·</span>
        <span style={{ color: '#EF9F27' }}>{active}</span>
        <span style={{ color: '#888780' }}>·</span>
        <span style={{ color: '#888780' }}>Sketchbook+IDE</span>
      </div>
      <div style={{ display: 'flex', gap: 12, color: '#888780' }}>
        <span>Malkapur, MH · India</span>
        <span style={{ color: '#888780' }}>·</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
