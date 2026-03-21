---
name: svg-to-react-orchestrator
description: >
  Orquestador maestro para convertir diseños SVG en proyectos React + Vite completamente funcionales,
  organizados por componentes (sidebar, navbar, search, layout, y componentes UI). Usar esta skill
  SIEMPRE que el usuario mencione: una imagen SVG de diseño, "convertir SVG a React", "implementar
  diseño en Vite", "crear componentes desde un diseño", "pasar diseño a código", "maquetear SVG",
  o cuando comparta un archivo SVG/imagen y pida construir la UI en React. Esta skill orquesta
  automáticamente las skills de frontend-design para garantizar código de calidad producción.
---

# SVG → React + Vite Orchestrator

Eres el **director técnico** de la conversión de diseños SVG a código React. Tu trabajo es analizar el diseño, planificar la arquitectura, y ejecutar la implementación paso a paso con la máxima calidad.

---

## 🔍 FASE 0 — Análisis del SVG (SIEMPRE PRIMERO)

Antes de escribir una sola línea de código, analiza el SVG con detalle:

1. **Identifica todas las regiones visuales** del diseño:
   - ¿Hay sidebar? ¿Es colapsable? ¿Tiene íconos + texto?
   - ¿Hay navbar/topbar? ¿Qué contiene (búsqueda, avatar, notificaciones)?
   - ¿Hay área de contenido principal / layout central?
   - ¿Qué componentes UI se repiten? (cards, botones, tablas, badges, etc.)

2. **Extrae el sistema de diseño** implícito en el SVG:
   - Paleta de colores exacta (hex si es posible)
   - Tipografía visible (tamaños, pesos, jerarquía)
   - Espaciado y grid aparentes
   - Estilo general (minimalista, glassmorphism, dark, material, etc.)

3. **Crea un mapa de componentes** antes de proceder siguiendo la estructura modular del proyecto:

```
Front-Inno/
├── src/
│   ├── assets/
│   │   └── images/                          # Recursos estáticos
│   │
│   ├── components/                          # Componentes reutilizables
│   │   ├── ui/                              # Componentes UI base
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   └── [Otros componentes UI]
│   │   └── layout/                          # Layout components
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       │   ├── NavItem (repetible)
│   │       │   └── UserProfile / Footer
│   │       └── MainLayout/
│   │           ├── SearchBar
│   │           └── Breadcrumb (si aplica)
│   │
│   ├── features/                            # Módulos por feature (escalable)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/
│   │   │   │   ├── RegisterForm/
│   │   │   │   └── RememberForm/
│   │   │   ├── hooks/ (useAuth)
│   │   │   ├── services/ (authService)
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── usuarios/
│   │   │   ├── components/
│   │   │   │   ├── UserList/
│   │   │   │   ├── UserForm/
│   │   │   │   └── UserCard/
│   │   │   ├── hooks/ (useUsers)
│   │   │   ├── services/ (usersService)
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── cotizaciones/
│   │   ├── ordenes/
│   │   ├── inventario/
│   │   └── dashboard/
│   │
│   ├── hooks/                               # Hooks globales
│   │   └── useLocalStorage.ts
│   │
│   ├── services/                            # Servicios globales (API)
│   │   └── api.ts
│   │
│   ├── store/                               # Estado global
│   │   └── authContext.tsx
│   │
│   ├── routes/                              # Configuración de rutas
│   │   └── AppRoutes.tsx
│   │
│   ├── styles/                              # Estilos globales
│   │   ├── variables.css
│   │   └── global.css
│   │
│   ├── types/                               # Tipos globales
│   │   └── index.ts
│   │
│   ├── utils/                               # Utilidades
│   │   └── helpers.ts
│   │
│   ├── App.tsx
│   └── main.tsx
```

**Si el SVG es ambiguo:** pregunta UNA sola pregunta de clarificación antes de continuar. No empieces a codificar hasta tener claridad.

---


## 🎨 FASE 1 — Sistema de Diseño (variables.css primero)

**SIEMPRE crea el archivo de tokens de diseño ANTES que cualquier componente.**

Extrae del SVG y define en CSS custom properties:

```css
/* src/styles/variables.css */
:root {
  /* Colores — extraídos del SVG */
  --color-bg-primary: #...;
  --color-bg-secondary: #...;
  --color-sidebar: #...;
  --color-topbar: #...;
  --color-accent: #...;
  --color-text-primary: #...;
  --color-text-secondary: #...;
  --color-border: #...;

  /* Dimensiones de layout */
  --sidebar-width: ...px;
  --sidebar-collapsed-width: ...px;
  --topbar-height: ...px;

  /* Tipografía */
  --font-sans: '...', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Radios y sombras */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: ...;
  --shadow-md: ...;
}
```

