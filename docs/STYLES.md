# SynchroDesk — sistema de estilos

Catálogo de los estilos que **existen en el código**: variables CSS, tokens TypeScript, tema MUI, clases utilitarias, colores de estado, motion, foco y impresión.

Identidad visual: **Apple Liquid Enterprise** (glass suave, sidebar navy, motion tipo iOS). Sin estética fintech ni tinte lila.

Guía corta: [`DESIGN-README.md`](./DESIGN-README.md).  
Arquitectura del producto: [`PROJECT.md`](./PROJECT.md).

---

## 1. Dónde vive cada capa

```
src/app/globals.css              Reset + imports + tipografía de documento
src/styles/design-system.css     Tokens CSS, glass, motion, fondo ice-wash
src/styles/a11y.css              Anillos de foco y .sd-sr-only
src/styles/reduced-motion.css    prefers-reduced-motion
src/styles/ticket-print.css      Vista imprimible de ticket
src/theme/palette.ts             Paleta TypeScript
src/theme/designTokens.ts        Radius, blur, sombras, motion, glass, layout
src/theme/theme.ts               createTheme MUI (light + dark)
src/theme/ThemeRegistry.tsx      Emotion cache + CssBaseline
src/theme/ThemeModeProvider.tsx  Toggle; persiste en sessionStorage
```

`globals.css` carga los cuatro CSS de `src/styles/`. El tema MUI se regenera con `createAppTheme(mode)` cuando cambia claro/oscuro. El shell pone `data-theme="light|dark"` en el contenedor (`.ice-wash`) para que las variables CSS sigan al modo.

Hay **dos fuentes de verdad** alineadas a mano:

| Capa | Uso |
|------|-----|
| `--sd-*` en CSS | Clases utilitarias (`.liquid-glass`, `.ice-wash`, …) |
| `palette` + `designTokens` | `sx` de MUI y `createAppTheme` |

Si se cambia un color, actualizar **ambas**.

---

## 2. Tokens CSS (`:root`)

Definidos en `src/styles/design-system.css`.

| Variable | Claro | Oscuro (`[data-theme='dark']`) |
|----------|-------|--------------------------------|
| `--sd-primary` | `#2563eb` | (igual) |
| `--sd-primary-dark` | `#1d4ed8` | (igual) |
| `--sd-primary-light` | `#60a5fa` | (igual) |
| `--sd-background` | `#f3f6fb` | `#020617` |
| `--sd-surface` | `#ffffff` | `#0f172a` |
| `--sd-surface-muted` | `#eef3fa` | `#111827` |
| `--sd-navy` | `#0f172a` | (igual) |
| `--sd-navy-dark` | `#020617` | (igual) |
| `--sd-text` | `#0f172a` | `#f8fafc` |
| `--sd-text-secondary` | `#475467` | `rgba(248, 250, 252, 0.72)` |
| `--sd-text-muted` | `#667085` | `rgba(248, 250, 252, 0.48)` |
| `--sd-border` | `#d7e2f0` | `rgba(255, 255, 255, 0.12)` |
| `--sd-success` | `#10b981` | (igual) |
| `--sd-warning` | `#f59e0b` | (igual) |
| `--sd-error` | `#ef4444` | (igual) |
| `--sd-info` | `#2563eb` | (igual) |
| `--sd-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | (igual) |
| `--sd-radius` | `24px` | (igual) |
| `--sd-glass-bg` | `rgba(255, 255, 255, 0.72)` | `rgba(15, 23, 42, 0.72)` |
| `--sd-glass-border` | `rgba(255, 255, 255, 0.65)` | `rgba(255, 255, 255, 0.12)` |
| `--sd-glass-blur` | `24px` | (igual) |
| `--sd-sidebar` | `268px` | (igual) |
| `--sd-header` | `72px` | (igual) |

Foco (`src/styles/a11y.css`):

| Variable | Claro | Oscuro |
|----------|-------|--------|
| `--sd-focus-color` | `#2563eb` | `#60a5fa` |
| `--sd-focus-color-soft` | `rgba(37, 99, 235, 0.42)` | `rgba(96, 165, 250, 0.45)` |
| `--sd-focus-ring-sidebar` | `#93c5fd` | `#bfdbfe` |

