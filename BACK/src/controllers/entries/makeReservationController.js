import insertReservationModel from "../../models/entries/insertReservationModel.js";
import makeReservationSchema from "../../schemas/entries/makeReservationSchema.js";

const makeReservationController = async (req, res, next) => {
  try {
    const { quantityPerPerson, state } = req.body;
    const userId = req.user.id;
    const experienceId = req.params.experienceId;

    // Validamos el body y la imagen con Joi.
    await makeReservationSchema.validateAsync(req.body);

    const reservationId = await insertReservationModel(
      quantityPerPerson,
      state,
      userId,
      experienceId
    );

    res.send({
      status: "ok",
      message: "Reservation made correctly.",
      data: {
        id: reservationId,
        quantityPerPerson,
        state,
        userId,
        experienceId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default makeReservationController;
