import { useEffect, useState } from 'react';

function getViewportWidth() {
  if (typeof window === 'undefined') return 1440;
  return window.innerWidth;
}

export function useViewport() {
  const [width, setWidth] = useState(getViewportWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    width,
    isMobile: width < 640,
    isTablet: width < 1024,
    isDesktop: width >= 1024,
  };
}
