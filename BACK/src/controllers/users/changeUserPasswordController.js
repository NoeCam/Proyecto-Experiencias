import changeUserPasswordModel from "../../models/users/changeUserPasswordModel.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import changeUserPasswordSchema from "../../schemas/users/changeUserPasswordSchema.js";

const changeUserPasswordController = async (req, res, next) => {
  try {
    // Extraemos `newPassword` y `confirmPassword` del cuerpo de la solicitud.
    const { newPassword, confirmPassword } = req.body;

    // Validamos el cuerpo de la solicitud con Joi.
    await validateSchemaUtil(changeUserPasswordSchema, {
      newPassword,
      confirmPassword,
    });

    // Cambiamos la contraseña del usuario autenticado.
    await changeUserPasswordModel(req.user.id, newPassword);

    res.send({
      status: "ok",
      message: "Password updated successfully",
    });
  } catch (err) {
    // Enviamos el error al siguiente middleware de manejo de errores.
    next(err);
  }
};

export default changeUserPasswordController;
