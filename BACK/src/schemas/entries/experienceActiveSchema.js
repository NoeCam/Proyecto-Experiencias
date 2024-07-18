import Joi from "joi";

const experienceActiveSchema = Joi.object({
  active: Joi.boolean().required(),
});

export default experienceActiveSchema;
