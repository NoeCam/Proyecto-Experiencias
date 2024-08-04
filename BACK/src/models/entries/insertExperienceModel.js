// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../database/getPool.js";

// Función que realiza una consulta a la base de datos para agregar una nueva entrada.
const insertExperienceModel = async (
  title,
  location,
  description,
  image,
  date,
  price,
  numMinPlaces,
  numTotalPlaces,
  confirmedByAdmin,
  userId
) => {
  const confirmedByAdminBoolean = confirmedByAdmin == "true" ? true : false;

  const pool = await getPool();
  // Insertamos la entrada.
  const result = await pool.query(
    `INSERT INTO experiences(
      title, 
      location, 
      description, 
      image, 
      date, 
      price, 
      numMinPlaces, 
      numTotalPlaces,
      confirmedByAdmin,
      userId) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      location,
      description,
      image,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      confirmedByAdminBoolean,
      userId,
    ]
  );
  // Retornamos el id de la experiencia.
  return result[0].insertId;
};

export default insertExperienceModel;
