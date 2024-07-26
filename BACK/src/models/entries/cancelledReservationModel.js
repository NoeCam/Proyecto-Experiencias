import getPool from "../../database/getPool.js";

const reservationModel = async (experienceId, userId, state) => {
  const pool = await getPool();
  let response;
  // Comprobar si la experiencia está activa y tiene plazas disponibles
  const experienceQuery = `
        SELECT 
        active
        FROM experiences
        WHERE id = ?;
        `;
  const [experience] = await pool.query(experienceQuery, [experienceId]);
  experience[0].active = experience[0].active === 1 ? true : false;
  if (!experience || !experience[0].active) {
    return response = {
      status: "false",
      message: "The experience is not active or does not exist.",
    }
  }

  // Comprobar si la reserva pertenece al usuario autenticado
  const reservationQuery = "SELECT id FROM reservations WHERE experienceId = ? AND userId = ?";
  const [reservation] = await pool.query(reservationQuery, [experienceId, userId]);

  if (!reservation) {
    return response = {
      status: "false",
      message: "You do not have permission to modify this reservation.",
    }
  }

  // Actualizar el estado de la reserva
  const updateQuery = "UPDATE reservations SET state = ? WHERE experienceId = ?";
  await pool.query(updateQuery, [state, experienceId]);

  return response ={
    status: "ok",
    message: "Modified reserve",
  };
};

export default reservationModel;

