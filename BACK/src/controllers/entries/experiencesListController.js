import selectAllExperiencesService from '../../services/entries/selectAllExperiencesService.js';

const experiencesListController = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const experiences = await selectAllExperiencesService(keyword, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                experiences,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default experiencesListController;