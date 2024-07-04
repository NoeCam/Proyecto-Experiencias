import getPool from "../database/getPool.js";

const updateConfirmationService = async (experienceId, confirmed) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE experiences
            SET confirmed = ?
            WHERE id = ?
        `,
        [experienceId, confirmed]
    );
    const params = [confirmed, experienceId];
    
    const [result] = await db.execute(query, params);
    return result;
}

export default updateActivationService;