import express from "express";

// Importar funciones controladoras intermedias
import {
  authUserController,
  getUserController,
  verifyAdmin,
} from "../middleware/index.js";

// Importar funciones controladoras finales desde el índice de entradas
import {
  adminEntryController,
  experienceAcivtionConfirmationController,
  experiencesListController,
  getExperienceController,
  handleCancelledReservationController,
  editExperienceController,
  duplicateExperienceController,
  getReservedExperiencesById,
  voteExperienceController,
  makeReservationController,
  getAdminExperiences,
} from "../controllers/entries/index.js";

const router = express.Router();

// Endpoint para la creación de experiencia por parte de un administrador
router.post(
  "/experiencias",
  authUserController,
  verifyAdmin,
  adminEntryController
);

// Obtención de la lista de experiencias
router.get("/experiencias", getUserController, experiencesListController);

// Endpoints para desactivar, reactivar y confirmar la experiencia
router.put(
  "/experiencias/:experienceId/experienceState",
  authUserController,
  verifyAdmin,
  experienceAcivtionConfirmationController
);

// Endpoint para hacer una reserva de una experiencia
router.post(
  "/experiencias/:experienceId/reservation",
  authUserController,
  makeReservationController
);

// Endpoint cancelar la reserva de una experiencia
router.put(
  "/experiencias/:experienceId/reservation",
  authUserController,
  handleCancelledReservationController
);

// Endpoint para listar las experiencias reservadas
router.get(
  "/experiencias/reservedExperiences",
  authUserController,
  getReservedExperiencesById
);

// Endpoint para visualizar una experiencia específica
router.get(
  "/experiencias/:experienceId",
  getUserController,
  getExperienceController
);





// Endpoint para listar las experiencias creadas por el admin y reservadas por usuarios
router.get(
  "/admin/experiences",
  authUserController,
  verifyAdmin,
  getAdminExperiences
);




//Endpoint modificar experiencia (admin)
router.put(
  "/experiencias/:experienceId/edit",
  authUserController,
  verifyAdmin,
  editExperienceController
);

// Endpoint para duplicar una experiencia (solo para administradores)
router.post(
  "/experiencias/:id/duplicate",
  authUserController,
  verifyAdmin,
  duplicateExperienceController
);

// Votar una experiencia.
router.post(
  "/experiencias/:reservationId/rating",
  authUserController,
  voteExperienceController
);

export default router;
