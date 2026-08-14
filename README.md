# SynchroDesk

Prototipo de interfaz de **SynchroDesk**: plataforma SaaS multi-tenant de SynchroDev. Incluye mesa de ayuda IT e inventario, con consola de administrador de plataforma.

Stack: Next.js 16.3, TypeScript, MUI v6, Turbopack. Solo vistas y datos mock; no hay backend ni persistencia.

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Redirige a `/dashboard`.

## Alcance actual

Esta demo es la **vista del administrador de la plataforma (SynchroDev)**, no la del usuario final del cliente.

| Rol | Quién |
|---|---|
| Operador de la plataforma | SynchroDev |
| Cliente / tenant activo | Google (logo en sidebar y header) |
| Usuario de consola | Elena Ruiz, administradora de plataforma |

### Multi-tenant

- Cada empresa contratada es un tenant (Google, Nexus Salud, Andes Logistics, etc.).
- El selector del header muestra las **5 empresas recientes**.
- Se pueden buscar el resto por nombre, dominio, plan o región.
- Al elegir un tenant cambia la marca; los datos siguen siendo de demostración.
- `/clientes` lista todos los tenants. `/clientes/[id]` muestra el contrato.

### Sistemas

SynchroDesk agrupa varios productos. El sidebar cambia según el sistema activo. Al abrir un segundo sistema aparecen pestañas para saltar entre ellos.

| Sistema | Secciones |
|---|---|
| Mesa de ayuda | Dashboard, tickets, usuarios, roles, equipos, activos TI, conocimiento, configuración |
| Inventario | Dashboard, movimientos, artículos, almacenes, proveedores |

### Permisos

Los roles se asignan **por sistema y módulo**:

- Mesa de ayuda (acceso + módulos)
- Sistema de inventario (acceso + módulos)
- Plataforma SynchroDev (clientes / tenants)

La fila **Acceso al sistema** habilita abrir ese producto. El resto son acciones: ver, crear, editar, eliminar, exportar, aprobar.

## Rutas

**Plataforma:** `/clientes` · `/clientes/[id]`

**Mesa de ayuda:** `/dashboard` · `/tickets` · `/tickets/nuevo` · `/tickets/[id]` · `/usuarios` · `/roles` · `/roles/nuevo` · `/roles/[id]` · `/equipos` · `/activos` · `/conocimiento` · `/configuracion`

**Inventario:** `/inventario` · `/inventario/movimientos` · `/inventario/articulos` · `/inventario/almacenes` · `/inventario/proveedores`

## Fuera de alcance (esta fase)

No hay API, autenticación real, persistencia, CRUD ni validaciones. Todo sale de `src/shared/mock/`.

Documentación de diseño: `docs/DESIGN-README.md`  
Especificación original: `docs/system-design.md`
