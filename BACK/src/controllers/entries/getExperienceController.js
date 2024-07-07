import visualizeExperienceModel from "../../models/entries/visualizeExperienceModel.js";

const getExperienceController = async (req, res, next) => {
  try {
    const entryId  = req.params.experienceId;
    const entry = await visualizeExperienceModel(entryId);

    res.send({
      status: "ok",
      data: {
        entry,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getExperienceController;
