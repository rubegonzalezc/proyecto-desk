# Autenticación — SynchroDesk

Estado: **solo UI**. No hay sesión real.

## Hoy (prototipo)

`/login` es una maqueta. Correo, Google y Microsoft navegan a `/dashboard` sin validar credenciales ni crear cookie.

Cerrar sesión en el header vuelve a `/login`.

## Próximo: Better Auth

No implementar todavía. Cuando se apruebe:

1. Instalar Better Auth para Next.js App Router.
2. Configurar proveedores:
   - **Google** (OAuth)
   - **Microsoft** (Azure AD / Entra ID)
   - Email + password para operadores SynchroDev
3. Guardar sesión en cookie httpOnly. No usar `localStorage` para auth.
4. El login de plataforma ocurre **antes** de elegir tenant. El selector de clientes sigue siendo post-login.
5. Proteger el route group `(dashboard)`: sin sesión → `/login`.
6. Reemplazar `router.push('/dashboard')` en `LoginForm` por `authClient.signIn.social({ provider })` y `signIn.email`.
7. El botón Cerrar sesión llamará a `signOut`.

## Fuera de esta nota

Roles y permisos de producto (matriz por sistema) no son Better Auth; son autorización de negocio, mock en `src/shared/mock/roles.ts`.
