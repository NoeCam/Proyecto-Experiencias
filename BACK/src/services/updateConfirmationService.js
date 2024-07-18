import getPool from "../database/getPool.js";

const updateActivationService = async (experienceId, confirmedByAdmin) => {
  const pool = await getPool();
  await pool.query(
    `
      UPDATE experiences
      SET confirmedByAdmin = ?
      WHERE id = ? 
    `
    ,
    [confirmedByAdmin, experienceId]
  );
};

export default updateActivationService;