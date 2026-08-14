'use client'

import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { Box, InputAdornment, Menu, MenuItem, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import TenantLogo from '@/components/brand/TenantLogo'
import { useTenant } from './TenantProvider'

export default function TenantSwitcher() {
  const { tenant, tenants, recentTenants, setTenantId } = useTenant()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [query, setQuery] = useState('')
  const open = Boolean(anchorEl)
  const searching = query.trim().length > 0

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return recentTenants
    return tenants.filter((item) => {
      const haystack = `${item.name} ${item.domain} ${item.plan} ${item.region}`.toLowerCase()
      return haystack.includes(term)
    })
  }, [query, recentTenants, tenants])

  const close = () => {
    setAnchorEl(null)
    setQuery('')
  }

  const select = (id: string) => {
    setTenantId(id)
    close()
  }

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        className="press-feedback"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          border: 0,
          cursor: 'pointer',
          height: 44,
          pl: 0.6,
          pr: 1,
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.55)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
        }}
      >
        <TenantLogo logo={tenant.logo} name={tenant.name} size={30} />
        <Box sx={{ textAlign: 'left', display: { xs: 'none', md: 'block' }, minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 750, letterSpacing: '-0.02em', lineHeight: 1.15 }} noWrap>
            {tenant.name}
          </Typography>
          <Typography sx={{ fontSize: 10.5, color: 'text.secondary', fontWeight: 600 }} noWrap>
            Cliente · {tenant.plan}
          </Typography>
        </Box>
        <KeyboardArrowDownRounded sx={{ fontSize: 18, color: 'text.secondary' }} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        autoFocus={false}
        disableAutoFocusItem
        slotProps={{
          paper: { sx: { width: 320, mt: 1.25, borderRadius: '20px', p: 0.75 } },
          list: { sx: { py: 0.5 } },
        }}
      >
        <Box sx={{ px: 0.75, pb: 0.75 }} onKeyDown={(event) => event.stopPropagation()}>
          <TextField
            autoFocus
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar empresa"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px', height: 40 } }}
          />
        </Box>
        <Typography
          sx={{
            px: 1.5,
            py: 0.6,
            fontSize: 10.5,
            fontWeight: 750,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text.secondary',
          }}
        >
          {searching ? 'Resultados' : 'Recientes'}
        </Typography>
        {results.length === 0 ? (
          <Box sx={{ px: 1.5, py: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              No hay empresas con ese filtro.
            </Typography>
          </Box>
        ) : (
          results.map((item) => (
            <MenuItem
              key={item.id}
              selected={item.id === tenant.id}
              onClick={() => select(item.id)}
              sx={{ borderRadius: 2, py: 1.05, gap: 1.25, mx: 0.25 }}
            >
              <TenantLogo logo={item.logo} name={item.name} size={28} />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700 }} noWrap>
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {item.domain} · {item.plan}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  )
}
