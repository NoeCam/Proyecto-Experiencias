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
      userId) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      location,
      description,
      image,
      date,
      price,
      numMinPlaces,
      numTotalPlaces,
      userId,
    ]
  );

  let experienceIdResult = await pool.query(
    `
      SELECT e.id
      FROM experiences e
      ORDER BY e.id DESC
      LIMIT 1;
    `
  );
  let experienceId = experienceIdResult[0][0].id;

  // Retornamos el id de la experiencia.
  return experienceId;
};

export default insertExperienceModel;
