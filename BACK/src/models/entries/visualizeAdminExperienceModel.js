import getPool from "../../database/getPool";



const visulizeAdminExperienceModel = async (id) => {
    const pool = await getPool();
    const [experiences] = await pool.query(
        `
        SELECT e.*, r.id AS reservationId, r.userId AS reservationUserId, r.quantityPerPerson, r.state
        FROM experiences e
        JOIN reservations r ON e.id = r.experienceId
        WHERE e.userId = ?
    `, 
    [req.user.id]);
    console.log(req.user.id);
    
    // res.status(200).json(experiences);
    return experiences;
};

export default visulizeAdminExperienceModel;