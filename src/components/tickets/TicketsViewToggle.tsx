'use client'

import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import type { TicketViewMode } from '@/shared/utils/ticket-url-filters'

type TicketsViewToggleProps = {
  value: TicketViewMode
  onChange: (value: TicketViewMode) => void
}

export default function TicketsViewToggle({ value, onChange }: TicketsViewToggleProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_event, next: TicketViewMode | null) => {
        if (next) onChange(next)
      }}
      aria-label="Vista de tickets"
    >
      <ToggleButton value="tabla" aria-label="Vista tabla">
        Tabla
      </ToggleButton>
      <ToggleButton value="kanban" aria-label="Vista Kanban">
        <ViewKanbanOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
        Kanban
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
