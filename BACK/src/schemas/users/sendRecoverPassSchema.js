import Joi from "joi";

const sendRecoverPassSchema = Joi.object({
  email: Joi.string().email().required(),
});

export default sendRecoverPassSchema;
