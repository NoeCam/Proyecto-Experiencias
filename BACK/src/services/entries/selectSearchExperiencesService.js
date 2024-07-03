import getPool from "../../database/getPool.js";

const selectSearchExperiencesService = async (search, order, direction) => {
  const validOrders = ["date", "price", "location"];
  const orderBy = validOrders.includes(order) ? order : "date";

  const validDirections = ["ASC", "DESC"];
  const orderDirection = validDirections.includes(direction)
    ? direction
    : "ASC";

  let experiences;

  const pool = await getPool();

  if (search) {
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
          ifnull((e.numTotalPlaces-SUM(r.numberOfReserve)),e.numTotalPlaces) AS availablePlaces,
          ifnull(SUM(r.numberOfReserve)>e.numMinPlaces,false) AS confirmed,
          e.active
        FROM experiences e
        LEFT JOIN reservations r ON e.id = r.experienceId
        WHERE e.title LIKE ? OR e.description LIKE ?
        GROUP BY e.id
        ORDER BY e.${orderBy} ${orderDirection};  
      `,
      [`%${search}%`, `%${search}%`]
    );
  } else {
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
          ifnull((e.numTotalPlaces-SUM(r.numberOfReserve)),e.numTotalPlaces) AS availablePlaces,
          ifnull(SUM(r.numberOfReserve)>e.numMinPlaces,false) AS confirmed,
          e.active
        FROM experiences e
        LEFT JOIN reservations r ON e.id = r.experienceId
        GROUP BY e.id
        ORDER BY e.${orderBy} ${orderDirection};  
      `
    );
  }

  return experiences;
};

export default selectSearchExperiencesService;
