# eComm360 - Web Corporativa

Sitio web corporativo de **eComm360** construido con **Astro**, **Tailwind CSS** y **React**, conectado a **WordPress vía WPGraphQL**.

## 🚀 Características

- **Astro 5.16.6**: Framework moderno para máxima velocidad y SEO
- **Tailwind CSS**: Estilos responsive y personalizables
- **React Integrado**: Componentes interactivos como "Islas" (client:load)
- **WPGraphQL**: Conexión dinámica a WordPress
- **Corporate Glassmorphism**: Diseño elegante inspirado en Apple/Stripe
- **Header Flotante**: Navegación sticky con efecto glassmorphism
- **Menú Móvil**: React Portal con acordeón de submenús
- **Tech-BG**: Fondo CSS con micro-retícula y orbes de luz
- **Rutas Dinámicas**: Generación automática de páginas desde WordPress
- **Docker Ready**: Configuración completa para despliegue

## 📋 Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Astro | 5.16.6 | Framework principal |
| React | 19.2.3 | Componentes interactivos |
| Tailwind CSS | 4.1.18 | Estilos y diseño |
| GraphQL Request | 7.4.0 | Cliente GraphQL |
| Node.js | 22.13.0 | Runtime |
| pnpm | 10.27.0 | Gestor de paquetes |

## 🎨 Identidad Visual

### Colores Corporativos
- **Azul Marino**: `#1B5585`
- **Turquesa**: `#55C7DC`
- **Blanco**: `#FFFFFF`
- **Grises**: Escala de grises para contraste

### Estilos
- Bordes redondeados: `rounded-2xl` o `rounded-3xl`
- Sombras suaves y elegantes
- Fondos blancos con glassmorphism
- Efecto "Reading Guide" en párrafos

## 📁 Estructura del Proyecto

```
ecomm360/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx       # Header flotante
│   │   └── MobileMenu.tsx   # Menú móvil con Portal
│   ├── layouts/             # Layouts de Astro
│   │   ├── Layout.astro     # Layout principal
│   │   └── ContentLayout.astro  # Layout para contenido
│   ├── lib/
│   │   └── graphql.ts       # Cliente y queries GraphQL
│   ├── pages/               # Rutas y páginas
│   │   ├── index.astro      # Página de inicio
│   │   ├── [slug].astro     # Páginas dinámicas
│   │   ├── 404.astro        # Página 404
│   │   └── blog/
│   │       ├── index.astro  # Listado de blog
│   │       └── [slug].astro # Posts individuales
│   ├── styles/
│   │   └── global.css       # Estilos globales
│   └── utils/
│       └── cleanDivi.ts     # Utilidades de limpieza
├── public/                  # Archivos estáticos
├── Dockerfile              # Configuración Docker
├── docker-compose.yml      # Orquestación Docker
├── .env                    # Variables de entorno
├── .env.example            # Plantilla de variables
└── package.json            # Dependencias
```

## 🔧 Instalación

### Requisitos Previos
- Node.js 22+
- pnpm 10+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd ecomm360
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con los valores correctos
```

4. **Iniciar servidor de desarrollo**
```bash
pnpm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📦 Comandos Disponibles

```bash
# Desarrollo
pnpm run dev          # Inicia servidor de desarrollo

# Construcción
pnpm run build        # Construye para producción
pnpm run preview      # Previsualiza la construcción

# Astro CLI
pnpm run astro        # Acceso directo a CLI de Astro
```

## 🐳 Despliegue con Docker

### Construcción de Imagen

```bash
docker build -t ecomm360:latest .
```

### Ejecución con Docker

```bash
docker run -p 3000:3000 \
  -e GRAPHQL_ENDPOINT=https://web2025.ecomm360.net/graphql \
  ecomm360:latest
```

### Usando Docker Compose

```bash
docker-compose up -d
```

Acceder a `http://localhost:3000`

## 🔌 Configuración de WPGraphQL

### Endpoint
```
https://web2025.ecomm360.net/graphql
```

### Queries Disponibles

#### Menús
```graphql
query GetMenuItems {
  menus(first: 1, where: { name: "Main Menu" }) {
    edges {
      node {
        menuItems(first: 100) {
          edges {
            node {
              id
              label
              url
              order
              childItems(first: 50) {
                edges {
                  node {
                    id
                    label
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

#### Páginas
```graphql
query GetPages {
  pages(first: 100) {
    edges {
      node {
        id
        title
        slug
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
}
```

#### Posts
```graphql
query GetPosts {
  posts(first: 100) {
    edges {
      node {
        id
        title
        slug
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
}
```

## 🎯 Características Principales

### Header Flotante
- Diseño "Isla Flotante" centrada
- Efecto sticky con compactación al scroll
- Glassmorphism con `backdrop-blur-xl`
- Orden de menú forzado: Servicios, Soluciones, Plataformas, Sectores, Portfolio, Nosotros, Blog

### Menú Móvil
- React Portal para renderizado en `body`
- Fondo blanco opaco
- Tipografía grande y fácil de tocar
- Submenús con acordeón (colapsados por defecto)

### Tech-BG
- Micro-retícula CSS (grid)
- Orbes de luz difuminados en esquinas
- Solo CSS, sin imágenes
- Efecto "Reading Guide" en párrafos

### Rutas Dinámicas
- Generación automática de páginas desde WordPress
- Limpieza de shortcodes de Divi
- SEO optimizado con metadatos
- Soporte para imágenes destacadas

## 🛠️ Utilidades

### cleanDivi.ts
Funciones para limpiar contenido de WordPress:
- `cleanDiviShortcodes()`: Elimina shortcodes de Divi
- `sanitizeHTML()`: Sanitiza HTML para evitar XSS
- `extractPlainText()`: Extrae texto plano
- `generateExcerpt()`: Genera resúmenes de contenido

### graphql.ts
Cliente GraphQL con queries predefinidas:
- `getMenuItems()`: Obtiene menú principal
- `getPages()`: Obtiene todas las páginas
- `getPageBySlug()`: Obtiene página específica
- `getPosts()`: Obtiene todos los posts
- `getPostBySlug()`: Obtiene post específico

## 📱 Responsive Design

El sitio es completamente responsive:
- **Móvil**: Optimizado para pantallas pequeñas
- **Tablet**: Diseño adaptable
- **Desktop**: Experiencia completa con todas las características

## 🔒 Seguridad

- Sanitización de HTML
- Validación de URLs
- Variables de entorno protegidas
- Dockerfile con multi-stage build

## 📊 SEO

- Meta etiquetas automáticas
- Open Graph tags
- Twitter Card
- Sitemap generado automáticamente
- URLs amigables

## 🤝 Contribución

Para contribuir al proyecto:

1. Crea una rama para tu feature
2. Realiza tus cambios
3. Envía un pull request

## 📄 Licencia

Este proyecto está bajo licencia propietaria de eComm360.

## 📞 Soporte

Para soporte técnico, contacta a: support@ecomm360.net

---

**Última actualización**: Enero 2026
**Versión**: 1.0.0
