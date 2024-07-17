import Joi from "joi";

const handleReservationSchema = Joi.object({
  state: Joi.boolean().required(),
});

export default handleReservationSchema;
