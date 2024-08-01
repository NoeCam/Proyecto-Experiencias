// Importamos Joi para la validación del esquema.
import Joi from "joi";

// Definimos la expresión regular para la contraseña.
const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/;

// Definimos los mensajes de error personalizados.
const joiErrorMessages = {
  "string.pattern.base":
    "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
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
  password: Joi.string().pattern(passwordPattern).optional().messages({
    "string.pattern.base":
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    "string.empty": "Current password cannot be empty.",
    "string.min": "Current password must have at least 6 characters.",
  }),
  newPassword: Joi.string().pattern(passwordPattern).optional().messages({
    "string.pattern.base":
      "New password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    "string.empty": "New password cannot be empty.",
    "string.min": "New password must have at least 6 characters.",
  }),
});

export default editUserProfileSchema;
