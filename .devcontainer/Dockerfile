# .devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18

# Instala el cliente de PostgreSQL (útil para probar conexiones)
RUN apt-get update && apt-get install -y postgresql-client

# Define el directorio de trabajo
WORKDIR /workspace
