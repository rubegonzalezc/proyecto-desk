'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { InventoryItem, InventoryMovement } from '@/shared/types/inventory'
import { loadInventorySession, saveInventorySession } from '@/shared/config/inventory-session-storage'
import {
  buildInventoryItem,
  buildInventoryMovement,
  createInitialItems,
  createInitialMovements,
  type CreateInventoryItemInput,
  type CreateInventoryMovementInput,
} from './inventory-store'

type InventoryContextValue = {
  items: InventoryItem[]
  movements: InventoryMovement[]
  listItems: () => InventoryItem[]
  listMovements: () => InventoryMovement[]
  createItem: (input: CreateInventoryItemInput) => InventoryItem
  createMovement: (input: CreateInventoryMovementInput) => InventoryMovement
}

const InventoryContext = createContext<InventoryContextValue | null>(null)

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InventoryItem[]>(createInitialItems)
  const [movements, setMovements] = useState<InventoryMovement[]>(createInitialMovements)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadInventorySession()
    if (saved) {
      setItems(saved.items)
      setMovements(saved.movements)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveInventorySession({ items, movements })
  }, [hydrated, items, movements])

  const listItems = useCallback(() => items, [items])
  const listMovements = useCallback(() => movements, [movements])

  const createItem = useCallback((input: CreateInventoryItemInput) => {
    let created!: InventoryItem
    setItems((current) => {
      created = buildInventoryItem(input)
      return [created, ...current]
    })
    return created
  }, [])

  const createMovement = useCallback((input: CreateInventoryMovementInput) => {
    let created!: InventoryMovement
    setMovements((current) => {
      created = buildInventoryMovement(input, current)
      return [created, ...current]
    })
    return created
  }, [])

  const value = useMemo(
    () => ({
      items,
      movements,
      listItems,
      listMovements,
      createItem,
      createMovement,
    }),
    [createItem, createMovement, items, listItems, listMovements, movements],
  )

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

export function useInventoryStore() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventoryStore must be used within InventoryProvider')
  }
  return context
}
