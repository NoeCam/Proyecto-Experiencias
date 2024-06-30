import express from "express";
//Importa el controlador de registro de usuario.
import { registerUser } from "../controllers/users/registerUser.js";

import entriesRouter from "./entriesRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.post("/register", registerUser);

router.use(entriesRouter);
router.use(userRouter);

export default router;
