// Importamos las dependencias.
import jwt from "jsonwebtoken";

// Función que verifica si hay un usuario logueado. En caso afirmativo
// lo guarda en el header para mostrar información específica de
// reservas y/o valoraciones realizadas por el usuario logueado.
const getUserController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      req.user = null;
    } else {
      let tokenInfo;

      try {
        tokenInfo = jwt.verify(authorization, process.env.SECRET);
        req.user = tokenInfo;
      } catch (err) {
        req.user = null;
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default getUserController;
