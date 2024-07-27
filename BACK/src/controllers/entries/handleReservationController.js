import getPool from "../../database/getPool.js";
import handleReservationSchema from "../../schemas/entries/handleReservationSchema.js";
import Joi from "joi";

const handleReservationController = async (req, res, next) => {
  const id = req.params.experienceId;
  const { state } = req.body;
  const userId = req.user.id; // El ID del usuario autenticado está en req.user

  try {
    // Validar el cuerpo de la solicitud con Joi
    await Joi.attempt({ state }, handleReservationSchema);

    // Validar el estado de la reserva (con un booleano)
    if (typeof state !== "boolean") {
      return res.status(400).json({
        error: "Estado de la reserva no válido. Debe ser true o false.",
      });
    }

    const pool = await getPool();

    // Comprobar si la experiencia está activa y tiene plazas disponibles
    const experienceQuery =
      "SELECT active, spots FROM experiences WHERE id = ?";
    const [experience] = await pool.query(experienceQuery, [id]);

    if (!experience || !experience.active) {
      return res.status(400).json({
        error: "La experiencia no está activa o no existe.",
      });
    }

    if (experience.spots <= 0) {
      return res.status(400).json({
        error: "No hay plazas disponibles para esta experiencia.",
      });
    }

    // Comprobar si la reserva pertenece al usuario autenticado
    const reservationQuery =
      "SELECT id FROM reservations WHERE id = ? AND user_id = ?";
    const [reservation] = await pool.query(reservationQuery, [id, userId]);

    if (!reservation) {
      return res.status(403).json({
        error: "No tienes permiso para modificar esta reserva.",
      });
    }

    // Actualizar el estado de la reserva
    const updateQuery = "UPDATE reservations SET state = ? WHERE id = ?";
    await pool.query(updateQuery, [state, id]);

    res.send({
      status: "ok",
      message: "Reserva modificada",
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

export default handleReservationController;

// import getPool from "../../database/getPool.js";
// import handleReservationSchema from "../../schemas/entries/handleReservationSchema.js";

// const handleReservationController = async (req, res, next) => {
//   const id = req.params.experienceId;
//   const { state } = req.body;

//   try {
//     // Validar el cuerpo de la solicitud con Joi
//     await Joi.attempt({ state }, handleReservationSchema);

//     // Validar el estado de la reserva (con un booleano)
//     if (typeof state !== "boolean") {
//       return res.status(400).json({
//         error: "Estado de la reserva no válido. Debe ser true o false.",
//       });
//     }

//     const query = "UPDATE reservations SET state = ? WHERE id = ?";
//     const pool = await getPool();

//     try {
//       await pool.query(query, [state, id]);

//       res.send({
//         status: "ok",
//         message: "Reserva modificada",
//       });
//     } catch (err) {
//       next(err);
//     }
//   } catch (error) {
//     // Capturar errores de validación de Joi
//     return res.status(400).json({ error: error.message });
//   }
// };

// export default handleReservationController;
