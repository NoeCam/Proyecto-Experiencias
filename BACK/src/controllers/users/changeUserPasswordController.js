import changeUserPasswordModel from "../../models/users/changeUserPasswordModel.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import changeUserPasswordSchema from "../../schemas/users/changeUserPasswordSchema.js";

const changeUserPasswordController = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(changeUserPasswordSchema, req.body);

    // Actualizamos la contraseña del usuario.
    await changeUserPasswordModel(email, oldPassword, newPassword);

    res.send({
      status: "ok",
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default changeUserPasswordController;