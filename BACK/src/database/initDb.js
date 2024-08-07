import bcrypt from "bcrypt";

import getPool from "./getPool.js";

import {
  MYSQL_DATABASE,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
} from "../../env.js";

async function createDB() {
  try {
    let pool = await getPool();

    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);
  } catch (error) {
    throw new Error("Error al crear la BBDD", { cause: error });
  }
}

async function createTables() {
  try {
    let pool = await getPool();

    await pool.query(`USE ${MYSQL_DATABASE}`);

    await pool.query(`
      DROP TABLE IF EXISTS users, experiences, reservations, valorations;
      `);

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
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
        last_password_change DATETIME DEFAULT NULL
        )
      `);

    await pool.query(`
      CREATE TABLE experiences(
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        location VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(100) NOT NULL,
        date DATE,
        price INT NOT NULL,
        numMinPlaces INT,
        numTotalPlaces INT,
        active BOOLEAN DEFAULT true,
        userId INT,
        confirmedByAdmin BOOLEAN DEFAULT false,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
      `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        quantityPerPerson INT,
        state BOOLEAN DEFAULT FALSE,
        userId INT NOT NULL,
        experienceId INT NOT NULL,
        valoration INT,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (experienceId) REFERENCES experiences(id)
      )
      `);

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

    const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await pool.query(`
      INSERT INTO users(email, password, username, firstName, lastName, active, role)
      VALUES (
        "${ADMIN_EMAIL}",
        "${hashedPass}",
        "${ADMIN_FIRST_NAME}_${ADMIN_LAST_NAME}",
        "${ADMIN_FIRST_NAME}",
        "${ADMIN_LAST_NAME}",
        true,
        "admin");
      `);
  } catch (error) {
    throw new Error("Error al crear las tablas", { cause: error });
  }
}

async function initDB() {
  try {
    await createDB();
    console.log("Base de datos creada");
    await createTables();
    console.log("Tablas creadas");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

initDB();
