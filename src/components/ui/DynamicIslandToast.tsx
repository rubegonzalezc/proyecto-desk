'use client'

import { useEffect, useRef } from 'react'
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { Box, Fade, Slide, Typography, useMediaQuery, useTheme } from '@mui/material'

export type ToastVariant = 'success' | 'error' | 'info'

type DynamicIslandToastProps = {
  open: boolean
  message: string
  variant: ToastVariant
  duration: number
  onClose: () => void
}

const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircleOutlineRounded; accent: string; glow: string }
> = {
  success: {
    icon: CheckCircleOutlineRounded,
    accent: '#34D399',
    glow: 'rgba(52, 211, 153, 0.35)',
  },
  error: {
    icon: ErrorOutlineRounded,
    accent: '#F87171',
    glow: 'rgba(248, 113, 113, 0.35)',
  },
  info: {
    icon: InfoOutlined,
    accent: '#60A5FA',
    glow: 'rgba(96, 165, 250, 0.35)',
  },
}

export default function DynamicIslandToast({
  open,
  message,
  variant,
  duration,
  onClose,
}: DynamicIslandToastProps) {
  const theme = useTheme()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { icon: Icon, accent, glow } = variantConfig[variant]
  const isDark = theme.palette.mode === 'dark'

  useEffect(() => {
    if (!open) return undefined

    timerRef.current = setTimeout(onClose, duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [duration, message, onClose, open, variant])

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="dynamic-island-toast"
      sx={{
        position: 'fixed',
        top: { xs: 16, sm: 20 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: theme.zIndex.snackbar,
        pointerEvents: 'none',
        width: 'min(92vw, 420px)',
      }}
    >
      <Slide direction="down" in={open} mountOnEnter unmountOnExit timeout={reduceMotion ? 0 : undefined}>
        <Fade in={open} timeout={reduceMotion ? { enter: 0, exit: 0 } : { enter: 280, exit: 220 }}>
          <Box
            data-reduced-motion-inner
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2,
              py: 1.15,
              borderRadius: '999px',
              bgcolor: isDark ? 'rgba(15, 23, 42, 0.88)' : 'rgba(15, 23, 42, 0.92)',
              color: '#F8FAFC',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              boxShadow: `0 12px 40px rgba(2, 6, 23, 0.45), 0 0 0 1px rgba(255,255,255,0.04), 0 0 24px ${glow}`,
              minHeight: 44,
              transition: reduceMotion ? 'none' : 'box-shadow 0.3s ease, transform 0.3s ease',
              animation: !reduceMotion && open ? 'islandPulse 0.45s ease' : 'none',
              '@keyframes islandPulse': {
                '0%': { transform: 'scale(0.92)', opacity: 0 },
                '60%': { transform: 'scale(1.02)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                bgcolor: `${accent}22`,
                color: accent,
                flexShrink: 0,
              }}
            >
              <Icon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.01em',
                lineHeight: 1.35,
                flex: 1,
                pr: 0.5,
              }}
            >
              {message}
            </Typography>
          </Box>
        </Fade>
      </Slide>
    </Box>
  )
}
