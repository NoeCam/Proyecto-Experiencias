// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

// Función que realiza una consulta a la base de datos para obtener información de las entradas reservadas por un usuario.
const selectExperienceByReservationService = async (userId) => {
  const pool = await getPool();

  // Obtenemos la información necesaria de la entrada.
  let [reservedExperiences] = await pool.query(
    `
    SELECT
      e.id,
      e.title,
      e.location,
      e.description,
      e.image,
      e.date,
      e.price,
      e.active,
      r.quantityPerPerson,
      r.state,
      r.userId,
      r.id AS reservationId,
      r.valoration
    FROM reservations r
    INNER JOIN  experiences e ON r.experienceId = e.id
    WHERE r.userId = ? ;
    `,
    [userId]
  );

  return reservedExperiences;
};

export default selectExperienceByReservationService;
