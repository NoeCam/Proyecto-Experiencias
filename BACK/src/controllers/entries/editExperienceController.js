import updateExperienceService from "../../services/entries/updateExperienceService.js";
import verifyAdmin from "../../middleware/verifyAdminController.js";

import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import editExperienceSchema from "../../schemas/entries/editExperienceSchema.js";

const editExperienceController = async (req, res, next) => {
  try {
    // Verificar que el usuario sea admin
    const userId = req.user.id;
    const isAdmin = await verifyAdmin(userId);
    if (!isAdmin) {
      return res.status(403).send({
        status: "error",
        message: "You do not have permission to perform this action",
      });
    }

    const experienceId = req.params.experienceId;

    //Validar el body con Joi.
    await validateSchemaUtil(editExperienceSchema, req.body);

    const {
      title,
      location,
      description,
      image,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      confirmedByAdmin,
    } = req.body;

    await updateExperienceService(
      title,
      location,
      description,
      image,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      confirmedByAdmin,
      experienceId
    );

    res.send({
      status: "ok",
      message: "Successfully modified experience!",
    });
  } catch (error) {
    next(error);
  }
};

export default editExperienceController;
