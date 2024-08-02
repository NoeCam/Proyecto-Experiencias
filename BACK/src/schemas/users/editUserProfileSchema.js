// Importamos Joi para la validación del esquema.
import Joi from "joi";

// Definimos los mensajes de error personalizados.
const joiErrorMessages = {
  "string.empty": "This field cannot be empty.",
  "string.min": "This field must have at least {#limit} characters.",
  "any.required": "This field is required.",
  "string.email": "The email must be valid.",
};

// Definimos el esquema para la actualización del perfil del usuario.
const editUserProfileSchema = Joi.object({
  username: Joi.string().messages({
    "string.empty": "Username is required.",
    "any.required": "Username is required.",
  }),
  firstname: Joi.string().messages({
    "string.empty": "First name is required.",
    "any.required": "First name is required.",
  }),
  lastname: Joi.string().messages({
    "string.empty": "Last name is required.",
    "any.required": "Last name is required.",
  }),
  email: Joi.string().email().messages({
    "string.empty": "Email is required.",
    "string.email": "The email must be valid.",
    "any.required": "Email is required.",
  }),
  avatar: Joi.string().optional().messages({
    "string.empty": "Avatar cannot be empty.",
  }),
});

export default editUserProfileSchema;
