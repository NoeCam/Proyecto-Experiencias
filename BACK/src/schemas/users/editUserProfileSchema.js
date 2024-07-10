// Importamos Joi para la validación del esquema.
import Joi from "joi";

// Definimos el esquema para la actualización del perfil del usuario.
const editUserProfileSchema = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default editUserProfileSchema;
