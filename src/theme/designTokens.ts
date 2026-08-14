import { palette } from './palette'

export const designTokens = {
  color: palette,
  radius: {
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
    pill: 999,
  },
  blur: {
    glass: 24,
  },
  shadow: {
    glass: '0 8px 32px rgba(15, 23, 42, 0.06), 0 1px 0 rgba(255, 255, 255, 0.8) inset',
    float: '0 18px 50px rgba(15, 23, 42, 0.08)',
    sidebar: '0 0 0 1px rgba(255, 255, 255, 0.04), 0 24px 60px rgba(0, 0, 0, 0.35)',
  },
  motion: {
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    duration: {
      fast: 180,
      base: 420,
      slow: 700,
    },
  },
  layout: {
    sidebarWidth: 268,
    headerHeight: 72,
    contentMax: 1440,
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.72)',
    border: 'rgba(255, 255, 255, 0.65)',
    blur: '24px',
    saturate: '180%',
    darkBackground: 'rgba(15, 23, 42, 0.72)',
    darkBorder: 'rgba(255, 255, 255, 0.12)',
  },
} as const

export type DesignTokens = typeof designTokens
