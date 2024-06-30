// Importa bcrypt para el hash de contraseñas.
import bcrypt from "bcrypt";
// Importa la conexión a la base de datos.
import getPool from "../../database/getPool.js";
// Importa el esquema de validación.
import newUserSchema from "../../schemas/users/newUserSchema.js";

// Define una función para validar datos con un esquema.
const validateSchemaUtil = async (schema, data) => {
  const { error } = schema.validate(data); // Valida los datos contra el esquema.
  if (error) {
    // Si hay un error de validación...
    throw new Error(`Validation error: ${error.details[0].message}`); // Lanza un error con el mensaje de validación.
  }
};

// Define el controlador para registrar usuarios.
const registerUser = async (req, res, next) => {
  let connection;
  try {
    // Extrae el nombre de usuario, correo y contraseña del cuerpo de la solicitud.
    const { username, firstname, lastname, email, password } = req.body;

    // Valida el cuerpo de la solicitud contra el esquema de nuevo usuario.
    await validateSchemaUtil(newUserSchema, req.body);

    // Hashea la contraseña con bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Obtén el pool de conexiones.
    const pool = await getPool();

    // Obtén una conexión del pool.
    connection = await pool.getConnection();

    // Inserta el nuevo usuario en la base de datos.
    await connection.execute(
      "INSERT INTO users (username, firstname,lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    // Envía una respuesta de éxito.
    res.send({
      status: "ok",
      message:
        "Usuario creado con éxito. Por favor, verifica tu usuario mediante el email que has recibido.",
    });
  } catch (err) {
    // Si ocurre un error...
    next(err); // Pasa el error al middleware de manejo de errores.
  } finally {
    // Asegúrate de liberar la conexión si existe.
    if (connection) connection.release();
  }
};

export { registerUser };
