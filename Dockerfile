# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación (SSG)
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copiar package.json
COPY package.json package-lock.json* ./

# Instalar solo dependencias de producción (Express)
RUN npm ci --only=production

# Copiar servidor Express
COPY server.js ./

# Copiar archivos construidos desde el builder
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Comando para iniciar el servidor Express
CMD ["npm", "start"]
