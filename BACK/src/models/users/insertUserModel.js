//importamos las dependencias.
import bcrypt from "bcrypt";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

import { PORT } from "../../../env.js";

// Importamos los servicios.
import sendMailUtil from "../../utils/sendMailUtil.js";

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
const insertUserModel = async (
  email,
  password,
  username,
  firstname,
  lastname,
  registrationCode
) => {
  const pool = await getPool();

  // Buscamos en la base de datos algún usuario con ese nombre.
  let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
    username,
  ]);

  // Si existe algún usuario con ese nombre lanzamos un error.
  if (users.length > 0) {
    emailAlreadyRegisteredError();
  }

  // Buscamos en la base de datos algún usuario con ese email.
  [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

  // Si existe algún usuario con ese email lanzamos un error.
  if (users.length > 0) {
    userAlreadyRegisteredError();
  }

  // Creamos el asunto del email de verificación.
  const emailSubject = "Activa tu usuario en Experiencias Diferentes";

  // Creamos el contenido del email
  const emailBody = `
            ¡Bienvenid@ ${username}!

            Gracias por registrarte en Experiencias Diferentes. Para activar tu cuenta, haz clic en el siguiente enlace:

            <a href="http://localhost:${PORT}/users/validate/${registrationCode}">Activar mi cuenta</a>
        `;

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody);

  // Encriptamos la contraseña.
  const hashedPass = await bcrypt.hash(password, 10);

  // Insertamos el usuario.
  await pool.query(
    `INSERT INTO users(email, password, username, firstname, lastname, registrationCode) VALUES ( ?, ?, ?, ?, ?, ?)`,
    [email, hashedPass, username, firstname, lastname, registrationCode]
  );
};

export default insertUserModel;
