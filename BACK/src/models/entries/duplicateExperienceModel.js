import getPool from "../../database/getPool.js";
import { duplicatePhotoUtils } from "../../utils/photoUtils.js";

// Función que realiza una consulta a la base de datos para duplicar una experiencia.
const duplicateExperienceModel = async (experienceId, userId) => {
  const pool = await getPool(); // Obtiene el pool de conexiones.
  const connection = await pool.getConnection(); // Obtiene una conexión del pool.

  try {
    // Obtiene los detalles de la experiencia original.
    const [experience] = await connection.query(
      `SELECT title, location, description, image, date, price, numMinPlaces, numTotalPlaces, active
       FROM experiences WHERE id = ?`,
      [experienceId]
    );

    if (experience.length === 0) {
      throw new Error("Experience not found"); // Lanza un error si la experiencia no existe.
    }

    const {
      title,
      location,
      description,
      image,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      active,
    } = experience[0];

    const duplicateImage = await duplicatePhotoUtils(image);

    // Inserta la experiencia duplicada en la base de datos.
    const [result] = await connection.query(
      `INSERT INTO experiences (title, location, description, image, date, price, numMinPlaces, numTotalPlaces, active, userId) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        location,
        description,
        duplicateImage,
        date,
        price,
        numMinPlaces,
        numTotalPlaces,
        active,
        userId,
      ]
    );

    return result.insertId; // Devuelve el ID de la nueva experiencia duplicada.
  } finally {
    connection.release(); // Libera la conexión.
  }
};

export default duplicateExperienceModel; // Exporta la función para su uso en otros módulos.
