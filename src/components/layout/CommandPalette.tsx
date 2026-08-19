'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { Box, Dialog, InputAdornment, TextField, Typography } from '@mui/material'
import { useTenant } from '@/components/layout/TenantProvider'
import { useCommandPalette } from '@/components/layout/CommandPaletteProvider'
import SearchResultsList, { useSearchResultsFlat } from '@/components/layout/SearchResultsList'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { users } from '@/shared/mock/users'
import { tenants } from '@/shared/mock/tenants'
import { searchGlobal, type SearchResult } from '@/shared/search/global-search'
import { useTicketsStore } from '@/stores/TicketsProvider'

export default function CommandPalette() {
  const router = useRouter()
  const { tenant } = useTenant()
  const { tickets } = useTicketsStore()
  const { open, closePalette } = useCommandPalette()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const debouncedQuery = useDebouncedValue(query, 300)

  const groupedResults = useMemo(
    () =>
      searchGlobal({
        query: debouncedQuery,
        tickets,
        users,
        tenants,
        tenantId: tenant.id,
      }),
    [debouncedQuery, tenant.id, tickets],
  )

  const flatResults = useSearchResultsFlat(groupedResults)

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIndex(0)
      return
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [debouncedQuery])

  const navigateTo = (result: SearchResult) => {
    closePalette()
    router.push(result.href)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closePalette()
      return
    }

    if (!flatResults.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % flatResults.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + flatResults.length) % flatResults.length)
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const selected = flatResults[activeIndex]
      if (selected) navigateTo(selected)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={closePalette}
      fullWidth
      maxWidth="sm"
      aria-labelledby="command-palette-title"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(2, 6, 23, 0.42)',
          },
        },
        paper: {
          className: 'liquid-glass',
          sx: {
            borderRadius: '24px',
            overflow: 'hidden',
            mt: { xs: 4, sm: 10 },
            alignSelf: 'flex-start',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, p: 0.5 }}>
        <Typography
          id="command-palette-title"
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            p: 0,
            m: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          Búsqueda rápida
        </Typography>

        <TextField
          inputRef={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar tickets, clientes, usuarios o rutas…"
          fullWidth
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              px: 1.25,
              '& fieldset': { border: 'none' },
            },
          }}
        />

        <Box sx={{ maxHeight: 360, overflowY: 'auto', px: 0.75, pb: 1 }}>
          <SearchResultsList
            groupedResults={groupedResults}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            onSelect={navigateTo}
            query={query}
            debouncedQuery={debouncedQuery}
          />
        </Box>

        <Box
          sx={{
            px: 1.75,
            py: 1.1,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Hint label="↑↓" detail="navegar" />
          <Hint label="Enter" detail="abrir" />
          <Hint label="Esc" detail="cerrar" />
          <Hint label="⌘K" detail="alternar" />
        </Box>
      </Box>
    </Dialog>
  )
}

function Hint({ label, detail }: { label: string; detail: string }) {
  return (
    <Typography variant="caption" color="text.secondary">
      <Box
        component="span"
        sx={{
          fontWeight: 700,
          px: 0.6,
          py: 0.15,
          mr: 0.5,
          borderRadius: '6px',
          bgcolor: 'action.hover',
          fontFamily: 'monospace',
        }}
      >
        {label}
      </Box>
      {detail}
    </Typography>
  )
}
