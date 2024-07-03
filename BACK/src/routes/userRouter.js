import express from "express";
import registerUser from "../controllers/users/registerUser.js";
import loginUserController from "../controllers/users/loginUserController.js";
import validateUserController from "../controllers/users/validaterUserController.js";

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
router.get("/users/validate/:registrationCode", validateUserController);
// Ruta para el login de usuario
router.post("/login", loginUserController);

export default router;
