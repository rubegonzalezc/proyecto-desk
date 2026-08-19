# Supabase — modelo multi-tenant previsto

Documento de referencia para la migración de mocks a Postgres con **Row Level Security (RLS)** por `tenant_id`. Los mocks en `src/shared/mock/` ya incluyen `tenantId` en tickets, usuarios y snapshots de dashboard para alinear el contrato de datos con este esquema.

## Tenants de demostración

| `id` | Cliente | Tickets abiertos (mock) | Usuarios (mock) |
|------|---------|--------------------------|-----------------|
| `TEN-GOOGLE` | Google | 28 | 4 |
| `TEN-ANDES` | Andes Logistics | 15 | 4 |
| `TEN-NEXUS` | Nexus Salud | 4 | 4 |

Constantes: `demoTenantIds` y `demoTenantIdList` en `src/shared/mock/tenants.ts`.

## Tablas previstas

### `tenants`

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | `text` PK | Ej. `TEN-GOOGLE` |
| `name` | `text` | Nombre comercial |
| `slug` | `text` UNIQUE | Subdominio / ruta |
| `domain` | `text` | Dominio corporativo |
| `plan` | `text` | Starter / Business / Enterprise |
| `status` | `text` | Activo, Onboarding, Suspendido |
| `contracted_at` | `timestamptz` | |
| `region` | `text` | |
| `logo` | `text` | Clave de asset |
| `admin_name` | `text` | |
| `admin_email` | `text` | |
| `created_at` | `timestamptz` | |

### `users`

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | `text` PK | |
| **`tenant_id`** | `text` FK → `tenants.id` | **Columna de aislamiento RLS** |
| `name` | `text` | |
| `email` | `text` | UNIQUE por tenant |
| `role` | `text` | |
| `status` | `text` | Activo, Inactivo, Invitado |
| `team` | `text` | |
| `initials` | `text` | |
| `last_access_at` | `timestamptz` | |

Índice: `(tenant_id, email)`.

### `tickets`

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | `text` PK | |
| **`tenant_id`** | `text` FK → `tenants.id` | **Columna de aislamiento RLS** |
| `title` | `text` | |
| `description` | `text` | |
| `status` | `text` | Nuevo, En progreso, … |
| `priority` | `text` | Baja … Crítica |
| `technician` | `text` | Desnormalizado en demo; FK futura |
| `requester` | `text` | |
| `team` | `text` | |
| `category` | `text` | |
| `sla` | `text` | |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

Tablas hijas: `ticket_comments`, `ticket_evidences` (ambas con `tenant_id` redundante o vía join a `tickets`).

Índice: `(tenant_id, status, created_at DESC)`.

### `dashboard_snapshots` (opcional)

Para KPIs agregados en lugar de calcular en cada request:

| Columna | Tipo | Notas |
|---------|------|-------|
| `tenant_id` | `text` FK | PK compuesta con `snapshot_date` |
| `snapshot_date` | `date` | |
| `open_count` | `int` | |
| `pending_count` | `int` | |
| `resolved_today` | `int` | |
| `sla_at_risk` | `int` | |
| `avg_first_response_min` | `int` | |

En la demo actual, los KPIs viven en `tenantDashboards` (`src/shared/mock/dashboard.ts`) como `TenantDashboard` con `tenantId`.

## Políticas RLS (borrador)

```sql
-- Ejemplo: tickets visibles solo para el tenant de la sesión JWT
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY tickets_tenant_isolation ON tickets
  FOR ALL
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::text);
```

El claim `tenant_id` en el JWT lo emitirá Better Auth / Supabase Auth tras el login multi-tenant (Sprint 7).

## Mapeo mock → tipos

| Mock | Tipo TypeScript | Campo tenant |
|------|-----------------|--------------|
| `tickets` | `Ticket` | `tenantId` |
| `users` | `User` | `tenantId` |
| `tenantDashboards` | `TenantDashboard` | `tenantId` |
| `tenants` | `Tenant` | `id` (es el tenant) |

Helpers: `filterByTenant`, `getDashboardForTenant`, `getRecentTicketsForTenant` en `src/shared/mock/`.

## Próximos pasos (roadmap)

1. **S3·HU-2** — Dashboard consume `getDashboardForTenant(tenant.id)` según `TenantProvider`.
2. **S3·HU-3** — Listados de tickets y usuarios filtran con `filterByTenant`.
3. **S7** — Schema real en Supabase, migraciones y reemplazo de mocks por `lib/api`.
