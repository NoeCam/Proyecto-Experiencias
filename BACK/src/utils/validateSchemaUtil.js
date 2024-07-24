import { validationError } from "../services/errorService.js";

const validateSchemaUtil = async (schema, body) => {
  try {
    await schema.validateAsync(body);
  } catch (err) {
    validationError(err.details[0].message);
  }
};

export default validateSchemaUtil;
