// Importamos los modelos.
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";

// Importamos los servicios.
//import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import editUserProfileSchema from "../../schemas/users/editUserProfileSchema.js";

const getUserProfileController = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).send({
        status: "error",
        message: "Unauthenticated user",
      });
    }

    // Validamos el body con Joi.
    //await validateSchemaUtil(editUserProfileSchema, req.body);

    // Obtenemos los datos del usuario para verificar si existe.
    const user = await selectUserByIdModel(req.user.id);

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    res.send({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserProfileController;
