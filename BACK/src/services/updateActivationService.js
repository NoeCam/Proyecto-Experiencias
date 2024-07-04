import getPool from "../database/getPool";


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