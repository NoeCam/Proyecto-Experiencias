import getPool from '../../database/getPool.js';

const selectAllExperiencesService =  async (keyword = '', userId = '') => {
    const pool = await getPool();

    const [experiences] = await pool.query(
        `
            SELECT
                e.id,
                e.title, 
                e.place, 
                e.description, 
                e.image, 
                e.date, 
                e.price, 
                AVG(ifnull(v.value,0)) AS rating,
                (e.numTotalPlaces - SUM(r.numberOfReserve)) AS availablePlaces,
                COUNT(v2.id) > 0 AS valoratedByMe,
                e.active,
                (e.numTotalPlaces - SUM(r.numberOfReserve)) >= e.numMinPlaces  AS confirmed
            FROM experiences e 
            LEFT JOIN reservations r ON e.id = r.experienceId
            LEFT JOIN valorations v ON e.id = v.experienceId
            LEFT JOIN valorations v2 ON e.id = v2.experienceId AND v2.userId = ?
            WHERE e.title LIKE ? OR e.place LIKE ? OR e.description LIKE ?
            GROUP BY e.id
            ORDER BY e.date;
        `
        [userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );

    return experiences
};

export default selectAllExperiencesService;