//*************** Dependencias ********************************/
import express from "express";

//*************** Funciones controladoras intermedias *********/
import {
  verifyAdmin,
  authUserController,
  experienceActivationController,
  getUserController,
} from "../middleware/index.js";

//*************** Funciones controladoras finales *************/
import {
  adminEntryController,
  experienceConfirmationController,
  experiencesListController,
  getExperienceController,
  handleReservationController,
  editExperienceController,
} from "../controllers/entries/index.js";

const router = express.Router();

// Endpoint para la creación de experiencia de Admin
router.post("/experiencias", authUserController, adminEntryController);

// Obtención de la lista de experiencias
router.get("/experiencias", getUserController, experiencesListController);

// Endpoints para para desactivar, reactivar y confirmar la experiencia
router.put(
  "/experiencias/:experienceId/experienceState",
  authUserController,
  experienceActivationController,
  experienceConfirmationController
);

//Endpoint para reservas y cancelar la reserva de una experiencia
router.put(
  "/experiencias/:experienceId/reservation",
  handleReservationController
);

//Endpoint visualización de una experiencia.
router.get("/experiencias/:experienceId", getExperienceController);


//Endpoint modificar experiencia (admin)
router.put("/experiencias/:experienceId/edit", authUserController, editExperienceController);


export default router;
