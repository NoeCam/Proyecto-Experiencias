import getPool from "../../database/getPool.js";


const updateActivationService = async (id, active) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE experiences
            SET active = ?
            WHERE id = ?
        `,
        [id, active]
    );
}

export default updateActivationService;