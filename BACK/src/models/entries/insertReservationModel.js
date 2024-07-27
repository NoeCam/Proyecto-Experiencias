// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

// Función que realiza una reserva en la base de datos al usuario logueado.
const insertReservationModel = async (
  quantityPerPerson,
  state,
  userId,
  experienceId
) => {
  const pool = await getPool();
  const result = await pool.query(
    `
      INSERT INTO reservations(
        quantityPerPerson, 
        state, 
        userId, 
        experienceId
        )
        VALUES (?, ?, ?, ?)
    `,
    [quantityPerPerson, state, userId, experienceId]
  );
  // Retornamos el id de la reserva.
  return result[0].insertId;
};

export default insertReservationModel;
