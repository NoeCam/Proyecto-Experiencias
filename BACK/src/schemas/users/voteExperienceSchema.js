// Importamos joi
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js"

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const voteExperienceSchema = joi.object({
    value: joi
    .number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages(joiErrorMessages), // Asumiendo que los votos son valores entre 1 y 5
});

export default voteExperienceSchema;