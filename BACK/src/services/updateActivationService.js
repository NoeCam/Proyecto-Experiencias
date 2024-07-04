import getPool from "../database/getPool.js";


const updateActivationService = async (experienceId, active) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE experiences
            SET active = ?
            WHERE id = ?
        `,
        [experienceId, active]
    );
}

export default updateActivationService;