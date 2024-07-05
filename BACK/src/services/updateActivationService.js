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
    const params = [active, experienceId];
    
    const [result] = await db.execute(query, params);
    return result;
}

export default updateActivationService;
