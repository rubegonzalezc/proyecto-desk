export const palette = {
  brand: {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#60A5FA',
  },
  surfaces: {
    background: '#F3F6FB',
    surface: '#FFFFFF',
    surfaceMuted: '#EEF3FA',
    navy: '#0F172A',
    navyDark: '#020617',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475467',
    muted: '#667085',
  },
  borders: {
    default: '#D7E2F0',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#2563EB',
  },
} as const

export type AppPalette = typeof palette
