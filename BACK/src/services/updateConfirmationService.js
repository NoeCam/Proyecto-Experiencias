import getPool from "../database/getPool.js";

const updateActivationService = async (confirmedByAdmin) => {
  const pool = await getPool();

  await pool.query(
    `
      UPDATE experiences
      SET confirmedByAdmin = ?
      WHERE id = ? 
    `
    ,
    [confirmedByAdmin]
  );
};

export default updateActivationService;