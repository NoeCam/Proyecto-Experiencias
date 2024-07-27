import updateConfirmationService from "../../services/updateConfirmationService.js";
// import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
// import experienceConfirmationSchema from "../../schemas/entries/experienceConfirmationSchema.js";
import updateActivationService from "../../services/updateActivationService.js";
// import verifyAdmin from "../../middleware/verifyAdminController.js";
// import experienceActiveSchema from "../../schemas/entries/experienceActiveSchema.js";

const experienceConfirmationController = async (req, res, next) => {
  try {
    
    const {experienceId} = req.params;
    const { confirmedByAdmin } = req.body;
    const { active } = req.body;

    //Si se va a confirmar o desconfirmar la experiencia
    if (confirmedByAdmin!=undefined) {
      //Validar el body con Joi.
      // await validateSchemaUtil(experienceConfirmationSchema, req.body);
      await updateConfirmationService(experienceId, confirmedByAdmin);
      res.send({
        status: "ok",
        message: "Confirmation status successfully modified",
      });
    }



    //si se va a activar o desactivar la experiencia
    else if (active!=undefined) {
      const userId = req.user?.id;
      // const isAdmin = await verifyAdmin(userId);
      // if (!isAdmin) {
      //   return res.status(403).send({
      //     status: "error",
      //     message: "You do not have permission to perform this action",
      //   });
      // }

      //Validar el body con Joi.
      // await validateSchemaUtil(experienceActiveSchema, req.body);
      await updateActivationService(experienceId, active);
      res.send({
        status: "ok",
        message: "Activation status successfully modified",
      });

    }
  } catch (error) {
    next(error);
  }
};

export default experienceConfirmationController;
