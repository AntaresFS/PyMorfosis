# /PyMorfosis/Dockerfile
FROM node:14

# Establece el directorio de trabajo
WORKDIR /workspace

# Copia los archivos de configuración de npm y luego instala las dependencias
COPY package*.json ./
RUN npm install

# Expone el puerto en el que corre tu servidor (ajústalo si es necesario)
EXPOSE 3001

# Instala el cliente de PostgreSQL, Docker CLI y docker-compose
RUN apt-get update && \
   apt-get install -y postgresql-client docker.io docker-compose && \
   rm -rf /var/lib/apt/lists/*

# Ejecuta el script "setup" para inicializar la base de datos y levantar el servidor
CMD ["npm", "run", "setup"]