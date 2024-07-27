import jwt from "jsonwebtoken";
import {
  notAuthenticatedError,
  invalidCredentialsError,
} from "../services/errorService.js";

const authUserController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      notAuthenticatedError();
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (err) {
      invalidCredentialsError();
    }
    // Si hemos llegado hasta aquí quiere decir que el token ya se ha desencriptado..
    // Creamos la propiedad "user" en el objeto "request" (es una propiedad inventada).
    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

export default authUserController;
