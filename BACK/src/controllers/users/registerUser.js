import randomstring from "randomstring";

// Importa el esquema de validación.
import newUserSchema from "../../schemas/users/newUserSchema.js";
import insertUserModel from "../../models/users/insertUserModel.js";

import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Define el controlador para registrar usuarios.
export default async function registerUser(req, res, next) {
  try {
    // Extrae el nombre de usuario, correo y contraseña del cuerpo de la solicitud.
    const { email, password, username, firstname, lastname } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(newUserSchema, req.body);

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
  }
}
