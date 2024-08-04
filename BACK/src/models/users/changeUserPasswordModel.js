import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";

const changeUserPasswordModel = async (userId, newPassword) => {
  const pool = await getPool();

  // Encriptamos la nueva contraseña.
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Actualizamos la contraseña del usuario.
  await pool.query(
    `UPDATE users SET password = ?, last_password_change = NOW() WHERE id = ?`,
    [hashedNewPassword, userId]
  );
};

export default changeUserPasswordModel;
