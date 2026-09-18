import { useEffect, useState, RefObject } from 'react';

/**
 * Theme Detector — Original approach using elementFromPoint.
 * Temporarily hides the header from hit-testing so we can see the section behind it.
 * Works correctly with Lenis (native scroll events still fire on window).
 */
export function isDarkAtPoint(x: number, y: number, excludeRef?: RefObject<HTMLElement | null>): boolean {
  if (typeof window === 'undefined') return false;

  const targetEl = excludeRef?.current;
  let prevPointerEvents = '';

  if (targetEl) {
    prevPointerEvents = targetEl.style.pointerEvents;
    targetEl.style.pointerEvents = 'none';
  }

  const el = document.elementFromPoint(x, y);

  if (targetEl) {
    targetEl.style.pointerEvents = prevPointerEvents;
  }

  if (!el) return false;

  // 1. Fast path: Check closest semantic section by ID or data-theme attribute
  const closestSection = el.closest('section, footer, [data-theme]');
  if (closestSection) {
    const id = closestSection.id;
    const theme = closestSection.getAttribute('data-theme');

    if (id === 'about' || id === 'contact' || id === 'showreel' || closestSection.tagName === 'FOOTER' || theme === 'dark') {
      return true;
    }
    if (id === 'home' || id === 'projects' || theme === 'light') {
      return false;
    }
  }

  // 2. Safe fallback: walk up DOM checking background color classes
  let current: HTMLElement | null = el as HTMLElement;
  let depth = 0;
  while (current && current !== document.body && current.tagName !== 'MAIN' && depth < 6) {
    const className = current.className || '';
    if (typeof className === 'string') {
      if (
        className.includes('bg-[#1b4d3e]') ||
        className.includes('bg-[#121c19]') ||
        className.includes('bg-[#090e0d]') ||
        className.includes('bg-slate-900') ||
        className.includes('bg-black')
      ) {
        return true;
      }
      if (
        className.includes('bg-[#e8e8e4]') ||
        className.includes('bg-[#f4f4f0]') ||
        className.includes('bg-white') ||
        className.includes('bg-slate-50')
      ) {
        return false;
      }
    }
    current = current.parentElement;
    depth++;
  }

  return false;
}

/**
 * useThemeDetector
 * Continuously tracks screen contrast at a specified position.
 * Throttled via requestAnimationFrame to eliminate scroll jank.
 */
export function useThemeDetector(
  position: 'top' | 'bottom' = 'top',
  targetRef?: RefObject<HTMLElement | null>
): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;
    let isScheduled = false;

    const performCheck = () => {
      // Sample at center-top — avoids all interactive header elements (brand left, buttons right)
      const x = window.innerWidth / 2;
      const y = position === 'top' ? 32 : window.innerHeight - 36;
      const dark = isDarkAtPoint(x, y);
      setIsDark((prev) => (prev !== dark ? dark : prev));
      isScheduled = false;
    };

    const scheduleCheck = () => {
      if (!isScheduled) {
        isScheduled = true;
        rafId = requestAnimationFrame(performCheck);
      }
    };

    // Initial check
    performCheck();

    // Listen to all scroll triggers: native, touch, wheel, resize
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });
    window.addEventListener('wheel', scheduleCheck, { passive: true });
    window.addEventListener('touchmove', scheduleCheck, { passive: true });

    // Also connect directly to Lenis scroll instance if active
    let cleanupLenis: (() => void) | null = null;
    const bindLenis = () => {
      const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).__lenis;
      if (lenis && typeof lenis.on === 'function') {
        lenis.on('scroll', scheduleCheck);
        cleanupLenis = () => {
          try {
            lenis.off('scroll', scheduleCheck);
          } catch {}
        };
        return true;
      }
      return false;
    };

    if (!bindLenis()) {
      const timer = setInterval(() => {
        if (bindLenis()) clearInterval(timer);
      }, 100);
      setTimeout(() => clearInterval(timer), 3000);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      window.removeEventListener('wheel', scheduleCheck);
      window.removeEventListener('touchmove', scheduleCheck);
      if (cleanupLenis) cleanupLenis();
    };
  }, [position, targetRef]);

  return isDark;
}
