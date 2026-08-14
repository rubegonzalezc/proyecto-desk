'use client'

import { useState } from 'react'
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import ImageAttachField, { filesToLocalImages, type LocalImage } from '@/components/tickets/ImageAttachField'

const categories = ['Conectividad', 'Hardware', 'Correo', 'Acceso remoto', 'Solicitud', 'Seguridad', 'Licencias']
const priorities = ['Baja', 'Media', 'Alta', 'Crítica']
const technicians = ['Sin asignar', 'Carlos Soto', 'Elena Ruiz', 'Sofía Vega', 'Andrés Silva']

export default function NewTicketForm() {
  const [images, setImages] = useState<LocalImage[]>([])
  return (
    <Box>
      <PageHeader
        eyebrow="Tickets"
        title="Crear ticket"
        description="Formulario visual de demostración. No envía ni persiste datos."
        extra={
          <Button component={Link} href="/tickets" variant="outlined">
            Volver a la cola
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2.5 }}>
              Detalle de la solicitud
            </Typography>
            <Stack spacing={2}>
              <TextField label="Asunto" placeholder="Ej. No hay acceso a internet en planta 3" fullWidth />
              <TextField
                label="Descripción"
                placeholder="Describe el impacto, desde cuándo ocurre y qué se intentó."
                fullWidth
                multiline
                minRows={5}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField select label="Categoría" defaultValue="Conectividad" fullWidth>
                    {categories.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField select label="Prioridad" defaultValue="Media" fullWidth>
                    {priorities.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Stack>
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <AppCard lift={false} sx={{ mb: 2.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Asignación
            </Typography>
            <Stack spacing={2}>
              <TextField label="Solicitante" defaultValue="Elena Ruiz" fullWidth />
              <TextField select label="Técnico" defaultValue="Sin asignar" fullWidth>
                {technicians.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="Equipo" defaultValue="Mesa de ayuda" fullWidth />
            </Stack>
          </AppCard>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Evidencias
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Adjunta capturas. En el prototipo no se suben al servidor.
            </Typography>
            <ImageAttachField
              images={images}
              onAdd={(incoming) => {
                const next = filesToLocalImages(incoming)
                setImages((current) => {
                  const ids = new Set(current.map((item) => item.id))
                  return [...current, ...next.filter((item) => !ids.has(item.id))]
                })
              }}
              onRemove={(id) => {
                const target = images.find((item) => item.id === id)
                if (target) URL.revokeObjectURL(target.previewUrl)
                setImages((current) => current.filter((item) => item.id !== id))
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} disabled>
              Crear ticket (demo)
            </Button>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}
