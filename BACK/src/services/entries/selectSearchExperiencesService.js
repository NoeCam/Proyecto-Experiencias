import getPool from "../../database/getPool.js";

const selectSearchExperiencesService = async (
  search,
  order,
  direction,
  userId
) => {
  const validOrders = ["date", "price", "location"];
  const orderBy = validOrders.includes(order) ? order : "date";

  const validDirections = ["ASC", "DESC"];
  const orderDirection = validDirections.includes(direction)
    ? direction
    : "ASC";

  let experiences;

  const pool = await getPool();
  if (search) {
    if (userId) {
      console.log("search and user");
      [experiences] = await pool.query(
        `
        SELECT
          e.id,
          e.title,
          e.location,
          e.description,
          e.image,
          e.date,
          e.price,
          e.active,
          IFNULL(v.rating, 0) AS rating,
          IFNULL(e.numTotalPlaces - r.availablePlaces, e.numTotalPlaces) AS availablePlaces,
          ifnull(r.availablePlaces > e.numMinPlaces,false) AS confirmed,
          IFNULL(va.valoratedByMe, 0) > 0 AS valoratedByMe,
          IFNULL(re.reservedByMe, 0) > 0 AS reservedByMe
        FROM experiences e
        LEFT JOIN (
          SELECT
              experienceId,
              AVG(value) AS rating
          FROM valorations
          GROUP BY experienceId
          ) v ON e.id = v.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              SUM(numberOfReserve) AS availablePlaces
          FROM reservations
          GROUP BY experienceId
          ) r ON e.id = r.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              COUNT(*) AS reservedByMe
          FROM reservations
          WHERE userId = ?
          GROUP BY experienceId
          ) re ON e.id = re.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              COUNT(*) AS valoratedByMe
          FROM valorations
          WHERE userId = ?
          GROUP BY experienceId
          ) va ON e.id = va.experienceId
        WHERE e.title LIKE ? OR e.description LIKE ?
        ORDER BY e.${orderBy} ${orderDirection};
        `,
        [userId, userId, `%${search}%`, `%${search}%`]
      );
    } else {
      console.log("search and not user");
      [experiences] = await pool.query(
        `
          SELECT
          e.id,
          e.title,
          e.location,
          e.description,
          e.image,
          e.date,
          e.price,
          e.active,
          IFNULL(v.rating, 0) AS rating,
          IFNULL(e.numTotalPlaces - r.availablePlaces, e.numTotalPlaces) AS availablePlaces,
          ifnull(r.availablePlaces > e.numMinPlaces,false) AS confirmed
        FROM experiences e
        LEFT JOIN (
          SELECT
              experienceId,
              AVG(value) AS rating
          FROM valorations
          GROUP BY experienceId
          ) v ON e.id = v.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              SUM(numberOfReserve) AS availablePlaces
          FROM reservations
          GROUP BY experienceId
          ) r ON e.id = r.experienceId
        WHERE e.title LIKE ? OR e.description LIKE ?
        ORDER BY e.${orderBy} ${orderDirection};
        `,
        [`%${search}%`, `%${search}%`]
      );
    }
  } else {
    if (userId) {
      console.log("not search and user");
      [experiences] = await pool.query(
        `
        SELECT
          e.id,
          e.title,
          e.location,
          e.description,
          e.image,
          e.date,
          e.price,
          e.active,
          IFNULL(v.rating, 0) AS rating,
          IFNULL(e.numTotalPlaces - r.availablePlaces, e.numTotalPlaces) AS availablePlaces,
          ifnull(r.availablePlaces > e.numMinPlaces,false) AS confirmed,
          IFNULL(va.valoratedByMe, 0) > 0 AS valoratedByMe,
          IFNULL(re.reservedByMe, 0) > 0 AS reservedByMe
        FROM experiences e
        LEFT JOIN (
          SELECT
              experienceId,
              AVG(value) AS rating
          FROM valorations
          GROUP BY experienceId
          ) v ON e.id = v.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              SUM(numberOfReserve) AS availablePlaces
          FROM reservations
          GROUP BY experienceId
          ) r ON e.id = r.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              COUNT(*) AS reservedByMe
          FROM reservations
          WHERE userId = ?
          GROUP BY experienceId
          ) re ON e.id = re.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              COUNT(*) AS valoratedByMe
          FROM valorations
          WHERE userId = ?
          GROUP BY experienceId
          ) va ON e.id = va.experienceId
        ORDER BY e.${orderBy} ${orderDirection};
        `,
        [userId, userId]
      );
    } else {
      console.log("not search and not user");
      [experiences] = await pool.query(
        `
        SELECT
          e.id,
          e.title,
          e.location,
          e.description,
          e.image,
          e.date,
          e.price,
          e.active,
          IFNULL(v.rating, 0) AS rating,
          IFNULL(e.numTotalPlaces - r.availablePlaces, e.numTotalPlaces) AS availablePlaces,
          ifnull(r.availablePlaces > e.numMinPlaces,false) AS confirmed
        FROM experiences e
        LEFT JOIN (
          SELECT
              experienceId,
              AVG(value) AS rating
          FROM valorations
          GROUP BY experienceId
          ) v ON e.id = v.experienceId
        LEFT JOIN (
          SELECT
              experienceId,
              SUM(numberOfReserve) AS availablePlaces
          FROM reservations
          GROUP BY experienceId
          ) r ON e.id = r.experienceId
        ORDER BY e.${orderBy} ${orderDirection}; 
      `
      );
    }
  }
  return experiences;
};

export default selectSearchExperiencesService;
