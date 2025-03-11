# /PyMorfosis/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-20

# Instala el cliente de PostgreSQL, Docker CLI y docker-compose
RUN apt-get update && \
    apt-get install -y postgresql-client docker.io docker-compose && \
    rm -rf /var/lib/apt/lists/*

# Actualizar npm a la última versión
RUN npm install -g npm@latest

# Configurar el directorio como seguro para Git
RUN git config --global --add safe.directory /workspaces/PyMorfosis

# Define el directorio de trabajo
WORKDIR /workspace