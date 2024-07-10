import duplicateExperienceModel from "../../models/entries/duplicateExperienceModel.js"; // Importa el modelo de duplicación.
import insertPhotoModel from '../../models/entries/insertExperienceModel.js'; // Importa el modelo para insertar fotos.
import { savePhotoService } from '../../services/photoService.js'; // Importa el servicio de guardado de fotos.
import verifyAdmin from "../../middleware/verifyAdminController.js";

// Controlador para duplicar una experiencia (solo accesible para administradores).
const duplicateExperienceController = async (req, res, next) => {
  try {
    const { id } = req.params; // Obtiene el ID de la experiencia desde los parámetros de la solicitud.

       // Verificar que el usuario sea admin
       const isAdmin = await verifyAdmin(id);
       if (!isAdmin) {
         return res.status(403).send({
           status: "error",
           message: "No tienes permisos para realizar esta acción",
         });
       }

    // Duplica la experiencia original.
    const newExperienceId = await duplicateExperienceModel(id, req.user.id);

    const photos = [];

    // Si hay archivos en la solicitud, se procesan las fotos.
    if (req.files) {
      for (const photo of Object.values(req.files).slice(0, 3)) {
        const photoName = await savePhotoService(photo, 500); // Guarda la foto y obtiene el nombre.
        const photoId = await insertPhotoModel(photoName, newExperienceId); // Inserta la foto en la base de datos.
        photos.push({ id: photoId, name: photoName }); // Añade la foto al array de fotos.
      }
    }

    // Envía la respuesta indicando éxito.
    res.send({
      status: 'ok',
      message: 'Experiencia duplicada con éxito',
      data: {
        experience: {
          id: newExperienceId,
          photos,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err); // Pasa el error al siguiente middleware.
  }
};

export default duplicateExperienceController; // Exporta el controlador.