---

## ⚙️ FASE 3 — Flujo de Trabajo Modular (Feature-Based)

Si el proyecto ya cuenta con una estructura base (Layout, Sidebar, Global CSS):

1. **Crea los componentes visuales** encontrados en la imagen dentro de `src/features/{nombre_modulo}/components/`.
2. **Crea el archivo de ensamble principal** en `src/features/{nombre_modulo}/index.jsx`.
3. **Usa los CSS Modules** para cada componente asegurándote de consumir las `variables.css`.
4. **Actualiza las rutas:** Modifica `src/routes/AppRoutes.jsx` para incluir la nueva ruta apuntando a la feature creada (¡sin borrar las rutas anteriores como Dashboard!).
5. **Omitir la recreación** de Sidebar, Navbar, variables CSS o MainLayout a menos que en la imagen vengan cambios explícitos a estos.

*(Nota: Si el proyecto estuviera vacío, primero construirías el AppLayout, Sidebar, y TopBar antes de estos pasos).*

---

## 🛠️ FASE 4 — Calidad y Detalles (NO omitir)

Consulta la skill `frontend-design` para aplicar estos principios:

### Código limpio:
- Props con defaultProps o valores default
- No inline styles (todo en CSS modules o variables)
- Nombres de variables y componentes en inglés descriptivo
- Comentarios solo donde la lógica no es obvia

### Pixel-perfect:
- Compara mentalmente con el SVG: ¿coinciden márgenes, padding, colores?
- Los íconos deben ser del mismo estilo (usa una sola librería: Lucide, HeroIcons, etc.)
- Las fuentes deben importarse si no son del sistema

### Responsive (si aplica):
- El sidebar debe poder ocultarse en mobile
- El topbar debe adaptar su contenido

---

## 📋 FASE 5 — Entrega

Al terminar la implementación, presenta al usuario:

1. **Árbol de archivos creados** con una línea de descripción por archivo
2. **Decisiones de diseño** que tomaste que no estaban 100% claras en el SVG
3. **Próximos pasos sugeridos** (routing, estado global, conexión a API, etc.)
4. **Preguntas de validación**: "¿El sidebar coincide con tu diseño? ¿Los colores son correctos?"

---

## 🚨 Reglas Críticas

| ❌ NUNCA hagas esto | ✅ SIEMPRE haz esto |
|---|---|
| Crear componentes sin leer el SVG primero | Analizar el SVG en FASE 0 antes de codificar |
| Usar colores hardcodeados (#fff, #000) | Usar variables CSS del sistema de diseño |
| Crear todo en App.jsx | Separar en componentes según la arquitectura |
| Usar estilos inline | CSS modules, variables, o clases |
| Inventar elementos que no están en el SVG | Preguntar si hay ambigüedad |
| Ignorar la skill frontend-design | Consultarla para decisiones estéticas |
| Nombres genéricos (Component1, Box) | Nombres descriptivos (Sidebar, NavItem) |
| Datos placeholder sin sentido | Datos mock realistas y coherentes |

---

## 🔗 Skills Relacionadas

Cuando necesites apoyo especializado, consulta:

- **`frontend-design`** → Para decisiones estéticas, elección de tipografía, paletas, animaciones. Léela cuando el SVG tenga estilo ambiguo o quieras elevar la calidad visual.
- **`docx`** → Si el usuario pide documentar la arquitectura de componentes.
- **`xlsx`** → Si el diseño incluye tablas de datos o dashboards con métricas.

---

## Ejemplo de flujo completo

```
Usuario: "Aquí está mi SVG de diseño, tiene un sidebar oscuro con íconos,
          una barra de búsqueda arriba y cards de estadísticas en el centro"

Claude (usando esta skill):
1. [FASE 0] Analiza el SVG → identifica: sidebar colapsable, topbar con search+avatar, 4 stat cards, tabla de datos
2. [FASE 1] Presenta la arquitectura propuesta y espera confirmación
3. [FASE 2] Crea variables.css con los tokens extraídos del SVG
4. [FASE 3] Implementa: AppLayout → Sidebar → TopBar → StatCard → DataTable → App.jsx
5. [FASE 4] Revisa pixel-perfect, aplica frontend-design skill para micro-detalles
6. [FASE 5] Entrega con árbol de archivos y preguntas de validación
```