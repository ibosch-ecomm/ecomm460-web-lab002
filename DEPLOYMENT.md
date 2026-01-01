# Guía de Despliegue - eComm360

## 📋 Requisitos Previos

- Docker 20.10+
- Docker Compose 1.29+
- O Node.js 22+ con pnpm 10+

## 🚀 Opciones de Despliegue

### Opción 1: Docker Compose (Recomendado)

#### 1. Preparar el servidor

```bash
# Actualizar sistema
sudo apt-get update && sudo apt-get upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalación
docker --version
docker-compose --version
```

#### 2. Clonar y configurar

```bash
# Clonar repositorio
git clone <repository-url> /opt/ecomm360
cd /opt/ecomm360

# Configurar variables de entorno
cp .env.example .env
nano .env  # Editar si es necesario
```

#### 3. Iniciar servicios

```bash
# Construir y iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Verificar estado
docker-compose ps
```

#### 4. Acceder a la aplicación

```
http://tu-servidor:3000
```

### Opción 2: Docker Manual

#### 1. Construir imagen

```bash
cd /opt/ecomm360
docker build -t ecomm360:latest .
```

#### 2. Ejecutar contenedor

```bash
docker run -d \
  --name ecomm360 \
  -p 3000:3000 \
  -e GRAPHQL_ENDPOINT=https://web2025.ecomm360.net/graphql \
  -e NODE_ENV=production \
  --restart unless-stopped \
  ecomm360:latest
```

#### 3. Verificar

```bash
docker logs ecomm360
docker ps
```

### Opción 3: Node.js Directo

#### 1. Instalar dependencias

```bash
cd /opt/ecomm360
pnpm install --prod
```

#### 2. Construir aplicación

```bash
pnpm run build
```

#### 3. Iniciar con PM2 (recomendado)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Crear archivo ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'ecomm360',
    script: './dist/server/entry.mjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      GRAPHQL_ENDPOINT: 'https://web2025.ecomm360.net/graphql'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔄 Actualización

### Con Docker Compose

```bash
cd /opt/ecomm360

# Descargar cambios
git pull origin main

# Reconstruir imagen
docker-compose build --no-cache

# Reiniciar servicios
docker-compose up -d
```

### Con Node.js

```bash
cd /opt/ecomm360

# Descargar cambios
git pull origin main

# Instalar dependencias
pnpm install --prod

# Reconstruir
pnpm run build

# Reiniciar con PM2
pm2 restart ecomm360
```

## 🔒 Configuración de Seguridad

### 1. Nginx como Reverse Proxy

```nginx
upstream ecomm360 {
    server localhost:3000;
}

server {
    listen 80;
    server_name tu-dominio.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tu-dominio.com;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;

    # Configuración SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Headers de seguridad
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy
    location / {
        proxy_pass http://ecomm360;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache estático
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 2. SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot certonly --nginx -d tu-dominio.com

# Auto-renovación
sudo systemctl enable certbot.timer
```

## 📊 Monitoreo

### Con PM2

```bash
# Dashboard
pm2 monit

# Logs
pm2 logs ecomm360

# Estadísticas
pm2 show ecomm360
```

### Con Docker

```bash
# Logs
docker logs -f ecomm360

# Estadísticas
docker stats ecomm360

# Inspeccionar
docker inspect ecomm360
```

## 🔧 Troubleshooting

### Problema: Puerto 3000 en uso

```bash
# Encontrar proceso
lsof -i :3000

# Matar proceso
kill -9 <PID>
```

### Problema: Memoria insuficiente

```bash
# Aumentar límite de memoria en docker-compose.yml
services:
  ecomm360:
    mem_limit: 2g
    memswap_limit: 2g
```

### Problema: GraphQL endpoint no responde

```bash
# Verificar conectividad
curl https://web2025.ecomm360.net/graphql

# Revisar logs
docker logs ecomm360
```

## 📈 Escalado

### Con Docker Compose

```yaml
services:
  ecomm360:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Con PM2

```bash
pm2 start ecosystem.config.js -i 4  # 4 instancias
```

## 🔄 Backup y Recuperación

### Backup de configuración

```bash
# Backup de .env
cp /opt/ecomm360/.env /backup/ecomm360-env-$(date +%Y%m%d).bak

# Backup de volúmenes Docker
docker-compose exec ecomm360 tar czf /tmp/backup.tar.gz /app
docker cp ecomm360:/tmp/backup.tar.gz ./backup-$(date +%Y%m%d).tar.gz
```

### Recuperación

```bash
# Restaurar .env
cp /backup/ecomm360-env-*.bak /opt/ecomm360/.env

# Reiniciar servicios
docker-compose restart
```

## 📞 Soporte

Para problemas de despliegue, contacta a: devops@ecomm360.net

---

**Última actualización**: Enero 2026
