import getPool from "../../database/getPool.js";


const updateConfirmationService = async (id, confirmed) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE experiences
            SET confirmed = ?
            WHERE id = ?
        `,
        [id, confirmed]
    );
}

export default updateConfirmationService;