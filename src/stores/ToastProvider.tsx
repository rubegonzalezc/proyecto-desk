'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import DynamicIslandToast, { type ToastVariant } from '@/components/ui/DynamicIslandToast'

export type ToastOptions = {
  message: string
  variant?: ToastVariant
  duration?: number
}

type ToastState = {
  open: boolean
  message: string
  variant: ToastVariant
  duration: number
}

type ToastContextValue = {
  showToast: (options: ToastOptions) => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

const DEFAULT_DURATION = 3800

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    variant: 'info',
    duration: DEFAULT_DURATION,
  })

  const showToast = useCallback(({ message, variant = 'info', duration = DEFAULT_DURATION }: ToastOptions) => {
    setToast({ open: true, message, variant, duration })
  }, [])

  const showSuccess = useCallback((message: string) => {
    showToast({ message, variant: 'success' })
  }, [showToast])

  const showError = useCallback((message: string) => {
    showToast({ message, variant: 'error' })
  }, [showToast])

  const showInfo = useCallback((message: string) => {
    showToast({ message, variant: 'info' })
  }, [showToast])

  const handleClose = useCallback(() => {
    setToast((current) => ({ ...current, open: false }))
  }, [])

  const value = useMemo(
    () => ({ showToast, showSuccess, showError, showInfo }),
    [showError, showInfo, showSuccess, showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <DynamicIslandToast
        open={toast.open}
        message={toast.message}
        variant={toast.variant}
        duration={toast.duration}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
