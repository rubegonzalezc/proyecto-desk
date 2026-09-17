# SynchroDesk

Plataforma SaaS multi-tenant de **SynchroDev**: mesa de ayuda IT, inventario y consola de administrador de plataforma.

**Stack:** Next.js 16.3 · React 19 · TypeScript · MUI v6 · Turbopack  
**Fase actual:** prototipo UI navegable. Datos mock. Acciones de demo en sesión (`sessionStorage`). Sin backend.

Documentación completa del producto y la arquitectura: **[`docs/PROJECT.md`](./docs/PROJECT.md)**.

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) → `/login`.

Usuario de demo: Elena Ruiz (`prueba@synchrodev.cl`). Cualquier contraseña entra.

---

## Qué es este producto

SynchroDesk no es un único módulo de tickets: es una **plataforma de sistemas** que SynchroDev opera para empresas clientes (tenants).

| Capa | Qué es |
|---|---|
| Operador | SynchroDev administra la plataforma |
| Tenant | Empresa contratada (p. ej. Google) |
| Sistemas | Productos dentro del tenant (mesa de ayuda, inventario, …) |
| Consola actual | Vista del **administrador de plataforma**, no del usuario final del cliente |

---

## Acceso (`/login`)

Pantalla de inicio de sesión con el mismo lenguaje visual (liquid glass).

- Correo y contraseña (demo; cualquier valor entra al dashboard)
- Botones **Continuar con Google** y **Continuar con Microsoft** (solo diseño)
- Cerrar sesión desde el perfil del header vuelve a `/login`

**Auth real:** no está implementada. El plan de plataforma es **Supabase Auth**; el documento de UI aún describe Better Auth. Detalle: [`docs/auth.md`](./docs/auth.md) y [`docs/PROJECT.md`](./docs/PROJECT.md#11-autenticación-y-permisos).

---

## Multi-tenant

- Cada empresa contratada es un tenant.
- El selector del header muestra las **5 empresas recientes**.
- El filtro busca por nombre, dominio, plan o región.
- Al elegir un tenant cambia la marca (logo). Tickets, usuarios y dashboard se filtran por `tenantId`.
- `/clientes` lista tenants. `/clientes/[id]` muestra el contrato.

Tenants con datos diferenciados: Google (activo por defecto), Andes Logistics, Nexus Salud. Catálogo visual: Aurora Bank, Costa Retail, Órbita Energía, Pulso Media, Sierra Mining, Lumen Hospitals, Nova Airlines, Quilla Foods, Atlas Telecom.

Nexus Salud no contrata inventario: las rutas `/inventario/*` muestran 403.

---

## Sistemas

El sidebar cambia según el sistema activo. Al abrir un segundo sistema aparecen pestañas.

| Sistema | Secciones |
|---|---|
| Mesa de ayuda | Dashboard, tickets, usuarios, roles, equipos, activos TI, conocimiento, configuración |
| Inventario | Dashboard, movimientos, artículos, almacenes, proveedores |

La sección **Plataforma → Clientes** está siempre visible para el admin de SynchroDev.

---

## Permisos

Matriz por **sistema y módulo** (`/roles`):

- Mesa de ayuda (acceso + módulos)
- Sistema de inventario (acceso + módulos)
- Plataforma SynchroDev (clientes / tenants)

Acciones: ver, crear, editar, eliminar, exportar, aprobar.  
La fila **Acceso al sistema** habilita abrir ese producto.

---

## Rutas

| Área | Rutas |
|---|---|
| Acceso | `/login` |
| Plataforma | `/clientes` · `/clientes/[id]` |
| Mesa de ayuda | `/dashboard` · `/tickets` · `/tickets/nuevo` · `/tickets/[id]` · `/usuarios` · `/usuarios/[id]` · `/roles` · `/roles/nuevo` · `/roles/[id]` · `/equipos` · `/activos` · `/conocimiento` · `/conocimiento/[id]` · `/configuracion` |
| Inventario | `/inventario` · `/inventario/movimientos` · `/inventario/movimientos/nuevo` · `/inventario/articulos` · `/inventario/articulos/nuevo` · `/inventario/almacenes` · `/inventario/proveedores` |

---

## Datos y sesión de demo

- Seeds: `src/shared/mock/`
- Lecturas paginadas: `src/lib/api/` (misma firma prevista para Supabase)
- Mutaciones de tickets e inventario: stores en `src/stores/` + `sessionStorage` (viven en la pestaña)

Atajo `Ctrl/Cmd+K`: búsqueda global de tickets, clientes, usuarios y rutas.

---

## Fuera de alcance (esta fase)

API real, autenticación, persistencia entre dispositivos, RLS, WebSockets.  
No instalar Better Auth ni el cliente Supabase hasta cerrar los Sprints 8 y 9.

---

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [`docs/PROJECT.md`](./docs/PROJECT.md) | Producto, arquitectura, estado del código y convenciones |
| [`docs/DESIGN-README.md`](./docs/DESIGN-README.md) | Identidad visual y tokens |
| [`docs/system-design.md`](./docs/system-design.md) | Especificación inicial de UI |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md) | Sprints e historias de usuario |
| [`docs/auth.md`](./docs/auth.md) | Login actual y plan de sesión |
| [`docs/supabase.md`](./docs/supabase.md) | Contrato de datos, RLS, Storage, Realtime |
| [`docs/sprint-pre-supabase.md`](./docs/sprint-pre-supabase.md) | Gate Sprint 7 (cerrado) |
| [`docs/sprints-8-9-pre-supabase.md`](./docs/sprints-8-9-pre-supabase.md) | Trabajo antes de Postgres |
