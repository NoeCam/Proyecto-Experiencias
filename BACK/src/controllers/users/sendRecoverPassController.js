// Importamos las dependencias.
import randomstring from "randomstring";

// Importamos los modelos.
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";
import updateRecoverPassModel from "../../models/users/updateRecoverPassModel.js";

// Importamos los errores.
import { notFoundError } from "../../services/errorService.js";

//Importamos el esquema de validación.
import sendRecoverPassSchema from "../../schemas/users/sendRecoverPassSchema.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Función controladora final que valida a un usuario recién registrado.
const sendRecoverPassController = async (req, res, next) => {
  try {
    // Obtenemos el email de la persona que quiere recuperar su contraseña.
    const { email } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(sendRecoverPassSchema, req.body);

    // Comprobamos si existe algún usuario con el email proporcionado.
    const user = await selectUserByEmailModel(email);

    // Si no existe un usuario con ese email lanzamos un error.
    if (!user) {
      notFoundError("User");
    }

    // Generamos el código de recuperación de contraseña.
    const recoverPassCode = randomstring.generate(10);

    // Insertamos el código de recuperación de contraseña.
    await updateRecoverPassModel(email, recoverPassCode);

    res.send({
      status: "ok",
      message: "Password recovery email sent",
    });
  } catch (err) {
    next(err);
  }
};

export default sendRecoverPassController;
