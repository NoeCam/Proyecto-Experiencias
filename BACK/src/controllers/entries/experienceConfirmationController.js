import updateConfirmationService from "../../services/updateActivationService.js";



const experienceConfirmationController = async (req, res, next) => {
    try {

        const experienceId = req.params.experienceId || req.experience?.id;
        const {confirmed} = req.body;

        await updateConfirmationService(experienceId, confirmed);

        res.send({
            status: "ok",
            message: "Estado de confirmación modificado correctamente"
        });
        
    } catch (error) {
        next(error);
    }
}

export default experienceConfirmationController;
