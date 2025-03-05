# WebApp PyMorfosis with React JS and Express 

Aplicación web para el aprendizaje de Python mediante la plataforma adaptativa PyMorfosis.

- Pueden acceder a la documentación en el siguiente enlace: https://.....

### 1) Instalación

Si usas Github Codespaces o Gitpod este template ya viene con React, Node y la base de datos Postgress instalados. Si trabajas de forma local, asegúrate de instalar la última versión de Node.js

Se recomienda instalar primero el backend. Asegúrate de tener Node.js y un motor de base de datos (se recomienda Postgress).

1. Instala los paquetes de Node: `$ npm run install-all`
2. Crea un archivo .env basado en .env.example: `$ cp .env.example .env`
3. Instala tu motor de base de datos y crea tu base de datos. Dependiendo de tu base de datos tendrás que crear una variable de entorno DATABASE_URL con uno de los siguientes valores. Asegúrate de cambiar los valores con la información de tu base de datos:

| Motor     | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |
