# Experiencias Diferentes

Una plataforma donde los usuarios pueden explorar y reservar diversas experiencias, como tours, paseos en barco, y actividades al aire libre en distintas ciudades de España.

## Descripción

Experiencias Diferentes es una aplicación web que permite a los usuarios descubrir, reservar y gestionar diversas experiencias. Ya sea un walking tour por Ferrol, un paseo en kayak desde Hoyos del Espino, o un city tour en bicicleta por Madrid, nuestra plataforma ofrece una amplia gama de actividades para todos los gustos.

### Funcionalidades Principales

- **Usuarios**:
  - Registro y gestión de perfil.
  - Visualización y edición de datos de perfil.
  - Cambio y recuperación de contraseña.
  - Subir o editar imagen de perfil.
  - Visualización y reserva de experiencias.
  - Visualización listado de reservas de experiencias.
  - Cancelación de reservas.
  - Gestión de reservas (múltiples plazas o varias reservas).
  - Valoración de una experiencia una vez disfrutada.

- **Administradores**:
  - Todas las funcionalidades de un usuario.
  - Creación de nuevas experiencias.
  - Edición y duplicado de experiencias existentes.
  - Cambio del estado de una experiencia (activa/desactivada).
  - Reserva de experiencias.
  - Visualización listado experiencias reservadas creadas por un Admin concreto.

## Requisitos Previos

Antes de iniciar la aplicación, asegúrate de tener instalados los siguientes programas:

- Node.js v14+
- npm (o yarn)

## Instalación

Sigue estos pasos para clonar el repositorio e instalar las dependencias necesarias:


git clone https://github.com/Miguel-Iglesias/Proyecto-Experiencias.git
cd Proyecto-Experiencias
npm install

## Arrancar el Frontend
Para arrancar el frontend de la aplicación, primero accede al directorio del frontend y luego utiliza el siguiente comando:
cd APP-Experiencias_Diferentes/
npm run dev

Este comando levantará la aplicación en modo de desarrollo. Escribe la ruta con el puerto de .env.local: http://localhost:{PORT_FRONT} para verla en tu navegador.

## Listado de Rutas

A continuación se presenta un listado de las rutas disponibles en la aplicación:

/: Página principal de la aplicación. Lista de todas las experiencias disponibles.

/users/register: Registro de nuevos usuarios.
/users/validate/:registrationCode: Validación de usuarios registrados.
/users/login: Página de inicio de sesión.
/users/recover-password: Recuperación de contraseña.
/users/modify-password: Modificación de contraseña.
/users/password: Establecer nueva contraseña.
/users/change-password: Cambio de contraseña de usuario logueado.
/users/profile: Página de perfil de usuario.
/users/edit-profile: Página de edición de perfil de usuario.

/experiencias/:experienceId: Detalles de una experiencia en particular.
/experiencias/:experienceId/experienceState: Estado de una experiencia.
/experiencias/create: Creación de una nueva experiencia.
/experiencias/edit/:experienceId: Edición de una experiencia existente.

/admin/experiences: Visualización de experiencias reservadas, creadas por un usuario Admin concreto.
/experiencias/reservedExperiences: Visualización de experiencias reservadas por un usuario.


*: Página de no encontrado (404).

Variables de Entorno
Asegúrate de configurar las siguientes variables de entorno en un archivo .env.local:

VITE_API_URL=http://localhost:3020
VITE_APP_URL=http://localhost:5173


## Información del Proyecto

Nombre: app-experiencias-diferentes


## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

Haz un fork del proyecto.
Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
Realiza tus cambios y haz commit (git commit -m 'Añadir nueva característica').
Sube tus cambios (git push origin feature/nueva-caracteristica).
Abre un Pull Request.


## Miembros del Proyecto

Alberto Jiménez
Ana Perez
Miguel Iglesias
Noelia Camelia
Ricardo Hidalgo
Tomás Vázquez

Contacto

Para contactar con los creadores del proyecto, puedes ponerte en contacto directamente desde sus cuentas de LinkedIn:

- https://www.linkedin.com/in/alberto-jiménez-gonzález
- https://www.linkedin.com/in/ana-pérez-santiago
- https://www.linkedin.com/in/migueliglesiascami%C3%B1a/
- https://www.linkedin.com/in/noelia-camelia-acosta
- https://www.linkedin.com/in/ricardo-hidalgo-jiménez
- https://www.linkedin.com/in/tomás-vázquez-blanco/