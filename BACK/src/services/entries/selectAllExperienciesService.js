import getPool from '../../database/getPool.js';

const selectAllExperienciesService =  async (keyword = '', userId = '') => {
    const pool = await getPool();

    const [experiences] = await pool.query(
        `
            SELECT
                e.id,
                e.tittle,
                e.place,
                e.description,
                e.image,
                e.date,
                e.numMinPlaces,
                e.numTotalPlaces,
                AVG(IFNULL(v.value, 0)) AS votes,
            FROM experiencias e 
            LEFT JOIN valoraciones_experiencias v ON v.usuarioId = e.id
        `
    )
}

export default selectAllExperienciesService;