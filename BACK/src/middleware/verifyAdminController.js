import getPool from "../database/getPool.js";
import Joi from "joi"; // Debe ser "joi" en minúsculas

// Define el esquema de validación
const userSchema = Joi.object({
  id: Joi.number().integer().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  role: Joi.string().valid('admin').required()
});

const pool = await getPool();

// Aquí falta una función asíncrona para usar `await`
const verifyAdmin = async (id) => {
  try {
    // Datos del usuario
    const [userData] = await pool.query(
      `
      SELECT
      id,
      username,
      email,
      password,
      role
      FROM users U
      WHERE U.id = ?
      `,
      [id]
    );

    // Validar los datos del usuario
    
    const { error, value } = userSchema.validate(userData);

    if (error) {
      console.error('Error de validación:', error.details);
      return null;
    } else {
      console.log('Datos válidos:', value);
      return value;
    }
  } catch (error) {
    console.error('Error al verificar el admin:', error);
    return next(error);
  }
};

export default verifyAdmin;
