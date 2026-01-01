# Guía Rápida de Inicio - eComm360

## ⚡ 5 Minutos para Empezar

### 1. Clonar y Instalar
```bash
git clone <repository-url>
cd ecomm360
pnpm install
```

### 2. Configurar Variables
```bash
cp .env.example .env
# El .env ya tiene el endpoint configurado
```

### 3. Iniciar Desarrollo
```bash
pnpm run dev
```

Acceder a: http://localhost:3000

## 🚀 Despliegue Rápido

### Con Docker Compose
```bash
docker-compose up -d
```

### Con Docker Manual
```bash
docker build -t ecomm360 .
docker run -p 3000:3000 ecomm360
```

## 📁 Estructura Clave

```
src/
├── pages/          # Rutas (automáticas desde WordPress)
├── components/     # Componentes React
├── layouts/        # Layouts Astro
├── lib/            # GraphQL client
└── styles/         # Estilos globales
```

## 🔧 Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Servidor de desarrollo |
| `pnpm run build` | Construir para producción |
| `pnpm run preview` | Previsualizar build |

## 🎨 Personalización

### Cambiar Colores
Editar `src/styles/global.css`:
```css
:root {
  --color-navy: #1B5585;
  --color-turquoise: #55C7DC;
}
```

### Modificar Header
Editar `src/components/Header.tsx`

### Agregar Páginas
Crear archivos en `src/pages/`

## 📚 Documentación Completa

- **README_ECOMM360.md** - Documentación completa
- **DEPLOYMENT.md** - Guía de despliegue
- **TECHNICAL_SUMMARY.md** - Resumen técnico

## 🆘 Troubleshooting

### Puerto 3000 ocupado
```bash
lsof -i :3000
kill -9 <PID>
```

### Limpiar caché
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Reconstruir
```bash
pnpm run build
pnpm run preview
```

## 📞 Soporte

- Documentación: README_ECOMM360.md
- Despliegue: DEPLOYMENT.md
- Técnico: TECHNICAL_SUMMARY.md

---

¡Listo para comenzar! 🎉
