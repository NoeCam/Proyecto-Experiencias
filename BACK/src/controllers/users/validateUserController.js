// Importamos los modelos.
import updateUserRegCodeModel from "../../models/users/updateUserRegCodeModel.js";

// Función controladora final que valida a un usuario recién registrado.
const validateUserController = async (req, res, next) => {
  try {
    // Obtenemos el código de registro de los path params.
    const { registrationCode } = req.params;

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
