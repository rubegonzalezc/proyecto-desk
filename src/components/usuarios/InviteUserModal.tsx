'use client'

import { useState, type FormEvent } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { USER_ROLES, USER_TEAMS, isValidInviteEmail } from '@/shared/constants/user-form-options'
import { useToast } from '@/stores/ToastProvider'
import { simulateApiDelay } from '@/shared/utils/simulated-delay'

type InviteUserModalProps = {
  open: boolean
  onClose: () => void
}

const defaultRole = USER_ROLES.includes('Agente de mesa') ? 'Agente de mesa' : USER_ROLES[0]
const defaultTeam = USER_TEAMS.includes('Mesa de ayuda') ? 'Mesa de ayuda' : USER_TEAMS[0]

export default function InviteUserModal({ open, onClose }: InviteUserModalProps) {
  const { showSuccess, showError } = useToast()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(defaultRole)
  const [team, setTeam] = useState(defaultTeam)
  const [submitting, setSubmitting] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const emailError = showErrors && !isValidInviteEmail(email) ? 'Ingresa un correo válido' : undefined

  const resetForm = () => {
    setEmail('')
    setRole(defaultRole)
    setTeam(defaultTeam)
    setShowErrors(false)
  }

  const handleClose = () => {
    if (submitting) return
    resetForm()
    onClose()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    setShowErrors(true)
    if (!isValidInviteEmail(email)) {
      showError('Revisa el correo antes de enviar la invitación')
      return
    }

    setSubmitting(true)
    try {
      await simulateApiDelay()
      showSuccess(`Invitación enviada a ${email.trim()}`)
      resetForm()
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Invitar usuario</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Simula el alta de un usuario sin Supabase Auth. La invitación no se guarda en el listado de la demo.
          </Typography>
          <Stack spacing={2} sx={{ pt: 0.5 }}>
            <TextField
              label="Correo"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@empresa.com"
              fullWidth
              required
              error={Boolean(emailError)}
              helperText={emailError}
              autoFocus
            />
            <TextField
              select
              label="Rol"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              fullWidth
            >
              {USER_ROLES.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Equipo"
              value={team}
              onChange={(event) => setTeam(event.target.value)}
              fullWidth
            >
              {USER_TEAMS.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={handleClose} variant="outlined" disabled={submitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" loading={submitting} disabled={submitting}>
            Enviar invitación
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
