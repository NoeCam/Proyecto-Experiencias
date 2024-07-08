import updateActivationService from "../services/updateActivationService.js";
import verifyAdmin from "./verifyAdminController.js";

const experienceActivationController = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    const { active } = req.body;
    const userId = req.user?.id;

    const isAdmin = await verifyAdmin(userId);
    if (!isAdmin) {
      return res.status(403).send({
        status: "error",
        message: "No tienes permisos para realizar esta acción",
      });
    }

    await updateActivationService(experienceId, active);
    next();
    /*res.send({
      status: "ok",
      message: "Estado de activación modificado correctamente",
    });*/
  } catch (error) {
    next(error);
  }
};

export default experienceActivationController;
