import selectSearchExperiencesService from "../../services/entries/selectSearchExperiencesService.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import experiencesListSchema from "../../schemas/entries/experiencesListSchema.js";

export default async function experiencesListController(req, res, next) {
  try {
    //Validar los párametros de consulta con Joi.
    await validateSchemaUtil(experiencesListController, req.query);
    const { search, order, direction } = req.query;

    const userId = req.user?.id;
    let experiences = await selectSearchExperiencesService(
      search,
      order,
      direction,
      userId
    );
    res.send({
      status: "ok",
      data: {
        experiences,
      },
    });
  } catch (error) {
    next(error);
  }
}
