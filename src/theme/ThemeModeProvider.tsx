'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PaletteMode } from '@mui/material'
import { loadThemeMode, saveThemeMode } from '@/shared/config/ui-preferences-storage'

type ThemeModeContextValue = {
  mode: PaletteMode
  toggleMode: () => void
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadThemeMode()
    if (saved) setMode(saved)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveThemeMode(mode)
  }, [hydrated, mode])

  const toggleMode = useCallback(() => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode])

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider')
  }
  return context
}
