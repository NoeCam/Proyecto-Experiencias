import getPool from "../../database/getPool.js";

const updateExperienceService = async (
  title,
  location,
  description,
  image,
  date,
  price,
  numMinPlaces,
  numTotalPlaces,
  confirmedByAdmin,
  experienceId
) => {
  const pool = await getPool();
  const [experience] = await pool.query(
    `SELECT * FROM experiences WHERE id = ?`,
    [experienceId]
  );
  const exp = experience[0];
  await pool.query(
    `
            UPDATE experiences
            SET 
            title = ?,
            location = ?,
            description = ?,
            image = ?,
            date = ?,
            price = ?,
            numMinPlaces = ?,
            numTotalPlaces = ?,
            confirmedByAdmin = ?
            WHERE id = ?
        `,
    [
      title ?? exp.title,
      location ?? exp.location,
      description ?? exp.description,
      image ?? exp.image,
      date ?? exp.date,
      price ?? exp.price,
      numMinPlaces ?? exp.numMinPlaces,
      numTotalPlaces ?? exp.numTotalPlaces,
      confirmedByAdmin
        ? confirmedByAdmin.toLowerCase() === "true"
        : exp.confirmedByAdmin,
      experienceId,
    ]
  );
};

export default updateExperienceService;
