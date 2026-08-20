import { createTheme, type PaletteMode, type Theme } from '@mui/material/styles'
import { palette } from './palette'
import { designTokens } from './designTokens'

const fontFamily = [
  'var(--font-sans)',
  '-apple-system',
  'BlinkMacSystemFont',
  '"SF Pro Display"',
  '"SF Pro Text"',
  '"Segoe UI"',
  'sans-serif',
].join(',')

export function createAppTheme(mode: PaletteMode): Theme {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: palette.brand.primary,
        dark: palette.brand.primaryDark,
        light: palette.brand.primaryLight,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: palette.surfaces.navy,
      },
      success: { main: palette.semantic.success },
      warning: { main: palette.semantic.warning },
      error: { main: palette.semantic.error },
      info: { main: palette.semantic.info },
      background: {
        default: isDark ? palette.surfaces.navyDark : palette.surfaces.background,
        paper: isDark ? palette.surfaces.navy : palette.surfaces.surface,
      },
      text: {
        primary: isDark ? '#F8FAFC' : palette.text.primary,
        secondary: isDark ? 'rgba(248, 250, 252, 0.72)' : palette.text.secondary,
        disabled: isDark ? 'rgba(248, 250, 252, 0.42)' : palette.text.muted,
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : palette.borders.default,
    },
    typography: {
      fontFamily,
      h1: { fontWeight: 700, letterSpacing: '-0.04em', fontSize: '2.25rem' },
      h2: { fontWeight: 700, letterSpacing: '-0.035em', fontSize: '1.75rem' },
      h3: { fontWeight: 650, letterSpacing: '-0.03em', fontSize: '1.375rem' },
      h4: { fontWeight: 650, letterSpacing: '-0.025em', fontSize: '1.125rem' },
      h5: { fontWeight: 600, letterSpacing: '-0.02em' },
      h6: { fontWeight: 600, letterSpacing: '-0.02em' },
      subtitle1: { fontWeight: 600, letterSpacing: '-0.015em' },
      subtitle2: { fontWeight: 600, letterSpacing: '-0.01em' },
      body1: { letterSpacing: '-0.011em' },
      body2: { letterSpacing: '-0.008em' },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
    },
    shape: {
      borderRadius: designTokens.radius.md,
    },
    shadows: [
      'none',
      '0 1px 2px rgba(15, 23, 42, 0.04)',
      '0 4px 16px rgba(15, 23, 42, 0.05)',
      '0 8px 24px rgba(15, 23, 42, 0.06)',
      '0 12px 32px rgba(15, 23, 42, 0.07)',
      '0 18px 50px rgba(15, 23, 42, 0.08)',
      ...Array(19).fill('0 18px 50px rgba(15, 23, 42, 0.08)'),
    ] as Theme['shadows'],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? palette.surfaces.navyDark : palette.surfaces.background,
          },
          'a:focus-visible, button:focus-visible, [role="button"]:focus-visible': {
            outline: `2px solid ${palette.brand.primary}`,
            outlineOffset: 2,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: designTokens.radius.pill,
            paddingInline: 18,
            paddingBlock: 8,
            transition: `transform 180ms ${designTokens.motion.ease}, background 420ms ${designTokens.motion.ease}`,
            '&:active': { transform: 'scale(0.992)' },
            '&.Mui-focusVisible': {
              outline: `2px solid ${palette.brand.primary}`,
              outlineOffset: 2,
              boxShadow: `0 0 0 4px rgba(37, 99, 235, 0.24)`,
            },
          },
          contained: {
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.22)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            transition: `transform 180ms ${designTokens.motion.ease}`,
            '&:active': { transform: 'scale(0.992)' },
            '&.Mui-focusVisible': {
              outline: `2px solid ${palette.brand.primary}`,
              outlineOffset: 2,
              boxShadow: `0 0 0 4px rgba(37, 99, 235, 0.24)`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.radius.pill,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
          clickable: {
            '&.Mui-focusVisible': {
              outline: `2px solid ${palette.brand.primary}`,
              outlineOffset: 2,
              boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.24)`,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: `2px solid ${palette.brand.primary}`,
              outlineOffset: -2,
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'small',
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.88)',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 500,
          },
        },
      },
    },
  })
}
