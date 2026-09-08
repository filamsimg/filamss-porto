import { useEffect, useState, RefObject } from 'react';

/**
 * Robust Point-Sampling Theme Detector
 * Samples the front-most rendered DOM section underneath the navigation header/pill.
 * Temporarily hides the target container (visibility = 'hidden') during point sampling
 * so document.elementFromPoint pierces through all children and samples the exact page section underneath.
 */
export function isDarkAtPoint(x: number, y: number, excludeRef?: RefObject<HTMLElement | null>): boolean {
  if (typeof window === 'undefined') return false;

  const targetEl = excludeRef?.current;
  let prevVisibility = '';

  if (targetEl) {
    prevVisibility = targetEl.style.visibility;
    targetEl.style.visibility = 'hidden';
  }

  const el = document.elementFromPoint(x, y);

  if (targetEl) {
    targetEl.style.visibility = prevVisibility;
  }

  if (!el) return false;

  // 1. Check closest section by ID or Tag (ignoring <main> wrapper)
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

  // 2. Fallback: Check computed background color luminance of underlying element (excluding <main> & <body>)
  let current: HTMLElement | null = el as HTMLElement;
  while (current && current !== document.body && current.tagName !== 'MAIN') {
    const bg = window.getComputedStyle(current).backgroundColor;
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance < 140;
      }
    }
    current = current.parentElement;
  }

  return false;
}

/**
 * Custom Hook: useThemeDetector
 * Continuously tracks screen contrast at a specified element reference or position ('top' | 'bottom')
 */
export function useThemeDetector(
  position: 'top' | 'bottom' = 'top',
  targetRef?: RefObject<HTMLElement | null>
): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkContrast = () => {
      const x = position === 'top' ? 60 : window.innerWidth / 2;
      const y = position === 'top' ? 32 : window.innerHeight - 36;
      const dark = isDarkAtPoint(x, y, targetRef);
      setIsDark(dark);
    };

    checkContrast();

    window.addEventListener('scroll', checkContrast, { passive: true });
    window.addEventListener('resize', checkContrast, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkContrast);
      window.removeEventListener('resize', checkContrast);
    };
  }, [position, targetRef]);

  return isDark;
}
