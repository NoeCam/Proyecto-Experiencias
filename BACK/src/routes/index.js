import express from "express";
//Importa el controlador de registro de usuario.
import { registerUser } from "../controllers/users/registerUser.js";

// Importa el controlador de login
import loginUserController from "../controllers/users/loginUserController.js";

import entriesRouter from "./entriesRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.post("/register", registerUser);

// Ruta para el login de usuario
router.post('/login', loginUserController);  // Añadido el endpoint de login

router.use(entriesRouter);
router.use(userRouter);

export default router;
