import Joi from "joi";

// Creamos el esquema.
const makeReservationSchema = Joi.object({
  quantityPerPerson: Joi.number().integer().positive().required(),
  state: Joi.boolean(),
});

export default makeReservationSchema;