---

## 3. Tokens TypeScript

### Paleta — `src/theme/palette.ts`

```
brand.primary        #2563EB
brand.primaryDark    #1D4ED8
brand.primaryLight   #60A5FA
surfaces.background  #F3F6FB
surfaces.surface     #FFFFFF
surfaces.surfaceMuted #EEF3FA
surfaces.navy        #0F172A
surfaces.navyDark    #020617
text.primary         #0F172A
text.secondary       #475467
text.muted           #667085
borders.default      #D7E2F0
semantic.success     #10B981
semantic.warning     #F59E0B
semantic.error       #EF4444
semantic.info        #2563EB
```

### `designTokens` — `src/theme/designTokens.ts`

| Grupo | Valores |
|-------|---------|
| **radius** | sm `10` · md `16` · lg `20` · xl `24` · pill `999` |
| **blur.glass** | `24` |
| **shadow.glass** | `0 8px 32px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)` |
| **shadow.float** | `0 18px 50px rgba(15, 23, 42, 0.08)` |
| **shadow.sidebar** | borde blanco 4% + `0 24px 60px rgba(0,0,0,0.35)` |
| **motion.ease** | `cubic-bezier(0.22, 1, 0.36, 1)` |
| **motion.duration** | fast `180ms` · base `420ms` · slow `700ms` |
| **layout** | sidebar `268` · header `72` · contentMax `1440` |
| **glass** | bg `rgba(255,255,255,0.72)` · border `rgba(255,255,255,0.65)` · blur `24px` · saturate `180%` |
| **glass (dark)** | bg `rgba(15,23,42,0.72)` · border `rgba(255,255,255,0.12)` |

El `AppShell` usa sidebar visual de **276px** (268 del token + padding). El contenido se centra con `maxWidth: 1440`.

---

## 4. Clases CSS utilitarias

Todas en `src/styles/design-system.css` salvo las de a11y, print y reduced-motion.

### Superficies

| Clase | Qué hace | Dónde se usa |
|-------|----------|--------------|
| `.liquid-glass` | Fondo translúcido, blur 24px + saturate 180%, radio 24px, borde claro, sombra suave, **reflejo interno** (`::before` degradado blanco) | `AppCard` glass, header, toolbar de tabla, login, empty/error, matriz de permisos |
| `.liquid-glass-solid` | Superficie opaca (`--sd-surface`), borde mixto, sombra ligera, **sin blur** | Filas de `AppTable`, skeletons de fila |
| `.ice-wash` | Fondo de página: dos radiales azul hielo + gradiente vertical | `AppShell`, `AuthShell`, `ErrorPage` standalone |
| `.floating-header` | Blur 22px + saturate 180% extra | `Header` |

En dark, `.liquid-glass::before` baja el reflejo a blanco 8%. `.ice-wash` pasa a navy casi plano con un glow azul suave.

### Motion

| Clase | Comportamiento |
|-------|----------------|
| `.hover-lift` | Transición 420ms. Hover: `translateY(-4px) scale(1.005)` + sombra float. Active: `scale(0.992)` |
| `.press-feedback` | Active: `scale(0.992)` |
| `.fade-up` | Entrada 700ms: opacity 0 → 1, `translateY(14px)` → 0 (`@keyframes sd-fade-up`) |
| `.stagger > *:nth-child(n)` | Delay 0–420ms en pasos de 60ms (hasta 8 hijos) |
| `.nav-pill` | Radio pill, transición de fondo/color 420ms y transform 180ms; active `scale(0.992)` |

`AppCard` combina por defecto `liquid-glass` + `hover-lift` + `fade-up`. `lift={false}` quita el hover (detalle de ticket, formularios).

### Tablas y chrome

| Clase | Comportamiento |
|-------|----------------|
| `.app-table-row` | Hover: azul 3.5% claro / blanco 4% oscuro; transición 280ms |
| `.sd-scrollbar` | Scrollbar 8px, thumb slate 45%, radio pill |
| `.nav-pill` | Ítems del sidebar (el radio visual real es 16px vía `sx`) |

