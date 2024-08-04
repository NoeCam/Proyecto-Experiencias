import Joi from "joi";

const editExperienceSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  oldImage: Joi.string().optional(),
  image: Joi.string().optional(),
  date: Joi.date().iso().required(),
  price: Joi.number().required(),
  numMinPlaces: Joi.number().integer().required(),
  numTotalPlaces: Joi.number().integer().required(),
  confirmedByAdmin: Joi.boolean().required(),
});

export default editExperienceSchema;
