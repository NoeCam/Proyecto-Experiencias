// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

// Función que realiza una consulta a la base de datos para obtener información de las entradas reservadas por un usuario.
const selectEntryByReservationModel = async (experienceId, userId = '') => {
    const pool = await getPool()
};

    // Obtenemos la información necesaria de la entrada.
    const reservedExperiences = await pool.query(
        `
                SELECT 
                    R.id,
                    R.title,
                    R.place, 
                    R.description,
                    R.userId,
                    E.createdAt
                FROM reservations R
                LEFT JOIN experiences E ON E.id = R.entryId
                INNER JOIN users U ON U.id = R.userId
                WHERE R.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
        [userId, experienceId, experienceId]
        
    );

    return reservedExperiences();

export default reservedExperiences;