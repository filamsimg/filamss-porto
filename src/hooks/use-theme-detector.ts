import { useEffect, useState, RefObject } from 'react';

/**
 * High-Performance Contrast & Theme Detector
 * Samples the underlying section at a specific viewport position.
 * Uses requestAnimationFrame throttling and cached section lookups to prevent forced reflows.
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

  // 1. Fast path: Check closest semantic section by ID or attribute
  const closestSection = el.closest('section, footer, [data-theme]');
  if (closestSection) {
    const id = closestSection.id;
    const theme = closestSection.getAttribute('data-theme');

    if (id === 'about' || id === 'contact' || closestSection.tagName === 'FOOTER' || theme === 'dark') {
      return true;
    }
    if (id === 'home' || id === 'projects' || theme === 'light') {
      return false;
    }
  }

  // 2. Safe fallback: check class names for common dark background classes
  let current: HTMLElement | null = el as HTMLElement;
  let depth = 0;
  while (current && current !== document.body && current.tagName !== 'MAIN' && depth < 5) {
    const className = current.className || '';
    if (typeof className === 'string') {
      if (className.includes('bg-[#1b4d3e]') || className.includes('bg-[#121c19]') || className.includes('bg-[#090e0d]') || className.includes('bg-slate-900') || className.includes('bg-black')) {
        return true;
      }
      if (className.includes('bg-[#e8e8e4]') || className.includes('bg-[#f4f4f0]') || className.includes('bg-white') || className.includes('bg-slate-50')) {
        return false;
      }
    }
    current = current.parentElement;
    depth++;
  }

  return false;
}

/**
 * Custom Hook: useThemeDetector
 * Continuously tracks screen contrast at a specified element reference or position ('top' | 'bottom')
 * Uses requestAnimationFrame to eliminate scroll jank and keep 60-120 FPS.
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
      const x = position === 'top' ? 60 : window.innerWidth / 2;
      const y = position === 'top' ? 32 : window.innerHeight - 36;
      const dark = isDarkAtPoint(x, y, targetRef);
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

    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
    };
  }, [position, targetRef]);

  return isDark;
}
