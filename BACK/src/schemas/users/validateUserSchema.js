import Joi from "joi";

const validateUserSchema = Joi.object({
  registrationCode: Joi.string().required(),
});

export default validateUserSchema;
