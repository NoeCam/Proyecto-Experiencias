import Joi from "joi";

const experiencesListSchema = Joi.object({
  search: Joi.string().allow("").optional(),
  order: Joi.string().valid("title", "date", "price").optional(),
  direction: Joi.string().valid("asc", "desc").optional(),
});

export default experiencesListSchema;
