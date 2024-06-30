import express from "express";
//Importa el controlador de registro de usuario.
import { registerUser } from "../controllers/users/registerUser.js";

// Importa el controlador de login
import loginUserController from "../controllers/users/loginUserController.js";

import entriesRouter from "./entriesRouter.js";
import userRouter from "./userRouter.js";

const router= express.Router();

router.use(entriesRouter);
router.use(userRouter);

export default router;
