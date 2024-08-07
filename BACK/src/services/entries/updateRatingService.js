// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

const updateRatingService = async (reservationId, experienceId, rating, userId) => {
  const pool = await getPool();
  await pool.query(
    `
            UPDATE reservations
            SET 
            valoration = ?
            WHERE id = ?
        `,
    [rating, reservationId]
  );

  const valorations = await pool.query(
    `
    SELECT id
    FROM valorations
    WHERE
    userId = ?
    AND
    experienceId = ?
    `,
    [userId, experienceId]
  );
  if (valorations[0].length>0) {
    await pool.query(
      `
              UPDATE valorations
              SET 
              value = ?
              WHERE experienceId = ?
          `,
      [rating, experienceId]
      
    )
  }
  else{
     await pool.query(
      `
      INSERT into valorations (
        value, userId, experienceId
        )
        VALUES (?,?,?)
      `,
      [rating, userId, experienceId]
    )
  }


};

export default updateRatingService;