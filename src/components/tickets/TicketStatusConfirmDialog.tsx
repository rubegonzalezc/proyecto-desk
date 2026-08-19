'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import type { TicketStatus } from '@/shared/types/ticket'

const CONFIRM_COPY: Record<'Resuelto' | 'Cerrado', { title: string; description: string; confirm: string }> = {
  Resuelto: {
    title: '¿Marcar ticket como resuelto?',
    description:
      'El ticket pasará a estado Resuelto. El solicitante podrá verificar la solución antes del cierre definitivo.',
    confirm: 'Confirmar resolución',
  },
  Cerrado: {
    title: '¿Cerrar este ticket?',
    description:
      'El ticket quedará cerrado y saldrá de la cola activa. Esta acción es habitual al finalizar la gestión en la demo.',
    confirm: 'Confirmar cierre',
  },
}

type TicketStatusConfirmDialogProps = {
  status: 'Resuelto' | 'Cerrado' | null
  ticketId: string
  onCancel: () => void
  onConfirm: () => void
}

export default function TicketStatusConfirmDialog({
  status,
  ticketId,
  onCancel,
  onConfirm,
}: TicketStatusConfirmDialogProps) {
  if (!status) return null

  const copy = CONFIRM_COPY[status]

  return (
    <Dialog open onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{copy.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {copy.description}
        </DialogContentText>
        <DialogContentText sx={{ mt: 1.5, color: 'text.secondary' }}>
          Ticket: <strong>{ticketId}</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onCancel} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" autoFocus>
          {copy.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function requiresStatusConfirmation(status: TicketStatus): status is 'Resuelto' | 'Cerrado' {
  return status === 'Resuelto' || status === 'Cerrado'
}
