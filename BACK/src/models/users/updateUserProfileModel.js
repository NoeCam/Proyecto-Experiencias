import getPool from "../../database/getPool.js";

const updateUserProfileModel = async (userId, data) => {
  if (!userId || !data || Object.keys(data).length === 0) {
    throw new Error("Invalid input: No data provided for update.");
  }

  const { username, firstname, lastname, email, role, avatar } = data; // Excluye el campo password
  const pool = await getPool();

  const setFragments = [];
  const values = [];

  if (username) {
    setFragments.push(`username = ?`);
    values.push(username);
  }
  if (firstname) {
    setFragments.push(`firstname = ?`);
    values.push(firstname);
  }
  if (lastname) {
    setFragments.push(`lastname = ?`);
    values.push(lastname);
  }
  if (email) {
    setFragments.push(`email = ?`);
    values.push(email);
  }
  if (role) {
    setFragments.push(`role = ?`);
    values.push(role);
  }
  if (avatar) {
    setFragments.push(`avatar = ?`); // Añade la actualización del campo avatar
    values.push(avatar);
  }

  if (setFragments.length === 0) {
    throw new Error("No fields to update.");
  }

  values.push(userId);

  const setClause = setFragments.join(", ");
  const query = `
    UPDATE users
    SET ${setClause}
    WHERE id = ?
  `;

  // Execute the query
  await pool.query(query, values);

  // Devolver los datos actualizados del usuario
  const [rows] = await pool.query(
    `SELECT id, username, firstname, lastname, email, role, avatar FROM users WHERE id = ?`, // Incluye avatar en la selección
    [userId]
  );

  return rows[0]; // Retorna el usuario actualizado
};

export default updateUserProfileModel;
