// Importamos los modelos.
import selectExperienceByReservationService from "../../services/entries/selectExperienceByReservationService.js";


// Función controladora final que retorna una entrada con un id dado.
const getReservedExperiencesById = async (req, res, next) => {
    try {

        const experience = await selectExperienceByReservationService(req.user.id);

        res.send({
            status: 'ok',
            data: {
                experience,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getReservedExperiencesById;