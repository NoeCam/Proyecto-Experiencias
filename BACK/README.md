# Proyecto-Experiencias
En MySQL Workbench:
    DROP DATABASE IF EXISTS experiencias_diferentes;
    CREATE DATABASE IF NOT EXISTS experiencias_diferentes;

En VSC:
Para instalar las dependencias:
    npm i

Para conectar en modo desarrollador:
    npm run dev

Para ejecutar la creación de la base de datos (hacerlo en otra terminal):
    npm run initDB

## RUTAS USERS
POST /users/register -------------------> http://localhost:{PORT}/users/register 
GET /users/validate/:registrarionCode --> http://localhost:{PORT}/user/validate/:registrarionCode
POST /users/login ----------------------> http://localhost:{PORT}/users/login
POST /users/recover-password -----------> http://localhost:3024/users/recover-password
PUT /users/password --------------------> http://localhost:3024/users/password

## RUTAS EXPERIENCIAS
POST /experiencias ---------------------> http://localhost:{PORT}/experiencias
GET /experiencias/:experienceId --------> http://localhost:{PORT}/experiencias/1
GET /experiencias ----------------------> http://localhost:{PORT}/experiencias
GET /experiencias ----------------------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC
PUT /experiencias/:experienceId/experienceState -> http://localhost:{PORT}/experiencias/1/experienceState

## Pruebas a realizar en GET /experiencias:
    1. Sin token enviado mediante headers, y sin búsqueda de experiencias específicas
    GET /experiencias -----------> http://localhost:{PORT}/experiencias

    2. Sin token enviado mediante headers, y con búsqueda de experiencias específicas
    GET /experiencias -----------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC

    3. Con token enviado mediante headers, y sin búsqueda de experiencias específicas.
    GET /experiencias -----------> http://localhost:{PORT}/experiencias

    4. Con token enviado mediante headers, y con búsqueda de experiencias específicas
    GET /experiencias -----------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC
