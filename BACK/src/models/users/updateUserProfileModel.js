// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

// Función que realiza una consulta a la base de datos para actualizar el perfil de un usuario.
const updateUserProfileModel = async (userId, data) => {
  const { username, firstname, lastname, email } = data;
  const pool = await getPool();

  // Construimos dinámicamente la consulta SQL solo con los campos que se proporcionan.
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

  // Añadimos el userId al array de valores.
  values.push(userId);

  // Unimos los fragmentos con comas para formar la parte SET de la consulta.
  const setClause = setFragments.join(", ");

  // Definimos la consulta completa.
  const query = `
        UPDATE users
        SET ${setClause}
        WHERE id = ?
    `;

  // Ejecutamos la consulta SQL utilizando 'pool.query' y pasamos la consulta y los valores.
  await pool.query(query, values);
};

export default updateUserProfileModel;
