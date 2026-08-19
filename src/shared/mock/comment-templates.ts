export type CommentTemplate = {
  id: string
  label: string
  body: string
}

export const commentTemplates: CommentTemplate[] = [
  {
    id: 'info',
    label: 'Pedir información',
    body:
      'Hola, para avanzar con tu solicitud necesitamos un poco más de detalle:\n\n' +
      '• ¿Desde cuándo ocurre el problema?\n' +
      '• ¿Afecta a un solo equipo o a varios usuarios?\n' +
      '• ¿Puedes adjuntar una captura de pantalla del error?\n\n' +
      'Quedamos atentos a tu respuesta.',
  },
  {
    id: 'en-revision',
    label: 'En revisión',
    body:
      'Hemos recibido tu ticket y ya está en revisión por el equipo de soporte. ' +
      'Te mantendremos informado/a sobre cualquier avance relevante.',
  },
  {
    id: 'solucion',
    label: 'Solución aplicada',
    body:
      'Se aplicó la corrección correspondiente. Por favor valida que el servicio vuelva a funcionar con normalidad. ' +
      'Si el inconveniente persiste, responde a este hilo con el detalle.',
  },
  {
    id: 'seguimiento',
    label: 'Seguimiento',
    body:
      'Te escribimos para dar seguimiento a este caso. ¿Pudiste verificar si la situación quedó resuelta? ' +
      'Si aún presentas inconvenientes, indícanos qué persiste para continuar con la gestión.',
  },
  {
    id: 'escalado',
    label: 'Escalado',
    body:
      'El caso fue escalado al equipo especializado para un análisis más profundo. ' +
      'Te contactaremos en cuanto tengamos una actualización o una acción concreta.',
  },
  {
    id: 'cierre',
    label: 'Cierre pendiente',
    body:
      'Consideramos el ticket listo para cierre. Si no recibimos observaciones en las próximas horas, ' +
      'lo marcaremos como resuelto. Gracias por tu colaboración.',
  },
]
