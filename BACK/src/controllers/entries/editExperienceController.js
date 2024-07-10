import updateExperienceService from "../../services/entries/updateExperienceService.js";
import verifyAdmin from "../../middleware/verifyAdminController.js";

const editExperienceController = async (req, res, next) => {
  try {
        // Verificar que el usuario sea admin
        const userId = req.user.id;
        const isAdmin = await verifyAdmin(userId);
        if (!isAdmin) {
          return res.status(403).send({
            status: "error",
            message: "No tienes permisos para realizar esta acción",
          });
        }

    const experienceId = req.params.experienceId;
    const { title, location, description, image, date, price, numMinPlaces, numTotalPlaces, confirmedByAdmin } = req.body;

    await updateExperienceService(title, location, description, image, date, price, numMinPlaces, numTotalPlaces, confirmedByAdmin, experienceId);

    res.send({
      status: "ok",
      message: "¡Experiencia modificada con éxito!",
    });
  } catch (error) {
    next(error);
  }
};

export default editExperienceController;