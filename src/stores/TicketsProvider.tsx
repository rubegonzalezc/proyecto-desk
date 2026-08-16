'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Ticket, TicketComment } from '@/shared/types/ticket'
import {
  buildComment,
  buildTicket,
  createInitialTickets,
  formatTicketTimestamp,
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
        updated = {
          ...ticket,
          ...patch,
          updatedAt: formatTicketTimestamp(),
        }
        return updated
      }),
    )
    return updated
  }, [])

  const addComment = useCallback((ticketId: string, input: AddCommentInput) => {
    const comment = buildComment(input)
    let saved: TicketComment | undefined

    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== ticketId) return ticket
        saved = comment
        return {
          ...ticket,
          comments: [...ticket.comments, comment],
          updatedAt: formatTicketTimestamp(),
        }
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
