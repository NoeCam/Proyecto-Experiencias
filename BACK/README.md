# Proyecto-Experiencias

Para instalar las dependencias:
    npm i

Para conectar en modo desarrollador:
    npm run dev

Para ejecutar la creación de la base de datos (hacerlo en otra terminal):
    npm run initDB

## RUTAS USERS
POST /register -------------------> http://localhost:{PORT}/register 
GET /validate/:registrarionCode --> http://localhost:{PORT}/user/validate/:registrarionCode
POST /login ----------------------> http://localhost:{PORT}/login
POST /recover-password -----------> http://localhost:3024/recover-password
PUT /users/password --------------> http://localhost:3024/users/password

## RUTAS EXPERIENCIAS
POST /experiencias ---------------> http://localhost:{PORT}/experiencias
GET /experiencias ----------------> http://localhost:{PORT}/experiencias
GET /experiencias/:experienceId --> http://localhost:{PORT}/experiencias/1
GET /experiencias ----> http://localhost:{PORT}/experiencias?search=jet&order=date&direction=DESC
PUT /experiencias/:experienceId/experienceState -> http://localhost:3024/experiencias/1/experienceState