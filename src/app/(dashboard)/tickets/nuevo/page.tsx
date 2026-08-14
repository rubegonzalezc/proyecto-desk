import type { Metadata } from 'next'
import NewTicketForm from './NewTicketForm'

export const metadata: Metadata = {
  title: 'Crear ticket',
}

export default function NewTicketPage() {
  return <NewTicketForm />
}
