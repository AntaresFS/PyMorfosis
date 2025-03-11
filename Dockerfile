# /PyMorfosis/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18

# Instala el cliente de PostgreSQL, Docker CLI y docker-compose
RUN apt-get update && \
    apt-get install -y postgresql-client docker.io docker-compose && \
    rm -rf /var/lib/apt/lists/*

# Define el directorio de trabajo
WORKDIR /workspace