// Importamos los modelos.
import updateUserPassModel from "../../models/users/updateUserPassModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import editUserPassSchema from "../../schemas/users/editUserPassSchema.js";

const editUserPassController = async (req, res, next) => {
  try {
    const { email, recoverPassCode, newPassword } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(editUserPassSchema, req.body);

    await updateUserPassModel(email, recoverPassCode, newPassword);

    res.send({
      status: "ok",
      message: "Updated password",
    });
  } catch (err) {
    next(err);
  }
};

export default editUserPassController;
