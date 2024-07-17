// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

// Importamos los servicios.
import sendMailUtil from "../../utils/sendMailUtil.js";

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateRecoverPassModel = async (email, recoverPassCode) => {
  const pool = await getPool();

  // Actualizamos el código de recuperación de contraseña del usuario.
  await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
    recoverPassCode,
    email,
  ]);

  // Creamos el asunto del email de recuperación de contraseña.
  const emailSubject = "Password recovery in Experiencias Diferentes :)";

  // Creamos el contenido del email
  const emailBody = `
            A password recovery has been requested for this email in Different Experiences. 

            Use the following code to create a new password: ${recoverPassCode}

            If it wasn't you, ignore this email.
        `;

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody);
};

export default updateRecoverPassModel;
