import handleReservationSchema from "../../schemas/entries/handleReservationSchema.js";
import Joi from "joi";
import cancelledReservationModel from "../../models/entries/cancelledReservationModel.js";

const handleCancelledReservationController = async (req, res, next) => {
  const experienceId = req.params.experienceId;
  const { state } = req.body;
  const userId = req.user.id; // El ID del usuario autenticado está en req.user
  try {
    // Validar el cuerpo de la solicitud con Joi
    await Joi.attempt({ state }, handleReservationSchema);

    // Validar el estado de la reserva (con un booleano)
    if (typeof state !== "boolean") {
      return res.status(400).json({
        error: "Invalid reservation status. Must be true or false.",
      });
    }
    const response = await cancelledReservationModel(experienceId,userId, state);
    res.send(response);

  } catch (error) {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

export default handleCancelledReservationController;




