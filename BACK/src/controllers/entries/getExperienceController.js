import selectSearchExperiencesService from "../../services/entries/selectSearchExperiencesService.js";

const getExperienceController = async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;
    const experiences = await selectSearchExperiencesService(
      null,
      null,
      null,
      req.user?.id
    );
    const experience = experiences.find(
      (exp) => exp.id === parseInt(experienceId)
    );
    res.send({
      status: "ok",
      data: {
        experience,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getExperienceController;