### Accesibilidad (`a11y.css`)

| Clase | Comportamiento |
|-------|----------------|
| `.sd-sr-only` | Visually hidden (legendas de fieldset) |
| `:focus:not(:focus-visible)` | Sin outline en clic de ratón |
| `.nav-pill:focus-visible` | Anillo `--sd-focus-ring-sidebar` + glow |
| `.app-table-row:focus-visible` | Anillo primary, offset −2px, fondo azul suave |
| `.sd-filter-chip:focus-visible` | Anillo + glow en chips de filtro |
| `.sd-system-tab:focus-visible` | Anillo en pestañas de sistema |
| `.sd-command-result:focus-visible` | Anillo inset en resultados Cmd+K |

MUI añade el mismo anillo (`2px solid primary`, offset 2, glow `rgba(37,99,235,0.24)`) en `Button`, `IconButton`, `Chip` clickable y `ListItemButton`.

### Impresión (`ticket-print.css`)

| Clase | Pantalla | Print |
|-------|----------|-------|
| `.print-only` | `display: none` | `block` |
| `.print-hide` | visible | `none` |
| `.ticket-print-view` | — | Quita glass, sombras y hover; bordes `#d0d5dd` |

En `@media print` también se ocultan `.app-shell-sidebar`, `.app-shell-header`, Drawer, Modal y toasts. Márgenes de página: 16mm. Fondo blanco.

### Reduced motion

Con `prefers-reduced-motion: reduce` se anulan `.fade-up`, `.stagger`, `.hover-lift`, `.press-feedback`, `.nav-pill`, `.app-table-row`, `.sd-system-tab`, toasts (Slide/Fade) y el `scale` de botones MUI.

---

## 5. Tema MUI (`createAppTheme`)

Fuente:

```
var(--font-sans)          /* Plus Jakarta Sans */
-apple-system
BlinkMacSystemFont
"SF Pro Display" / "SF Pro Text"
"Segoe UI"
sans-serif
```

`--font-sans` lo inyecta `next/font/google` en el root layout. Antialiasing: `-webkit-font-smoothing: antialiased`.

### Tipografía

| Variante | Peso | Letter-spacing | Tamaño |
|----------|------|----------------|--------|
| h1 | 700 | −0.04em | 2.25rem |
| h2 | 700 | −0.035em | 1.75rem |
| h3 | 650 | −0.03em | 1.375rem |
| h4 | 650 | −0.025em | 1.125rem |
| h5 / h6 | 600 | −0.02em | default MUI |
| subtitle1 | 600 | −0.015em | |
| subtitle2 | 600 | −0.01em | |
| body1 | 400 | −0.011em | |
| body2 | 400 | −0.008em | |
| button | 600 | −0.01em | **sin uppercase** |

### Paleta MUI

- `primary` = brand; `secondary` = navy
- `background.default` / `paper` = background/surface (o navyDark/navy en dark)
- Texto dark: `#F8FAFC` / 72% / 42% disabled
- `divider` = borde claro u 12% blanco
- `shape.borderRadius` = **16** (`designTokens.radius.md`)

### Sombras MUI

Escala corta: none → 1px → 4/16 → 8/24 → 12/32 → 18/50 (navy 4–8% de opacidad). A partir del índice 5 se repite la sombra float.

### Overrides de componentes

| Componente | Estilo |
|------------|--------|
| **Button** | Sin elevation; radio pill; padding 8×18; press `scale(0.992)`; contained con sombra azul 22% |
| **IconButton** | Radio 14px; mismo press y foco |
| **Paper** | Sin `backgroundImage` (evita overlay MUI en dark) |
| **Chip** | Radio pill; fontWeight 600 |
| **TextField** | `outlined` + `small` por defecto |
| **OutlinedInput** | Radio 14px; fondo blanco 88% / blanco 4% en dark |
| **Tooltip** | Radio 10px; 12px / weight 500 |

Botones y enlaces nativos heredan la fuente del documento. `box-sizing: border-box` global.

---

## 6. Layout y cromo de la consola

