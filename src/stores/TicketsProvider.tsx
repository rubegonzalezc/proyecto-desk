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
import type { Ticket, TicketComment } from '@/shared/types/ticket'
import { loadTicketsSession, saveTicketsSession } from '@/shared/config/tickets-session-storage'
import { ensureTicketActivity } from '@/shared/utils/ticket-activity'
import {
  appendCommentToTicket,
  applyTicketPatch,
  buildTicket,
  createInitialTickets,
  type AddCommentInput,
  type CreateTicketInput,
  type UpdateTicketInput,
} from './tickets-store'

type TicketsContextValue = {
  tickets: Ticket[]
  listTickets: () => Ticket[]
  getTicketById: (id: string) => Ticket | undefined
  createTicket: (input: CreateTicketInput) => Ticket
  updateTicket: (id: string, patch: UpdateTicketInput) => Ticket | undefined
  addComment: (ticketId: string, input: AddCommentInput) => TicketComment | undefined
}

const TicketsContext = createContext<TicketsContextValue | null>(null)

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(createInitialTickets)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadTicketsSession()
    if (saved?.length) setTickets(saved.map(ensureTicketActivity))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveTicketsSession(tickets)
  }, [hydrated, tickets])

  const listTickets = useCallback(() => tickets, [tickets])

  const getTicketById = useCallback(
    (id: string) => tickets.find((ticket) => ticket.id === id),
    [tickets],
  )

  const createTicket = useCallback((input: CreateTicketInput) => {
    let created!: Ticket
    setTickets((current) => {
      created = buildTicket(input, current)
      return [created, ...current]
    })
    return created
  }, [])

  const updateTicket = useCallback((id: string, patch: UpdateTicketInput) => {
    let updated: Ticket | undefined
    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== id) return ticket
        updated = applyTicketPatch(ticket, patch)
        return updated
      }),
    )
    return updated
  }, [])

  const addComment = useCallback((ticketId: string, input: AddCommentInput) => {
    let saved: TicketComment | undefined

    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== ticketId) return ticket
        const result = appendCommentToTicket(ticket, input)
        saved = result.comment
        return result.ticket
      }),
    )

    return saved
  }, [])

  const value = useMemo(
    () => ({
      tickets,
      listTickets,
      getTicketById,
      createTicket,
      updateTicket,
      addComment,
    }),
    [addComment, createTicket, getTicketById, listTickets, tickets, updateTicket],
  )

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
}

export function useTicketsStore() {
  const context = useContext(TicketsContext)
  if (!context) {
    throw new Error('useTicketsStore must be used within TicketsProvider')
  }
  return context
}
