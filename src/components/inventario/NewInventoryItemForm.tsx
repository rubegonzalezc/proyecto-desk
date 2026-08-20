'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Link from 'next/link'
import AppCard from '@/components/ui/AppCard'
import PageHeader from '@/components/ui/PageHeader'
import TenantEyebrow from '@/components/layout/TenantEyebrow'
import { useInventoryStore } from '@/stores/InventoryProvider'
import { useToast } from '@/stores/ToastProvider'
import {
  INVENTORY_CATEGORIES,
  INVENTORY_UNITS,
  INVENTORY_WAREHOUSES,
} from '@/shared/constants/inventory-form-options'
import { deriveStockStatus } from '@/shared/utils/inventory-status'
import {
  hasBlockingItemErrors,
  validateNewInventoryItemForm,
  type NewInventoryItemFormErrors,
} from '@/shared/validation/inventory-forms'
import { simulateApiDelay } from '@/shared/utils/simulated-delay'

export default function NewInventoryItemForm() {
  const router = useRouter()
  const { items, createItem } = useInventoryStore()
  const { showSuccess, showError } = useToast()

  const [sku, setSku] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState(INVENTORY_CATEGORIES[0] ?? 'Consumibles')
  const [warehouse, setWarehouse] = useState(INVENTORY_WAREHOUSES[0] ?? 'Bodega central')
  const [stock, setStock] = useState('0')
  const [min, setMin] = useState('1')
  const [unit, setUnit] = useState(INVENTORY_UNITS[0] ?? 'unid.')
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const existingSkus = useMemo(() => items.map((item) => item.sku), [items])

  const fieldErrors = useMemo(
    () => validateNewInventoryItemForm(sku, name, stock, min, existingSkus),
    [existingSkus, min, name, sku, stock],
  )
  const blocking = hasBlockingItemErrors(fieldErrors)
  const visibleErrors: NewInventoryItemFormErrors = showErrors ? fieldErrors : {}

  const previewStatus = useMemo(() => {
    const stockValue = Number(stock)
    const minValue = Number(min)
    if (Number.isNaN(stockValue) || Number.isNaN(minValue)) return '—'
    return deriveStockStatus(Math.max(0, stockValue), Math.max(0, minValue))
  }, [min, stock])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    setShowErrors(true)

    if (blocking) {
      showError('Revisa los campos obligatorios antes de continuar')
      return
    }

    setSubmitting(true)

    try {
      await simulateApiDelay()

      const created = createItem({
        sku: sku.trim().toUpperCase(),
        name: name.trim(),
        category,
        warehouse,
        stock: Number(stock),
        min: Number(min),
        unit,
      })

      showSuccess(`Artículo ${created.sku} registrado correctamente`)
      router.push('/inventario/articulos')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <PageHeader
        eyebrow={<TenantEyebrow suffix="catálogo" />}
        title="Nuevo artículo"
        description="Alta de SKU en el catálogo de inventario de la demo."
        extra={
          <Button component={Link} href="/inventario/articulos" variant="outlined">
            Volver al catálogo
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2.5 }}>
              Datos del artículo
            </Typography>
            <Stack component="fieldset" spacing={2} sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
              <Box component="legend" className="sd-sr-only">
                Datos del artículo
              </Box>
              <TextField
                label="SKU"
                placeholder="Ej. SKU-9901"
                fullWidth
                required
                autoFocus
                value={sku}
                onChange={(event) => setSku(event.target.value.toUpperCase())}
                onBlur={() => setShowErrors(true)}
                error={Boolean(visibleErrors.sku)}
                helperText={visibleErrors.sku ?? 'Formato SKU-0000'}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.sku) }}
              />
              <TextField
                label="Nombre"
                placeholder="Ej. Toner HP 58A"
                fullWidth
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => setShowErrors(true)}
                error={Boolean(visibleErrors.name)}
                helperText={visibleErrors.name}
                inputProps={{ 'aria-invalid': Boolean(visibleErrors.name) }}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Categoría"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    fullWidth
                  >
                    {INVENTORY_CATEGORIES.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Almacén"
                    value={warehouse}
                    onChange={(event) => setWarehouse(event.target.value)}
                    fullWidth
                  >
                    {INVENTORY_WAREHOUSES.map((item) => (
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
          <AppCard lift={false}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Stock
            </Typography>
            <Stack component="fieldset" spacing={2} sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
              <Box component="legend" className="sd-sr-only">
                Niveles de stock
              </Box>
              <TextField
                label="Stock actual"
                type="number"
                fullWidth
                required
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                onBlur={() => setShowErrors(true)}
                error={Boolean(visibleErrors.stock)}
                helperText={visibleErrors.stock}
                inputProps={{ min: 0, 'aria-invalid': Boolean(visibleErrors.stock) }}
              />
              <TextField
                label="Stock mínimo"
                type="number"
                fullWidth
                required
                value={min}
                onChange={(event) => setMin(event.target.value)}
                onBlur={() => setShowErrors(true)}
                error={Boolean(visibleErrors.min)}
                helperText={visibleErrors.min}
                inputProps={{ min: 0, 'aria-invalid': Boolean(visibleErrors.min) }}
              />
              <TextField
                select
                label="Unidad"
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                fullWidth
              >
                {INVENTORY_UNITS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'action.hover',
                }}
              >
                <Typography variant="caption" color="text.secondary" display="block">
                  Estado calculado
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{previewStatus}</Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                loading={submitting}
                disabled={submitting || (showErrors && blocking)}
              >
                Registrar artículo
              </Button>
            </Stack>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  )
}
