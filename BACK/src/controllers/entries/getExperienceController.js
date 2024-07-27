import visualizeExperienceModel from "../../models/entries/visualizeExperienceModel.js";

const getExperienceController = async (req, res, next) => {
  try {
    const experienceId = req.params.experienceId;
    const experience = await visualizeExperienceModel(experienceId);

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