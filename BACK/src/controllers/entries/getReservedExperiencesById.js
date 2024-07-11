// Importamos los modelos.
import selectExperienceByReservationService from "../../services/entries/selectExperienceByReservationService.js";

// Función controladora final que retorna una entrada con un id dado.
const getReservedExperiencesById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const experience = await selectExperienceByReservationService(userId);
    res.send({
      status: "ok",
      data: {
        experience,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getReservedExperiencesById;
