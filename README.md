# WebApp PyMorfosis with React JS and Express 

Aplicación web para el aprendizaje de Python mediante la plataforma adaptativa PyMorfosis.

- Pueden acceder a la documentación en el siguiente enlace: https://.....

### 1) Instalación

Si usas Github Codespaces o Gitpod este template ya viene con React, Node y la base de datos Postgres instalados. Si trabajas de forma local, asegúrate de instalar la última versión de Node.js.

Se recomienda instalar primero el backend. Asegúrate de tener Node.js y un motor de base de datos (se recomienda Postgres).

1. Clona el repositorio: `$ git clone https://github.com/AntaresFS/PyMorfosis.git`
2. Navega al directorio del proyecto: `$ cd PyMorfosis`
3. Instala todas las dependencias: `$ npm run install-all`
4. Crea un archivo .env basado en .env.example: `$ cp .env.example .env`
5. Instala tu motor de base de datos y crea tu base de datos. Dependiendo de tu base de datos tendrás que crear una variable de entorno DATABASE_URL con uno de los siguientes valores. Asegúrate de cambiar los valores con la información de tu base de datos:

| Motor     | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/db_name    |
| Postgres  | postgres://username:password@localhost:5432/db_name |

6. Inicia la aplicación: `$ npm run setup`

### 2) Configuración en Codespaces o Gitpod

Si usas Github Codespaces o Gitpod, el entorno ya viene preconfigurado. Solo necesitas seguir los pasos 3 y 4 de la sección de instalación y luego ejecutar `$ npm run setup`.
