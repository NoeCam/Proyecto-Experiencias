import Joi from "joi";
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema.
const experienciaSchema = Joi.object({
  title: Joi.string().min(5).max(50).required().messages(joiErrorMessages),
  location: Joi.string().max(30).required().messages(joiErrorMessages),
  description: Joi.string().min(5).required().messages(joiErrorMessages),
  date: Joi.date().required(),
  price: Joi.number().required(),
  numMinPlaces: Joi.number().integer().positive().required(),
  numTotalPlaces: Joi.number().integer().positive().required(),
  confirmedByAdmin: Joi.boolean(),
});

export default experienciaSchema;
