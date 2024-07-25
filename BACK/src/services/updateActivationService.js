import getPool from "../database/getPool.js";

const updateActivationService = async (experienceId, active) => {
  try {
    const pool = await getPool();
    await pool.query(
      `
                UPDATE experiences
                SET active = ?
                WHERE id = ?
            `,
      [active, experienceId]
    );
    //const params = [active, experienceId];
    //const [result] = await db.execute(query, params);
    return true;
  } catch (error) {
    return false;
  }
};

export default updateActivationService;
