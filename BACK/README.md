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

- Registro de Usuario
POST /users/register -------------------> http://localhost:{PORT}/users/register

- Validación del usuario mediante el código de registro
PUT /users/validate/:registrarionCode --> http://localhost:{PORT}/users/validate/:registrarionCode

- Login del usuario
POST /users/login ----------------------> http://localhost:{PORT}/users/login

- Para envío de correo para la recuperación de la contraseña, cuando el usuario no recuerda la contraseña actual
POST /users/recover-password -----------> http://localhost:{PORT}/users/recover-password

- Para ingresar la nueva contraseña, utilizando el código de recuperación enviado por correo
PUT /users/password --------------------> http://localhost:{PORT}/users/password

- Cambio de contraseña cuando el usuario se encuentra logueado y recuerda la contraseña actual
POST /users/change-password ------------> http://localhost:{PORT}/users/change-password

- Cambio de datos del perfil de usuario
PUT /users/profile ---------------------> http://localhost:{PORT}/users/profile

- Vista del perfil de usuario
GET /users/profile ---------------------> http://localhost:{PORT}/users/profile

- Cambio de imagen de usuario
PUT /users/avatar ----------------------> http://localhost:{PORT}/users/avatar

## RUTAS EXPERIENCIAS

- Crea una nueva experiencia en caso de ser un usuario logueado y este tener un rol administrador
POST /experiencias ------------------------------> http://localhost:{PORT}/experiencias

- Visualización de la lista de experiencias, tanto para usuario (o administrador) sin loguear como logueado, con y sin filtros de búsqueda
*GET /experiencias ------------------------------> http://localhost:{PORT}/experiencias
*GET /experiencias ------------------------------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC

    (\*) Pruebas a realizar en GET /experiencias:

        1. Sin token enviado mediante headers, y sin búsqueda de experiencias específicas
        GET /experiencias -----------> http://localhost:{PORT}/experiencias

        2. Sin token enviado mediante headers, y con búsqueda de experiencias específicas
        GET /experiencias -----------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC

        3. Con token enviado mediante headers, y sin búsqueda de experiencias específicas.
        GET /experiencias -----------> http://localhost:{PORT}/experiencias

        4. Con token enviado mediante headers, y con búsqueda de experiencias específicas
        GET /experiencias -----------> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC

- Desactiva, reactiva y confirma la experiencia
PUT /experiencias/:experienceId/experienceState -> http://localhost:{PORT}/experiencias/1/experienceState

- Reserva una experiencia
POST /experiencias/:experienceId/reservation -----> http://localhost:{PORT}/experiencias/1/reservation

- Cancela la reserva de una experiencia
PUT /experiencias/:experienceId/reservation -----> http://localhost:{PORT}/experiencias/1/reservation

- Lista las experiencias reservadas 
GET /experiencias/reservedExperiences -----------> http://localhost:{PORT}/experiencias/reservedExperiences

- Visualiza una experiencia específica
GET /experiencias/:experienceId -----------------> http://localhost:{PORT}/experiencias/1

- Lista las experiencias creadas por un administrador en particular y muestra las reservas de los usuarios en cada una de las experiencias
GET /admin/experiences --------------------------> http://localhost:{PORT}/admin/experiences

- Modifica una experiencia determinada, únicamente para administrador
PUT /experiencias/:experienceId/edit ------------> http://localhost:{PORT}/experiencias/1/edit

- Duplica una experiencia en particular, únicamente para administrador
POST /experiencias/:id/duplicate ----------------> http://localhost:{PORT}/experiencias/1/duplicate

- Valoración de una experiencia, la cual debe haber sido ya disfrutada por el usuario que la valora.
POST /experiencias/:experienceId/votes ----------> http://localhost:{PORT}/experiencias/1/votes

