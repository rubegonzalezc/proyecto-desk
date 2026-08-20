'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import { useInventoryStore } from '@/stores/InventoryProvider'
import { useToast } from '@/stores/ToastProvider'
import type { MovementType } from '@/shared/types/inventory'
import {
  INVENTORY_USERS,
  INVENTORY_WAREHOUSES,
  MOVEMENT_DESTINATIONS,
  MOVEMENT_SUPPLIERS,
  MOVEMENT_TYPES,
} from '@/shared/constants/inventory-form-options'
import {
  hasBlockingMovementErrors,
  validateNewInventoryMovementForm,
  type NewInventoryMovementFormErrors,
} from '@/shared/validation/inventory-forms'
import { simulateApiDelay } from '@/shared/utils/simulated-delay'

function defaultRouteForType(type: MovementType): { from: string; to: string } {
  switch (type) {
    case 'Entrada':
      return { from: MOVEMENT_SUPPLIERS[0] ?? 'TechDistrib', to: INVENTORY_WAREHOUSES[0] ?? 'Bodega central' }
    case 'Salida':
      return { from: INVENTORY_WAREHOUSES[0] ?? 'Bodega central', to: 'Recepción' }
    case 'Traslado':
      return {
        from: INVENTORY_WAREHOUSES[0] ?? 'Bodega central',
        to: INVENTORY_WAREHOUSES[1] ?? 'Bodega norte',
      }
    case 'Ajuste':
      return { from: INVENTORY_WAREHOUSES[0] ?? 'Bodega central', to: 'Merma / asignado' }
    default:
      return { from: '', to: '' }
  }
}

export default function NewInventoryMovementForm() {
  const router = useRouter()
  const { items, createMovement } = useInventoryStore()
  const { showSuccess, showError } = useToast()

  const [type, setType] = useState<MovementType>('Entrada')
  const [sku, setSku] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [from, setFrom] = useState(defaultRouteForType('Entrada').from)
  const [to, setTo] = useState(defaultRouteForType('Entrada').to)
  const [user, setUser] = useState(INVENTORY_USERS[0] ?? 'Sofía Vega')
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const selectedItem = useMemo(() => items.find((item) => item.sku === sku), [items, sku])

  useEffect(() => {
    if (!sku && items.length > 0) {
      setSku(items[0].sku)
    }
  }, [items, sku])

  const originOptions = useMemo(() => {
    if (type === 'Entrada') return MOVEMENT_SUPPLIERS
    return [...INVENTORY_WAREHOUSES, 'Terreno']
  }, [type])

  const destinationOptions = useMemo(() => {
    if (type === 'Salida') {
      return ['Recepción', 'Técnico AS', 'Merma / asignado']
    }
    if (type === 'Traslado') return INVENTORY_WAREHOUSES
    return MOVEMENT_DESTINATIONS
  }, [type])

  const fieldErrors = useMemo(
    () => validateNewInventoryMovementForm(sku, quantity, from, to, user, type),
    [from, quantity, sku, to, type, user],
  )
  const blocking = hasBlockingMovementErrors(fieldErrors)
  const visibleErrors: NewInventoryMovementFormErrors = showErrors ? fieldErrors : {}

  const handleTypeChange = (nextType: MovementType) => {
    setType(nextType)
    const defaults = defaultRouteForType(nextType)
    setFrom(defaults.from)
    setTo(defaults.to)
    if (nextType === 'Ajuste') {
      setQuantity('-1')
    } else {
      setQuantity('1')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    setShowErrors(true)

    if (blocking) {
      showError('Revisa los campos obligatorios antes de continuar')
      return
    }

    if (!selectedItem) {
      showError('Selecciona un artículo válido del catálogo')
      return
    }

    setSubmitting(true)

    try {
      await simulateApiDelay()

      const created = createMovement({
        type,
        sku: selectedItem.sku,
        item: selectedItem.name,
        quantity: Number(quantity),
        from,
        to,
        user,
      })

      showSuccess(`Movimiento ${created.id} registrado correctamente`)
      router.push('/inventario/movimientos')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="operación" />}
        title="Nuevo movimiento"
        description="Registra entradas, salidas, traslados o ajustes en la demo."
        extra={
          <Button component={Link} href="/inventario/movimientos" variant="outlined">
            Volver a movimientos
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2.5 }}>
              Detalle del movimiento
            </Typography>
            <Stack spacing={2}>
              <TextField
                select
                label="Tipo"
                value={type}
                onChange={(event) => handleTypeChange(event.target.value as MovementType)}
                fullWidth
              >
                {MOVEMENT_TYPES.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Artículo (SKU)"
                value={sku}
                onChange={(event) => setSku(event.target.value)}
                onBlur={() => setShowErrors(true)}
                fullWidth
                required
                error={Boolean(visibleErrors.sku)}
                helperText={visibleErrors.sku ?? (selectedItem ? selectedItem.name : 'Selecciona un SKU')}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.sku) }}
              >
                {items.map((item) => (
                  <MenuItem key={item.sku} value={item.sku}>
                    {item.sku} · {item.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Cantidad"
                type="number"
                fullWidth
                required
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                onBlur={() => setShowErrors(true)}
                error={Boolean(visibleErrors.quantity)}
                helperText={
                  visibleErrors.quantity ??
                  (type === 'Ajuste' ? 'Los ajustes pueden ser negativos' : 'Cantidad positiva')
                }
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.quantity) }}
              />
            </Stack>
          </AppCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Ruta y responsable
            </Typography>
            <Stack spacing={2}>
              <TextField
                select={originOptions.length > 0}
                label="Origen"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                onBlur={() => setShowErrors(true)}
                fullWidth
                required
                error={Boolean(visibleErrors.from)}
                helperText={visibleErrors.from}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.from) }}
              >
                {originOptions.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select={destinationOptions.length > 0}
                label="Destino"
                value={to}
                onChange={(event) => setTo(event.target.value)}
                onBlur={() => setShowErrors(true)}
                fullWidth
                required
                error={Boolean(visibleErrors.to)}
                helperText={visibleErrors.to}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.to) }}
              >
                {destinationOptions.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Registrado por"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                onBlur={() => setShowErrors(true)}
                fullWidth
                required
                error={Boolean(visibleErrors.user)}
                helperText={visibleErrors.user}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.user) }}
              >
                {INVENTORY_USERS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                loading={submitting}
                disabled={submitting || (showErrors && blocking)}
              >
                Registrar movimiento
              </Button>
            </Stack>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}
