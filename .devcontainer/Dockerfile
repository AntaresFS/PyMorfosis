# /PyMorfosis/Dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node


# Establece el directorio de trabajo
WORKDIR /workspace

# Copia los archivos de configuración de npm y luego instala las dependencias
COPY package*.json ./
RUN npm install

# Expone el puerto en el que corre tu servidor (ajústalo si es necesario)
EXPOSE 3001

# Instala el cliente de PostgreSQL, Docker CLI y docker-compose
RUN apt-get update && \
   apt-get install -y postgresql-client && \
   rm -rf /var/lib/apt/lists/*

