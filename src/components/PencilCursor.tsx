import { useEffect, useRef } from 'react';

export default function PencilCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) return;

    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    };

    const enter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!cursorRef.current) return;
      const interactive = target.closest('button,a,input,textarea,select,[role="button"]');
      cursorRef.current.style.opacity = interactive ? '0' : '1';
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-4px, -20px)',
        transition: 'opacity 0.15s',
        opacity: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M15 2L18 5L6 17L2 18L3 14Z" fill="#EF9F27" stroke="#BA7517" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M13 4L16 7" stroke="#BA7517" strokeWidth="1"/>
        <path d="M3 14L6 17" stroke="#BA7517" strokeWidth="0.8"/>
      </svg>
    </div>
  );
}
