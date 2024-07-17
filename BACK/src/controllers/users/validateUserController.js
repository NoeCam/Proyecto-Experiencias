// Importamos los modelos.
import updateUserRegCodeModel from "../../models/users/updateUserRegCodeModel.js";

// Importamos el esquema de validación.
import validateUserSchema from "../../schemas/users/validateUserSchema.js";

// Importamos el servicio de validación.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Función controladora final que valida a un usuario recién registrado.
const validateUserController = async (req, res, next) => {
  try {
    // Obtenemos el código de registro de los path params.
    const { registrationCode } = req.params;

    //Validación del body con Joi.
    await validateSchemaUtil(validateUserSchema, req.body);

    // Activamos el usuario.
    await updateUserRegCodeModel(registrationCode);

    res.send({
      status: "ok",
      message: "Activated user",
    });
  } catch (err) {
    res.send({
      status: "error",
      message:
        "Error activating the user, verify that it is not already activated",
    });
  }
};

export default validateUserController;
