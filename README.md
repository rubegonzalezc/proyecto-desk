# SynchroDesk

Prototipo de interfaz de **SynchroDesk**: plataforma SaaS multi-tenant de SynchroDev. Incluye mesa de ayuda IT, inventario y consola de administrador de plataforma.

**Stack:** Next.js 16.3 · TypeScript · MUI v6 · Turbopack  
**Fase actual:** maqueta navegable. Datos mock. Sin backend ni persistencia.

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) → `/login`.

---

## Qué es este producto

SynchroDesk no es un único módulo de tickets: es una **plataforma de sistemas** que SynchroDev opera para empresas clientes (tenants).

| Capa | Qué es |
|---|---|
| Operador | SynchroDev administra la plataforma |
| Tenant | Empresa contratada (p. ej. Google) |
| Sistemas | Productos dentro del tenant (mesa de ayuda, inventario, …) |
| Consola actual | Vista del **administrador de plataforma**, no del usuario final del cliente |

Usuario de demo: Elena Ruiz (`prueba@synchrodev.cl`).

---

## Acceso (`/login`)

Pantalla de inicio de sesión con el mismo lenguaje visual (liquid glass).

- Correo y contraseña (demo; cualquier valor entra al dashboard)
- Botones **Continuar con Google** y **Continuar con Microsoft** (solo diseño)
- Cerrar sesión desde el perfil del header vuelve a `/login`

**Auth real:** no está implementada. El plan es **Better Auth** (ver más abajo).

---

## Multi-tenant

- Cada empresa contratada es un tenant.
- El selector del header muestra las **5 empresas recientes**.
- El filtro busca por nombre, dominio, plan o región.
- Al elegir un tenant cambia la marca (logo). Los datos siguen siendo mock.
- `/clientes` lista tenants. `/clientes/[id]` muestra el contrato.

Tenants de demo: Google (activo por defecto), Nexus Salud, Andes Logistics, Aurora Bank, Costa Retail, Órbita Energía, Pulso Media, Sierra Mining, Lumen Hospitals, Nova Airlines, Quilla Foods, Atlas Telecom.

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
| Mesa de ayuda | `/dashboard` · `/tickets` · `/tickets/nuevo` · `/tickets/[id]` · `/usuarios` · `/roles` · `/roles/nuevo` · `/roles/[id]` · `/equipos` · `/activos` · `/conocimiento` · `/configuracion` |
| Inventario | `/inventario` · `/inventario/movimientos` · `/inventario/articulos` · `/inventario/almacenes` · `/inventario/proveedores` |

---

## Auth — plan Better Auth (aún no)

No instalar ni cablear Better Auth en esta fase.

Cuando se implemente:

- Librería: [Better Auth](https://www.better-auth.com/) sobre Next.js App Router
- Sesión real (cookies httpOnly), sin persistir en `localStorage` del cliente de negocio
- Proveedores sociales previstos: **Google** y **Microsoft (Azure AD / Entra ID)**
- Correo + contraseña como fallback para operadores SynchroDev
- Multi-tenant: la sesión pertenece a un usuario de plataforma; el tenant activo se elige después del login
- Sustituir el `router.push('/dashboard')` del login por el flujo Better Auth (`signIn.social`, `signIn.email`)
- Proteger rutas del `(dashboard)` con middleware / session check

Hasta entonces, Google, Microsoft y el formulario solo navegan a `/dashboard`.

Detalle: `docs/auth.md`.

---

## Fuera de alcance (esta fase)

API, autenticación real, persistencia, CRUD, validaciones, WebSockets.  
Datos: `src/shared/mock/`.

Diseño visual: `docs/DESIGN-README.md`  
Especificación inicial de UI: `docs/system-design.md`
