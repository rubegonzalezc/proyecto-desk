# SynchroDesk — guía de diseño

Prototipo visual de mesa de ayuda IT. Apple Liquid Enterprise: glass suave, sidebar navy, motion tipo iOS, sin estética fintech.

## Arranque

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Redirige a `/dashboard`.

## Tokens

| Token | Valor |
|---|---|
| Primary | `#2563EB` |
| Background | `#F3F6FB` |
| Surface | `#FFFFFF` |
| Navy | `#0F172A` |
| Success / Warning / Error | `#10B981` / `#F59E0B` / `#EF4444` |
| Radius glass | `24px` |
| Blur | `24px` + saturate `180%` |
| Ease | `cubic-bezier(0.22, 1, 0.36, 1)` |

Fuente: Plus Jakarta Sans (`next/font/google`), con fallback a SF Pro / sistema.

## Motion

- Hover: `translateY(-4px) scale(1.005)`
- Press: `scale(0.992)`
- Entrada: `fade-up` + `stagger`
- Clases: `src/styles/design-system.css`

## Componentes

| Componente | Uso |
|---|---|
| `AppCard` | Contenedor liquid glass o sólido |
| `StatCard` | KPI del dashboard |
| `TicketRow` | Fila de ticket (fondo sólido) |
| `AppTable` | Toolbar glass + filas blancas |
| `PermissionMatrix` | Checkboxes por módulo/acción |
| `PrototypeBadge` | Leyenda de demo estática |

## Dark mode

Toggle en el header. Estado en memoria (`ThemeModeProvider`). Sin `localStorage`.

- Fondo: `#020617`
- Superficie: `#0F172A`
- Bordes: blanco 12%

## Datos

Todo vive en `src/shared/mock/`. No hay API, auth ni persistencia.

## Rutas

`/dashboard` · `/tickets` · `/tickets/nuevo` · `/tickets/[id]` · `/usuarios` · `/roles` · `/roles/nuevo` · `/roles/[id]` · `/equipos` · `/activos` · `/conocimiento` · `/configuracion`
