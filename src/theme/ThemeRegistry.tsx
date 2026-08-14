'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeModeProvider, useThemeMode } from './ThemeModeProvider'
import { createAppTheme } from './theme'

type EmotionCache = ReturnType<typeof createCache> & { compat?: boolean }

function createMuiCache() {
  const cache = createCache({ key: 'mui' }) as EmotionCache
  cache.compat = true
  const prevInsert = cache.insert
  let inserted: string[] = []
  cache.insert = (...args: Parameters<typeof cache.insert>) => {
    const serialized = args[1]
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name)
    }
    return prevInsert(...args)
  }
  const flush = () => {
    const names = inserted
    inserted = []
    return names
  }
  return { cache, flush }
}

function ThemeRegistryInner({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode()
  const theme = useMemo(() => createAppTheme(mode), [mode])
  const [{ cache, flush }] = useState(() => createMuiCache())

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeModeProvider>
      <ThemeRegistryInner>{children}</ThemeRegistryInner>
    </ThemeModeProvider>
  )
}
