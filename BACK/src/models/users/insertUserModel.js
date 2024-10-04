// Importamos las dependencias.
import bcrypt from "bcrypt";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";
import { PORT_FRONT } from "../../../env.js";

// Importamos los servicios.
import sendMailUtil from "../../utils/sendMailUtil.js";
import {
  emailAlreadyRegisteredError,
  userAlreadyRegisteredError,
} from "../../services/errorService.js";

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
  const connection = await pool.getConnection();

  try {
    // Buscamos en la base de datos algún usuario con ese nombre.
    let [users] = await connection.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );

    // Si existe algún usuario con ese nombre lanzamos un error.
    if (users.length > 0) {
      throw userAlreadyRegisteredError();
    }

    // Buscamos en la base de datos algún usuario con ese email.
    [users] = await connection.query(`SELECT id FROM users WHERE email = ?`, [
      email,
    ]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0) {
      throw emailAlreadyRegisteredError();
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await connection.query(
      `INSERT INTO users(email, password, username, firstname, lastname, registrationCode) VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPass, username, firstname, lastname, registrationCode]
    );

    // Creamos el asunto del email de verificación.
    const emailSubject = "Activate your user in Experiencias Diferentes";

    // Creamos el contenido del email.
    const emailBody = `
      ¡Welcome ${username}!

      Thank you for registering at Different Experiences. To activate your account, click the following link:

      <a href="${PORT_FRONT}/users/validate/${registrationCode}">Activate my account</a>
    `;

    // Enviamos el email de verificación al usuario.
    await sendMailUtil(email, emailSubject, emailBody);
  } catch (error) {
    console.error(error);
    throw new Error("Username or Email already registared");
  } finally {
    // Liberamos la conexión.
    if (connection) connection.release();
  }
};

export default insertUserModel;