### AppShell

- Fondo `.ice-wash` a viewport completo
- Sidebar desktop: sticky, 276px, radio **28px**, borde blanco 8%, sombra navy 28%
- Sidebar móvil: `Drawer` MUI, mismo cromo
- Header sticky + `SystemTabs`
- `main`: padding 2.5/3.5, max 1440px centrado

### Sidebar (navy sólido)

Gradiente `#111827` → `#0B1220` → `#020617` + velo blanco 6% arriba. Texto `#F8FAFC`.

Ítem activo: gradiente primary 38% → 14%, texto blanco, inset highlight.  
Ítem inactivo: texto 72% blanco.  
Badge: pill; activo blanco 16%, inactivo primary 28%.

El sidebar **no** usa `.liquid-glass`; es el único panel opaco navy a propósito.

### Header

`.liquid-glass.floating-header`. Selector de tenant, búsqueda, campana, tema, perfil.

### Login (`AuthShell` + panel)

Grid 50/50 en `lg`. Columna izquierda (solo desktop): gradiente navy `#0F172A` → `#020617` con velo primary 22%; copy blanco. Columna derecha: tarjeta `.liquid-glass` max 440px, radio 28px. Toggle de tema absolute (glass 16px blur).

### Tablas (`AppTable`)

- Toolbar: glass, radio **20px**
- Cuerpo: sólido, radio 24px
- Cabecera desktop: `rgba(238, 243, 250, 0.7)`
- Filas: `.app-table-row` (hover sutil; **no** translúcidas)

---

## 7. Colores semánticos de producto

No son tokens CSS globales: viven en los componentes.

### Estado de ticket — `StatusBadge`

| Estado | Fondo | Texto |
|--------|-------|-------|
| Nuevo | `rgba(37, 99, 235, 0.12)` | `#1D4ED8` |
| En progreso | `rgba(96, 165, 250, 0.18)` | `#1E3A8A` |
| Pendiente | `rgba(245, 158, 11, 0.16)` | `#B45309` |
| Resuelto | `rgba(16, 185, 129, 0.14)` | `#047857` |
| Cerrado | `rgba(102, 112, 133, 0.14)` | `#475467` |

Chip 26px de alto, weight 650. En `sm` la etiqueta se acorta.

### Prioridad — `PriorityBadge`

| Prioridad | Fondo | Texto |
|-----------|-------|-------|
| Baja | `rgba(16, 185, 129, 0.12)` | `#047857` |
| Media | `rgba(37, 99, 235, 0.10)` | `#1D4ED8` |
| Alta | `rgba(245, 158, 11, 0.16)` | `#B45309` |
| Crítica | `rgba(239, 68, 68, 0.14)` | `#B91C1C` |

### KPI — `StatCard`

| Tone | Fondo icono | Delta / icono |
|------|-------------|----------------|
| info | `rgba(37, 99, 235, 0.10)` | `#1D4ED8` |
| warning | `rgba(245, 158, 11, 0.12)` | `#B45309` |
| success | `rgba(16, 185, 129, 0.12)` | `#047857` |
| error | `rgba(239, 68, 68, 0.12)` | `#B91C1C` |
| neutral | `rgba(15, 23, 42, 0.06)` | `#0F172A` |

Icono: 42×42, radio 14px. Card mínima 132px de alto.

### Toasts — `DynamicIslandToast`

Isla fija arriba, pill, navy 88–92%, texto `#F8FAFC`.

| Variante | Acento | Glow |
|----------|--------|------|
| success | `#34D399` | `rgba(52, 211, 153, 0.35)` |
| error | `#F87171` | `rgba(248, 113, 113, 0.35)` |
| info | `#60A5FA` | `rgba(96, 165, 250, 0.35)` |

### Marca en login

Logo “SD”: gradiente `#93C5FD` → `#2563EB` → `#1D4ED8`, radio 14px, sombra primary 35%.

### PrototypeBadge (sidebar)

Pill, borde blanco 12%, fondo blanco 4%, texto 10.5px / weight 650 / tracking 0.02em / blanco 62%.

---

## 8. Dark mode

