import selectSearchExperiencesService from "../../services/entries/selectSearchExperiencesService.js";

export default async function experiencesListController(req, res, next) {
  try {
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
