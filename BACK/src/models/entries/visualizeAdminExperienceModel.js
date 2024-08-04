import getPool from "../../database/getPool.js";



const visualizeAdminExperienceModel = async (id) => {
    const pool = await getPool();
    const [experiences] = await pool.query(
        `
        SELECT e.*, r.id AS reservationId, r.userId AS reservationUserId, r.quantityPerPerson, r.state
        FROM experiences e
        INNER JOIN reservations r ON e.id = r.experienceId
        WHERE e.userId = ?
    `, 
    [id]);
    
    // res.status(200).json(experiences);
    return experiences;
};

export default visualizeAdminExperienceModel;