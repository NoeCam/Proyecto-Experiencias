import express from "express";
import registerUser from "../controllers/users/registerUser.js";
import loginUserController from "../controllers/users/loginUserController.js";
import sendRecoverPassController from "../controllers/users/sendRecoverPassController.js";
import editUserPassController from "../controllers/users/editUserPassController.js";
import validateUserController from "../controllers/users/validateUserController.js";

const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Soy rutas de usuarios");
});

//Crear un usuario pendiente de activar.
router.post("/users/register", registerUser);

//Validar a un usuario.
router.put("/users/validate/:registrationCode", validateUserController);

// Ruta para el login de usuario
router.post("/users/login", loginUserController); // Añadido el endpoint de login

// Define la ruta del endpoint de recuperación de contraseña
router.post("/users/recover-password", sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put("/users/password", editUserPassController);

export default router;
