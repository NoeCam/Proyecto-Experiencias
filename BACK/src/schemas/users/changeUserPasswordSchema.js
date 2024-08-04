import Joi from "joi";

const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/;

const changeUserPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .pattern(passwordPattern)
    .min(8) // Puedes ajustar la longitud mínima si es necesario
    .required()
    .messages({
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "string.empty": "New password cannot be empty.",
      "string.min": "New password must have at least {#limit} characters.",
      "any.required": "New password is required.",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "New password and confirm password do not match.",
      "any.required": "Confirm password is required.",
    }),
});

export default changeUserPasswordSchema;
