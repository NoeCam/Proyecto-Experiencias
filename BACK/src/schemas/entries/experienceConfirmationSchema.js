import Joi from "joi";

const experienceConfirmationSchema = Joi.object({
  confirmedByAdmin: Joi.boolean().required(),
});

export default experienceConfirmationSchema;
