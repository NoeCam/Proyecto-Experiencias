# Proyecto-Experiencias

En VsCode:
EN .env RELLENAR LOS DATOS E INCLUIR EL NOMBRE DE LA BASE DE DATOS(MYSQL_DATABASE);
En MySQL Workbench:
ELIMINAR SI EXISTE UNA BASE DE DATOS REGISTRADA CON EL NOMBRE ELEGIDO EN MYSQL_DATABASE;
CREAR UNA BASE DE DATOS CON EL NOMBRE REGISTRADO EN MYSQL_DATABASE;

En VSC:
Para instalar las dependencias:
npm i

Para conectar en modo desarrollador:
npm run dev

Para ejecutar la creación de la base de datos (hacerlo en otra terminal):
npm run initDB

## RUTAS USERS

POST /users/register -------------------> http://localhost:{PORT}/users/register
PUT /users/validate/:registrarionCode --> http://localhost:{PORT}/users/validate/:registrarionCode
POST /users/login ----------------------> http://localhost:{PORT}/users/login
POST /users/recover-password -----------> http://localhost:{PORT}/users/recover-password
PUT /users/password --------------------> http://localhost:{PORT}/users/password
PUT /users/profile ---------------------> http://localhost:{PORT}/users/profile
GET /users/profile ---------------------> http://localhost:{PORT}/users/profile

## RUTAS EXPERIENCIAS

POST /experiencias ------------------------------> http://localhost:{PORT}/experiencias
*GET /experiencias ------------------------------> http://localhost:{PORT}/experiencias
*GET /experiencias ------------------------------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC
PUT /experiencias/:experienceId/experienceState -> http://localhost:{PORT}/experiencias/1/experienceState
PUT /experiencias/:experienceId/reservation -----> http://localhost:{PORT}/experiencias/1/reservation
GET /experiencias/reservedExperiences -----------> http://localhost:{PORT}/experiencias/reservedExperiences
GET /experiencias/:experienceId -----------------> http://localhost:{PORT}/experiencias/1
PUT /experiencias/:experienceId/edit ------------> http://localhost:{PORT}/experiencias/1/edit
POST /experiencias/:id/duplicate ----------------> http://localhost:{PORT}/experiencias/1/duplicate
POST /experiencias/:experienceId/votes ----------> http://localhost:{PORT}/experiencias/1/votes

(\*) Pruebas a realizar en GET /experiencias:

    1. Sin token enviado mediante headers, y sin búsqueda de experiencias específicas
    GET /experiencias -----------> http://localhost:{PORT}/experiencias

    2. Sin token enviado mediante headers, y con búsqueda de experiencias específicas
    GET /experiencias -----------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC

    3. Con token enviado mediante headers, y sin búsqueda de experiencias específicas.
    GET /experiencias -----------> http://localhost:{PORT}/experiencias

    4. Con token enviado mediante headers, y con búsqueda de experiencias específicas
    GET /experiencias -----------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC
