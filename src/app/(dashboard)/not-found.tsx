import SearchOffOutlined from '@mui/icons-material/SearchOffOutlined'
import ErrorPage from '@/components/ui/ErrorPage'

export default function DashboardNotFound() {
  return (
    <ErrorPage
      variant="embedded"
      code="404"
      title="Página no encontrada"
      description="El recurso no está disponible en SynchroDesk. Puede haber sido movido o aún no implementado en el prototipo."
      actionLabel="Volver al dashboard"
      actionHref="/dashboard"
      icon={<SearchOffOutlined />}
    />
  )
}
