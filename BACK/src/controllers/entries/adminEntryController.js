import Joi from 'joi';

// Creamos el esquema.
const experienciaSchema = Joi.object({
   title: Joi.string().max(50).required(),
   description: Joi.string().required(),
   location: Joi.string().max(30).required(),
   image: Joi.string().uri().required(),
   date: Joi.date().required(),
   price: Joi.number().positive().required(),
   numMinPlaces: Joi.number().integer().positive().required(),
   numTotalPlaces: Joi.number().integer().positive().required()
});


// Función controladora final que agrega una nueva entrada.
const adminEntryController = async (req, res, next) => {
    try {
        const { title, description, location, image, date, price, numMinPlaces, numTotalPlaces } = req.body;

        console.log(Object.assign(req.body, req.files));

        // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
        await experienciaSchema(
            Object.assign(req.body, req.files)
        );

        // Insertamos la entrada y obtenemos el id que se le ha asignado.
        const entryId = await insertEntryModel(
            title,
            description,
            location,
            image,
            date,
            price,
            numMinPlaces,
            numTotalPlaces,
            req.user.id
        );

        // Array donde pushearemos la imagen (si hay).
        const photo = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Utilizamos el método "Object.values" para obtener un
            // array de fotos. Para evitar que el array de fotos tenga más de tres fotos aplicamos
            // el método slice.
            for (const photo of Object.values(req.files).slice(0, 3)) {
                // Guardamos la foto en disco y obtenemos su nombre. Redimensionamos a un ancho
                // de 500px.
                const photoName = await savePhotoService(photo, 500);

                // Insertamos la foto en la tabla de fotos.
                const photoId = await insertPhotoModel(photoName, entryId);

                // Pusheamos la foto al array de fotos.
                photo.push({
                    id: photoId,
                    name: photoName,
                });
            }
        }

        res.send({
            status: 'ok',
            data: {
                entry: {
                    id: experienceId,
                    title,
                    description,
                    place,
                    image,
                    date,
                    price,
                    numMinPlaces,
                    numTotalPlaces,
                    userId: req.user.id,
                    photos,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};



export { adminEntryController, experienciaSchema };
