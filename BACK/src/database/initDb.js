import getPool from "./getPool.js";

const { MYSQL_DATABASE } = process.env;

async function createDB() {
  try {
    let pool = await getPool();

    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

    console.log("Base de datos creada");
  } catch (error) {
    console.log(error.message);
    throw new Error("Error al crear la BBDD", { cause: error });
  }
}

async function createTables() {
  try {
    let pool = await getPool();

    await pool.query(`USE ${MYSQL_DATABASE}`);

    console.log("Borrando tablas...");
    await pool.query(`
      DROP TABLE IF EXISTS usuarios, experiencias;
      `);

    console.log("Creando tabla de usuarios...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        firstName VARCHAR(50) DEFAULT NULL,
        lastName VARCHAR(50) DEFAULT NULL,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(100) DEFAULT NULL,
        active BOOLEAN DEFAULT false,
        role ENUM('admin', 'normal') DEFAULT 'normal',
        registrationCode CHAR(30),
        recoverPassCode CHAR(10),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
      `);

    console.log("Creando tabla de experiencias...");
    await pool.query(`
      CREATE TABLE experiencias(
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        place VARCHAR(30) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(100) DEFAULT NOT NULL,
        date DATE,
        price VARCHAR(30),
        numMinPlaces INT,
        numTotalPlaces INT,
        usuarioId INT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, 
        FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
      )
      `);

    console.log("Creando tabla de valoraciones_experiencias...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS valoraciones_experiencias (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            value TINYINT UNSIGNED NOT NULL,
            usuarioId INT NOT NULL,
            experienciaId INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
            FOREIGN KEY (experienciaId) REFERENCES experiencias(id)
        )
        `);

    console.log("Tablas creadas");
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear las tablas", { cause: error });
  }
}

async function initDB() {
  try {
    await createDB();
    await createTables();

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

initDB();
