import updateExperienceService from "../../services/entries/updateExperienceService.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import editExperienceSchema from "../../schemas/entries/editExperienceSchema.js";

import { savePhotoUtils, deletePhotoUtils } from "../../utils/photoUtils.js";

const editExperienceController = async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;

    //Validar el body con Joi.
    await validateSchemaUtil(editExperienceSchema, req.body);

    const {
      title,
      location,
      description,
      oldImage,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      confirmedByAdmin,
    } = req.body;

    let image = oldImage ?? null;

    if (req.files) {
      if (image) {
        await deletePhotoUtils(image);
      }
      image = await savePhotoUtils(req.files.image, 500);
    }

    // Validamos que la fecha sea futura.
    const currentDate = new Date();
    const experienceDate = new Date(date);
    if (experienceDate <= currentDate) {
      throw new Error("The date of the experience must be in the future.");
    }

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
