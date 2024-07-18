import updateActivationService from "../services/updateActivationService.js";
import verifyAdmin from "./verifyAdminController.js";
import experienceActiveSchema from "../schemas/entries/experienceActiveSchema.js";
import validateSchemaUtil from "../utils/validateSchemaUtil.js";

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

    //Validar el body con Joi.
    // await validateSchemaUtil(experienceActiveSchema, req.body);
    await updateActivationService(experienceId, active);
    next();
  } catch (error) {
    next(error);
  }
};

export default experienceActivationController;
