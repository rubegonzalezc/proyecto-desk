export type TicketStatus = 'Nuevo' | 'En progreso' | 'Pendiente' | 'Resuelto' | 'Cerrado'
export type TicketPriority = 'Baja' | 'Media' | 'Alta' | 'Crítica'

export interface TicketCommentAttachment {
  id: string
  name: string
  previewUrl?: string
}

export interface TicketComment {
  id: string
  author: string
  role: string
  message: string
  createdAt: string
  attachments?: TicketCommentAttachment[]
}

export interface TicketEvidence {
  id: string
  name: string
  type: 'imagen' | 'documento' | 'log'
  size: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  technician: string
  requester: string
  team: string
  category: string
  createdAt: string
  updatedAt: string
  sla: string
  comments: TicketComment[]
  evidences: TicketEvidence[]
}
