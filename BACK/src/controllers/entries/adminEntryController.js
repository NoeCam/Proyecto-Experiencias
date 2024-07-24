import insertExperienceModel from "../../models/entries/insertExperienceModel.js";
import verifyAdmin from "../../middleware/verifyAdminController.js";
import { savePhotoUtils } from "../../utils/photoUtils.js";

import experienciaSchema from "../../schemas/entries/experienceSchema.js";
import imgSchema from "../../schemas/imgSchema.js"; // No sabemos si se usa, quizás deberíamos borrarlo.



// Función controladora final que agrega una nueva entrada.
const adminEntryController = async (req, res, next) => {
  // let {image} = req.files.image;
  try {
    const {
      title,
      description,
      location,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
    } = req.body;

    const userId = req.user?.id;

    // Verificar que el usuario sea admin
    const isAdmin = await verifyAdmin(userId);
    if (!isAdmin) {
      return res.status(403).send({
        status: "error",
        message: "You do not have permissions to perform this action",
      });
    }

    let image = null;
    if (req.files) {
      image = await savePhotoUtils(req.files.image, 500);
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
