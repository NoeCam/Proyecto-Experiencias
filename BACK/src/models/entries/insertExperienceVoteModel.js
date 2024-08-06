
// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../database/getPool.js';

// Importamos los errores.
import { voteAlreadyExistsError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos para votar una experiencia.
const insertExperienceVoteModel = async (value, experienceId, userId) => {
    const pool = await getPool();

    // // Verificar que el userId existe en la tabla users.
    // const [users] = await pool.query(`SELECT id FROM users WHERE id = ?`, [userId]);
    // if (users.length === 0) {
    //     throw new Error('The user does not exist.');
    // }

    // Comprobamos si ya existe un voto previo por parte del usuario que está intentando
    // votar.
  
    const [votes] = await pool.query(
        `SELECT id FROM valorations WHERE userId = ? AND experienceId = ?`,
        [userId, experienceId]
    );

    // Verificar que el usuario ha participado en la experiencia.
    // const [participation] = await pool.query(
    //     `SELECT id FROM reservations WHERE userId = ? AND experienceId = ? AND state = TRUE`,
    //     [userId, experienceId]
    // );

    // if (participation.length === 0) {
    //     cannotVoteWithoutParticipationError();
    // }

    // Si la longitud del array de votos es mayor que cero lanzamos un error indicando
    // que la experiencia ya ha sido votada por este usuario.
    if (votes.length > 0) {
        voteAlreadyExistsError();
    }
   
    // Insertamos el voto.
    await pool.query(
        `INSERT INTO valorations(value, userId, experienceId) VALUES(?, ?, ?)`,
        [value, userId, experienceId]
    );
 
    // Obtenemos la media de votos.
    const [votesAvg] = await pool.query(
        `SELECT AVG(value) AS avg FROM valorations WHERE experienceId = ?`,
        [experienceId]
    );

    // Retornamos la media de votos.
    return Number(votesAvg[0].avg);
};

export default insertExperienceVoteModel;
