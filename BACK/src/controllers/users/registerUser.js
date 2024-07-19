import randomstring from "randomstring";

// Importa la conexión a la base de datos.
import getPool from "../../database/getPool.js";

// Importa el esquema de validación.
import newUserSchema from "../../schemas/users/newUserSchema.js";
import insertUserModel from "../../models/users/insertUserModel.js";

import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Define el controlador para registrar usuarios.
export default async function registerUser(req, res, next) {
  let connection;
  try {
    // Extrae el nombre de usuario, correo y contraseña del cuerpo de la solicitud.
    const { email, password, username, firstname, lastname } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(newUserSchema, req.body);

    // Obtén el pool de conexiones.
    const pool = await getPool();

    // Obtén una conexión del pool.
    connection = await pool.getConnection();

    // Creamos el código de registro.
    const registrationCode = randomstring.generate(30);

    await insertUserModel(
      email,
      password,
      username,
      firstname,
      lastname,
      registrationCode
    );

    //Envia una respuesta de éxito.
    res.send({
      status: "ok",
      message:
        "User created successfully. Please verify your user using the email you received.",
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}