| Pieza | Claro | Oscuro |
|-------|-------|--------|
| Página | `#F3F6FB` + ice wash | `#020617` |
| Paper / surface | `#FFFFFF` | `#0F172A` |
| Texto | navy | `#F8FAFC` |
| Bordes | `#D7E2F0` | blanco 12% |
| Glass | blanco 72% | navy 72% |
| Inputs | blanco 88% | blanco 4% |
| Hover de fila | primary 3.5% | blanco 4% |

Toggle en header y login. Clave `synchrodesk:theme-mode` en `sessionStorage`. Sin `localStorage`.

---

## 9. Responsividad

- Mobile-first. Sidebar: `Drawer` bajo `md`; columna fija desde `md`.
- Tablas: scroll horizontal con `.sd-scrollbar` desde `md`; en `xs` el layout de filas se apila (cada `*Row` tiene variante móvil).
- Login: una columna hasta `lg`; split navy + form desde `lg`.
- Header compacto en `xs`.
- Badges de estado/prioridad compactos bajo `sm`.

No hay breakpoints custom: se usan los de MUI (`sm` 600, `md` 900, `lg` 1200).

---

## 10. Convenciones al añadir estilos

1. **Reutilizar** `.liquid-glass` / `.liquid-glass-solid` / `.fade-up` / `.hover-lift` antes de inventar una tarjeta nueva (`AppCard` ya las combina).
2. Colores de producto: `palette` o `--sd-*`, no hex sueltos salvo mapas de badge ya existentes.
3. Curva de motion: solo `--sd-ease` / `designTokens.motion.ease`. Duraciones 180 / 420 / 700.
4. Radio de tarjetas grandes: **24px**. Controles (input, icon button): **14px**. Chips y botones: **pill**.
5. Tablas: toolbar glass + filas **sólidas**. No hacer la tabla entera translúcida.
6. Sidebar: navy opaco. No aplicarle glass.
7. Nada de lila, neón ni gradientes agresivos.
8. Si se anima algo nuevo, cubrirlo en `reduced-motion.css`.
9. Elementos interactivos nuevos: anillo `focus-visible` (clase en `a11y.css` o override MUI).
10. Impresión: marcar chrome con `.print-hide`; metadatos solo print con `.print-only`.

---

## 11. Mapa rápido clase → archivo

| Clase / atributo | Definida en | Consumidores típicos |
|------------------|-------------|----------------------|
| `--sd-*` | `design-system.css` | todo el CSS utilitario |
| `.liquid-glass` | `design-system.css` | `AppCard`, `Header`, `AppTable` toolbar, login |
| `.liquid-glass-solid` | `design-system.css` | `AppTable` body, skeletons |
| `.hover-lift` | `design-system.css` | `AppCard` |
| `.fade-up` / `.stagger` | `design-system.css` | páginas, KPI grids, `PageHeader` |
| `.ice-wash` | `design-system.css` | `AppShell`, `AuthShell` |
| `.nav-pill` | `design-system.css` | `Sidebar` |
| `.app-table-row` | `design-system.css` | filas de tickets, usuarios, inventario, roles |
| `.sd-scrollbar` | `design-system.css` | tablas, sidebar, matriz |
| `.floating-header` | `design-system.css` | `Header` |
| `.sd-sr-only` | `a11y.css` | fieldsets de formularios |
| `.sd-filter-chip` | foco en `a11y.css` | filtros de tickets e inventario |
| `.sd-system-tab` | foco en `a11y.css` | `SystemTabs` |
| `.sd-command-result` | foco en `a11y.css` | paleta Cmd+K |
| `.dynamic-island-toast` | reduced-motion + print | `DynamicIslandToast` |
| `.ticket-print-view` `.print-hide` `.print-only` | `ticket-print.css` | detalle de ticket |
| `.app-shell-sidebar` `.app-shell-header` `.app-shell-main` | `sx` + print | `AppShell` |
| `[data-theme]` | `AppShell` / `AuthShell` | activa el bloque dark de CSS |

---

*Última revisión: septiembre 2026 — extraído de `src/styles/`, `src/theme/` y componentes UI.*
