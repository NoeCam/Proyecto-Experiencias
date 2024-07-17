// Importamos los modelos.
import insertExperienceVoteModel from "../../models/entries/insertExperienceVoteModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import voteExperienceSchema from "../../schemas/entries/voteExperienceSchema.js";

// Importamos los errores.
import { cannotVoteWithoutParticipationError } from "../../services/errorService.js";
import selectExperienceByReservationService from "../../services/entries/selectExperienceByReservationService.js";

// Función controladora final que permite votar una experiencia.
const voteExperienceController = async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;
    const { value } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(voteExperienceSchema, req.body);
    const userLogger = req.user.id;
    // Obtenemos los detalles de la experiencia.
    const experience = await selectExperienceByReservationService(userLogger);

    const userRegisteredReservation = experience[0].userId;

    // Si no hemos participado en la experiencia, lanzamos un error.

    if (userLogger !== userRegisteredReservation) {
      return cannotVoteWithoutParticipationError();
    }

    // Insertamos el voto y obtenemos la nueva media.
    const votesAvg = await insertExperienceVoteModel(
      value,
      experienceId,
      req.user.id
    );

    res.send({
      status: "ok",
      data: {
        votesAvg,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default voteExperienceController;
