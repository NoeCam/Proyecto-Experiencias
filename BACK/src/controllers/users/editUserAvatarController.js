import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import { deletePhotoUtils, savePhotoUtils } from "../../utils/photoUtils.js";
import updateUserAvatarService from "../../services/users/updateUserAvatarService.js";

const editUserAvatarController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id);

    if (user.avatar) {
      //borro el archivo avatar antiguo
      await deletePhotoUtils(user.avatar);
    }

    //guardo el archivo nuevo en uploads y le doy en ancho de imagen
    const avatarName = await savePhotoUtils(req.files.avatar, 100);
    // actualizo la tabla users en la base de datos
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
