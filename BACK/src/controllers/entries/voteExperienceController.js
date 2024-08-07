// Importamos los modelos.
import insertExperienceVoteModel from "../../models/entries/insertExperienceVoteModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import voteExperienceSchema from "../../schemas/entries/voteExperienceSchema.js";

// Importamos los errores.
import { cannotVoteWithoutParticipationError } from "../../services/errorService.js";
import selectExperienceByReservationService from "../../services/entries/selectExperienceByReservationService.js";
import updateRatingService from "../../services/entries/updateRatingService.js";

// Función controladora final que permite votar una experiencia.
const voteExperienceController = async (req, res, next) => {
  try {
    const reservationId = req.params.reservationId;
    const { experienceId, rating } = req.body;

    updateRatingService(reservationId, experienceId, rating, req.user.id);

    res.send({
      status: "ok",
      data: {
        
      },
    });
  } catch (err) {
    next(err);
  }
};

export default voteExperienceController;
