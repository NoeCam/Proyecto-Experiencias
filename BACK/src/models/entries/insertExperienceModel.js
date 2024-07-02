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
  active,
  userId
) => {
  const pool = await getPool();

  // Insertamos la entrada.
  await pool.query(
    `INSERT INTO experiences(
      title, 
      location, 
      description, 
      image, 
      date, 
      price, 
      numMinPlaces, 
      numTotalPlaces, 
      active, 
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
      active,
      userId,
    ]
  );

  // Retornamos el id de la experiencia.
  return 0;
};

export default insertExperienceModel;
