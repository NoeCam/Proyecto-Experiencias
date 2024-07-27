import updateExperienceService from "../../services/entries/updateExperienceService.js";

import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import editExperienceSchema from "../../schemas/entries/editExperienceSchema.js";

import { savePhotoUtils } from "../../utils/photoUtils.js";

const editExperienceController = async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;

    //Validar el body con Joi.
    await validateSchemaUtil(editExperienceSchema, req.body);

    const {
      title,
      location,
      description,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      confirmedByAdmin,
    } = req.body;

    let image = null;
    if (req.files) {
      image = await savePhotoUtils(req.files.image, 500);
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
