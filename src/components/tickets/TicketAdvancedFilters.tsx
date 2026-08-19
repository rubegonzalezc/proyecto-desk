'use client'

import { Button, Chip, MenuItem, Stack, TextField } from '@mui/material'
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
} from '@/shared/constants/ticket-form-options'
import type { TicketUrlFilters } from '@/shared/utils/ticket-url-filters'

type TicketAdvancedFiltersProps = {
  filters: Pick<TicketUrlFilters, 'prioridad' | 'tecnico' | 'categoria' | 'desde' | 'hasta'>
  technicians: string[]
  hasActiveFilters: boolean
  onChange: (patch: Partial<TicketUrlFilters> & { resetPage?: boolean }) => void
  onClear: () => void
}

const priorityOptions: TicketUrlFilters['prioridad'][] = ['Todas', ...TICKET_PRIORITIES]

export default function TicketAdvancedFilters({
  filters,
  technicians,
  hasActiveFilters,
  onChange,
  onClear,
}: TicketAdvancedFiltersProps) {
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
        <Chip
          size="small"
          label="Prioridad"
          variant="outlined"
          sx={{ fontWeight: 650, pointerEvents: 'none' }}
        />
        {priorityOptions.map((item) => (
          <Chip
            key={item}
            size="small"
            label={item}
            onClick={() => onChange({ prioridad: item, resetPage: true })}
            color={filters.prioridad === item ? 'primary' : 'default'}
            variant={filters.prioridad === item ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1.5}
        alignItems={{ md: 'center' }}
        flexWrap="wrap"
        useFlexGap
      >
        <TextField
          select
          label="Categoría"
          size="small"
          value={filters.categoria}
          onChange={(event) => onChange({ categoria: event.target.value, resetPage: true })}
          sx={{ minWidth: { md: 180 } }}
        >
          <MenuItem value="Todas">Todas</MenuItem>
          {TICKET_CATEGORIES.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Técnico"
          size="small"
          value={filters.tecnico}
          onChange={(event) => onChange({ tecnico: event.target.value, resetPage: true })}
          sx={{ minWidth: { md: 180 } }}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          {technicians.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Desde"
          type="date"
          size="small"
          value={filters.desde}
          onChange={(event) => onChange({ desde: event.target.value, resetPage: true })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: { md: 150 } }}
        />

        <TextField
          label="Hasta"
          type="date"
          size="small"
          value={filters.hasta}
          onChange={(event) => onChange({ hasta: event.target.value, resetPage: true })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: { md: 150 } }}
        />

        {hasActiveFilters ? (
          <Button size="small" variant="outlined" onClick={onClear} sx={{ alignSelf: { xs: 'stretch', md: 'center' } }}>
            Limpiar filtros
          </Button>
        ) : null}
      </Stack>
    </Stack>
  )
}
