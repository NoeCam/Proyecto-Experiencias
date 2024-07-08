import updateConfirmationService from "../../services/updateConfirmationService.js";

const experienceConfirmationController = async (req, res, next) => {
  try {
    const experienceId = req.params.id;
    const { active } = req.body;

    await updateConfirmationService(experienceId, active);

    res.send({
      status: "ok",
      message: "Estado de confirmación modificado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default experienceConfirmationController;
