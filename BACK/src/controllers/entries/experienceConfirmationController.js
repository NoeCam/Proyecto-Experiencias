import updateConfirmationService from "../../services/updateConfirmationService.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import experienceConfirmationSchema from "../../schemas/entries/experienceConfirmationSchema.js";

const experienceConfirmationController = async (req, res, next) => {
  try {
    const experienceId = req.params.id;
    const { confirmedByAdmin } = req.body;

    //Validar el body con Joi.
    // await validateSchemaUtil(experienceConfirmationSchema, req.body);
    await updateConfirmationService(experienceId, confirmedByAdmin);
    res.send({
      status: "ok",
      message: "Confirmation status successfully modified",
    });
  } catch (error) {
    next(error);
  }
};

export default experienceConfirmationController;
