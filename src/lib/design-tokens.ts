/**
 * Centralized Design System Tokens
 * Defines unified color palettes, border radius classes, and Framer Motion presets
 * across the entire portfolio application.
 */

export const COLORS = {
  bgLight: '#e8e8e4',
  bgDark: '#1b4d3e',
  bgDarkSecondary: '#121c19',
  accent: '#d4e157',
  textDark: '#111111',
  textLight: '#ffffff',
  textMutedDark: 'rgba(17, 17, 17, 0.6)',
  textMutedLight: 'rgba(255, 255, 255, 0.7)',
  borderLight: 'rgba(0, 0, 0, 0.1)',
  borderDark: 'rgba(255, 255, 255, 0.15)',
} as const;

export const RADIUS = {
  panelTop: 'rounded-t-2xl sm:rounded-t-3xl',
  panelBottom: 'rounded-b-2xl sm:rounded-b-3xl',
  card: 'rounded-3xl',
  cardSmall: 'rounded-2xl',
  pill: 'rounded-full',
} as const;

export const SHADOWS = {
  panelTop: 'shadow-[0_-12px_40px_rgba(0,0,0,0.18)]',
  panelBottom: 'shadow-[0_20px_60px_rgba(0,0,0,0.18)]',
  card: 'shadow-xl',
  floatingNav: 'shadow-[0_15px_40px_rgba(0,0,0,0.18)]',
} as const;

export const MOTION = {
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  spring: { stiffness: 80, damping: 20, mass: 0.5 },
  springSnappy: { stiffness: 400, damping: 30 },
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  },
} as const;
