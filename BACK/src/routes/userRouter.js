import express from "express";

import {
  registerUser,
  loginUserController,
  sendRecoverPassController,
  editUserPassController,
  validateUserController,
  editUserProfileController,
  getUserProfileController,
  editUserAvatarController,
  changeUserPasswordController,
} from "../controllers/users/index.js";

import authUserController from "../middleware/authUserController.js";

const router = express.Router();

// Crear un usuario pendiente de activar.
router.post("/users/register", registerUser);

// Validar a un usuario.
router.put("/users/validate/:registrationCode", validateUserController);

// Ruta para el login de usuario
router.post("/users/login", loginUserController); // Añadido el endpoint de login

// Define la ruta del endpoint de recuperación de contraseña
router.post("/users/recover-password", sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put("/users/password", editUserPassController);

// Editar la contraseña estando logueado.
router.put(
  "/users/change-password",
  authUserController,
  changeUserPasswordController
);

//Define la ruta para actualizar el perfirl de usuario.
router.put("/users/profile", authUserController, editUserProfileController);

// Muestra el perfil de usuario.
router.get("/users/profile", authUserController, getUserProfileController);

// Insertar avatar de usuario.
router.put("/users/avatar", authUserController, editUserAvatarController);

export default router;