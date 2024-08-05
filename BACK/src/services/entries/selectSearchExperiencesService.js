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

  const queryBaseinitial = `
  SELECT
  e.id,
  e.title,
  e.location,
  e.description,
  e.image,
  e.date,
  e.price,
  e.numMinPlaces,
  e.numTotalPlaces,
  e.active,

  
  IFNULL(v.rating, 0) AS rating,
  IFNULL(e.numTotalPlaces - r.availablePlaces, e.numTotalPlaces) AS availablePlaces,
  ifnull(r.availablePlaces > e.numMinPlaces,false) AS confirmed`;

  const queryIfUserIdFirst = `, 
  IFNULL(va.valoratedByMe, 0) > 0 AS valoratedByMe,
  IFNULL(re.reservedByMe, 0) > 0 AS reservedByMe`;

  const queryBaseB = `
  FROM experiences e
    LEFT JOIN (
      SELECT experienceId, AVG(value) AS rating
      FROM valorations
      GROUP BY experienceId
    ) v ON e.id = v.experienceId
    LEFT JOIN (
      SELECT experienceId, SUM(quantityPerPerson) AS availablePlaces
      FROM reservations
      GROUP BY experienceId
    ) r ON e.id = r.experienceId`;

  const queryIfUserIdEnd = `
    LEFT JOIN (
      SELECT experienceId, COUNT(*) AS reservedByMe
      FROM reservations
      WHERE userId = ?
      GROUP BY experienceId
      ) re ON e.id = re.experienceId
      LEFT JOIN (
        SELECT experienceId, COUNT(*) AS valoratedByMe
        FROM valorations
        WHERE userId = ?
        GROUP BY experienceId
        ) va ON e.id = va.experienceId`;

  const searchCondition = search
    ? ` WHERE e.title LIKE ? OR e.description LIKE ?`
    : "";

  const orderClause = ` ORDER BY e.${orderBy} ${orderDirection};`;

  let query;
  let values = [];

  const pool = await getPool();

  if (search) {
    if (userId) {
      query =
        queryBaseinitial +
        queryIfUserIdFirst +
        queryBaseB +
        queryIfUserIdEnd +
        searchCondition +
        orderClause;
      values = [userId, userId, `%${search}%`, `%${search}%`];
    } else {
      query = queryBaseinitial + queryBaseB + searchCondition + orderClause;
      values = [`%${search}%`, `%${search}%`];
    }
  } else {
    if (userId) {
      query =
        queryBaseinitial +
        queryIfUserIdFirst +
        queryBaseB +
        queryIfUserIdEnd +
        searchCondition +
        orderClause;
      values = [userId, userId];
    } else {
      query = queryBaseinitial + queryBaseB + searchCondition + orderClause;
    }
  }

  const [experiences] = await pool.query(query, values);

  return experiences;
};

export default selectSearchExperiencesService;
