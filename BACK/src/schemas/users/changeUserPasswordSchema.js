import Joi from 'joi';

const changeUserPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required()
});

export default changeUserPasswordSchema;