import jwt from "jsonwebtoken";
import {
  notAuthenticatedError,
  invalidCredentialsError,
} from "../services/errorService.js";

const authUserController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw notAuthenticatedError();
    }
    const token = authorization; // El token se espera directamente en el encabezado `Authorization`
    if (!token) {
      throw notAuthenticatedError();
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw invalidCredentialsError();
    }

    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

export default authUserController;
