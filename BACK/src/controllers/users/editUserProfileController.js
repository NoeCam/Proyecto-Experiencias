// Importamos los modelos.
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import updateUserProfileModel from "../../models/users/updateUserProfileModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import editUserProfileSchema from "../../schemas/users/editUserProfileSchema.js";

const editUserProfileController = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).send({
        status: "error",
        message: "Usuario no autenticado",
      });
    }

    // Validamos el body con Joi.
    await validateSchemaUtil(editUserProfileSchema, req.body);

    // Obtenemos los datos del usuario para verificar si existe.
    const user = await selectUserByIdModel(req.user.id);

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Actualizamos los datos del usuario.
    const updatedUser = await updateUserProfileModel(req.user.id, req.body);

    res.send({
      status: "ok",
      message: "Usuario actualizado",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default editUserProfileController;
