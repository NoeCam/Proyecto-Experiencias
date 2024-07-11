import express from "express";

// Importar funciones controladoras intermedias
import {
  verifyAdmin,
  authUserController,
  experienceActivationController,
  getUserController,
} from "../middleware/index.js";

// Importar funciones controladoras finales desde el índice de entradas
import {
  adminEntryController,
  experienceConfirmationController,
  experiencesListController,
  getExperienceController,
  handleReservationController,
  editExperienceController,
  duplicateExperienceController,
  getReservedExperiencesById
} from "../controllers/entries/index.js";

const router = express.Router();

// Endpoint para la creación de experiencia por parte de un administrador
router.post("/experiencias", authUserController, adminEntryController);

// Obtención de la lista de experiencias
router.get("/experiencias", getUserController, experiencesListController);

// Endpoints para desactivar, reactivar y confirmar la experiencia
router.put(
  "/experiencias/:experienceId/experienceState",
  authUserController,
  experienceActivationController,
  experienceConfirmationController
);

// Endpoint para reservar y cancelar la reserva de una experiencia
router.put(
  "/experiencias/:experienceId/reservation",
  handleReservationController
);

// Endpoint para visualizar una experiencia específica
router.get("/experiencias/:experienceId", getExperienceController);

//Endpoint modificar experiencia (admin)
router.put("/experiencias/:experienceId/edit", authUserController, editExperienceController);

// Endpoint para duplicar una experiencia (solo para administradores)
router.post(
  "/experiencias/:id/duplicate",
  authUserController,
  duplicateExperienceController
);

// Endpoint para listar las experiencias reservadas
router.get("/experiencias/reservedExperiences", getReservedExperiencesById);

export default router;
