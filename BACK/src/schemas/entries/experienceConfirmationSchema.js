import Joi from "joi";

const experienceConfirmationSchema = Joi.object({
  active: Joi.boolean().required(),
});

export default experienceConfirmationSchema;
