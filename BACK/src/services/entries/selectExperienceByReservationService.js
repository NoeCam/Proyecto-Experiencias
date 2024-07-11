// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

// Función que realiza una consulta a la base de datos para obtener información de las entradas reservadas por un usuario.
const selectExperienceByReservationService = async ( userId = '') => {
    const pool = await getPool()


    // Obtenemos la información necesaria de la entrada.
    const [reservedExperiences] = await pool.query(
                `
                SELECT E.*,
                R.numberOfReserve
                FROM reservations R
                INNER JOIN  experiences E ON R.experienceId = E.id
                WHERE R.userId = ? ;
                `
            ,
        [userId]

    );

    return reservedExperiences;

};
    

export default selectExperienceByReservationService;