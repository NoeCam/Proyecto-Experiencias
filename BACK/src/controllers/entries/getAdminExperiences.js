import visualizeAdminExperienceModel from "../../models/entries/visualizeAdminExperienceModel.js";

// Nueva función para obtener las experiencias creadas por el administrador y reservadas por usuarios
const getAdminExperiences = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    
    const experiences = await visualizeAdminExperienceModel(userId);

    res.send({
      status: "ok",
      data: {
        experiences,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getAdminExperiences;