import type { KnowledgeArticle } from '@/shared/types/knowledge'

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'KB-204',
    title: 'Restablecer contraseña de Active Directory',
    category: 'Identidad',
    excerpt: 'Pasos para desbloquear cuentas, forzar cambio en el próximo inicio y notificar al usuario.',
    content: `## Objetivo
Restablecer el acceso de un usuario cuando olvidó su contraseña o la cuenta quedó bloqueada.

## Pasos
1. Verifica la identidad del solicitante según la política del cliente (ticket, llamada o presencial).
2. En el panel de AD, localiza la cuenta y confirma que no tenga restricciones adicionales.
3. Desbloquea la cuenta si aplica y fuerza el cambio de contraseña en el próximo inicio de sesión.
4. Genera una contraseña temporal segura y compártela por el canal aprobado por el cliente.
5. Registra la acción en el ticket y solicita confirmación de acceso.

## Notas
- No reutilices contraseñas temporales entre usuarios.
- Si el usuario trabaja en remoto, valida sincronización con VPN antes de cerrar el caso.`,
    updatedAt: '12 ago 2026',
    views: 842,
    helpful: 96,
  },
  {
    id: 'KB-188',
    title: 'Diagnóstico de Wi-Fi en planta 3',
    category: 'Redes',
    excerpt: 'Checklist de APs, canales y PoE antes de escalar a redes.',
    content: `## Objetivo
Descartar fallas locales de cobertura o energía antes de escalar a redes.

## Checklist
1. Confirma si el problema afecta a un solo usuario, un área o toda la planta.
2. Revisa en el controlador el estado del AP más cercano (online, canal, clientes asociados).
3. Valida alimentación PoE en el switch de acceso y reinicia el puerto si hay err-disable.
4. Pide al usuario una captura de redes visibles y resultado de ping al gateway.
5. Si persisten caídas intermitentes, adjunta logs y escala a redes con el mapa de APs.

## Criterio de cierre
El usuario debe navegar de forma estable durante al menos 15 minutos tras el ajuste.`,
    updatedAt: '8 ago 2026',
    views: 410,
    helpful: 88,
  },
  {
    id: 'KB-176',
    title: 'Imaging de laptops corporativas',
    category: 'Estaciones',
    excerpt: 'Perfil estándar, BitLocker y enrolamiento en MDM.',
    content: `## Objetivo
Entregar un equipo con imagen corporativa estándar y cumplimiento de seguridad.

## Procedimiento
1. Confirma modelo, etiqueta de activo y ticket de onboarding asociado.
2. Aplica la imagen aprobada para el tenant y completa el primer arranque (OOBE).
3. Activa BitLocker y guarda la clave de recuperación en el inventario.
4. Enrola el equipo en MDM y verifica políticas de antivirus y cifrado.
5. Instala el paquete base de aplicaciones y valida acceso a correo y VPN.

## Entrega
Documenta número de serie, hostname y fecha de entrega en el ticket.`,
    updatedAt: '2 ago 2026',
    views: 305,
    helpful: 91,
  },
  {
    id: 'KB-161',
    title: 'Atascos en HP LaserJet 4301',
    category: 'Hardware',
    excerpt: 'Rodillo de recogida, bandeja 2 y firmware recomendado.',
    content: `## Objetivo
Resolver atascos recurrentes en impresoras HP LaserJet 4301 de recepción u oficinas.

## Pasos
1. Apaga la impresora y retira papel visible sin forzar el trayecto interno.
2. Revisa el rodillo de recogida y limpia residuos con paño seco.
3. Confirma que la bandeja 2 esté bien calibrada y sin humedad en el papel.
4. Actualiza firmware si la versión es anterior a la recomendada por el fabricante.
5. Imprime página de prueba y deja ticket en observación 24 h.

## Escalamiento
Si el contador de atascos supera 3 en una semana, abre solicitud de mantenimiento.`,
    updatedAt: '28 jul 2026',
    views: 267,
    helpful: 79,
  },
  {
    id: 'KB-154',
    title: 'Alta de usuario: checklist de onboarding',
    category: 'Procesos',
    excerpt: 'AD, M365, grupos, activos y ticket de entrega.',
    content: `## Objetivo
Estandarizar el alta de un nuevo colaborador en la demo multi-tenant.

## Checklist
1. Crear cuenta en Active Directory con UPN y grupos base del área.
2. Asignar licencia M365 y buzón según plantilla del cliente.
3. Agregar a grupos de seguridad, carpetas compartidas y aplicaciones SaaS.
4. Reservar activos (laptop, monitor, teléfono) y vincular ticket de entrega.
5. Notificar a RR. HH. y al manager con credenciales temporales y fecha de inicio.

## Cierre
El ticket se cierra cuando el usuario confirma acceso a correo, VPN y carpetas.`,
    updatedAt: '21 jul 2026',
    views: 690,
    helpful: 94,
  },
  {
    id: 'KB-140',
    title: 'VPN SSL: reconexión y logs',
    category: 'Acceso remoto',
    excerpt: 'Qué recoger del cliente antes de abrir un ticket a infraestructura.',
    content: `## Objetivo
Recopilar evidencia mínima antes de escalar caídas de VPN SSL.

## Datos a solicitar
1. Hora exacta de la desconexión y frecuencia (cada X minutos).
2. Cliente VPN instalado, versión y sistema operativo.
3. Resultado de ping/traceroute al concentrador publicado.
4. Captura del mensaje de error y export del log del cliente VPN.
5. Confirmar si ocurre solo en red doméstica o también en hotspot móvil.

## Siguiente paso
Con la evidencia completa, escala a infraestructura indicando usuario, ubicación y hora UTC.`,
    updatedAt: '15 jul 2026',
    views: 512,
    helpful: 85,
  },
]

export function getKnowledgeArticleById(id: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find((article) => article.id === id)
}
