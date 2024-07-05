import getPool from "./getPool.js";

const {
  MYSQL_DATABASE,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
} = process.env;

async function createDB() {
  try {
    let pool = await getPool();

    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

    // console.log("Base de datos creada");
  } catch (error) {
    // console.log(error.message);
    throw new Error("Error al crear la BBDD", { cause: error });
  }
}

async function createTables() {
  try {
    let pool = await getPool();

    await pool.query(`USE ${MYSQL_DATABASE}`);

    // console.log("Borrando tablas...");
    await pool.query(`
      DROP TABLE IF EXISTS users, experiences, reservations, valorations;
      `);

    // console.log("Creando tabla de usuarios...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        userName VARCHAR(20) NOT NULL,
        firstName VARCHAR(50) DEFAULT NULL,
        lastName VARCHAR(50) DEFAULT NULL,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(100) DEFAULT NULL,
        active BOOLEAN DEFAULT false,
        role ENUM('admin', 'normal') DEFAULT 'normal' NOT NULL,
        registrationCode CHAR(30),
        recoverPassCode CHAR(10),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
      `);

    // console.log("Creando tabla de experiencias...");
    await pool.query(`
      CREATE TABLE experiences(
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        location VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(100) NOT NULL,
        date DATE,
        price VARCHAR(30),
        numMinPlaces INT,
        numTotalPlaces INT,
        active BOOLEAN DEFAULT true,
        userId INT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
      `);

    // console.log("Creando tabla de reservaciones...");
    await pool.query(`
       CREATE TABLE IF NOT EXISTS reservations (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        numberOfReserve INT,
        state BOOLEAN DEFAULT FALSE,
        userId INT NOT NULL,
        experienceId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (experienceId) REFERENCES experiences(id)
      )
        `);

    // console.log("Creando tabla de valoraciones...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS valorations (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        value TINYINT UNSIGNED NOT NULL,
        userId INT NOT NULL,
        experienceId INT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (experienceId) REFERENCES experiences(id)
      )
      `);

    // console.log("Tablas creadas");

    await pool.query(`
      INSERT INTO users(email, password, username, firstName, lastName, active, role)
      VALUES (
        "${ADMIN_EMAIL}",
        "${ADMIN_PASSWORD}",
        "${ADMIN_FIRST_NAME}_${ADMIN_LAST_NAME}",
        "${ADMIN_FIRST_NAME}",
        "${ADMIN_LAST_NAME}",
        true,
        "admin");
      `);
  } catch (error) {
    // console.log(error);
    throw new Error("Error al crear las tablas", { cause: error });
  }
}

async function initDB() {
  try {
    await createDB();
    await createTables();

    process.exit(0);
  } catch (error) {
    // console.log(error);
    process.exit(1);
  }
}

initDB();
