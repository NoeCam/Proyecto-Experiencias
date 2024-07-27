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

    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

export default authUserController;
