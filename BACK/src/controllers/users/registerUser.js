// Importa bcrypt para el hash de contraseñas.
import bcrypt from "bcrypt";

import randomstring from "randomstring";

// Importa la conexión a la base de datos.
import getPool from "../../database/getPool.js";

// Importa el esquema de validación.
import newUserSchema from "../../schemas/users/newUserSchema.js";
import insertUserModel from "../../models/users/insertUserModel.js";

// Define una función para validar datos con un esquema.
export async function validateSchemaUtil(schema, data) {
  const { error } = schema.validate(data); // Valida los datos contra el esquema.
  if (error) {
    // Si hay un error de validación...
    throw new Error(`Validation error: ${error.details[0].message}`); // Lanza un error con el mensaje de validación.
  }
}

// Define el controlador para registrar usuarios.
export default async function registerUser(req, res, next) {
  let connection;
  try {
    // Extrae el nombre de usuario, correo y contraseña del cuerpo de la solicitud.
    const { email, password, username, firstname, lastname } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(newUserSchema, req.body);

    // Hashea la contraseña con bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Obtén el pool de conexiones.
    const pool = await getPool();

    // Obtén una conexión del pool.
    connection = await pool.getConnection();

    // Creamos el código de registro.
    const registrationCode = randomstring.generate(30);

    await insertUserModel(
      email,
      hashedPassword,
      username,
      firstname,
      lastname,
      registrationCode
    );

    //Envia una respuesta de éxito.
    res.send({
      status: "ok",
      message:
        "Usuario creado con éxito. Por favor, verifica tu usuario mediante el email que has recibido.",
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}
