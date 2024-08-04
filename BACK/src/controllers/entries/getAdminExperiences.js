import selectSearchExperiencesService from "../../services/entries/selectSearchExperiencesService";

// Nueva función para obtener las experiencias creadas por el administrador y reservadas por usuarios
export const getAdminExperiences = async (req, res, next) => {
    try{
        const token = req.query.token; // Obtener el token de los parámetros de la solicitud
        const experiences = await selectSearchExperiencesService(
            null,
            null,
            null,
        )

    }catch (error){
        next(err)
    }
    if (!token) {
      return res.send({ message: 'Token is required.' });
    }
  
    // Verificar el token aquí según tu lógica de autenticación
  
    if (req.user.role !== 'admin') {
      return res.status(403).send({ message: 'No tienes permiso para acceder a esta ruta.' });
    }
  
    
  };