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

router.get("/", (req, res) => {
  res.send("¡Bienvenido al servidor de Experiencias Diferentes!");
});
//Crear un usuario pendiente de activar.
router.post("/register", registerUser);

//Validar a un usuario.
router.put("/users/validate/:registrationCode", validateUserController);

// Ruta para el login de usuario
router.post("/login", loginUserController); // Añadido el endpoint de login

// Define la ruta del endpoint de recuperación de contraseña
router.post("/recover-password", sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put("/users/password", editUserPassController);

export default router;
