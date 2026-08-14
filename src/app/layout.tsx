import type { ReactNode } from 'react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import ThemeRegistry from '@/theme/ThemeRegistry'
import '@/app/globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SynchroDesk — Mesa de ayuda IT',
    template: '%s · SynchroDesk',
  },
  description: 'Plataforma de gestión de tickets y soporte técnico',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={plusJakarta.variable}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
