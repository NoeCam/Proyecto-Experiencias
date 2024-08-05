import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import { deletePhotoUtils, savePhotoUtils } from "../../utils/photoUtils.js";
import updateUserAvatarService from "../../services/users/updateUserAvatarService.js";

const editUserAvatarController = async (req, res, next) => {
  try {
    // Validar que se ha enviado un nuevo archivo de avatar
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        status: "error",
        message: "No avatar file provided.",
      });
    }

    const user = await selectUserByIdModel(req.user.id);

    if (user.avatar) {
      // Borro el archivo avatar antiguo
      await deletePhotoUtils(user.avatar);
    }

    // Guardo el archivo nuevo en uploads y le doy en ancho de imagen
    const avatarName = await savePhotoUtils(req.files.avatar, 500);
    // Actualizo la tabla users en la base de datos
    await updateUserAvatarService(avatarName, req.user.id);

    res.send({
      status: "ok",
      message: "The avatar was successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export default editUserAvatarController;
