import getPool from "../database/getPool.js";

const updateActivationService = async (id, confirmedByAdmin) => {
  const pool = await getPool();

  await pool.query(
    `
            UPDATE experiences
            SET confirmedByAdmin = ?
            WHERE id = ?
        `,
    [id, confirmedByAdmin]
  );
};

export default updateActivationService;
