# SynchroDesk — guía de diseño

Prototipo visual **Apple Liquid Enterprise**: glass suave, sidebar navy, motion tipo iOS. Sin estética fintech ni tinte lila.

## Arranque

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) → `/login`.

## Identidad

- Producto: SynchroDesk
- Operador: SynchroDev
- Tenant de demo: Google (logo en chrome)
- Consola: administrador de plataforma

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

Fuente: Plus Jakarta Sans (`next/font/google`), fallback SF Pro / sistema.

## Motion

- Hover: `translateY(-4px) scale(1.005)`
- Press: `scale(0.992)`
- Entrada: `fade-up` + `stagger`
- Clases: `src/styles/design-system.css`

## Shell

- Sidebar flotante (28px radius), agrupado, contextual al sistema
- Header glass + selector de tenant (5 recientes + búsqueda)
- Pestañas de sistema al abrir más de uno
- Login a pantalla completa (`AuthShell`), sin sidebar

## Componentes

| Componente | Uso |
|---|---|
| `AppCard` | Contenedor liquid glass o sólido |
| `StatCard` | KPI |
| `TicketRow` | Fila de ticket (fondo sólido) |
| `AppTable` | Toolbar glass + filas blancas |
| `PermissionMatrix` | Permisos por sistema / módulo |
| `TenantLogo` / `TenantSwitcher` | Marca y cambio de cliente |
| `SystemTabs` | Pestañas entre sistemas |
| `PrototypeBadge` | Leyenda de demo |

## Dark mode

Toggle en header y en login. Estado en memoria (`ThemeModeProvider`). Sin `localStorage`.

- Fondo: `#020617`
- Superficie: `#0F172A`
- Bordes: blanco 12%

## Login

`/login` — panel navy + tarjeta glass.

- SSO visual: Google y Microsoft
- Correo / contraseña
- No hay OAuth real; ver `docs/auth.md` (Better Auth)

## Datos

`src/shared/mock/`. Catálogo de sistemas: `src/shared/systems.ts`.

## Rutas

`/login` · `/clientes` · `/dashboard` · `/tickets` · `/roles` · `/inventario` · …

Listado completo: `README.md`.
