import insertExperienceModel from "../../models/entries/insertExperienceModel.js";
import { savePhotoUtils } from "../../utils/photoUtils.js";
import experienciaSchema from "../../schemas/entries/experienceSchema.js";
import imgSchema from "../../schemas/imgSchema.js"; // No sabemos si se usa, quizás deberíamos borrarlo.

// Función controladora final que agrega una nueva entrada.
const adminEntryController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      confirmedByAdmin,
    } = req.body;

    const userId = req.user?.id;

    // Guardamos la imagen
    let image = null;
    if (req.files) {
      image = await savePhotoUtils(req.files.image, 500);
    }

    // Validamos que la fecha sea futura.
    const currentDate = new Date();
    const experienceDate = new Date(date);
    if (experienceDate <= currentDate) {
      throw new Error("The date of the experience must be in the future.");
    }

    // Validamos el body y la imagen con Joi.
    await experienciaSchema.validateAsync(req.body);
    // image = await imgSchema.validateAsync(req.files.image);

    // Insertamos la entrada y obtenemos el id que se le ha asignado.
    const experienceId = await insertExperienceModel(
      title,
      location,
      description,
      image,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      confirmedByAdmin,
      userId
    );

    res.send({
      status: "ok",
      message: "Successfully created experience.",
      data: {
        experience: {
          id: experienceId,
          title,
          location,
          description,
          image,
          date,
          price,
          numMinPlaces,
          numTotalPlaces,
          confirmedByAdmin,
          userId,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default adminEntryController;
