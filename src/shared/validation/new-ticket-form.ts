export type NewTicketFormErrors = {
  title?: string
  description?: string
}

export function validateNewTicketForm(title: string, description: string): NewTicketFormErrors {
  const errors: NewTicketFormErrors = {}

  if (!title.trim()) {
    errors.title = 'El asunto es obligatorio'
  }

  if (!description.trim()) {
    errors.description = 'La descripción es obligatoria'
  }

  return errors
}

export function hasBlockingErrors(errors: NewTicketFormErrors): boolean {
  return Boolean(errors.title || errors.description)
}
