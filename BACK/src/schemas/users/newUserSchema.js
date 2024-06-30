import Joi from "joi";

//Define el esquema del validación para un nuevo usuario.

const newUserSchema = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default newUserSchema;
