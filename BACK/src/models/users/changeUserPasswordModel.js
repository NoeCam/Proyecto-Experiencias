import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";

const changeUserPasswordModel = async (userId, newPassword) => {
  const pool = await getPool();
  try {
    const setFragments = [];
    const values = [];

    if (newPassword !== undefined) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      setFragments.push("password = ?");
      values.push(hashedNewPassword);
    }

    if (setFragments.length > 0) {
      setFragments.push("last_password_change = NOW()");
      await pool.query(
        `UPDATE users SET ${setFragments.join(", ")} WHERE id = ?`,
        [...values, userId]
      );
    }
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("Unable to update password");
  }
};

export default changeUserPasswordModel;
