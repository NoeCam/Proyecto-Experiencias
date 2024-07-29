// Importamos Joi para la validación del esquema.
import Joi from "joi";

// Definimos el esquema para la actualización del perfil del usuario.
const editUserProfileSchema = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(), // La contraseña actual puede ser opcional
  newPassword: Joi.string().min(6).optional(), // La nueva contraseña también es opcional
});

export default editUserProfileSchema;
