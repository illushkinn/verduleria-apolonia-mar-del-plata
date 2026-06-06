# Apolonia — Frutería & Verdulería de Estación

![Astro 6.4](https://img.shields.io/badge/Astro-6.4-BC52EE?logo=astro&labelColor=1A1A2E) ![React 19](https://img.shields.io/badge/React-19-58C4DC?logo=react&labelColor=1A1A2E) ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-0EA5E9?logo=tailwindcss&labelColor=1A1A2E) ![Zustand 5](https://img.shields.io/badge/Zustand_5-433E38?logo=zustand&labelColor=1A1A2E) ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel) ![pnpm 11](https://img.shields.io/badge/pnpm_11-F69220?logo=pnpm&labelColor=1A1A2E)

> **Lo mejor de cada estación, en tu mesa.**  
> Frutas, verduras, verduras finas, huevos y preparados — en Playa Grande, Mar del Plata.

---

## 🌿 Acerca de

**Apolonia** es una frutería y verdulería premium ubicada en **Playa Grande, Mar del Plata, Argentina**. El nombre es un homenaje a la abuela del dueño, y el negocio se enfoca en productos de estación seleccionados, con entrega a domicilio vía WhatsApp.

- **Delivery sin cargo** en la zona
- **Pago al recibir** efectivo / transferencia
- Pedidos por WhatsApp con template detallado
- 116+ productos organizados por estación y categoría

---

## 🚀 Stack

| Capa        | Tecnología                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| Framework   | [Astro](https://astro.build) 6.4.4                                        |
| UI          | [React](https://react.dev) 19.2.7 + [Tailwind CSS](https://tailwindcss.com) v4 |
| Estado      | [Zustand](https://github.com/pmndrs/zustand) 5 + localStorage persistence |
| Iconos      | [Phosphor Icons](https://phosphoricons.com/) (React)                      |
| Analíticas  | [Vercel Analytics](https://vercel.com/analytics)                          |
| Animaciones | CSS puras con cubic-bezier custom + IntersectionObserver                   |
| Package     | pnpm 11 con workspace                                                      |

---

## ✨ Funcionalidades

- **Catálogo responsive** con búsqueda en vivo y filtros por categoría
- **116+ productos reales** categorizados por estación y tipo (Verduras, Hortalizas, Frutas, Huevos, Preparados, Otros)
- **Carrito de compras** con drawer glassmorphism y persistencia local
- **Checkout por WhatsApp** con template de pedido detallado (ítems, cantidades, subtotales, total, notas)
- **Páginas de estación** pensadas para rotar contenido según la temporada
- **PWA-ready**: service worker (`public/sw.js`) + manifest con íconos SVG
- **Accesible**: base font-size 16px, contraste WCAG AA, navegación por teclado, targets táctiles ≥ 44px
- **Side nav** con animación escalonada de links
- **Scroll-to-top flotante**
- **View Transitions API** para navegación fluida entre páginas

---

## 🎨 Sistema de Diseño

Los tokens de marca están definidos como custom properties en `src/styles/global.css`:

```css
/* Paleta principal */
--color-brand-red: #9B1D20;       /* Acciones principales */
--color-brand-fresh: #2D6A4F;     /* Frescura / delivery */
--color-brand-gold: #D4A853;      /* Acento premium */
--color-brand-cream: #FDFBF7;     /* Fondos */
--color-brand-charcoal: #2C2420;  /* Textos */

/* Tipografía */
--font-serif: 'Playfair Display', Georgia, serif;
--font-sans: 'Inter', system-ui, sans-serif;
--font-hand: 'Caveat', cursive;
```

### Brand Book

La guía de marca completa está disponible como HTML standalone en `/brandbook/` durante el deploy.

---

## 📁 Estructura del Proyecto

```
sites/apolonia/
├── public/
│   ├── brandbook/            # Brand book (HTML standalone)
│   ├── icons/                # Íconos PWA (SVG)
│   ├── sw.js                 # Service Worker
│   ├── favicon.svg
│   └── manifest.json         # Web App Manifest
├── src/
│   ├── components/
│   │   ├── cart/             # CartBadge · CartContent · CartDrawer · CartToast
│   │   ├── catalog/          # CatalogSection (búsqueda + filtros)
│   │   ├── nav/              # SideNav (drawer lateral)
│   │   ├── product/          # ProductCard · FeaturedProductCard
│   │   └── ui/               # ScrollToTop
│   ├── layouts/
│   │   └── Layout.astro      # Layout global (header, nav, footer)
│   ├── lib/
│   │   ├── cart-store.js     # Store Zustand con persistencia + template WhatsApp
│   │   └── productos.js      # Catálogo completo (116+ productos)
│   ├── pages/
│   │   ├── index.astro       # Portada con destacados
│   │   ├── catalogo.astro    # Catálogo completo
│   │   ├── estacion.astro    # Página de temporada
│   │   ├── nosotros.astro    # Información del negocio
│   │   └── carrito.astro     # Carrito de compras
│   └── styles/
│       └── global.css        # Tema Tailwind v4 + animaciones custom
├── brandbook.html            # Brand book (source)
├── astro.config.mjs
├── postcss.config.mjs
├── pnpm-workspace.yaml
├── .npmrc
├── tsconfig.json
└── package.json
```

---

## ⚡ Empezando

```bash
pnpm install
pnpm run dev        # Servidor local de desarrollo
pnpm run build      # Build de producción
pnpm run preview    # Previsualizar build
```

> **Requerimiento**: Node.js >= 22.12.0

---

## ♿ Accesibilidad

- Base font-size mínima de **16px**
- Ratios de contraste **WCAG AA** en toda la interfaz
- Navegación completa por **teclado**
- Indicadores de foco visibles
- Áreas táctiles de al menos **44px**
- Sin información transmitida únicamente por color
- `prefers-reduced-motion` respetado

---

## 🛠 Notas de Desarrollo

- El proyecto usa **pnpm 11** con workspace lock; ver `.npmrc` y `pnpm-workspace.yaml`
- Las animaciones custom usan `cubic-bezier(0.22, 1, 0.36, 1)` — el easing "premium door close"
- El carrito persiste en localStorage bajo la key `apolonia-cart`
- Los precios en el catálogo se renderizan con `toLocaleString('es-AR')`
- El brand book es un HTML standalone que se despliega en `/brandbook/`

### Comandos Útiles

```bash
pnpm run astro -- --help     # Ayuda de Astro
pnpm run build && pnpm run preview  # Build + preview local
```

---

## 🚢 Deploy

El sitio se despliega en **Vercel** desde el dashboard web apuntando al repositorio:

```
https://github.com/illushkinn/verduleria-apolonia-mar-del-plata
```

URL en producción: [apolonia-mdp.vercel.app](https://apolonia-mdp.vercel.app)

---

## 📄 Licencia

Propietaria — Todos los derechos reservados © Apolonia Mar del Plata.
