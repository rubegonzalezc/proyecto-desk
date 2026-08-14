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
import { usePathname, useRouter } from 'next/navigation'
import {
  appSystems,
  getSystemById,
  getSystemByPath,
  type SystemId,
} from '@/shared/systems'

type WorkspaceContextValue = {
  activeId: SystemId
  openIds: SystemId[]
  openSystem: (id: SystemId) => void
  closeSystem: (id: SystemId) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const active = getSystemByPath(pathname)

  const [openIds, setOpenIds] = useState<SystemId[]>(['helpdesk'])
  const [lastPath, setLastPath] = useState<Record<SystemId, string>>({
    helpdesk: '/dashboard',
    inventario: '/inventario',
  })

  useEffect(() => {
    setOpenIds((current) => (current.includes(active.id) ? current : [...current, active.id]))
    setLastPath((current) => ({ ...current, [active.id]: pathname }))
  }, [active.id, pathname])

  const openSystem = useCallback(
    (id: SystemId) => {
      setOpenIds((current) => (current.includes(id) ? current : [...current, id]))
      const target = lastPath[id] ?? getSystemById(id).home
      if (target !== pathname) router.push(target)
    },
    [lastPath, pathname, router],
  )

  const closeSystem = useCallback(
    (id: SystemId) => {
      if (id === 'helpdesk') return
      setOpenIds((current) => {
        const next = current.filter((item) => item !== id)
        return next.length === 0 ? current : next
      })
      if (active.id === id) {
        router.push(lastPath.helpdesk ?? '/dashboard')
      }
    },
    [active.id, lastPath.helpdesk, router],
  )

  const value = useMemo(
    () => ({
      activeId: active.id,
      openIds: appSystems.map((system) => system.id).filter((id) => openIds.includes(id)),
      openSystem,
      closeSystem,
    }),
    [active.id, closeSystem, openIds, openSystem],
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider')
  }
  return context
}
