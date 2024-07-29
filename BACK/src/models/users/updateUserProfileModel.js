import getPool from "../../database/getPool.js";
import bcrypt from "bcrypt";

const updateUserProfileModel = async (userId, data) => {
  const { username, firstname, lastname, email, role, password } = data;
  const pool = await getPool();

  const setFragments = [];
  const values = [];

  if (username !== undefined) {
    setFragments.push(`username = ?`);
    values.push(username);
  }
  if (firstname !== undefined) {
    setFragments.push(`firstname = ?`);
    values.push(firstname);
  }
  if (lastname !== undefined) {
    setFragments.push(`lastname = ?`);
    values.push(lastname);
  }
  if (email !== undefined) {
    setFragments.push(`email = ?`);
    values.push(email);
  }
  if (role !== undefined) {
    setFragments.push(`role = ?`);
    values.push(role);
  }
  if (password !== undefined) {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    setFragments.push(`password = ?`);
    values.push(hashedPassword);
  }

  values.push(userId);

  const setClause = setFragments.join(", ");

  const query = `
    UPDATE users
    SET ${setClause}
    WHERE id = ?
  `;

  await pool.query(query, values);

  // Devolver los datos actualizados del usuario
  const [rows] = await pool.query(
    `SELECT id, username, firstname, lastname, email, role FROM users WHERE id = ?`,
    [userId]
  );

  return rows[0]; // Retorna el usuario actualizado
};

export default updateUserProfileModel;
