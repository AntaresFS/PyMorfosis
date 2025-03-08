#!/bin/bash
# Inicia el demonio de Docker en segundo plano
dockerd &

# Espera a que dockerd se inicialice
sleep 5

# Levanta los servicios definidos en docker-compose (por ejemplo, solo la base de datos)
docker-compose up -d

# Opcional: Ejecuta migraciones o inicializaciones (por ejemplo, inicializar la base de datos)
# docker-compose exec app node models/initDb.js
