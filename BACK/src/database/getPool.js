import mysql from "mysql2/promise";

import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../../env.js";

let pool;
const getPool = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      });
    }

    return pool;
  } catch (error) {
    console.log(error);
  }
};

export default getPool;
