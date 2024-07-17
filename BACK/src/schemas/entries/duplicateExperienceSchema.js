import Joi from "joi";

const duplicateExperienceSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export default duplicateExperienceSchema;
